import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';

import * as Config from './Config';

const socket = io(Config.get('server_root') as string);
const app = feathers();

// Set up Socket.io client with the socket
// And a timeout of 2 seconds
app.configure(socketio(socket, {
  // timeout: 2000
}));

const options = {
  storageKey: 'universe-jwt', 
  storage: window.localStorage
} as any;
app.configure(auth(options))

export default app;