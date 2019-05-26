
import app from '../src/app';
import { readSheet } from './drivers/google-spreadsheet';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const TABLES = [
    { sheet: 'classi', model: 'group' },
    { sheet: 'giocatori', model: 'user' },
];

var sequelizeClient = app.get('sequelizeClient');
const boot = async () => {
    await sequelizeClient.query('SET FOREIGN_KEY_CHECKS = 0');
    for (let i=0; i<TABLES.length; i++) {
        await sequelizeClient.models[TABLES[i].model].truncate({ cascade: false });
    }
    const data = await readSheet( {
        file_id: process.env.GDRIVE_FILE_ID,
        sheets: TABLES.map( t => (t.sheet) )
    });
    TABLES.map( async t => {
        data[t.sheet].map( async item => {
            await insert[t.model](item);
        })
    });
    await sequelizeClient.query('SET FOREIGN_KEY_CHECKS = 1');
};

boot();

const insert = {
    group: async (item) => {
        const $group = await app.service('groups').create({
            ...item
        });
    },
    user: async (item) => {
        let user = {
            ...item,
            world: {
                map: {},
                pos: {
                    x: item.x,
                    y: item.y,
                    z: item.z
                },
                planet: item.planet
            },
        };
        var $data = [] as any;
        Object.keys(item).forEach(k => {
            if (k.substr(0,1) === "_") {
                $data.push({
                    key: k.substring(-1),
                    value: item[k]
                });
            }
        })
        user.gate = $data;
        const $user = await app.service('users').create({
            ...user
        });
    }
}