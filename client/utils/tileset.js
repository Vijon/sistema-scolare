const fs = require('fs');
const path = require('path');
const spritesheet = require('spritesheet-js');

const target = __dirname + '/../public/';
const options = {
    square: true
}
const scopes = ['ground', 'buildings'];
const formats = ['json', 'css'];
scopes.forEach( scope => {
    formats.forEach( format => {
        spritesheet(path.resolve(`${__dirname}/${scope}/*.png`), { ...options, name: scope, format }, function (err) {
            if (err) throw err;
        
            fs.rename(`${scope}.${format}`, `${target}/spritesheet/${scope}.${format}`, () => {} );
            fs.rename(`${scope}.png`, `${target}/spritesheet/${scope}.png`, () => {} );
        });
        console.log(scope + ' successfully generated');
    })
})
