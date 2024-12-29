export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_REGEX = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const PASSWORD_REGEX_ERROR = "패스워드가 대소문자랑 숫자랑 특수문자 들어가야해요";