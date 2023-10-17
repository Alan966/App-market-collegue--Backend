"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function responseError(code, status) {
    return {
        success: false,
        error: {
            code: code,
            status: status,
        },
    };
}
function returnError(error_code, code, status) {
    return {
        success: false,
        error: {
            code: code,
            status: status,
        },
        error_code: error_code,
    };
}
