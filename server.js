'use strict'

import express, { json, urlencoded } from 'express';
import path, { resolve } from 'path';
import fs from 'fs';
import csvParser from 'csv-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import fetch from 'node-fetch';
dotenv.config();


const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.static("public"));
app.use(json());
app.use(urlencoded({extended: false}));


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
        


// * Haunted Places Fetch

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


//* YouTube API Fetch



app.get('/api/v1/fetchVideos', async (request, response) => {
    try {
        const searchTarget = 'paranormal | ghosts | haunted | demon | occult';
        const apiKey = process.env.YOUTUBE_API_KEY;
        const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchTarget)}&type=video&key=${apiKey}&maxResults=1`;
        
        const apiResponse = await fetch(endpoint);
        const data = await apiResponse.json();

        response.status(200).json({
            status: 200,
            videos: data.items,
        });
    }
    catch (error) {
        console.error("Could not fetch videos", error);
    }
});



//* Wikipedia API Fetch


async function wikiSearch(searchQuery) {
  var endpoint = "https://en.wikipedia.org/w/api.php";
  var params = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: searchQuery, //! Need Variable to insert search query !//
    format: "json",
    origin: location.origin, //? May Change BeCAU of CORS ?//
  });

  try {
    const response = await fetch(`${endpoint},?${params.toString()}`);
    const data = await response.json();
    console.log("Search Results:", data.query.search);
    return data.query.search;
  } catch (error) {
    console.error("Paranormal Interference - Search Failed", error);
  }
}


async function wikiText(wikiTitle) {
    const endpoint = "https://en.wikipedia.org/w/api.php";
    const params = new URLSearchParams({
        action: 'query',
        prop: 'extracts',
        titles: wikiTitle,
        exintro: true,
        explaintext: true,
        format: 'json',
        origin: '*',
        redirects: -1
    });

    try {
        const response = await fetch(`${endpoint}?${params.toString}`);
        const dataText = await response.json();
        const pageID = Object.keys(dataText.query.pages)[0];
        const extracted = dataText.query.pages[pageID].extracted;
        console.log(extracted);
        return extracted;
    }
    catch(error) {
        console.error("Paranormal Interference - Text Extraction Failed", error);
    }

}

wikiText();





        
        








