
import app from '../src/app';
import { readSheet } from './drivers/google-spreadsheet';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const TABLES = [
    { sheet: 'classi', model: 'group' },
    { sheet: 'giocatori', model: 'user' },
];

// helper
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

var sequelizeClient = app.get('sequelizeClient');
const boot = async () => {
    await sequelizeClient.query('SET FOREIGN_KEY_CHECKS = 0');
    for (let i=0; i<TABLES.length; i++) {
        await sequelizeClient.models[TABLES[i].model].truncate({ cascade: false });
    }
    try {
        const data = await readSheet( {
            file_id: process.env.GDRIVE_FILE_ID,
            sheets: TABLES.map( t => (t.sheet) )
        });
        await asyncForEach(TABLES, async t => {
            await asyncForEach(data[t.sheet], async item => {
                await insert[t.model](item);
            });
        });
        await sequelizeClient.query('SET FOREIGN_KEY_CHECKS = 1');
    } catch(e) {
        console.log('ERROR', e)
    }
};

boot();

const TYPES = [
  { name: 'astrale' },
  { name: 'fosforosh' },
  { name: 'frogeye' },
  { name: 'icecream' },
  { name: 'marx' },
  { name: 'megalocs' },
  { name: 'moon' },
  { name: 'potato' },
  { name: 'inferno' },
  { name: 'rotten' },
  { name: 'slime' },
  { name: 'vulcano' },
];

var usedX = [] as number[];
var usedY = [] as number[];
const randomPos = () => {
    const Size = {
        width: 6000,
        height: 6000
    }
    var pos = {
        x: Math.round(Math.random() * Size.width),
        y: Math.round(Math.random() * Size.height),
        z: Math.random() + .2
    }
    if (usedX.includes(pos.x) || usedY.includes(pos.y)) return randomPos();
    usedX.push(pos.x); usedY.push(pos.y);
    return pos;
}

const insert = {
    group: async (item) => {
        // @ts-ignore
        const $group = await app.service('groups').create({
            ...item
        });
    },
    user: async (item) => {
        const pos = randomPos();
        let user = {
            ...item,
            world: {
                map: {},
                pos,
                planet: TYPES[Math.floor(Math.random()*TYPES.length)].name
            },
        };
        var $data = [] as any;
        Object.keys(item).forEach(k => {
            if (k.substr(0,1) === "_") {
                $data.push({
                    key: k.substr(1),
                    value: item[k]
                });
            }
        })
        user.gate = $data;
        user.password = user.username;
        try {
            const $user = await app.service('users').create({
                ...user
            });
        } catch(e) {}
    }
}