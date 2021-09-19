const config = require('config.js');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Audit = db.Audit;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Audit.find().select();
}

async function getById(id) {
    return await Audit.findById(id).select();
}

async function create(auditParam) {
    const audit = new Audit(auditParam);

    return await audit.save();
}

async function update(id, auditParam) {
    const audit = await Audit.findById(id);

    // copy userParam properties to Audit
    Object.assign(audit, auditParam);

    await audit.save();
}

async function _delete(id) {
    await Audit.findByIdAndRemove(id);
}