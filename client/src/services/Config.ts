

export const get = (key: string): any => {
    switch (key) {
        case 'width': return document.documentElement.clientWidth;
        case 'height': return document.documentElement.clientHeight;
        case 'full': return { width: get('width'), height: get('height') };
    }
    try {
        return process.env[`REACT_APP_${key.toUpperCase()}`];
    } catch(e) {
        return null;
    }
};

const WEBFONTS = ['VT323'];

var $loadedFont = false;
export const loadWebFonts = () => {
    return new Promise( resolve => {
        if (!$loadedFont) {
            const WebFontConfig = {
                custom: {
                    families: WEBFONTS,
                },
                active: function() {
                    resolve();
                    $loadedFont = true;
                }
            };
            // @ts-ignore
            window.WebFontConfig = WebFontConfig;
            (function() {
                var wf = document.createElement('script');
                wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
                    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
                wf.type = 'text/javascript';
                wf.async = true;
                var s = document.getElementsByTagName('script')[0];
                s.parentNode!.insertBefore(wf, s);
            })();
        } else {
            resolve();
        }
    });
};

export const textStyle = (args: any = {}) => {
    return new PIXI.TextStyle({
        fontFamily: WEBFONTS[0],
        fontSize: 36,
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
        ...args
    })
};