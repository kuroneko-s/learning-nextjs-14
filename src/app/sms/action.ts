"use server";

import {z} from "zod";
import validator from "validator";
import {redirect} from "next/navigation";

interface PrevState {
    token: boolean,
    payload: {
        phone: string,
        token: number | undefined | null
    }
}

const phoneSchema = z.string()
    .trim()
    .refine((s) => validator.isMobilePhone(s, "ko-KR"));

const tokenSchema = z
    .coerce.number() // string 을 number로 변경 시도
    .min(100000)
    .max(999999)

export async function SmsLoginAction(prevState: PrevState, formData: FormData) {
    const payload = {
        phone: formData.get("phone") as string ?? "",
        token: formData.get("token") as number | undefined | null
    }

    if (!prevState.token) {
        const result = phoneSchema.safeParse(payload.phone);
        // create token code

        if (!result.success) {
            return {
                token: false,
                payload
            }
        } else {
            return {
                token: true,
                payload
            }
        }
    } else {
        const result = tokenSchema.safeParse(payload.token);

        if (!result.success) {
            return {
                token: true,
                payload
                // return the error
            }
        } else {
            // 로그인 처리
            redirect("/");
        }
    }
}