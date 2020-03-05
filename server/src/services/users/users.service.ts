// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Users } from './users.class';
import createModel from '../../models/user.model'
import hooks, { check as checkHooks } from './users.hooks';
import check from './users.check';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'users': Users & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
  };

  // Initialize our service with any options it requires
  app.use('/users', new Users(options, app));
  app.use('/users/:id/unlock', {
    async find(params) {
      return await check(app, params);
    }
  }).hooks(checkHooks);

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(hooks);
}
