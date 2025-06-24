'use strict'

import express, {json, urlencoded } from 'express';
const app = express();
const port = 8080;

app.use(express.static("/public/js/index.js"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.get("./public/js/index.js", (request, response) => {
    response.json();
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});