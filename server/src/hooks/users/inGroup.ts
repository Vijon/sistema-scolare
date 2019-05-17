import { canAccess } from '../../models/user.model';

export default function() {
  return context => {
    const { app, method, result, params } = context;
    const auth = params.authenticated ? params.user : null;
    if (!auth) return context;
    context.params.query = { ...context.params.query, group_id: auth.group_id }

    return context;
  };
}
