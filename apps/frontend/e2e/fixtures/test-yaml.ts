/**
 * YAML fixtures for E2E tests
 */

export const yamlFixtures = {
  /**
   * Valid Pod YAML
   */
  validPod: `apiVersion: v1
kind: Pod
metadata:
  name: test-pod
  namespace: default
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
      protocol: TCP
  restartPolicy: Always`,

  /**
   * Valid Secret YAML with data (base64 encoded)
   */
  validSecret: `apiVersion: v1
kind: Secret
metadata:
  name: test-secret
  namespace: default
type: Opaque
data:
  username: YWRtaW4=
  password: cGFzc3dvcmQ=`,

  /**
   * Valid Secret YAML with stringData (plain text)
   */
  validSecretStringData: `apiVersion: v1
kind: Secret
metadata:
  name: test-secret-string
  namespace: default
type: Opaque
stringData:
  username: admin
  password: password123`,

  /**
   * Invalid YAML - missing required fields
   */
  invalidPodMissingField: `apiVersion: v1
kind: Pod
metadata:
  name: test-pod-invalid
  namespace: default
spec:
  containers: []`,

  /**
   * Invalid YAML - syntax error
   */
  invalidYamlSyntax: `apiVersion: v1
kind: Pod
metadata:
  name: test-pod-syntax
  namespace: default
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
      protocol: TCP
  restartPolicy: Always`,

  /**
   * Valid Deployment YAML
   */
  validDeployment: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: test-deployment
  namespace: default
  labels:
    app: test-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: test-app
  template:
    metadata:
      labels:
        app: test-app
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80`,

  /**
   * Valid ConfigMap YAML
   */
  validConfigMap: `apiVersion: v1
kind: ConfigMap
metadata:
  name: test-configmap
  namespace: default
data:
  app.properties: |
    server.port=8080
    server.name=K8s Manager
  config.json: |
    {
      "key": "value",
      "enabled": true
    }`,

  /**
   * Minified YAML (for format testing)
   */
  minifiedYaml: `apiVersion:v1\nkind:Pod\nmetadata:\n  name:test-pod-minified\n  namespace:default\nspec:\n  containers:\n  - name:nginx\n    image:nginx:latest\n    ports:\n    - containerPort:80\n      protocol:TCP\n  restartPolicy:Always`,

  /**
   * YAML for diff testing (original version)
   */
  originalYaml: `apiVersion: v1
kind: Pod
metadata:
  name: test-pod-diff
  namespace: default
  labels:
    app: test-app
spec:
  containers:
  - name: nginx
    image: nginx:1.21
    ports:
    - containerPort: 80
      protocol: TCP
  restartPolicy: Always`,

  /**
   * YAML for diff testing (modified version)
   */
  modifiedYaml: `apiVersion: v1
kind: Pod
metadata:
  name: test-pod-diff
  namespace: default
  labels:
    app: test-app
    version: v2
spec:
  containers:
  - name: nginx
    image: nginx:1.22
    ports:
    - containerPort: 8080
      protocol: TCP
  restartPolicy: OnFailure`,
};

/**
 * Get a YAML fixture by name
 */
export const getYamlFixture = (name: keyof typeof yamlFixtures) => yamlFixtures[name];

/**
 * Get a list of all fixture names
 */
export const getFixtureNames = (): (keyof typeof yamlFixtures)[] => {
  return Object.keys(yamlFixtures) as (keyof typeof yamlFixtures)[];
};
