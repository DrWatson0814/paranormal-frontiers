


async function wikiSearch(searchTerm) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=opensearch&srsearch=encodedURIComponent${searchTerm}&limit=5&format=json`;
  // var params = new URLSearchParams({
  //   action: "=query&",
  //   list: "search",
  //   srsearch: searchTerm, //! Need Variable to insert search query !//
  //   format: "json",
  //   origin: '*', //? May Change BeCAU of CORS ?//
  // });

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log("Search Results:", data);

    const  titles = data[1];
    const  description = data[2];
    const urls = data[3];

    return data;
  } catch (error) {
    console.error("Paranormal Interference - Search Failed", error);
  }
}




async function wikiText(searchResults) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action='query'&prop='extracts'&titles=${title}&format='json'&origin='*'`;
    // const params = new URLSearchParams({
    //     action: 'query',
    //     prop: 'extracts',
    //     titles: searchResults,
    //     exintro: true,
    //     explaintext: true,
    //     format: 'json',
    //     origin: '*',
    //     redirects: -1
    // });
    
    try {
        const response = await fetch(endpoint);
        const dataText = await response.json();
        const pageID = Object.keys(dataText.query.pages)[0];
        const extracted = dataText.query.pages[pageID].extract;
        console.log(extracted);
        return extracted;
    }
    catch(error) {
        console.error("Paranormal Interference - Text Extraction Failed", error);
    }
  };

  function displayWiki(titles, description, urls) {
    const searchResults = document.getElementsByClassName('searchResults');
    searchResults.innerHTML = '';
  
    const ul = document.createElement('ul');
    ul.className = 'resultList';

    for(let i = 0; i < titles.length; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = urls[1];
      a.target = '_blank'; 
      a.textContent = 'resultList';

      li.appendChild(a);
      li.appendChild(p);
      ul.appendChild(li);
    }
    searchResults.appendChild(ul);
  };

document.addEventListener('DomContentLoaded', () => {
    var  searchTermInput = document.getElementById('searchTerm');
    var searchBtn = document.getElementById('SearchBtn');

    searchBtn.addEventListener('click', () => {
      const searchTerm = searchTermInput.value.trim();
      if(searchTerm) {
        wikiSearch(searchTerm);
      } else {
        alert("Please enter relevent search term...");
      }
    });
    
    searchTerm.addEventListener('keypress', (event) => {
      if(event.key === 'Enter') {
        wikiSearch(searchTerm);      }
    });
});