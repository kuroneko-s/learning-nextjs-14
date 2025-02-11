import db from "@/lib/db";
import { notFound } from "next/navigation";
import getSession from "@/lib/session";
import Forbidden from "next/dist/client/components/forbidden-error";
import { Prisma } from "@prisma/client";
import ChatMessagesList from "@/components/chat-messages-list";

async function getRoom(id: string) {
  const room = await db.chatRoom.findUnique({
    where: {
      id,
    },
    include: {
      users: {
        select: {
          id: true,
        },
      },
    },
  });

  console.log(room);

  return room;
}

async function getMessages(chatRoomId: string) {
  const mesaages = await db.message.findMany({
    where: {
      chatRoomId,
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      userId: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });

  return mesaages;
}

export type InitialChatMessages = Prisma.PromiseReturnType<typeof getMessages>;

export default async function ChatRoom({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const room = await getRoom(id);

  if (!room) {
    return notFound();
  }

  const session = await getSession();
  if (!session?.id) {
    return Forbidden;
  }

  const authenticatedRoom = room.users.find(({ id }) => id === session.id);
  if (!authenticatedRoom) {
    return Forbidden;
  }

  const initialMessages = await getMessages(room.id);

  return (
    <ChatMessagesList
      initialMessages={initialMessages}
      userId={session.id}
      roomId={room.id}
    />
  );
}
