import { createServer } from 'http2';
import app from './api/app';
// import { readFileSync } from 'fs'

// const options = {
//   key: readFileSync('<Certificate Key>'),
//   cert: readFileSync('<Certificate file>'),
//   allowHTTP1: true,
// };
const server = createServer(app.server());
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log('connected');
});
