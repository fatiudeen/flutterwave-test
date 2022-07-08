import { createSecureServer } from 'http2';
import app from './api/app';
import { readFileSync } from 'fs';

const options = {
  key: readFileSync('localhost-privkey.pem'),
  cert: readFileSync('localhost-cert.pem'),
  allowHTTP1: true,
};
const server = createSecureServer(options, app.server());
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log('connected');
});
