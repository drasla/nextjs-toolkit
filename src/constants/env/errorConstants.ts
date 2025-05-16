export enum ErrorConstants {
    // 인증 관련 에러
    UNAUTHORIZED = "UNAUTHORIZED",
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    SESSION_EXPIRED = "SESSION_EXPIRED",

    // 사용자 관련 에러
    USER_NOT_FOUND = "USER_NOT_FOUND",
    USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",
    USER_NOT_CREATED = "USER_NOT_CREATED",

    // 입력 검증 에러
    VALIDATION_ERROR = "VALIDATION_ERROR",
    MISSING_REQUIRED_FIELD = "MISSING_REQUIRED_FIELD",
    INVALID_FORMAT = "INVALID_FORMAT",

    // API 관련 에러
    API_ERROR = "API_ERROR",
    NETWORK_ERROR = "NETWORK_ERROR",

    // 기타 에러
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export const ErrorMessages: Record<ErrorConstants, string> = {
    // 인증 관련 에러
    [ErrorConstants.UNAUTHORIZED]: "인증되지 않은 접근입니다.",
    [ErrorConstants.INVALID_CREDENTIALS]: "유효하지 않은 아이디 또는 비밀번호입니다.",
    [ErrorConstants.SESSION_EXPIRED]: "세션이 만료되었습니다.",

    // 사용자 관련 에러
    [ErrorConstants.USER_NOT_FOUND]: "사용자를 찾을 수 없습니다.",
    [ErrorConstants.USER_ALREADY_EXISTS]: "이미 존재하는 사용자입니다.",
    [ErrorConstants.USER_NOT_CREATED]: "사용자를 생성할 수 없습니다.",

    // 입력 검증 에러
    [ErrorConstants.VALIDATION_ERROR]: "입력값이 유효하지 않습니다.",
    [ErrorConstants.MISSING_REQUIRED_FIELD]: "필수 입력값이 없습니다.",
    [ErrorConstants.INVALID_FORMAT]: "입력값의 형식이 올바르지 않습니다.",

    // API 관련 에러
    [ErrorConstants.API_ERROR]: "API 요청에 실패했습니다.",
    [ErrorConstants.NETWORK_ERROR]: "네트워크 연결에 실패했습니다.",

    // 기타 에러
    [ErrorConstants.UNKNOWN_ERROR]: "알 수 없는 오류가 발생했습니다.",
}