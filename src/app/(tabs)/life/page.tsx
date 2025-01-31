import db from "@/lib/db";
import Link from "next/link";

async function getPost() {
    return db.post.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            views: true,
            created_at: true,
            _count: {
                select: {
                    likes: true,
                    comments: true
                }
            }
        },
    })
}

export const metadata = {
    title: "동네생활"
}

export default async function Life() {
    const posts = await getPost();
    console.log(posts)

    return <div>
        {posts.map(post => {
            return (
                <Link key={post.id} href={`/posts/${post.id}`}>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <p>{post.created_at.toLocaleDateString("ko")}</p>
                    <div>
                        <p>{post._count.likes}</p>
                        <p>{post._count.comments}</p>
                    </div>
                </Link>
            )
        })}
    </div>
}