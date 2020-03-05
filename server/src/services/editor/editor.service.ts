import { BadRequest } from "@feathersjs/errors";
import { canEdit } from "../../models/user.model";
import hooks from './editor.hooks';

export default function(app) {

  // Initialize our service with any options it requires
  app.use('/editor', {
    async patch(id, data, params) {
      const auth = params.authenticated ? params.user : null;
      const target = await app.service("users").get(auth.id, { forceName: true } );

      // validation
      if (!canEdit(auth, target)) {
        throw new BadRequest("You're not authorized");
      }

      const oldVal = target.world.map || {};
      if (!oldVal.ground) oldVal.ground = {};
      const newVal = data.reduce( (acc, cell) => {
        if (!acc[cell.scope]) { acc[cell.scope] = {}; }
        acc[cell.scope][cell.key] = cell.tile;
        return acc;
      }, oldVal);

      await app.service("users").patch(target.id, {
        world: {
          ...target.world,
          map: newVal
        }
      });

      return { result: true };
    }
  })

  // Get our initialized service so that we can register hooks
  const service = app.service('editor');

  service.hooks(hooks);
};
