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
  document
  .querySelector("#btn-create-artist")
  .addEventListener("click", showCreateModal)
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
      <article>
        <img src="${artist.image}" />
        <h2>${artist.name}</h2>
        <p><b>Established:</b> ${artist.activeSince}</p>
        <p><b>Genre:</b>  ${artist.genres}</p>
        <p><b>Label:</b>  ${artist.labels}</p>
        <p><b>Description:</b>  ${artist.shortDescription}</p>
        <a href="${artist.website}">${artist.website}</a>
        <p>${artist.favorite}</p>
        <div class="btns">
        <button id="btn-update-artist">Update</button>
        <button id="btn-delete-artist">Delete</button>
        <button id="btn-favorite-artist">Favorite</button>
        </div>
      </article>
    `;
    document
      .querySelector("#artists-grid")
      .insertAdjacentHTML("beforeend", myHTML);
  }
  document.querySelector("#btn-update-artist").addEventListener("click", showUpdateModal)
  document.querySelector("#btn-delete-artist").addEventListener("click", showDeleteModal)
  document.querySelector("#btn-favorite-artist")
}

function createArtist() {}

function updateArtist() {}

function deleteArtist() {}

function showCreateModal(){
  console.log("showing create modal");
  document.querySelector("#dialog-create").showModal();
}
function showUpdateModal(){
  console.log("showing update modal");
  document.querySelector("#dialog-update").showModal()
}
function showDeleteModal(){
  console.log("showing delete modal");
  document.querySelector("#dialog-delete").showModal()
}