"use client";

import {InitialProducts} from "@/app/(tabs)/products/page";
import ListProduct from "./list-product";
import {useEffect, useRef, useState} from "react";
import {getMoreProducts} from "@/app/(tabs)/products/action";

interface ProductListProps {
    initialProducts: InitialProducts;
}

export default function ProductList({ initialProducts }: ProductListProps) {
    const [products, setProducts] = useState(initialProducts);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [isLast, setIsLast] = useState(false);
    const trigger = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            async (entries, observer1) => {
                const element = entries[0];

                if (element.isIntersecting && trigger.current) {
                    observer.unobserve(trigger.current);
                    setIsLoading(true);
                    const newProducts = await getMoreProducts(page);
                    if (newProducts.length === 0) {
                        setIsLast(true);
                    } else {
                        setPage(prev => prev + 1);
                        setProducts((prev) => [...prev, ...newProducts]);
                    }
                    setIsLoading(false);
                }
            }, {
                threshold: 1.0
            }
        );

        if (trigger.current) {
            observer.observe(trigger.current);
        }

        return () => {
            observer.disconnect();
        }
    }, [page]);

    return (
        <div className="p-5 flex flex-col gap-5">
            {products.map((product) => (
                <ListProduct key={product.id} {...product} />
            ))}
            {!isLast ? <button
                ref={trigger}
                disabled={isLoading}
                style={{
                    marginTop: `${page + 1 * 900}vh`
                }}
                className="mb-80 text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
            >
                {isLoading ? "로딩 중" : "Load more"}
            </button> : null}
        </div>
    );
}