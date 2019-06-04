import { canAccess } from '../../models/user.model';

export default function() {
  return async context => {
    const { app, method, result, params } = context;
    if (params.forceName) {
      return context;
    }
    let users = method === "find" ? result : [result];
    const auth = params.authenticated ? params.user : null;
    if (auth) {
      // if was previusly obscured...
      if (!auth.name) {
        const $user = await app.service("users").get(auth.id, { forceName: true });
        context.params.user = $user;
      }
    }
    
    users = users.map( user => {
      if (!auth || !canAccess(auth, user)) {
        // remove name!
        user.name = null;
        if (user.world && user.world.map) {
          user.world.map = null;
        }
      } else {
        user.canView = true;
      }
      user.username = null;
      return user;
    });

    context.result = method === "find" ? users : users[0];

    return context;
  };
}
