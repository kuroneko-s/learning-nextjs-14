import ProductList from "@/components/product-list";
import Link from "next/link";
import {PlusIcon} from "@heroicons/react/24/solid";

export const metadata = {
    title: "Product"
}

export default async function Products() {
    return (
        <div>
            <ProductList />
            <Link href={"/products/upload"} className={"bg-orange-700 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"}>
                <PlusIcon className={"size-10"} />
            </Link>
        </div>
    );
}