import axios from "axios";
import React, { useState } from "react";

interface Props {
    postId: string
}

export default function CommentCreate({ postId }: Props) {
    const [content, setContent] = useState("");
    
    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await axios.post(`http://localhost:4001/${postId}/comments`, {
            content,
        });

        setContent("");
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label >New Comment</label>
                    <input type="text" value={content} onChange={e => e.target.value} className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
