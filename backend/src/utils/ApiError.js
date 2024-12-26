class ApiError extends Error {
  constructor(statusCode = 400, message = "", errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;
    this.status = statusCode <= 400;
  }
}

export default ApiError;
