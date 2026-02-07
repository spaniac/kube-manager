#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="${ROOT_DIR}/docker-compose.yml"
KEEP_STACK=false

for arg in "$@"; do
  case "$arg" in
    --keep-stack)
      KEEP_STACK=true
      ;;
  esac
done

cleanup() {
  if [ "${KEEP_STACK}" = true ]; then
    return
  fi
  docker compose -f "${COMPOSE_FILE}" down -v --remove-orphans
}

wait_for_service() {
  local service="$1"
  local timeout_seconds="${2:-300}"
  local elapsed=0
  local container_id
  local status

  container_id="$(docker compose -f "${COMPOSE_FILE}" ps -q "${service}")"
  if [ -z "${container_id}" ]; then
    echo "[ERROR] Container not found for service: ${service}" >&2
    exit 1
  fi

  until [ "${elapsed}" -ge "${timeout_seconds}" ]; do
    status="$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "${container_id}")"
    if [ "${status}" = "healthy" ] || [ "${status}" = "running" ]; then
      echo "[OK] ${service} is ${status}"
      return
    fi

    sleep 5
    elapsed=$((elapsed + 5))
  done

  echo "[ERROR] Timeout waiting for ${service}. Current status: ${status}" >&2
  docker compose -f "${COMPOSE_FILE}" logs "${service}" >&2 || true
  exit 1
}

trap cleanup EXIT

echo "[1/4] Starting integration stack"
docker compose -f "${COMPOSE_FILE}" up -d --build

echo "[2/4] Waiting for services to become healthy"
wait_for_service postgres 180
wait_for_service keycloak 300
wait_for_service prometheus 180
wait_for_service backend 300
wait_for_service frontend 300

echo "[3/4] Running backend integration tests"
(cd "${ROOT_DIR}/apps/backend" && ./gradlew test --tests '*IntegrationTest' --tests '*IT')

echo "[4/4] Running frontend E2E tests (Playwright)"
(
  cd "${ROOT_DIR}/apps/frontend"
  npm ci
  npx playwright install chromium
  BASE_URL=http://localhost:5173 npm run e2e -- --project=chromium
)

echo "Integration tests completed successfully."
if [ "${KEEP_STACK}" = true ]; then
  echo "Stack was kept alive due to --keep-stack option."
fi
