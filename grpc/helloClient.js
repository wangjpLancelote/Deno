const PROTO_PATH = __dirname + '/helloWorld.proto';
// import grpc from 'grpc';
const grpc = require('grpc');
const hello_world = grpc.load(PROTO_PATH).helloworld;

function main () {
    let client = new hello_world.Greeter('localhost:50051', grpc.credentials.createInsecure());

    let user;

    if (process.argv.length >= 3) {
        user  = process.argv[2];
    } else {
        user = 'world';
    }
    client.sayHello ({name: 'user'}, (err, res) => {
        console.log('Greeter', res.message);
    })
}