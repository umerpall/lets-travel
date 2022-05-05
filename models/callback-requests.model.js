let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let callbackRequestsSchema = new Schema({
    id: String,
    phoneNumber: String,
    data: Date
})

let CallbackRequest = mongoose.model('CallbackRequest', callbackRequestsSchema, 'callback-requests');

module.exports = {CallbackRequest}