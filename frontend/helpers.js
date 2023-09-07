import { fetchArtists } from "./rest-service.js";
import { displayArtists } from "./frontend.js";

async function filterByFavorite() {
  const filterValue = document.querySelector("#filter-by").value;
  console.log(filterValue);

  const artists = await fetchArtists();
  console.log(artists);

  let filteredArtists = [];
  if (filterValue === "favorites") {
    filteredArtists = artists.filter((artist)=>artist.favorite===true);
  } else {
    filteredArtists = artists;
  }
  displayArtists(filteredArtists);
}
async function searchArtists(){
  const searchInput = document.querySelector("#input-search").value.toLowerCase();
  console.log(searchInput);

  const artists = await fetchArtists();
  console.log(artists);

  let searchResults = [];

  if (searchInput.trim() === "") {
    // If the search input is empty or contains only whitespace, show all artists
    searchResults = artists;
  } else {
    // Use filter to find artists whose name or other relevant property matches the search input
    searchResults = artists.filter((artist) => {
      // You can customize this condition to search in specific properties (e.g., artist.name)
      // Here, it searches for the query in artist names (case-insensitive)
      return artist.name.toLowerCase().includes(searchInput);
    });
  }

  displayArtists(searchResults);
}
export { filterByFavorite, searchArtists };
