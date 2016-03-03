var EventEmitter = require('events').EventEmitter;
var util = require('util');


function Music(){

    if (!(this instanceof Music)) return new Music;



    var nowplaying = require("nowplaying");

    this.currentTrack = null;
    this.currentArtist = null;

    nowplaying.on("playing", function (data) {

        this.currentArtist = data.artist;
        this.currentTrack = data.name;

        this.emit('trackChange', {artist: this.currentArtist, title: this.currentTrack});
    }.bind(this));


    nowplaying.on("paused", function (data) {
        this.currentArtist = "";
        this.currentTrack = "";

        this.emit('trackChange', {artist: "", title: ""});
    });





    EventEmitter.call(this);
}
util.inherits(Music, EventEmitter);

module.exports = Music;



