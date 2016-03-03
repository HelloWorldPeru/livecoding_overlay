var EventEmitter = require('events').EventEmitter;
var util = require('util');

const chalk = require('chalk');


function Chat(){

    if (!(this instanceof Chat)) return new Chat;

    var Whisperer = require('whisperer')
        , chat = new Whisperer({
        jid: process.env.LC_USERNAME,
        password: process.env.LC_PASSWORD
    });

    this.say = function(message) {
        chat.message({ jid: 'fearmediocrity@chat.livecoding.tv', message: message});
    }

    chat.on('online', function(){
        console.log(chalk.red("Chat is connected"));

        chat.join({
            jid: process.env.LC_CHANNEL,
            nick: 'thebot',
            lastSeen: new Date()
        });

        chat.on("message", function(payload){
            var parseString = require('xml2js').parseString;

            parseString(payload, function (err, result) {

                if (err){
                    console.log(err);
                    return;
                }

                message_sender = result.message.$.from.split("/")[1];
                message_content = result.message.body + "";

                if(message_content.indexOf("!") == 0){
                    command = message_content.split(" ")
                    this.emit('guestCommand', {user: message_sender, command: command[0], args: command[1]});
                } else {
                    console.log(chalk.blue(message_sender) + ": " + result.message.body);
                    this.emit('guestMessage', {user: message_sender, message: message_content});
                }

            }.bind(this));
        }.bind(this));

        chat.on("presence", function(payload){
            var parseString = require('xml2js').parseString;

            parseString(payload, function (err, result) {

                if (err){
                    console.log(err);
                    return;
                }
                action = result.presence.$.id == "pres:3" ? "guestEnter" : "guestLeave";
                user = result.presence.$.from.split("/")[1];

                if(action == "guestLeave") {
                    console.log(chalk.red(user) + " just left.");
                } else if (action == "guestEnter"){
                    console.log(chalk.green(user) + " just arrived.");
                }

                this.emit(action, {user: user});
            }.bind(this));

        }.bind(this));


    }.bind(this));



    EventEmitter.call(this);
}
util.inherits(Chat, EventEmitter);

//Chat.prototype.say = function(message){
//    chat.message({ jid: 'fearmediocrity@chat.livecoding.tv', message: message});
//}

module.exports = Chat;



