var EventEmitter = require('events').EventEmitter;
var util = require('util');


function Manager(io){

    if (!(this instanceof Manager)) return new Manager(io);

    this.name = "Manager";
    this.io = io;

    this.io.on("connection", function( socket ){
        console.log( "Manager :: A user connected" );
    });

    this.on('guestMessage', function(data){
        this.io.emit('guestMessage', data);
    });

    EventEmitter.call(this);
}
util.inherits(Manager, EventEmitter);

module.exports = Manager;



