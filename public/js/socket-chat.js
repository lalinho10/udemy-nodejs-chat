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
            if (response.ok) {
                showGroupContainer(user.room, response.users);
            }
        });
    });


    socket.on('sendMessage', function(messageObject) {
        addMessageToCoversation(messageObject, false);
    });


    socket.on('privateMessage', function(response) {
        console.log(response);
    });


    socket.on('showGroupUsers', function(groupUsers) {
        showGroupContainer(user.room, groupUsers);
    });


    socket.on('disconnect', function() {
        console.log('Se perdió conexión con el servidor');
    });

}