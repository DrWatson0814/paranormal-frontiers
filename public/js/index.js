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
        iframe.allowFullscreen = "true";

        videoDiv.appendChild(iframe);
      }
    });
  } catch (error) {
    console.error("Couldn't fetch videos", error);
  }
}

document.addEventListener("DOMContentLoaded", youtubeFetch);


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
    <p>${currentPlace.description}</p>`;
  }
  if(currentPlace.city === undefined || currentPlace.state === undefined || currentPlace.description === undefined) {
    return fetchHauntedPlace();
  } 

  }
  

document.addEventListener("DOMContentLoaded", fetchHauntedPlace);