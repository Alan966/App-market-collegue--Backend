import { Response_Error, Return_Error } from "../interfaces/error.interface";

function responseError(code: string, status: string): Response_Error {
  return {
    success: false,
    error: {
      code: code,
      status: status,
    },
  };
}
function returnError(
  error_code: number,
  code: string,
  status: string
): Return_Error {
  return {
    success: false,
    error: {
      code: code,
      status: status,
    },
    error_code: error_code,
  };
}

export { responseError, returnError };
