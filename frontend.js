const endpoint = "http://localhost:3000";

window.addEventListener("load", initApp);

function initApp() {
  updateArtistsView();
  document
    .querySelector("#form-create")
    .addEventListener("submit", createArtist);
  document
    .querySelector("#form-update")
    .addEventListener("submit", updateArtist);
}

async function updateArtistsView() {
  const artists = await fetchArtists();
  displayArtists(artists);
}

async function fetchArtists() {
  const res = await fetch(`${endpoint}/artists`);
  const data = await res.json();

  return data;
}

function displayArtists(list) {
  document.querySelector("#artists-grid").innerHTML = "";

  for (const artist of list) {
    let myHTML = /* HTML */ `
      <img src="${artist.image}" />
      <h2>${artist.name}</h2>
      <p>${artist.activeSince}</p>
      <p>${artist.genres}</p>
      <p>${artist.labels}</p>
      <p>${artist.shortDescription}</p>
      <p>${artist.website}</p>
      <p>${artist.favorite}</p>
      <div class="btns">
        <button class="btn-favorite-artist">Favorite</button>
        <button class="btn-update-artist">Update</button>
        <button class="btn-delete-artist">Delete</button>
      </div>
    `;
    document
      .querySelector("#artists-grid")
      .insertAdjacentHTML("beforeend", myHTML);
  }
}

function createArtist() {}

function updateArtist() {}

function deleteArtist() {}
