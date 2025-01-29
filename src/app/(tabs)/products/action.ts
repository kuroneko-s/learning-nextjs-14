"use server";

import {getProductList} from "@/lib/product";

export async function getProducts(page: number) {
    return getProductList(page);
}