import { Server } from 'http';
import app from './api/app';

const server = new Server(app.server());
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log('connected');
});
