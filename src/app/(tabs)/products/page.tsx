import ProductList from "@/components/product-list";
import db from "@/lib/db";
import {Prisma} from "@prisma/client";
import Link from "next/link";
import {PlusIcon} from "@heroicons/react/24/solid";

async function getInitialProducts() {
    const products = await db.product.findMany({
        select: {
            title: true,
            price: true,
            created_at: true,
            photo: true,
            id: true,
        },
        take: 10,
        orderBy: {
            created_at: "desc",
        },
    });
    return products;
}

export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>;

export default async function Products() {
    const initialProducts = await getInitialProducts();
    return (
        <div>
            <ProductList initialProducts={initialProducts}/>
            <Link href={"/products/upload"} className={"bg-orange-700 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"}>
                <PlusIcon className={"size-10"} />
            </Link>
        </div>
    );
}