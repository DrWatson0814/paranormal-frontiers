


async function wikiSearch(searchTerm) {
  try {
    const endpoint = '/api/v1/wikiSearch?searchTerm=' + encodeURIComponent(searchTerm);

    const response = await fetch(endpoint);
    const data = await response.json();
    console.log("Search Results:", data);

    const  titles = data[1];
    const  descriptions = data[2];
    const urls = data[3];

    displayWiki(titles, descriptions, urls);
  
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

function displayWiki(titles, descriptions, urls) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';
  
    const ul = document.createElement('ul');
    ul.className = 'resultList';

    for(let i = 0; i < titles.length; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      const p = document.createElement('p');
      a.href = urls[i];
      a.target = '_blank'; 
      a.textContent = titles[i];
      p.textContent = descriptions[i];

      li.appendChild(a);
      li.appendChild(p);
      ul.appendChild(li);
    }
    searchResults.appendChild(ul);
  };

document.addEventListener('DOMContentLoaded', () => {
    var  searchTermInput = document.getElementById('searchTerm');
    var searchBtn = document.getElementById('searchBtn');

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
        }

        }
    });
});