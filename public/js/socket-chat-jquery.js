var $divGroupUsers = $('#divUsuarios');
var $frmSend = $('#frmSend');
var $txtMessage = $('#txtMessage');
var $divChatbox = $('#divChatbox');



$divGroupUsers.on('click', 'a', function() {
    var id = $(this).data('id');

    if (id) {
        console.log(id);
    }
});

$frmSend.on('submit', function(e) {

    e.preventDefault();

    if ($txtMessage.val().trim().length === 0) {
        return;
    }

    socket.emit('sendMessage', { message: $txtMessage.val() }, function(messageObject) {
        addMessageToCoversation(messageObject, true);
        $txtMessage.val('').focus();
    });

});



function formGroupName(groupName) {
    var htmlGrouName = '';

    htmlGrouName += '<li>';
    htmlGrouName += '    <a href="javascript:void(0)" class="active"> Chat de <span>' + groupName + '</span></a>';
    htmlGrouName += '</li>';

    return htmlGrouName
}

function formGroupUsers(groupUsers) {
    var htmlGroupUsers = '';

    for (var i = 0; i < groupUsers.length; i++) {
        htmlGroupUsers += '<li>';
        htmlGroupUsers += '    <a data-id="' + groupUsers[i].id + '" href="javascript:void(0)">';
        htmlGroupUsers += '        <img src="assets/images/users/1.jpg" alt="user-img" class="img-circle">';
        htmlGroupUsers += '        <span>' + groupUsers[i].name + '<small class="text-success">online</small></span>';
        htmlGroupUsers += '    </a>';
        htmlGroupUsers += '</li>';
    }

    return htmlGroupUsers;
}

function showGroupContainer(groupName, groupUsers) {
    var htmlContainer = formGroupName(groupName) + formGroupUsers(groupUsers);

    $divGroupUsers.html(htmlContainer);
}

function formatDate(msDate) {
    var date = new Date(msDate);

    return date.getHours() + ':' + date.getMinutes() + ' hrs.';
}

function formOthersMessage(messageObject) {
    var htmlOthersMessage = '';

    if (messageObject.name === 'app') {
        htmlOthersMessage += '<li class="app animated fadeIn">';
        htmlOthersMessage += '    <div class="chat-content">';
        htmlOthersMessage += '        <div class="box bg-light-info">' + messageObject.message + '</div>';
        htmlOthersMessage += '    </div>';
        htmlOthersMessage += '    <div class="chat-time">' + formatDate(messageObject.time) + '</div>';
        htmlOthersMessage += '</li>';
    } else {
        htmlOthersMessage += '<li class="animated fadeIn">';
        htmlOthersMessage += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        htmlOthersMessage += '    <div class="chat-content">';
        htmlOthersMessage += '        <h5>' + messageObject.name + '</h5>';
        htmlOthersMessage += '        <div class="box bg-light-inverse">' + messageObject.message + '</div>';
        htmlOthersMessage += '    </div>';
        htmlOthersMessage += '    <div class="chat-time">' + formatDate(messageObject.time) + '</div>';
        htmlOthersMessage += '</li>';
    }

    return htmlOthersMessage;
}

function formOwnMessage(messageObject) {
    var htmlOwnMessage = '';

    htmlOwnMessage += '<li class="reverse">';
    htmlOwnMessage += '    <div class="chat-content">';
    htmlOwnMessage += '        <h5>' + messageObject.name + '</h5>';
    htmlOwnMessage += '        <div class="box bg-light-success">' + messageObject.message + '</div>';
    htmlOwnMessage += '    </div>';
    htmlOwnMessage += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
    htmlOwnMessage += '    <div class="chat-time">' + formatDate(messageObject.time) + '</div>';
    htmlOwnMessage += '</li>';

    return htmlOwnMessage;
}

function addMessageToCoversation(messageObject, isOwnMessage) {
    var aMessage = (isOwnMessage) ? formOwnMessage(messageObject) : formOthersMessage(messageObject);

    $divChatbox.append(aMessage);

    scrollBottom();
}

function scrollBottom() {
    var newMessage = $divChatbox.children('li:last-child');

    var clientHeight = $divChatbox.prop('clientHeight');
    var scrollTop = $divChatbox.prop('scrollTop');
    var scrollHeight = $divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        $divChatbox.scrollTop(scrollHeight);
    }
}