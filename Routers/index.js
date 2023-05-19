const routes = require('express').Router();

const useAuth = require('../middlewares/useAuth');
routes.use(useAuth);

// global error handler
const testError = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
module.exports = { routes, testError };