const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag =document.getElementsByTagName('script');
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


let player;

function onYoutubeIframeAPIReady() {
    player = new onYoutubeIframeAPIReady.Player('player', {
        height: '390',
        width: '640',
        videoId: 'M71c1UVf-VE',
        playerVars: {
            'playsinline': 1
        },
        events: {
            'onReady': onplayerReady,
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
