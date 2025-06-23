async function fetchHauntedPlace() {
    const response = await fetch("/haunted_places.csv");
    const string = await response.json();
    // const data = await string.json();
    Papa.parse(string, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function(results) {
            JSON.stringify(results.data, null, 2);
            console.log(results.data);
        }
    })
};   







fetchHauntedPlace();