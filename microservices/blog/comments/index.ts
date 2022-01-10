import express from 'express'
import { randomBytes } from 'crypto'
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use(cors());

type Comments = Record<string, {
    id: string,
    content: string,
    status: "pending" | "accepted" | "rejected",
}[]
>

const commentsByPostId = {} as Comments;

app.get('/posts/:id/comments', (req, res) => {
    res.json(commentsByPostId[req.params.id] ?? []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] ?? [];

    comments.push({ id: commentId, content, status: "pending" });

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending',
        }
    })

    res.status(201).json(comments);
});

app.post('/events', async (req, res) => {
    console.log('Received Event', req.body.type);

    const {type, data} = req.body;

    switch(type) {
        case("CommentModerated"):
            const {postId, id, status} = data;
            const comments = commentsByPostId[postId];

            const comment = comments.find(comment => {
                return comment.id = id;
            });
            
            comment!.status = status;

            try {
                await axios.post('http://event-bus-srv:4005/events', {
                    type: 'CommentUpdated',
                    data:{
                        ...comment,
                        postId,
                    },
                })
            }catch(error) {
                console.log(error);
            }
    }

    res.send({});
})

app.listen(4001, () => {
    console.log("Comments service is listening at http://localhost:4001");
});