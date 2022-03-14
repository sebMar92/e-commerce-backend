import { listen } from "./src/app.js";
import { conn } from "./src/database.js";

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  listen(process.env.PORT || 3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
