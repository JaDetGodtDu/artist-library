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
}

// GET routing
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
  console.log(reqId);

  const artists = await readArtists();

  const result = await artists.find((artist) => artist.id === reqId);
  res.json(result);
}); // Gets/fetches single artist based on ID

// POST routing
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
  artists.push(newArtist);

  const artistsJSON = JSON.stringify(artists);
  await fs.writeFile("artists.json", artistsJSON);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(artistsJSON));
}); // Pushes a new artist to the artists.json file

// PUT routing
app.put("/", (req, res) => {
  res.send("PUT request recieved!");
});

// DELETE routing
app.delete("/", (req, res) => {
  res.send("DELETE request recieved!");
});

// Listeners
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
