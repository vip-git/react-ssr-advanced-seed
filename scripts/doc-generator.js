const shell = require('shelljs');

const Models = {
    ...require('../src/client/app/common/model/root.model'),
    ...require('../src/client/app/containers/chat/chat.model'),
    ...require('../src/client/app/containers/chat/components/chat-box/chat-box.model')
};

shell.exec('ls', function(code, stdout, stderr) {
   console.log('i was called');
});
