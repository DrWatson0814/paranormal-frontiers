async function wikiSearch(searchQuery) {
  const endpoint = "https://en.wikipedia.org/w/api.php";
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
