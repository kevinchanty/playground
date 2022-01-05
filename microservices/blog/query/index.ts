import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

type Posts = Record<string, {
    id: string,
    title: string,
    comments: {
        id: string,
        content: string
    }[]
}>;

const posts: Posts = {};

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    switch (type) {
        case ("PostCreated"): {
            const { id, title } = data;
            posts[id] = { id, title, comments: [] };
            break;
        }

        case ("CommentCreated"): {
            const { id, content, postId } = data;

            const post = posts[postId];
            post.comments.push({ id, content });
            break;
        };
    };

    console.log(posts);
    res.send({});
});

app.listen(4002, () => {
    console.log("Query Services Listening to 4002.")
});