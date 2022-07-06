class ErrorResponse extends Error {
  statusCode: number;

  data: object | null;

  constructor(message: string, statusCode?: number, data?: object) {
    super(message);
    this.statusCode = statusCode === undefined ? 500 : statusCode;
    this.data = data === undefined ? null : data;
  }
}

export default ErrorResponse;
