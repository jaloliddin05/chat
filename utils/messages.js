const moment = require('moment');

console.log(moment);

function formatMessage(username, text){
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;