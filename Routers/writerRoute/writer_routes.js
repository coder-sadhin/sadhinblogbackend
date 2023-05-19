const authController = require('../../Controllers/Writers/authController');
const { testError, routes } = require('../index');

routes.post('/register', testError(authController.register))

module.exports = routes;