import { hooks } from '@feathersjs/authentication';
import { process, validate, decorate, associate } from '../../hooks/messages/'

const { authenticate } = hooks;
export default {
  before: {
    all: [authenticate('jwt')],
    find: [associate()],
    get: [associate()],
    create: [process()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [decorate()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [validate()],
    update: [validate()],
    patch: [validate()],
    remove: []
  }
};
