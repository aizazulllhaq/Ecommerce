class ApiResponse {
  constructor(success, msg, data) {
    this.success = success;
    this.msg = msg;
    this.data = data;
  }
}

export default ApiResponse;