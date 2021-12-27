import axios from 'axios';
import { useEffect, useState } from 'react'

interface Props {
    postId: string
}

export default function CommentList({ postId }: Props) {
    const [comments, setComments] = useState<{ id: string, content: string }[]>([]);

    const fetchData = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);

        setComments(res.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return <>
        {comments.map(comment => (
            <li key={comment.id}>{comment.content}</li>
        ))}
    </>
}
