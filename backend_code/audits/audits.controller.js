const express = require('express');
const router = express.Router();
const auditService = require('./audit.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');

// routes
router.get('/', authorize(Role.Auditor), getAll);
router.post('/', authorize(Role.Auditor), create);
router.get('/:id', authorize(Role.Auditor), getById);
router.put('/:id', authorize(Role.Auditor), update);
router.delete('/:id', authorize(Role.Auditor), _delete);

module.exports = router;

function create(req, res, next) {
    auditService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    auditService.getAll()
        .then(audits => res.json(audits))
        .catch(err => next(err));
}

function getById(req, res, next) {
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Auditor) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    auditService.getById(req.params.id)
        .then(audit => audit ? res.json(audit) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    auditService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    auditService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}