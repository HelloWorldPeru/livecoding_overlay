var EventEmitter = require('events').EventEmitter;
var util = require('util');

const chalk = require('chalk');


function Visitors(){

    if (!(this instanceof Visitors)) return new Visitors;

    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('visitor.db');
    db.run("CREATE TABLE if not exists visitors(username TEXT, created_at INTEGER, updated_at INTEGER);");


    this.name = "Music";


    this.on("guestEnter", function(data){

        var stmt = db.prepare("SELECT * FROM visitors WHERE username=? LIMIT 1");

        stmt.all(data.user, function(err, rows){
            if (rows.length > 0){
                console.log("EXISTING VISITOR: " + data.user);
                this.emit('visitorExisting', {user: data.user});
            } else{
                var stmt = db.prepare("INSERT INTO visitors(username, created_at, updated_at) VALUES (?,datetime(),datetime());");
                stmt.run(data.user);

                console.log(chalk.bgRed("NEW VISITOR: " + data.user));
                this.emit('visitorNew', {user: data.user});
            }
        }.bind(this));
    }.bind(this));

    EventEmitter.call(this);
}
util.inherits(Visitors, EventEmitter);

module.exports = Visitors;



