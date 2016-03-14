var EventEmitter = require('events').EventEmitter;
var util = require('util');


function Analytics(){

    if (!(this instanceof Analytics)) return new Analytics;

    this.name = "Analytics";

    var Mixpanel = require('mixpanel');
    var mixpanel = Mixpanel.init(process.env.MIXPANEL_KEY);

    //this.on('guestEnter', function(data){
    //
    //    console.log("ANALTICS: GuestEnter");
    //    //mixpanel.track("guestEnter", {
    //    //    username: data.user
    //    //});
    //});
    //
    //this.on('guestLeave', function(data){
    //
    //    console.log("ANALTICS: GuestLeave");
    //    //
    //    //mixpanel.track("guestLeave", {
    //    //    username: data.user
    //    //});
    //});
    //
    //this.on('guestMessage', function(data){
    //
    //    mixpanel.track("guestMessage", {
    //        username: data.user
    //    });
    //});
    //
    //


    EventEmitter.call(this);
}
util.inherits(Analytics, EventEmitter);

module.exports = Analytics;



