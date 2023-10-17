export interface Response_Error {
  success: boolean;
  error: {
    code: string;
    status: string;
  };
}

export interface Return_Error extends Response_Error {
  error_code: number;
}
