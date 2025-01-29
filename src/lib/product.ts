"use server";

import db from "@/lib/db";
import {Prisma} from "@prisma/client";

export async function getProduct(id: string | number) {
    const _id = Number(id);

    return db.product.findUnique({
        where: {
            id: Number(_id),
        },
        select: {
            title: true,
            price: true,
            description: true,
            created_at: true,
            photo: true,
            id: true,
        },
    }) ?? [];
}

export async function getProductsCnt() {
    return db.product.count();
}

export async function getProductList(page: number) {
    return db.product.findMany({
        select: {
            title: true,
            price: true,
            created_at: true,
            photo: true,
            id: true,
        },
        skip: page * 1,
        take: 1,
        orderBy: {
            created_at: "desc",
        },
    });
}

export type ProductItem = Prisma.PromiseReturnType<typeof getProduct>;
export type ProductListItem = Prisma.PromiseReturnType<typeof getProductList>;
