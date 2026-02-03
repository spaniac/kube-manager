/**
 * ErrorCode enum matching backend ErrorCode enum.
 * Used for consistent error handling between frontend and backend.
 */

export enum ErrorCode {
  // General errors (4xx)
  BAD_REQUEST = 'ERR_400',
  UNAUTHORIZED = 'ERR_401',
  FORBIDDEN = 'ERR_403',
  NOT_FOUND = 'ERR_404',
  CONFLICT = 'ERR_409',
  VALIDATION_ERROR = 'ERR_422',

  // Resource errors (4xx)
  RESOURCE_NOT_FOUND = 'ERR_RNF',
  RESOURCE_ALREADY_EXISTS = 'ERR_RAE',
  RESOURCE_CONFLICT = 'ERR_RCF',

  // Authentication errors (4xx)
  AUTHENTICATION_FAILED = 'ERR_AUTH',
  TOKEN_INVALID = 'ERR_TOK',
  TOKEN_EXPIRED = 'ERR_TOK_EXP',

  // Authorization errors (4xx)
  INSUFFICIENT_PERMISSIONS = 'ERR_PERM',
  ACCESS_DENIED = 'ERR_ACC',

  // Kubernetes errors (5xx)
  K8S_CLIENT_ERROR = 'ERR_K8S',
  K8S_RESOURCE_NOT_FOUND = 'ERR_K8S_RNF',
  K8S_OPERATION_FAILED = 'ERR_K8S_OP',

  // Database errors (5xx)
  DATABASE_ERROR = 'ERR_DB',
  DATABASE_CONNECTION_FAILED = 'ERR_DBC',

  // Server errors (5xx)
  INTERNAL_SERVER_ERROR = 'ERR_500',
  SERVICE_UNAVAILABLE = 'ERR_503',
}

export interface ApiError {
  code: ErrorCode;
  message: string;
  status: number;
}
