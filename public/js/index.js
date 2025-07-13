

 //* YouTube Fetch


    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script') [0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

async function youTubeFetch() {
    const response = await fetch('https://www.youtube.com/iframe_api');
    const data = await response.json();
    console.log(data);

}

youTubeFetch();npm

var player;


function onYoutubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'v6RWSfGiDuQ',
        playerVars: {
            'playsinline': 1,
            'autoplay': 0,
            'controls': 1,
            'showInfo': 0,
            'rel': 0,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}


function onPlayerReady(event) {
    event.target.playVideo();
}


let done = false;
function onPlayerStateChange() {
    if(event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;    
    }
}

function stopVideo() {
    player.stopVideo();
}



//* New Video on Refresh //

"use strict"

const csvURL = 'http://localhost:8080/public/haunted.places.csv';

Papa.Parser(csvURL, {
    download:true,
    header:true,
    dynamicTyping: true,
    complete: function(results) {
        const hauntedPLaces = results.data;
        const hauntedList = document.getElementsByClassName('haunted'); 
        console.log(hauntedList);
        
    }
});


const elements = document.getElementsByClassName('haunted'),

async function getHauntedPlace() {
    const endpoint = '/public/haunted_places.csv';
    const hauntedPlaces = [];

    const response = await fetch(endpoint);
    const hauntedPlace = response.json();
    const currentPlace = hauntedPlace.textCOntent(currentPlace);
    const randomPlace = Math.floor(Math.random() * hauntedPlaces.length);
    return randomPlace;
}
    
    
