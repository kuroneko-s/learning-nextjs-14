'use client'

import {HandThumbUpIcon} from "@heroicons/react/24/solid";
import {HandThumbUpIcon as OutlineHandThumbUpIcon} from "@heroicons/react/24/outline";
import {useOptimistic} from "react";
import {dislikePost, likePost} from "@/app/posts/[id]/action";
import {nanoid} from "nanoid";

interface LikeButtonParams {
    isLiked: boolean;
    likeCount: number;
    postId: number;
}

interface OptimisticParams {
    isLiked: boolean;
    likeCount: number;
    requestId: string[];
}

export default function LikeButton({likeCount, isLiked, postId}: LikeButtonParams) {
    const [state, reducerFn] = useOptimistic<OptimisticParams, string>({
        isLiked,
        likeCount,
        requestId: []
    }, (state, action) => {
        // 이미 처리된 request라면 무시
        if (state.requestId.includes(action)) {
            return state;
        }

        return {
            isLiked: !state.isLiked,
            likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
            requestId: [...state.requestId, action]
        }
    })

    return <form action={async () => {
        const id = nanoid();
        reducerFn(id)

        if (isLiked) {
            await dislikePost(postId);
        } else {
            await likePost(postId);
        }
    }}>
        <button
            className={`flex items-center gap-2 text-neutral-400 text-sm border-none hover:bg-orange-400 hover:text-neutral-200 rounded-full p-2  transition-colors ${state.isLiked ? 'bg-orange-500 text-white' : 'border-orange-500'}`}
        >
            {state.isLiked ?
                <HandThumbUpIcon className="size-5"/> :
                <OutlineHandThumbUpIcon className="size-5"/>
            }
            {state.isLiked ?
                <span>({state.likeCount})</span> :
                <span>공감하기 ({state.likeCount})</span>
            }
        </button>
    </form>
}
