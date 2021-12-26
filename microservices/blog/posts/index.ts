import express from 'express';
import cors from 'cors';
import { randomBytes } from 'crypto';

const app = express();
app.use(express.json());
app.use(cors());

type Post = {
    id:string
    title:string
}

const posts:Record<string, Post> = {}

app.get('/posts', (req, res) => {
    res.json(posts); 
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body

    posts[id] = {
        id,
        title,
    };

    res.status(201).json(posts[id]);
});

app.listen(4000, () => {
    console.log("Posts service is listening on localhost:4000")
})