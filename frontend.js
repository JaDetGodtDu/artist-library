const endpoint = "http://localhost:3000";

window.addEventListener("load", initApp);

function initApp() {}

async function fetchArtists() {
  const res = await fetch(`${endpoint}/artists`);
  const data = await res.json();

  return data;
}

function displayArtists() {}

function createArtist() {}

function updateArtist() {}

function deleteArtist() {}
