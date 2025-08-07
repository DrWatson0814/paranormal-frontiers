


async function wikiSearch(searchTerm) {
  try {
    const endpoint = 'http://localhost:8080/api/v1/wikiSearch?searchTerm=' + encodeURIComponent(searchTerm);

    const response = await fetch(endpoint);
    const data = await response.json();
    console.log("Search Results:", data);

    const searchResults = data.query.search;

    displayWiki(searchResults);
  
  } catch (error) {
    console.error("Paranormal Interference - Search Failed", error);
  }
}




async function wikiText(title) {
  try {
        const endpoint = '/api/v1/wikiText?title=' + encodeURIComponent(title);
    
        const response = await fetch(endpoint);
        const dataText = await response.json();
        console.log(dataText.extracted);
        return dataText.extracted;
    }
    catch(error) {
        console.error("Paranormal Interference - Text Extraction Failed", error);
    }
  };



// * Display Search Results as cards 

function displayWiki(searchResults) {
    const searchResultsList = document.getElementById('searchResults');
    searchResultsList.innerHTML = "";
  
    const ul = document.createElement('ul');
    ul.className = 'resultList';

    searchResults.forEach(result => {

      const li = document.createElement('li');
      li.className = 'wikiCard';
      const a = document.createElement('a');
      const p = document.createElement('p')
      a.href = `https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}`;
      a.target = '_blank'; 
      a.textContent = result.title;
      p.innerHTML = result.snippet;
      
      li.appendChild(a);
      li.appendChild(p);
      ul.appendChild(li);
    });
    searchResultsList.appendChild(ul);
  };



// * Event Listener

document.addEventListener('DOMContentLoaded', () => {
    const  searchTermInput = document.getElementById('searchTerm');
    const searchBtn = document.getElementById('searchBtn');

    searchBtn.addEventListener('click', () => {
      const searchTerm = searchTermInput.value.trim();
      if(searchTerm) {
        wikiSearch(searchTerm);
      } else {
        alert("Please enter relevent search term...");
      }
    });
    
    searchTermInput.addEventListener('keypress', (event) => {
      if(event.key === 'Enter') {
        const searchTerm = searchTermInput.value.trim();
        if(searchTerm) {
          wikiSearch(searchTerm);
      } else {
        alert("Please enter relevent search term...")
      }      
      }
    });
});