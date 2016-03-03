var EventEmitter = require('events').EventEmitter;
var util = require('util');


function Music(){

    if (!(this instanceof Music)) return new Music;



    var nowplaying = require("nowplaying");

    var currentTrack = null;
    var currentArtist = null;

    nowplaying.on("playing", function (data) {

        currentArtist = data.artist;
        currentTrack = data.name;

        this.emit('trackChange', {artist: currentArtist, title: currentTrack});
    }.bind(this));


    nowplaying.on("paused", function (data) {
        currentArtist = "";
        currentTrack = "";

        this.emit('trackChange', {artist: currentArtist, title: currentTrack});
    });





    EventEmitter.call(this);
}
util.inherits(Music, EventEmitter);

module.exports = Music;



