import db from "@/lib/db";
import {notFound} from "next/navigation";
import {EyeIcon} from "@heroicons/react/24/solid";
import Image from "next/image";
import getSession from "@/lib/session";
import {unstable_cache as nextCache} from "next/cache";
import LikeButton from "@/components/like-button";

async function getPost(id: number) {
    try {
        return db.post.update({
            where: {
                id
            },
            data: {
                views: {
                    increment: 1
                }
            },
            include: {
                user: {
                    select: {
                        username: true,
                        avatar: true
                    }
                },
                _count: {
                    select: {
                        comments: true,
                        likes: true
                    }
                }
            },
        })
    } catch (err) {
        return null;
    }
}

const getCachedPost = nextCache(
    getPost,
    ["post-detail"],
    {
        tags: ["post-detail"],
        revalidate: 60
    }
);

async function getLikedStatus(id: number, userId: number) {
    const like = await db.like.findUnique({
        where: {
            id: {
                postId: id,
                userId: userId
            }
        }
    })

    const likeCount = await db.like.count({
        where: {
            postId: id
        }
    })

    return {
        likeCount,
        isLiked: Boolean(like),
    }
}

function getCachedLikStatus(postId: number, userId: number) {
    const _fn = nextCache(
        getLikedStatus,
        ["product-like-status"],
        {
            tags: [`like-status-${postId}`]
        }
    );

    return _fn(postId, userId);
}

export default async function PostDetail({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const _id = Number(id);

    if (isNaN(_id)) {
        return notFound();
    }

    const post = await getCachedPost(_id);
    if (!post) {
        return notFound();
    }

    const session = await getSession();
    const {likeCount, isLiked} = await getCachedLikStatus(_id, session.id!);

    return (
        <div className="p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
                <Image
                    width={28}
                    height={28}
                    className="size-7 rounded-full"
                    src={post.user.avatar!}
                    alt={post.user.username}
                />
                <div>
                    <span className="text-sm font-semibold">{post.user.username}</span>
                    <div className="text-xs">
                        {/*<span>{formatToTimeAgo(post.created_at.toString())}</span>*/}
                    </div>
                </div>
            </div>
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="mb-5">{post.description}</p>
            <div className="flex flex-col gap-5 items-start">
                <div className="flex items-center gap-2 text-neutral-400 text-sm">
                    <EyeIcon className="size-5"/>
                    <span>조회 {post.views}</span>
                </div>
                <LikeButton isLiked={isLiked} likeCount={likeCount} postId={_id} />
            </div>
        </div>
    );
}
