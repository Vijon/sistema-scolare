import { hooks } from '@feathersjs/authentication';
import { hooks as hooksLocal } from '@feathersjs/authentication-local';
import { convertFieldsMap } from '../../helpers'
import { fields } from '../../models/user.model';
import { obscure, process, inGroup } from '../../hooks/users/'

const { authenticate } = hooks;
const { hashPassword, protect } = hooksLocal;
const convert = convertFieldsMap(fields);

export default {
  before: {
    all: [convert],
    find: [ authenticate('jwt', { allowUnauthenticated: true }), inGroup() ],
    get: [ authenticate('jwt', { allowUnauthenticated: true }) ],
    create: [ hashPassword() ],
    update: [ hashPassword(), authenticate('jwt') ],
    patch: [ hashPassword(), authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [
      obscure(),
      //convert,
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