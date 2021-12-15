import express from 'express'
import { randomBytes } from 'crypto'

const app = express();
app.use(express.json());


const commentsByPostId = {} as Record<string, { id: string, content: string }[]>;

app.get('/posts/:id/comments', (req, res) => {
    res.json(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content });

    commentsByPostId[req.params.id] = comments;

    res.status(201).json(comments);
});

app.listen(4001, () => {
    console.log("Comments service is listening at http://localhost:4001");
});