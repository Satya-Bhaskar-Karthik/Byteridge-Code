const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const auditService = require('./../audits/audit.service');
const Role = require('_helpers/role');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => {
            if (user) {
                auditService.create({
                    user: user._id,
                    loginTime: Date.now(),
                    logoutTime: Date.now(),
                    ip: req.ip.toString() || req.headers['x-forwarded-for'] || req.connection.remoteAddress.toString()
                }).then(session => {
                    user.session = {
                        user: session.user,
                        id: session._id,
                        loginTime: session.loginTime,
                        logoutTime: session.logoutTime,
                        ip: session.ip
                    }
                    //
                    res.json(user);
                }).catch(err => console.log('update failed', err));
            } else {
                res.status(400).json({
                    message: 'Username or password is incorrect'
                })
            }
        })
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Auditor) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}