const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const csvParser = require('csv-parser');


// KIck up Express & Set Network

const app = express();
const PORT = 8080;
const hauntedDataset = '/api/haunted_places.csv';

// Reads the body by parsing it

app.use(bodyParser.json());

let haunted_places = []; //sets empty array
let nextPlace = 1; //new ID on refresh


const getHauntedPlaces = () => {
    return new Promise((resolved,reject) => {
        const places = [];
        let maxId = 0;



        fs.createReadStream('/api/haunted_places.csv');
            .pipe(csvParser())
            .on('data', (row) => {
                 
            }
    })
}