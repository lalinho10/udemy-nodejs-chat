var socket = io();



var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('name') || !searchParams.has('room') || searchParams.get('name') === '' || searchParams.get('room') === '') {
    window.location = 'index.html';
    throw new Error('El nombre y el grupo son necesarios');
} else {

    const user = {
        name: searchParams.get('name'),
        room: searchParams.get('room')
    };


    socket.on('connect', function() {
        console.log('Conectado al servidor');

        socket.emit('enterChat', user, function(response) {
            console.log(response);
        });
    });


    socket.on('disconnect', function() {
        console.log('Se perdió conexión con el servidor');
    });


    socket.on('sendMessage', function(response) {
        console.log(response);
    });


    socket.on('privateMessage', function(response) {
        console.log(response);
    });


    /*socket.emit('sendMessage', { message: 'Message text' });*/
}