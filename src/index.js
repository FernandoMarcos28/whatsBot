// Supports ES6
// import { create, Whatsapp } from 'sulla';
const venom = require('venom-bot');
//const fs = require('fs-extra');
const banco = require('./banco');
const stages = require('./stages');

/*let resp = stages.step[getStage("user1")].obj.execute();
for(let index = 0; index < Array(resp).length; index++){
    const element = Array(resp)[index];
    console.log(element);
};*/
venom.create().then((client) => start(client));

function start(client) {
    client.onMessage((message) => {
        if(message.chatId !== '554796091563-1374662673@g.us'){
            let resp = stages.step[getStage(message.from)].obj.execute(message.from,message.body);
            for(let index = 0; index < resp.length; index++){
                const element = resp[index];
                client.sendText(message.from,element)
            };
        };
    });
};


function getStage(user) {
    if (banco.db[user]) {
      //Se existir esse numero no banco de dados
      return banco.db[user].stage;
    } else {
      //Se for a primeira vez que entra e contato
      banco.db[user] = {
        stage: 0,
        itens: [],
      };
      return banco.db[user].stage;
    };
  };

//console.log(stages[getStage("user2")].obj.execute());