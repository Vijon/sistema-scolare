function pick( arr: string[] ) {
    return arr[Math.floor(Math.random() * arr.length)];
}
/*
function trim( v: string ) {
    try {
        return v.split(' ').shift().join(' ');
    } catch(e) {}
}
*/
export const salute = (user: any) => pick([
    `Ciao ${user.name}!
    Benvenuto sul mio pianeta.`,
    `Ben arrivato ${user.name}.
    Spero tu abbia fatto buon viaggio!`,
    `Heilà ${user.name}, felice di rivederti.`
]);

export const salute_btn = () => pick([
    `Ciao!`
]);

export const intro = (user: any) => pick([
    `Se vuoi entrare nel mio pianeta devi scoprire chi sono! Scrivi il mio nome quando mi hai riconosciuto`,
    `Devo essere sicuro che mi conosci per farti passare! Se mi riconosci scrivi il mio nome`,
    `Ti darò qualche indizio, se scopri chi sono scrivi il mio nome.`,
]);

export const intro_btn = () => pick([
    `Ok!`
]);

export const clues = (user: any, target: any) => {
    const data = target.gate.reduce( (acc, {key, value}) => { acc[key] = value; return acc; }, {} );
    
    return [
        `1 Ho i capelli ${data.capelli}`,
        `2 I mie occhi sono ${data.occhi}`,
        `3 ${data.occhiali ? `Ho gli occhiali` : `Non ho gli occhiali, ci vedo benissimo!`}`,
        `4 Impazzisco per ${data.cibo}`,
        `4 Mi piace da matti ${data.cibo}`,
        `5 Anche a te piace ${data.cartone}`,
        `6 Se hai coraggio, ti sfido a ${data.sport}`,
        `7 Amo troppo ${data.squadra}`,
        `7 Son contento solo se vedo vincere ${data.squadra}`,
        `8 Sono terrorizzato da ${data.paura}`,
        `8 Me la faccio sotto se ${data.paura}`,
        `8 Non mi ${data.paura} altrimenti fuggo!`,
        `9 Quando posso, ${data.tempo_libero}`,
        `9 Appena ho un po' di tempo libero, mi scateno con ${data.tempo_libero}`,
        `10 Sono un pro con ${data.videogame}`,
        `10 Sfidami a ${data.videogame}, mettimi alla prova`,
        `11 Mi piace studiare ${data.materia}`,
        `12 Mi scateno appena parte ${data.musica}`,
        `12 Appena sento ${data.musica} alzo a balla il volume`,
        `13 Ueh zio, lo sai che ${data.cosa_bella}`,
    ]
};