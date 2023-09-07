import { fetchArtists } from "./rest-service.js";
import { displayArtists } from "./frontend.js";

// Filter by favorite function --------------------------------------------
async function filterByFavorite() {
  const filterValue = document.querySelector("#filter-by").value;
  const artists = await fetchArtists();

  let filteredArtists = [];
  if (filterValue === "favorites") {
    filteredArtists = artists.filter((artist) => artist.favorite === true);
  } else {
    filteredArtists = artists;
  }
  displayArtists(filteredArtists);
}

// Search function --------------------------------------------------------
async function searchArtists() {
  const input = document.querySelector("#input-search").value.toLowerCase();
  const artists = await fetchArtists();

  let results = [];
  if (input.trim() === "") {
    results = artists;
  } else {
    results = artists.filter((artist) => {
      return artist.name.toLowerCase().includes(input);
    });
  }

  displayArtists(results);
}
export { filterByFavorite, searchArtists };
