"use server";

import db from "@/lib/db";

export async function getMoreProducts(page: number) {
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