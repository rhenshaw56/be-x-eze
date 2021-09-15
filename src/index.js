import db from './db';
import { createExpressApp } from './server';

const PORT = process.env.PORT || 3006;

db.connect()
.catch(err => {
  console.error('PP', err);
  process.exit(1);
})
.then(async client => {
  createExpressApp()
  .then((app) => app.listen(PORT))
  .then(() => console.log(`Server up @ ${PORT}`))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
});
