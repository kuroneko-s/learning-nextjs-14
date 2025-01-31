import ProductList from "@/components/product-list";
import Link from "next/link";
import {PlusIcon} from "@heroicons/react/24/solid";
import {unstable_cache as nextCache} from "next/dist/server/web/spec-extension/unstable-cache";
import {getProductList, getProductsCnt} from "@/lib/product";
import {revalidatePath} from "next/cache";

export const metadata = {
    title: "Product"
}

const getCachedProducts = nextCache(
    async () => getProductList(0),
    ["products-list-init"],
    {
        revalidate: 60 // 캐시 유효 시간
    }
);

const getCachedProductCount = nextCache(
    async () => getProductsCnt(),
    ["products-list-count"],
    {
        revalidate: 60 // 캐시 유효 시간
    }
)

const fetchSample = async () => {
    return await fetch("http://www.api.com", {
        method: "POST",
        next: {
            revalidate: 60
        }
    }).then(res => res.json())
}

// route segment config
// dynamic 에다가 cache 쓰면 그친구는 캐싱 데이터 가져옴.
export const dynamic = 'force-dynamic';
// unstable_cache 에서 사용했던 옵션
// export const revalidate = 60;


export default async function Products() {
    const initProducts = await getCachedProducts();
    const productCount = await getProductsCnt();

    const revalidate = async () => {
        "use server"

        revalidatePath("/products");
    }

    return (
        <div>
            <ProductList initProducts={initProducts} productsCnt={productCount}/>
            <form action={revalidate}>
                <button>Revalidate</button>
            </form>
            <Link href={"/products/upload"} className={"bg-orange-700 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"}>
                <PlusIcon className={"size-10"} />
            </Link>
        </div>
    );
}