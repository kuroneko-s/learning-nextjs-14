'use server'

import {z} from "zod";
import fs from "fs/promises";
import db from "@/lib/db";
import getSession from "@/lib/session";
import {redirect} from "next/navigation";

const productSchema = z.object({
    title: z.string({
        required_error: "상품명은 필수값"
    }),
    description: z.string({
        required_error: "설명이 있어야만 함"
    }),
    file: z.string({
        required_error: "사진은 필수값임"
    }),
    price: z.coerce.number(),
})

export default async function UploadAction(prevState: any, formData: FormData) {
    const data = {
        title: formData.get("title"),
        description: formData.get("description"),
        price: formData.get("price"),
        file: formData.get("file")
    };

    if (data.file instanceof File) {
        const fileData = await data.file.arrayBuffer();
        await fs.appendFile(`./public/${data.file.name}`, Buffer.from(fileData));
        data.file = `/${data.file.name}`;
    }

    const results = productSchema.safeParse(data);

    if (!results.success) {
        return results.error.flatten();
    }

    const session = await getSession();
    if (session.id) {
        const product = await db.product.create({
            data: {
                title: results.data.title,
                description: results.data.description,
                price: results.data.price,
                photo: results.data.file,
                user: {
                    connect: {
                        id: session.id,
                    }
                }
            },
            select: {
                id: true
            }
        })
        redirect(`/products/${product.id}`);
    }
};