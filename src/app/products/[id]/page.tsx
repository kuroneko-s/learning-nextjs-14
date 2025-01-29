import db from "@/lib/db";
import getSession from "@/lib/session";
import {formatToWon} from "@/lib/utils";
import {UserIcon} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import Loadable from "next/dist/shared/lib/loadable.shared-runtime";
import preloadAll = Loadable.preloadAll;

async function getIsOwner(userId: number) {
    const session = await getSession();
    if (session.id) {
        return session.id === userId;
    }
    return false;
}

async function getProduct(id: number) {
    const product = await db.product.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    username: true,
                    avatar: true,
                },
            },
        },
    });
    return product;
}

export async function generateMetadata({params} : {params : Promise<{ id: string }>}) {
    const {id} = await params;
    return {
        title: "product!! " + id
    }
}

export default async function ProductDetail({params} : {params : Promise<{ id: string }>}) {
    const {id} = await params;

    if (!id) return <div>parameter wait...</div>

    const _id = Number(id);
    if (isNaN(_id)) {
        return notFound();
    }
    const product = await getProduct(_id);
    if (!product) {
        return notFound();
    }
    const isOwner = await getIsOwner(product.userId);

    console.log("runnnnnnnnn");
    return (
        <div>
            <div className="relative aspect-square">
                <Image
                    className="object-cover"
                    fill
                    src={product.photo}
                    alt={product.title}
                />
            </div>
            <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
                <div className="size-10 overflow-hidden rounded-full">
                    {product.user.avatar !== null ? (
                        <Image
                            src={product.user.avatar}
                            width={40}
                            height={40}
                            alt={product.user.username}
                        />
                    ) : (
                        <UserIcon />
                    )}
                </div>
                <div>
                    <h3>{product.user.username}</h3>
                </div>
            </div>
            <div className="p-5">
                <h1 className="text-2xl font-semibold">{product.title}</h1>
                <p>{product.description}</p>
            </div>
            <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
        <span className="font-semibold text-xl">
          {formatToWon(product.price)}원
        </span>
                {isOwner ? (
                    <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
                        Delete product
                    </button>
                ) : null}
                <Link
                    className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
                    href={``}
                >
                    채팅하기
                </Link>
            </div>
        </div>
    );
}