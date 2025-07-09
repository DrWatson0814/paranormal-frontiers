'use strict'

const express = require('express');
const bodyParser = ('body-parser');
const fs = ('fs');
const csvParser = ('csv-parser');


const app = express();
const port = 8080;
const hauntedList = url('/api/haunted_places.csv');

app.use(express.static("/api/haunted_places.csv");
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.get("./public/js/index.js", (request, response) => {
    response.json();
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});