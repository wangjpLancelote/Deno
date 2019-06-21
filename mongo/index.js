const mongoose = require('mongoose');
const base_url = 'mongodb://localhost:27017/test';
mongoose.connect(base_url, {useNewUrlParser: true}, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('connection mongodb successfuly');
    }
});

module.exports = mongoose;