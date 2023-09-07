const endpoint = "http://localhost:3000";
const headers = { "Content-Type": "application/json" };

window.addEventListener("load", initApp);

function initApp() {
  updateArtistsView();
  document
    .querySelector("#btn-create-artist")
    .addEventListener("click", showCreateModal);
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
async function fetchArtists() {
  const res = await fetch(`${endpoint}/artists`);
  const data = await res.json();

  if (res.ok) {
    console.log("Data fetched!");
    return data;
  } else {
    throw new error("Error fetching data.");
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
      <p>${artist.favorite}</p>
      <div class="btns">
        <button class="update">Update</button>
        <button class="delete">Delete</button>
        <button id="btn-favorite-artist">Favorite</button>
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
}

function showCreateModal() {
  document.querySelector("#dialog-create").showModal();
  console.log("showing create modal");

  document
    .querySelector("#form-create")
    .addEventListener("submit", createArtistClicked);
}
async function createArtistClicked(event) {
  const form = event.target;
  const name = form.name.value;
  const activeSince = form.activeSince.value;
  const genres = form.genres.value;
  const labels = form.labels.value;
  const shortDescription = form.shortDescription.value;
  const website = form.website.value;
  const image = form.image.value;
  const favorite = false;

  const newArtist = {
    name,
    activeSince,
    genres,
    labels,
    shortDescription,
    website,
    image,
    favorite,
  };
  const response = await fetch(`${endpoint}/artists`, {
    method: "POST",
    body: JSON.stringify(newArtist),
    headers: headers,
  });
  if (response.status === 200) {
    const responseData = await response.json();
    const message = responseData.message;
    console.log(message);
  } else {
    console.log(response.status);
  }
  location.reload();
  return response;
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
    .addEventListener("submit", () => updateArtistClicked(artist));
}
async function updateArtistClicked(artist) {
  console.log(artist.id);
  console.log(artist);

  const name = document.querySelector("#name").value;
  const activeSince = document.querySelector("#activeSince").value;
  const genres = document.querySelector("#genres").value;
  const labels = document.querySelector("#labels").value;
  const website = document.querySelector("#website").value;
  const image = document.querySelector("#image").value;
  const shortDescription = document.querySelector("#shortDescription").value;

  const updatedArtist = {
    name,
    activeSince,
    genres,
    labels,
    shortDescription,
    website,
    image,
    favorite: artist.favorite,
    id: artist.id,
  };
  console.log(updatedArtist);

  const response = await fetch(`${endpoint}/artists/${artist.id}`, {
    method: "PUT",
    body: JSON.stringify(updatedArtist),
    headers: headers,
  });
  console.log(response);
  location.reload();
  return response;
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
async function deleteYesClicked(artist){
  console.log(artist);
  const response = await fetch(`${endpoint}/artists/${artist.id}`, {
    method: "DELETE"
  });
  if (response.ok){
    console.log("Artist succesfully deleted");
    document.querySelector("#dialog-delete").close()
    location.reload()
  }
}
function deleteNoClicked(){
  document.querySelector("#dialog-delete").close()
}
