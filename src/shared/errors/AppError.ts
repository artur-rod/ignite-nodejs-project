class AppError {
  public readonly statusCode: number;
  public readonly message: string;

  constructor(message: string, statusCode = 400) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export { AppError };
