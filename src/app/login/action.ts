"use server";

import {z} from "zod";
import {PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR} from "@/lib/constants";
import {redirect} from "next/navigation";

const formSchema = z.object({
    email: z.string()
        .email()
        .toLowerCase(),
    password: z.string({
        required_error: "비밀번호 입력 안했어용"
    })
        .min(PASSWORD_MIN_LENGTH)
        .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
})

export async function LoginAction(prevState: any, formData: FormData) {
    const data = {
        email: formData.get("email"),
        password: formData.get("password")
    }

    const result = formSchema.safeParse(data);

    if (!result.success) {
        return result.error.flatten();
    }

    redirect("/");
}
