import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import { obscure, process, inGroup } from '../../hooks/users/'
import { fields } from '../../models/user.model';
import { convertFieldsMap } from '../../helpers'
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;
const convert = convertFieldsMap(fields);

export default {
  before: {
    all: [convert],
    find: [ authenticate('jwt', 'anonymous'), inGroup() ],
    get: [ authenticate('jwt', 'anonymous') ],
    create: [ hashPassword('password') ],
    update: [ hashPassword('password'),  authenticate('jwt') ],
    patch: [ hashPassword('password'),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      obscure(),
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [process()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

export const check = {
  before: {
    find: [authenticate('jwt')]
  }
}