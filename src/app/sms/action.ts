"use server";

import {z} from "zod";
import validator from "validator";

const phoneSchema = z.string().trim().refine(validator.isMobilePhone);

const tokenSchema = z
    .coerce.number() // string 을 number로 변경 시도
    .min(100000)
    .max(999999)

export async function SmsLoginAction(prevState: any, formData: FormData) {
    console.log(typeof formData.get("token"));
    console.log(typeof tokenSchema.parse(formData.get("token")));
}