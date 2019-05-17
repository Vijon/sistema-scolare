import * as TEXT from '../../services/users/users.text';

export default function() {
  return async context => {
    const { result, params } = context;
    const user = result;
    const auth = params.authenticated ? params.user : null;
    if (!auth) { return context; }
    
    // populate quiz
    const text  = {
      salute: TEXT.salute(auth),
      intro: TEXT.intro(auth),
      salute_btn: TEXT.salute_btn(),
      intro_btn: TEXT.intro_btn(),
      clues: TEXT.clues(auth, user)
    }
    context.result.text = text;

    return context;
  };
}
