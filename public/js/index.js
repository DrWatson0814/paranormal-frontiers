//  //* YouTube Fetch

async function youtubeFetch() {
  try {
    const response = await fetch("http://localhost:8080/api/v1/fetchVideos");
    const data = await response.json();
    const youtubeVideos = data.videos;

    const videoDiv = document.getElementById("youtube");

    youtubeVideos.forEach((video) => {
      const youtubeId = video.id.videoId;
      if (youtubeId) {
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${youtubeId}`;
        iframe.width = "300";
        iframe.height = "150";
        iframe.frameBorder = "0";
        iframe.allow =
          "autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreencreen = "true";

        videoDiv.appendChild(iframe);
      }
    });
  } catch (error) {
    console.error("Couldn't fetch videos", error);
  }
}

document.addEventListener("DOMContentLoaded", youtubeFetch);

var player;

function onYoutubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: "v6RWSfGiDuQ",
    playerVars: {
      playsinline: 1,
      autoplay: 0,
      controls: 1,
      showInfo: 0,
      rel: 0,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

let done = false;
function onPlayerStateChange() {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}

function stopVideo() {
  player.stopVideo();
}

//* New Place on Refresh //

("use strict");

async function fetchHauntedPlace() {
  const response = await fetch("http://localhost:8080/api/v1/getHauntedPlace");
  const data = await response.json();
  const currentPlace = data.data;

  console.log(currentPlace);

  const hauntedDiv = document.querySelector(".haunted");
  if (currentPlace) {
    hauntedDiv.innerHTML = `
        <h3>Location:${currentPlace.city}, ${currentPlace.state}</h3>
        <p>${currentPlace.description}</p>
        `;
  }
}

document.addEventListener("DOMContentLoaded", fetchHauntedPlace);


// // * Wiki Search Function






// document.addEventListener("DomContentLoaded", () => {
//   const searchTerm = document.getElementById("searchTerm");
//   const searchBtn = document.getElementById("SearchBtn");
//   const searchResults = document.getElementById("searchResults");
// });


// //     //* Wikipedia API Fetch

// async function wikiSearch(searchTerm) {
//     try {
//     const endpoint = "https://localhost:8080/api/v1/wikiSearch";
//     const response = await fetch(`${endpoint},?${params.toString()}`);
//     const data = await response.json();
//     console.log("Search Results:", data.query.search);
//     return data.query.search;
//   } catch (error) {
//     console.error("Paranormal Interference - Search Failed", error);
//   }
// }

// document.addEventListener(onclick, () => {
//   wikiSearch(searchTerm);
// });

// async function wikiText(searchResults) {
//   const endpoint = "https://en.wikipedia.org/w/api.php?";
//   const params = new URLSearchParams({
//     action: "query",
//     prop: "extracts",
//     titles: searchResults,
//     exintro: true,
//     explaintext: true,
//     format: "json",
//     origin: "*",
//     redirects: -1,
//   });

//   try {
//     const response = await fetch(`${endpoint}?${params.toString}`);
//     const dataText = await response.json();
//     const pageID = Object.keys(dataText.query.pages)[0];
//     const extracted = dataText.query.pages[pageID].extracted;
//     console.log(extracted);
//     return extracted;
//   } catch (error) {
//     console.error("Paranormal Interference - Text Extraction Failed", error);
//   }
// }
