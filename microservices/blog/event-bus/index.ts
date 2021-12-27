import express, { Request } from 'express';
import * as core from 'express-serve-static-core';
import axios from 'axios';
import { CoreTransformationContext } from 'typescript';

const app = express();
app.use(express.json());

app.post('/events', (req: Request<core.ParamsDictionary, any, {}>, res) => {
    const event = req.body;

    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4002/events', event);

    res.send({ status: 'OK' });
});

app.listen(4005, () => {
    console.log('Listening on 4005')
});