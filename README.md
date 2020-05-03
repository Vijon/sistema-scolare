# Sistema Scolare (School System) #

- [Try demo](https://sistema-scolare.vijon.it/)
- [Storybook](http://sistema-scolare.vijon.it:2001)

## Overview ##
This game has been created during the last months of primary school of my sons, which have helped me to plan, draw, invent everything. An infinite brainstorming, let's say.
We wanted to create a tool that could keep children (now boys) in contact even after the end of primary school since almost everyone would no longer be in the same class the following year.

We set out to:
- don't create a chat
- do not use in any way personal or sensitive data
- do something that amused and even a little creative

From these few guidelines the "Sistema Scolare" (School System) was born.

## How it works ##
The game works with a database (imported from a spreadsheet on Google) containing all the classmates grouped by classes. Each player has a preset password, few personal data (name, gender) and some answers to a questionnaire we had asked to answer (hair color, favorite cartoon, etc ...).

Once authenticated with his password, the player will find himself in space with a spaceship ready to explore the planets nearby.
Each planet is owned by a classmate but is locked, to unlock it the player must guess the name of the owner using the clues (taken from the questionnaire above).
Once the planet is unlocked, he can explore its surface in full "Zelda" style. This map is completely managed and customized by the owner himself.
Here the visitor can also "plant" around messages that all planet's explorers will be able to read.

***
# Sistema Scolare #

- [Prova la demo](https://sistema-scolare.vijon.it/)
- [Storybook](http://sistema-scolare.vijon.it:2001)

## Panoramica ##
Questo "giochino" ha preso forma negli ultimi mesi di elementari dei miei figli, i quali mi hanno aiutato a progettare, disegnare, inventare il tutto. Un brainstorming costante, diciamo.
Avevamo voglia di creare uno strumento che potesse tenere in contatto i bambini (ormai ragazzi) anche dopo la fine delle scuole primarie dato che dall'anno successivo quasi tutti non sarebbero più stati nella stessa classe.

Ci eravamo prefissati di:
- non creare una chat
- non lavorare in nessun modo con dati personali o sensibili
- fare qualcosa che divertisse e che fosse addirittura un po' creativo

Da queste poche linee guida nacque poi il "Sistema Scolare".

## Come funziona ##
Il gioco lavora su un database (importato da uno spreadsheet su Google) contenente tutti i compagni divisi per le classi. Ogni giocatore ha una password preimpostata, pochi dati anagrafici (nome, sesso) e alcune risposte ad un questionario a cui avevamo chiesto di rispondere (colore dei capelli, cartone preferito, ecc...).

Il giocatore, autenticatosi con la sua password, si troverà nello spazio con un'astronave al suo comando pronta ad esplorare i pianeti sparsi in giro.
Ogni pianeta è proprietà di un compagno di classe ma è bloccato, per sbloccarlo il giocatore deve indovinare il nome del proprietario grazie a degli indizi (ricavati dal questionario di prima).
Una volta sbloccato il pianeta esso potrà esplorarne la superficie in pieno stile "Zelda". Questa mappa è completamente gestita e personalizzata dal proprietario stesso.
E qui sarà anche possibile "piantare" in giro dei messaggi che tutti gli esploratori di quel pianeta potranno leggere.

***
## Tech ##

* COMPILING  
  * Typescript
  * Create React App
  * Storybook

* CLIENT 
  * React
  * Redux
  * FeatherJS client
  * GSAP (Green Sock)
  * PIXI.js
  * Hammer
  * Web Speech API

* SERVER 
  * FeatherJS (NodeJS/Typescript)
  * MySQL
  * Socket IO
