import axios from "axios";
import React, { useState } from "react";

interface Props {
    postId: string
}

export default function CommentCreate({ postId }: Props) {
    const [content, setContent] = useState("");
    
    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(postId);
        
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content,
        });

        setContent("");
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label >New Comment</label>
                    <input type="text" value={content} onChange={e => setContent(e.target.value)} className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
