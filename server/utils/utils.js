const createMessage = (userName, userMessage) => {

    return {
        name: userName,
        message: userMessage,
        time: new Date().getTime()
    };

};

module.exports = {
    createMessage
}