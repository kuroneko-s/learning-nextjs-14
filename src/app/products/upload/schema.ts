import {z} from "zod";

export const productSchema = z.object({
    title: z.string({
        required_error: "상품명은 필수값"
    }).min(10, "최소 10자 이상이여야 함"),
    description: z.string({
        required_error: "설명이 있어야만 함"
    }).min(10, "최소 10자 이상이여야 함"),
    file: z.string({
        required_error: "사진은 필수값임"
    }),
    price: z.coerce.number().min(999, "최소 천원이상이여야 함"),
});

export type ProductType = z.infer<typeof productSchema>;