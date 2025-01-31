"use server";

import db from "@/lib/db";
import {Prisma} from "@prisma/client";

export async function getProduct(id: string) {
    const _id = Number(id);

    if (isNaN(_id)) { return null}

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
    console.log("get product total count")
    return db.product.count();
}

export async function getProductList(page: number) {
    console.log("get product list")
    return db.product.findMany({
        select: {
            title: true,
            price: true,
            created_at: true,
            photo: true,
            id: true,
        },
        skip: page * 1,
        take: 10,
        orderBy: {
            created_at: "desc",
        },
    });
}

export type ProductItem = Prisma.PromiseReturnType<typeof getProduct>;
export type ProductListItem = Prisma.PromiseReturnType<typeof getProductList>;
