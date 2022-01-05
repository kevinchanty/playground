import { useState } from 'react'

interface Props {
    comments: { id: string, content: string, status: "pending" | "approved" | "rejected" }[]
}

export default function CommentList({ comments }: Props) {

    const renderedComments = comments.map(comment => {
        let content: string;
        switch (comment.status) {
            case ("pending"):
                content = "The comment is awaiting moderation."
                break;
            case ("approved"):
                content = comment.content;
                break;
            case ("rejected"):
                content = "The comment has been rejected";
                break;
        }

        return (
            <li key={comment.id}>
                {content}
            </li>
        )
    })

    return <ul>
        {renderedComments}
    </ul>
}
