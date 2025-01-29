"use client"

import Image from "next/image";
import {useRouter} from "next/navigation";
import {ProductItem} from "@/lib/product";

export default function ProductsClient({product}: { product: ProductItem }) {
    const router = useRouter();

    if (product === null) {
        return null;
    }

    return <>
        {(!!product) ?
            <div className={"bg-gray-900 fixed top-0 left-0 w-full h-full bg-opacity-85 flex flex-col items-start " +
                "justify-start py-8 px-4 gap-4 *:text-neutral-100 z-[99]"}>
                <div className={"w-full h-full max-h-[720px] relative"}>
                    <Image src={product.photo} alt={`product ${product.title} image`} fill={true}/>
                </div>
                <p>{product.title}</p>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <button onClick={() => {
                    router.back();
                }}
                        className={"bg-neutral-700 w-full py-3 rounded-lg cursor-pointer transition-colors hover:bg-neutral-600"}
                        type={"button"}>닫기
                </button>
            </div> : null}
    </>
}
