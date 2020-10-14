class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, code = 400) {
    this.message = message;
    this.statusCode = code;
  }
}

export default AppError;