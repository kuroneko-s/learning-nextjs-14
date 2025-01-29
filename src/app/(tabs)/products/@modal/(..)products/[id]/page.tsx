"use server"

import ProductsClient from "@/app/(tabs)/products/@modal/(..)products/[id]/productsClient";
import {getProduct} from "@/lib/product";

export default async function Modal({params} : {params : Promise<{ id: string }>}) {
    const {id} = await params;

    const product = await getProduct(id);

    return <ProductsClient product={product} />
}