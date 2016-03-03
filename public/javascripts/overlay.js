var socket = io('http://127.0.0.1:3000');

socket.on('trackChange', function (data) {

    $music = $("#music");
    $music.find('h1').text(data.title);
    $music.find('h2').text(data.artist)
});

socket.on('guestEnter', function (data) {
    console.log(data);
    $guest = $("#guest");
    $guest.find('h1').text("Welcome " + data.user);

});

