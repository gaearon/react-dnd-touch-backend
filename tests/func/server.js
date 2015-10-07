var httpServer = require('http-server');
var path = require('path');

console.log(path.resolve(__dirname, '../../examples'));
var server = httpServer.createServer({
    root: path.resolve(__dirname, '../../examples')
});

exports.start = function (done) {
    server.listen(3000, done);
};

exports.close = function () {
    server.close();
};
