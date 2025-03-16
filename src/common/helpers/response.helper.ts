export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, any>;
  };
}

export class ResponseHelper {
  static success<T>(data: T): ServiceResponse<T> {
    return {
      success: true,
      data,
    };
  }

  static error(
    message: string,
    details?: Record<string, any>,
  ): ServiceResponse {
    return {
      success: false,
      error: {
        message,
        details,
      },
    };
  }
}
