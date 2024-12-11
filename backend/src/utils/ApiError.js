class ApiError extends Error {
  constructor(statusCode = 400, message = "Something went wrong", errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
    this.status = statusCode >= 400;
  }
}

export default ApiError;
