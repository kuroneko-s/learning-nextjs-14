"use server"

import getSession from "@/lib/session";
import db from "@/lib/db";
import {revalidateTag} from "next/cache";

export const likePost = async (postId: number) => {
    await new Promise(r => setTimeout(r, 1000 * 5))
    const session = await getSession();

    try {
        await db.like.create({
            data: {
                postId: postId,
                userId: session.id!
            }
        })

        revalidateTag(`like-status-${postId}`);
    } catch (err) {

    }
}

export const dislikePost = async (postId: number) => {
    await new Promise(r => setTimeout(r, 1000 * 5))
    const session = await getSession();

    try {
        await db.like.delete({
            where: {
                id: {
                    postId: postId,
                    userId: session.id!
                }
            }
        })

        revalidateTag(`like-status-${postId}`);
    } catch (e) {

    }
}