import {
  fetchArtists,
  createArtist,
  updateArtist,
  deleteYesClicked,
  favoriteArtist,
} from "./rest-service.js";
import { 
  filterByFavorite, 
  searchArtists, 
} from "./helpers.js";
window.addEventListener("load", initApp);

function initApp() {
  updateArtistsView();
  document
    .querySelector("#btn-create-artist")
    .addEventListener("click", showCreateModal);
  document
    .querySelector("#filter-by")
    .addEventListener("change", filterByFavorite);
  document
    .querySelector("#input-search")
    .addEventListener("input", searchArtists);
}

async function updateArtistsView() {
  const artists = await fetchArtists();
  displayArtists(artists);
}
function displayArtists(listOfArtists) {
  console.log("Showing artists");
  document.querySelector("#artists-grid").innerHTML = "";
  for (const artist of listOfArtists) {
    buildArtistHTML(artist);
  }
}
function buildArtistHTML(artist) {
  let myHTML = /* HTML */ `
    <article>
      <img src="${artist.image}" />
      <h2>${artist.name}</h2>
      <p><b>Established:</b> ${artist.activeSince}</p>
      <p><b>Genre:</b> ${artist.genres}</p>
      <p><b>Label:</b> ${artist.labels}</p>
      <p><b>Description:</b> ${artist.shortDescription}</p>
      <a href="${artist.website}">${artist.website}</a>
      <p>${checkFavorite(artist)}</p>
      <div class="btns">
        <button class="update">Update</button>
        <button class="delete">Delete</button>
        <button class="favorite">Favorite</button>
      </div>
    </article>
  `;
  document
    .querySelector("#artists-grid")
    .insertAdjacentHTML("beforeend", myHTML);

  document
    .querySelector("#artists-grid article:last-child .update")
    .addEventListener("click", () => showUpdateModal(artist));
  document
    .querySelector("#artists-grid article:last-child .delete")
    .addEventListener("click", () => showDeleteModal(artist));
  document
    .querySelector("#artists-grid article:last-child .favorite")
    .addEventListener("click", () => favorite(artist));
}
function checkFavorite(artist) {
  let HTML = ``;
  if (artist.favorite === true) {
    HTML = /* html */ `
    <b>Favorite</b>`;
  } else {
    HTML = /* html */ ``;
  }
  return HTML;
}
function showCreateModal() {
  document.querySelector("#dialog-create").showModal();
  console.log("showing create modal");

  document
    .querySelector("#form-create")
    .addEventListener("submit", createArtist);
}

function showUpdateModal(artist) {
  const updateForm = document.querySelector("#form-update");
  updateForm.name.value = artist.name;
  updateForm.activeSince.value = artist.activeSince;
  updateForm.genres.value = artist.genres;
  updateForm.labels.value = artist.labels;
  updateForm.website.value = artist.website;
  updateForm.image.value = artist.image;
  updateForm.shortDescription.value = artist.shortDescription;
  console.log(artist.id);
  console.log(artist.favorite);
  document.querySelector("#dialog-update").showModal();
  console.log("Show update modal!");

  document
    .querySelector("#form-update")
    .addEventListener("submit", () => updateArtist(artist));
}

function showDeleteModal(artist) {
  document.querySelector("#dialog-delete").innerHTML = "";
  document.querySelector("#dialog-delete").showModal();
  console.log("Showing delete modal");
  console.log(artist);

  let myHTML = /* html */ `
    <article>
      <h2>Are you sure you want to delete ${artist.name} from the database?</h2>
      <button id="btn-delete-yes"class="btn">Yes</button>
      <br><br>
      <button id="btn-delete-no"class="btn">No</button>
    </article>
  `;

  document
    .querySelector("#dialog-delete")
    .insertAdjacentHTML("beforeend", myHTML);
  document
    .querySelector("#btn-delete-yes")
    .addEventListener("click", () => deleteYesClicked(artist));
  document
    .querySelector("#btn-delete-no")
    .addEventListener("click", deleteNoClicked);
}

function deleteNoClicked() {
  document.querySelector("#dialog-delete").close();
}

async function favorite(artist) {
  if (artist.favorite === false) {
    const updatedArtist = {
      name: artist.name,
      activeSince: artist.activeSince,
      genres: artist.genres,
      labels: artist.labels,
      shortDescription: artist.shortDescription,
      website: artist.website,
      image: artist.image,
      favorite: true,
      id: artist.id,
    };
    favoriteArtist(updatedArtist);
  } else {
    const updatedArtist = {
      name: artist.name,
      activeSince: artist.activeSince,
      genres: artist.genres,
      labels: artist.labels,
      shortDescription: artist.shortDescription,
      website: artist.website,
      image: artist.image,
      favorite: false,
      id: artist.id,
    };

    favoriteArtist(updatedArtist);
  }
}

export { displayArtists };
