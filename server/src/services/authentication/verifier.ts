import { Verifier } from "@feathersjs/authentication-local";
const bcrypt = require('bcryptjs');
const { get, omit } = require('lodash');

class AppVerifier extends Verifier {
    options;

  _comparePassword(entity, password) {
      // THIIIIIIIIS
      password = password.toLowerCase();

    // select entity password field - take entityPasswordField over passwordField
    const passwordField = this.options.entityPasswordField || this.options.passwordField;

    // find password in entity, this allows for dot notation
    const hash = get(entity, passwordField);

    if (!hash) {
      return Promise.reject(
        new Error(
          `'${
            this.options.entity
          }' record in the database is missing a '${passwordField}'`
        )
      );
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, function(error, result) {
        // Handle 500 server error.
        if (error) {
          return reject(error);
        }

        if (!result) {
          return reject(false); // eslint-disable-line
        }

        return resolve(entity);
      });
    });
  }
}

export default AppVerifier;