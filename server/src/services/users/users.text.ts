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
    
    // group_id	username	password	name	Cognome	x	y	z	planet	
    // sesso	capelli	
    // occhi	occhiali	cibo	cartone	sport	squadra	paura	tempo_libero	videogioco	materia	
    // musica	cosa_piu_bella	fratelli	cosa_felice	animale_pref	_animale	_altezza	
    let clues = [] as string[];
    if (data.sesso) {
        clues = [...clues, 
            data.sesso == "m" ? 'Sono un maschietto' : 'Sono una femminuccia',
        ]
    }
    if (data.capelli) {
        clues = [...clues, 
            `Ho i capelli ${data.capelli}`,
            `I miei capelli sono ${data.capelli}`,
        ]
    }
    if (data.occhi) {
        clues = [...clues, 
            `I miei occhi sono ${data.occhi}`,
        ]
    }
    if (data.occhiali) {
        clues = [...clues, 
            `${data.occhiali ? `Ho gli occhiali` : `Non ho gli occhiali, ci vedo benissimo!`}`,
        ]
    }
    if (data.cibo) {
        clues = [...clues, 
            `Impazzisco quando mangio ${data.cibo}`,
            `Mi piace da matti ${data.cibo}`,
        ]
    }
    if (data.cartone) {
        clues = [...clues, 
            `Anche a te piace guardare ${data.cartone}?`,
        ]
    }
    if (data.sport) {
        clues = [...clues, 
            `Se hai coraggio, ti sfido a ${data.sport}`,
        ]
    }
    if (data.squadra) {
        clues = [...clues, 
            `Tifo per ${data.squadra}`,
            `Son contento solo se vedo vincere ${data.squadra}`,
        ]
    }
    if (data.paura) {
        clues = [...clues, 
            `La mia più grande paura ${data.paura}`,
            //`8 Me la faccio sotto se ${data.paura}`,
            //`8 Non mi ${data.paura} altrimenti fuggo!`,
        ]
    }
    if (data.tempo_libero) {
        clues = [...clues, 
            `Quando posso, ${data.tempo_libero}`,
            `Appena ho un po' di tempo libero, ${data.tempo_libero}`,
        ]
    }
    if (data.videogioco) {
        clues = [...clues, 
            `Sono un pro a ${data.videogioco}`,
            `Sfidami a ${data.videogioco}, mettimi alla prova`,
        ]
    }
    if (data.materia) {
        clues = [...clues, 
            `Mi piace studiare ${data.materia}`,
        ]
    }
    if (data.musica) {
        clues = [...clues, 
            `Mi scateno appena parte ${data.musica}`,
            `Appena sento ${data.musica} alzo a balla il volume`,
        ]
    }
    if (data.cosa_piu_bella) {
        clues = [...clues, 
            `La cosa più bella? ${data.cosa_piu_bella}`,
        ]
    }
    if (data.fratelli) {
        clues = [...clues, 
            (data.fratelli == 0 ? `Non ho fratelli nè sorelle` : `Ho ${data.cosa_piu_bella}`),
        ]
    }
    if (data.cosa_felice) {
        clues = [...clues, 
            `Mi rende felice ${data.cosa_felice}`,
            `Cosa mi rende felice? ${data.cosa_felice}`,
        ]
    }
    if (data.animale_pref) {
        clues = [...clues, 
            `Sai qual'è il mio animale preferito? ${data.animale_pref}`,
        ]
    }
    if (data.animale) {
        clues = [...clues, 
            (data.animale == 0 ? `Non ho animali a casa` : `Ho ${data.animale}`),
        ]
    }
    if (data.altezza) {
        clues = [...clues, 
            `Sono alt${data.sesso == "m" ? 'o' : 'a'} ${data.altezza}m`
        ]
    }
    // Ueh zio, lo sai che 
    return clues;
};