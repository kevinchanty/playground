import { useState } from 'react'

interface Props {
    comments: {id:string,content:string}[]
}

export default function CommentList({ comments }: Props) {
    return <>
        {comments.map(comment => (
            <li key={comment.id}>{comment.content}</li>
        ))}
    </>
}
