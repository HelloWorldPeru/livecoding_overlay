var EventEmitter = require('events').EventEmitter;
var util = require('util');


function Music(){

    if (!(this instanceof Music)) return new Music;

    this.name = "Music";

    var nowplaying = require("nowplaying");
    var iTunes = require('local-itunes');

    var redis = require('redis').createClient();

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


    this.on('guestCommand', function(data){

        if(command == "!skip") {
            redis_key = data.user + '_skipped'

            redis.exists(redis_key, function (err, reply) {
                if (reply == 0) {
                    redis.set(redis_key, 'true');
                    redis.expire(redis_key, 300);

                    this.emit('systemMessage', {message: data.user + " just skipped " + this.currentTrack + " by " + this.currentArtist})
                    iTunes.next();


                }
            }.bind(this));

        } else if(command == "!nowplaying"){

            if (this.currentTrack != null && this.currentArtist != null) {
                this.emit('systemMessage', {message: "Current track: " + this.currentTrack + " by " + this.currentArtist})
            }

        }
    });


    EventEmitter.call(this);
}
util.inherits(Music, EventEmitter);

module.exports = Music;



