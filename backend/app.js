import express from "express";
import fs from "fs/promises";

const port = 3000;

const app = express();
app.use(express.json());

async function readArtists() {
  const artistsBuff = await fs.readFile("artists.json");
  const artistsJson = artistsBuff.toString();
  const artists = JSON.parse(artistsJson);

  return artists;
} // Helper function that reads the JSON file and returns it as formatted JSON for later use

// GET routing ---------------------------------------------------------
app.get("/", (req, res) => {
  res.send("GET request recieved!");
});

app.get("/artists", async (req, res) => {
  const json = await readArtists();
  console.log(json);
  res.send(json);
}); // Gets/fetches the complete list of artists

app.get("/artists/:id", async (req, res) => {
  const reqId = Number(req.params.id);
  const artists = await readArtists();

  const result = await artists.find((artist) => artist.id === reqId);
  res.json(result);
}); // Gets/fetches single artist based on ID

// POST routing --------------------------------------------------------
app.post("/", (req, res) => {
  res.send("POST request recieved!");
});

app.post("/artists", async (req, res) => {
  const newArtist = {
    id: new Date().getTime(),
    name: req.body.name,
    birthdate: req.body.birthdate,
    activeSince: req.body.activeSince,
    genres: req.body.genres,
    labels: req.body.labels,
    website: req.body.website,
    image: req.body.image,
    shortDescription: req.body.shortDescription,
    favorite: req.body.favorite,
  };
  const artists = await readArtists();
  artists.push(newArtist); // Pushes the new artist to the "artists" array

  const artistsJSON = JSON.stringify(artists);
  await fs.writeFile("artists.json", artistsJSON); // Replaces the old JSON file with the new and updated JSON array

  res.setHeader("Content-Type", "application/json");
  res.json({ message: "Artist created succesfully", data: artistsJSON });
});

// PUT routing ---------------------------------------------------------
app.put("/", (req, res) => {
  res.send("PUT request recieved!");
});

app.put("/artists/:id", async (req, res) => {
  const reqId = Number(req.params.id);

  const updatedArtist = {
    id: Number(req.params.id),
    name: req.body.name,
    birthdate: req.body.birthdate,
    activeSince: req.body.activeSince,
    genres: req.body.genres,
    labels: req.body.labels,
    website: req.body.website,
    image: req.body.image,
    shortDescription: req.body.shortDescription,
    favorite: req.body.favorite,
  };
  const artists = await readArtists();

  const artistToUpdateIndex = artists.findIndex(
    (artist) => artist.id === reqId
  ); // Finds the index of the id-corresponding object in the "artists" array

  if (artistToUpdateIndex !== -1) {
    artists[artistToUpdateIndex] = updatedArtist; // Replaces the old object in the array with the new and updated object

    await fs.writeFile("artists.json", JSON.stringify(artists, null, 2)); // Writes the new array (with the updated object) to the JSON file

    res.status(200).json({ message: "Artist updated successfully" });
  } else {
    res.status(404).json({ message: "Artist not found" });
  }
});

// DELETE routing ------------------------------------------------------
app.delete("/", (req, res) => {
  res.send("DELETE request recieved!");
});

app.delete("/artists/:id", async (req, res) => {
  const reqId = Number(req.params.id);

  const artists = await readArtists();

  const artistToDeleteIndex = artists.findIndex(
    (artist) => artist.id === reqId
  ); // Finds the index of the id-corresponding object in the "artists" array

  if (artistToDeleteIndex !== -1) {
    artists.splice(artistToDeleteIndex, 1); // Finds the object with the previously found index and deletes it from the array

    await fs.writeFile("artists.json", JSON.stringify(artists, null, 2)); // Overwrites the old "artists" array with the new and updated array

    res.status(200).json({ message: "Artist deleted successfully" });
  } else {
    res.status(404).json({ message: "Artist not found" });
  }
});

// Listeners -----------------------------------------------------------
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
