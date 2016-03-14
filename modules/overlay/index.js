var EventEmitter = require('events').EventEmitter;
var util = require('util');


function Overlay(io){

    if (!(this instanceof Overlay)) return new Overlay(io);

    this.name = "Overlay";
    this.io = io;

    this.io.on("connection", function( socket ){
        console.log( "Overlay :: A user connected" );
    });

    this.on('guestEnter', function(data){
       this.io.emit('guestEnter', data);
    });

    this.on('trackChange', function(data){
        this.io.emit('trackChange', data);
    });

    EventEmitter.call(this);
}
util.inherits(Overlay, EventEmitter);

module.exports = Overlay;



