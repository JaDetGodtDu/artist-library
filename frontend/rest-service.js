const endpoint = "http://localhost:3000";
const headers = { "Content-Type": "application/json" };

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

async function createArtist(event) {
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

async function updateArtist(artist) {
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

async function favoriteArtist(artist) {
  const updatedArtist = {
    name: artist.name,
    activeSince: artist.activeSince,
    genres: artist.genres,
    labels: artist.labels,
    shortDescription: artist.shortDescription,
    website: artist.website,
    image: artist.image,
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

async function deleteYesClicked(artist) {
  console.log(artist);
  const response = await fetch(`${endpoint}/artists/${artist.id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    console.log("Artist succesfully deleted");
    document.querySelector("#dialog-delete").close();
    location.reload();
  }
}
export {
  fetchArtists,
  createArtist,
  updateArtist,
  deleteYesClicked,
  favoriteArtist,
};
