'use strict'

import express, { json, urlencoded } from 'express';
import path from 'path';
const bodyParser = ('body-parser');
const fs = ('fs');
const csvParser = ('csv-parser');


const app = express();
const port = 8080;
// const hauntedList = url('/api/haunted_places.csv');

app.use(express.static("/api/haunted_places.csv"));
app.use(json());
app.use(urlencoded({extended: false}));
app.get("./public/js/index.js", (request, response) => {
    response.json();
app.get('/api/haunted_places.csv', (request, response) => {
    const filePath = path.resolve(__dirname, 'haunted_places.csv');
    response.sendFile('/api/haunted_places.csv');
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
});