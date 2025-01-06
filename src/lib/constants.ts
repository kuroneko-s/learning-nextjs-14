export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const PASSWORD_REGEX_ERROR =
    "비밀번호에는 소문자랑 대문자랑 특수문자가 들어가야해요";