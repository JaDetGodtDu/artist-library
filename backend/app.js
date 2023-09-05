import http from "node:http";
import fs from "fs/promises";

const port = 3000;

const app = express();
app, use(express.json);

// GET routing

// POST routing

// PUT routing

// Delete routing

// Listeners
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
