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

async function fetchArtists() {
  const res = await fetch(`${endpoint}/artists`);
  const data = await res.json();

  if (res.ok) {
    console.log("Data fetched!");
    return data;
  }
}

function displayArtists(list) {
  document.querySelector("#artists-grid").innerHTML = "";
  console.log("Showing artists");
  for (const artist of list) {
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
  }
}

function showCreateModal() {
  console.log("showing create modal");
  document.querySelector("#dialog-create").showModal();

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
  console.log(response);
  location.reload();
  return response;
}
