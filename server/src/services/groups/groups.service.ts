import createService from 'feathers-sequelize';
import createModel from '../../models/group.model';

export default function(app) {
  const Model = createModel(app);

  const options = {
    Model,
  };

  // Initialize our service with any options it requires
  app.use('/groups', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('groups');
};
