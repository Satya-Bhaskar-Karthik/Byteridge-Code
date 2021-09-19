const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: { type: String, required: true },
    loginTime: { type: String },
    logoutTime: { type: String },
    ip: { type: String }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Audit', schema);