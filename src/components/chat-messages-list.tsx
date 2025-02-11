'use client';

import {InitialChatMessages} from "@/app/chats/[id]/page";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {formatToTimeAgo} from "@/lib/utils";
import {ArrowUpCircleIcon} from "@heroicons/react/24/solid";
import {createClient} from "@supabase/supabase-js";
import {RealtimeChannel} from "@supabase/realtime-js";

const SUPABASE_PUBLIC_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvbHhhaWxkcXVrY2xheXZnZHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMTA1OTMsImV4cCI6MjA1Mzg4NjU5M30.zX_BGVHnaMlpnQbRGr6SlBADzYCVqQmce840UllJIqA";
const SUPABASE_URL = "https://eolxaildqukclayvgdsq.supabase.co";

interface ChatMessageListParams {
    initialMessages: InitialChatMessages;
    userId: number;
    roomId: string;
}

export default function ChatMessagesList({initialMessages, userId, roomId}: ChatMessageListParams) {
    const [messages, setMessages] = useState(initialMessages);
    const [message, setMessage] = useState("");
    const channel = useRef<RealtimeChannel>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {
                value
            }
        } = e;
        setMessage(value);
    }

    const mine = initialMessages.find(_messages => _messages.userId === userId);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessages(prev => [...prev, {
            id: Date.now(),
            payload: message,
            created_at: new Date(),
            userId,
            user: {
                username: mine?.user.username ?? "nya",
                avatar: mine?.user.avatar ?? "/sample1.jpeg"
            }
        }])
        channel.current?.send({
            type: "broadcast",
            event: "init",
            payload: {
                id: Date.now(),
                payload: message,
                created_at: new Date(),
                userId,
                user: {
                    username: mine?.user.username ?? "nya",
                    avatar: mine?.user.avatar ?? "/sample1.jpeg"
                }
            },
        });
        setMessage("");
    }

    useEffect(() => {
        const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_API_KEY);

        const _channel = supabase.channel(`room-${roomId}`);
        _channel.on("broadcast",
            {event: "init"},
            (payload) => {
            console.log("Cursor position received!", payload);
        }).subscribe((status) => {
            if (status === "SUBSCRIBED") {
                // _channel.send({
                //     type: "broadcast",
                //     event: "cursor-pos",
                //     payload: {x: Math.random(), y: Math.random()},
                // });
            }
        });

        channel.current = _channel;

        return () => {
            channel.current && channel.current.unsubscribe();
        }
    }, [roomId]);

    return (
        <div className="p-5 flex flex-col gap-5 min-h-screen justify-end">
            {messages.map((message) => (
                message.userId === userId ?
                    <div key={message.id} className={"flex gap-2 items-start justify-end"}>
                        <div className={"flex flex-col items-start gap-1"}>
                            <div className={"bg-orange-500 rounded-md px-4 py-2"}>
                                {message.payload}
                            </div>
                            <div className={"self-end text-xs text-neutral-300"}>
                                {formatToTimeAgo(message.created_at.toString())}
                            </div>
                        </div>
                        <div className={"size-14 rounded-full overflow-hidden relative"}>
                            <Image src={message.user.avatar ?? "/sample1.jpeg"} alt={"avatar"} fill={true}/>
                        </div>
                    </div>
                    : <div key={message.id} className={"flex gap-2 items-start"}>
                        <div className={"size-14 rounded-full overflow-hidden relative"}>
                            <Image src={message.user.avatar ?? "/sample1.jpeg"} alt={"avatar"} fill={true}/>
                        </div>
                        <div className={"flex flex-col items-start gap-1"}>
                            <div className={"bg-orange-500 rounded-md px-4 py-2"}>
                                {message.payload}
                            </div>
                            <div className={"self-start text-xs text-neutral-300"}>
                                {formatToTimeAgo(message.created_at.toString())}
                            </div>
                        </div>
                    </div>
            ))}

            <form className="flex relative" onSubmit={onSubmit}>
                <input
                    required
                    onChange={onChange}
                    value={message}
                    className="bg-transparent rounded-full w-full h-10 focus:outline-none px-5 ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-50 border-none placeholder:text-neutral-400"
                    type="text"
                    name="message"
                    placeholder="Write a message..."
                />
                <button className="absolute right-0">
                    <ArrowUpCircleIcon className="size-10 text-orange-500 transition-colors hover:text-orange-300"/>
                </button>
            </form>
        </div>
    );
}
