import authentication from '@feathersjs/authentication';
import jwt from '@feathersjs/authentication-jwt';
import local from '@feathersjs/authentication-local';
import AppVerifier from './services/authentication/verifier';

export default function (app) {
    const config = app.get('authentication');

    // Set up authentication with the secret
    app.configure(authentication(config));
    app.configure(jwt());
    app.configure(local({ Verifier: AppVerifier }));

    // The `authentication` service is used to create a JWT.
    // The before `create` hook registers strategies that can be used
    // to create a new valid JWT (e.g. local or oauth2)
    app.service('authentication').hooks({
        before: {
            create: [
                authentication.hooks.authenticate(config.strategies)
            ],
            remove: [
                authentication.hooks.authenticate('jwt')
            ]
        }
    });
}