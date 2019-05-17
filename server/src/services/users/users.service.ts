import createService from 'feathers-sequelize';
import createModel from '../../models/user.model';
import hooks, { check as checkHooks } from './users.hooks';
import check from './users.check';

export default function(app) {
  const Model = createModel(app);
  //const paginate = app.get('paginate');

  const options = {
    Model,
    //paginate
  };

  // Initialize our service with any options it requires
  app.use('/users', createService(options));
  app.use('/users/:id/unlock', {
    async find(params) {
      return await check(app, params);
    }
  }).hooks(checkHooks);

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(hooks);
};
