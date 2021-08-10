const { Schema, model } = require('mongoose');
const { dataBaseName: { USER } } = require('../../constants');

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    password: { type: String, required: true }
}, { timestamps: true });

module.exports = model(USER, userSchema);
