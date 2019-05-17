import app from '../src/app';
const data = require('./seed.json');

data.forEach( async group => {
    try {
        const $group = await app.service('groups').create({
            name: group.name,
            data: group.data
        });
        const $id = $group.id;
        group.$users.forEach( user => {
            app.service('users').create({
                group_id: $id,
                ...user
            })
        })
    } catch(e) {
        console.log(e)
    }
});