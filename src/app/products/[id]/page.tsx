import db from "@/lib/db";
import {formatToWon} from "@/lib/utils";
import {UserIcon} from "@heroicons/react/24/solid";
import Image from "next/image";
import {notFound, redirect} from "next/navigation";
import {revalidateTag, unstable_cache as nextCache} from "next/cache";
import getSession from "@/lib/session";

async function getIsOwner(userId: number) {
    // cookie 값을 사용하고 있으므로 dynamic 으로 컴파일됨. 주석처리
    // const session = await getSession();
    // if (session.id) {
    //     return session.id === userId;
    // }
    return false;
}

async function getProduct(id: number) {
    console.log("product")
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

async function getProductTitle(id: number) {
    console.log("title");
    const product = await db.product.findUnique({
        where: {
            id,
        },
        select: {
            title: true
        }
    });
    return product;
}

const getCachedProduct = nextCache(
    getProduct,
    ["product-detail"],
    {
        tags: ["product-detail"]
    }
)

const getCahcedProductTitle = nextCache(
    getProductTitle,
    ["product-detail-title"],
    {
        tags: ["product-detail-title"]
    }
)

export async function generateMetadata({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const product = await getCahcedProductTitle(Number(id));

    return {
        title: "product!! " + product!.title
    }
}

export default async function ProductDetail({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;

    if (!id) return <div>parameter wait...</div>

    const _id = Number(id);
    if (isNaN(_id)) {
        return notFound();
    }

    const product = await getCachedProduct(_id);
    if (!product) {
        return notFound();
    }
    const isOwner = await getIsOwner(product.userId);
    const revalidate = async () => {
        "use server"
        revalidateTag("product-detail-title");
    }
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
                        <UserIcon/>
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
                    <form action={async () => {
                        "use server"
                        // revalidatePath("/products/[id]", "page");
                        revalidateTag("product-detail-title");
                    }}>
                        <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
                            revalidate
                        </button>
                    </form>
                ) : null}
                <form action={ async () => {
                    "use server";
                    const session = await getSession();

                    // create chat room
                    const room = await db.chatRoom.create({
                        data: {
                            users: {
                                connect: [
                                    {
                                        id: product.userId
                                    },
                                    {
                                        id: session.id
                                    }
                                ]
                            }
                        },
                        select: {
                            id: true
                        }
                    })

                    redirect(`/chats/${room.id}`)
                }}>
                    <button
                        className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
                    >
                        채팅하기
                    </button>
                </form>
            </div>
        </div>
    );
}

// true => 정적 페이지로 만들어지지않은 페이지가 호출 됬을 경우에 디비에서 값 가져온다음 그 값을 정적 페이지로 만들어줌.
// false => 그냥 not found 내버림 (정적으로 만든 페이지만 보여줌).
export const dynamicParams = true;

// 파라미터 값 미리 채워넣기
export async function generateStaticParams() {
    // 지나치게 많은 값을 정적 페이지로 생성하면 부하가 걸리니 선택해야함.
    const result = await db.product.findMany({
        select: {
            id: true
        }
    });

    return result.map(product => ({id: product.id + ""})) ?? [];
}