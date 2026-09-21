export interface ApiErrorDef {
  statusCode: number;
  title: string;
  message: string;
}

export const API_ERRORS: Record<number, ApiErrorDef> = {
  400: {
    statusCode: 400,
    title: "Bad Request",
    message: "The request could not be processed.",
  },
  401: {
    statusCode: 401,
    title: "Session Required",
    message: "Please sign in to continue.",
  },
  403: {
    statusCode: 403,
    title: "Access Denied",
    message: "You don't have permission to access this resource.",
  },
  404: {
    statusCode: 404,
    title: "Page Not Found",
    message: "The page you're looking for doesn't exist or may have been moved.",
  },
  408: {
    statusCode: 408,
    title: "Request Timeout",
    message: "The request took too long to complete. Please try again.",
  },
  409: {
    statusCode: 409,
    title: "Conflict",
    message: "This action conflicts with the current state of the application.",
  },
  422: {
    statusCode: 422,
    title: "Invalid Information",
    message: "Please check the information entered and try again.",
  },
  429: {
    statusCode: 429,
    title: "Too Many Requests",
    message: "You're doing that a little too quickly. Please wait and try again.",
  },
  500: {
    statusCode: 500,
    title: "Something Went Wrong",
    message: "We couldn't complete your request. Please try again.",
  },
  502: {
    statusCode: 502,
    title: "Bad Gateway",
    message: "The server received an invalid response from an upstream service.",
  },
  503: {
    statusCode: 503,
    title: "Service Unavailable",
    message: "The service is temporarily unavailable. Please try again shortly.",
  },
  504: {
    statusCode: 504,
    title: "Gateway Timeout",
    message: "The server took too long to respond. Please try again.",
  },
};

/**
 * Returns a standardized error definition for a given HTTP status code.
 * Falls back to a generic 500 error if the status is unknown.
 */
export function getApiError(statusCode: number): ApiErrorDef {
  return (
    API_ERRORS[statusCode] || {
      statusCode: statusCode || 500,
      title: "Something Went Wrong",
      message: "We couldn't complete your request. Please try again.",
    }
  );
}
