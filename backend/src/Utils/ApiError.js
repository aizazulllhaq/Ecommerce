class ApiError extends Error {
  constructor(success,statusCode, msg) {
    super();
    this.success = success;
    this.statusCode = statusCode;
    this.msg = msg;
  }
}

export default ApiError;