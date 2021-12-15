import axios from "axios"
import { useState } from "react";


export default function PostCreate() {
    const [title, setTitle] = useState('');

    return <div>
        <form action="" onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="">Title</label>
                <input value={title} onChange={e=> setTitle(e.target.value)} type="text" className="form-control mb-3"/>
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
}