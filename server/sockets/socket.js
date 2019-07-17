const { io } = require('../server');

const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils');


const users = new Users();


io.on('connection', (client) => {

    client.on('enterChat', (data, callback) => {
        if (!data.name) {
            callback({ ok: false, message: 'El nombre es necesario' });
        } else if (!data.room) {
            callback({ ok: false, message: 'El grupo es necesario' });
        } else {
            let chatUsers = users.addUser(client.id, data.name, data.room);

            client.join(data.room);

            let message = createMessage('app', `El usuario ${ data.name } entró al grupo`);

            client.to(data.room).emit('sendMessage', message);

            callback({ ok: true, users: chatUsers });
        }
    });

    client.on('sendMessage', (data) => {
        let sender = users.getUser(client.id);

        let message = createMessage(sender.name, data.message);

        client.to(sender.room).emit('sendMessage', message);
    });

    client.on('privateMessage', (data) => {
        let sender = users.getUser(client.id);

        let message = createMessage(sender.name, data.message);

        client.to(data.id).emit('privateMessage', message);
    });

    client.on('disconnect', () => {
        let removedUser = users.removeUser(client.id);

        if (removedUser !== undefined) {
            let message = createMessage('app', `El usuario ${ removedUser.name } abandonó el grupo`);

            client.to(removedUser.room).emit('sendMessage', message);
        }
    });

});