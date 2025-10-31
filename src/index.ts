/* eslint-disable no-console */
import { app } from './app';

app.listen(4000, ({ hostname, port }) => {
  console.log(`API Bun rodando em http://${hostname}:${port}`);
});
