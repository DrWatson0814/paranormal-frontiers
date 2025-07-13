'use strict'

import express, { json, urlencoded } from 'express';
import path, { resolve } from 'path';
import fs from 'fs';
import csvParser from 'csv-parser';


const app = express();
const PORT = 8080;

app.use(express.static("public"));
app.use(json());
app.use(urlencoded({extended: false}));
// app.get("./public/js/index.js", (request, response) => {
//     response.json();


async function getHauntedPlace() {
    const endpoint = './public/haunted_places.csv';
    const hauntedPlaces = [];

    return new Promise ((resolve, reject) => {
        fs.createReadStream(endpoint)
        .pipe(csvParser())
        .on('data',(data) => hauntedPlaces.push(data))
        .on('end', () => {
                 const randomPlace = Math.floor(Math.random() * hauntedPlaces.length);
                 resolve(hauntedPlaces[randomPlace]);
        });
    });
};
        

app.get('/api/v1/getHauntedPlace', async (request, response) => {
    try {
        const hauntedPlace = await getHauntedPlace();
        response.status(200).json({
            status: 200,
            data: hauntedPlace,
    });
    } catch (error) {
        console.error("Something went wrong!", error);
        response.status(500).json({
            status: 500,
            message: "Server Slipped"
        });
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});