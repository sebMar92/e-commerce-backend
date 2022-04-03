const app = require('./src/app.js');
const { conn } = require('./src/database.js');
const loadMockData = require('./src/dataBase/loadMockData.js');

// Syncing all the models at once.
conn
  .sync({ force: true })
  .then(() => {
    loadMockData();
  })
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
  });
