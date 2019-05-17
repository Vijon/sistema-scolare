const SCOPES = [
    {"key": "ground"},
    {"key": "buildings"}
];

export const Size = {
    side: 50
}

var $sheets = {} as any;
var $loaded = false;
var $promise: any;
const root = `../../../public/`;
export function load( scopes = null as any ) {
    if ($loaded) return Promise.resolve();
    if ($promise) return $promise;
    if (!scopes) { scopes = SCOPES; }
    $promise = new Promise( async (resolve) => {
        for (let i=0; i<scopes.length; i++) {
            let s = scopes[i];
            await get(s.key);
            $loaded = true;
        }
        resolve();
    });
    
    return $promise;
}

export function get(key: string) {
    if ($sheets[key]) return Promise.resolve($sheets[key]);
    let css = require(`../../../public/spritesheet/${key}.css`);
    console.log(css)
    return new Promise( resolve => {
        const file = `/spritesheet/${key}.json`;
        PIXI.loader
        .add(file)
        .load( () => {
            // get a reference to the sprite sheet we've just loaded:
            const sheet = PIXI.loader.resources[file];
            resolve(sheet);
            const t = sheet.textures as any;
            const tx = Object.keys(t).map( k => {
                const id = k.replace('.png', '');
                const path = `${key}.${id}`;
                return { key: id, path, texture: t[k] }
            });
            $sheets[key] = tx;
        });
    })
}

export function scopes() {
    return Object.keys($sheets).map( (v) => {
        const found = SCOPES.filter( s => v === s.key )[0];
        return { ...found, sheet: $sheets[v] };
    });
}

export function tile(scope: string, key: string | null = null) {
    if (!key) {
        [scope, key] = scope.split('.');
    }
    const founds = $sheets[scope].filter((tile: any) => tile.key === key);
    return founds.length ? founds[0] : null;
}

export function getTilePos( pos: any ) {
    return {
        x: Math.floor(pos.x / Size.side),
        y: Math.floor(pos.y / Size.side),
    };
}

export function getRealPos( pos: any ) {
    return {
        x: Math.floor(pos.x * Size.side),
        y: Math.floor(pos.y * Size.side),
    };
}