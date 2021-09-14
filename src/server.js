import express from 'express';
import bodyParser from 'body-parser';
import api from './api';


export async function createExpressApp() {
  const app = express();

  app.use(bodyParser.json({ limit: '1000mb' }));
  app.use(
    bodyParser.urlencoded({
      limit: '1000mb',
      extended: true,
      parameterLimit: 1000000,
    })
  );

  // Register api routes
  app.use('/api/v1', api.v1);

  app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

  return app;
};
