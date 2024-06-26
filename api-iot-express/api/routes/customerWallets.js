module.exports = app => {
  const controller = require('../controllers/customer-wallets')();

  app.route('/api/v1/customer-wallets')
    .get(controller.listCustomerWallets);

  require('../api/routes/customerWallets')(app);

  return app;
}