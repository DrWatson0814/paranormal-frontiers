'use strict'

const express = require('express');
const app = express();
const port = 8080;

app.use(express.static("/api/haunted_places"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.get('/api/haunted_places.csv', (request, response) => {
//     response.json(locationData);
// });

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});