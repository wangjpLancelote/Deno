const PROTO_PATH = __dirname + '/helloWorld.proto';
// import grpc from 'grpc';
const grpc = require('grpc');

const hello_world = grpc.load(PROTO_PATH).helloworld;

function sayHello (call, callback) {
    callback(null, {message: 'hello: '+ call.request.name});
}

function main () {
    let server = new grpc.Server();
    server.addService(hello_world.Greeter.service, {sayHello: sayHello});
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}
main();