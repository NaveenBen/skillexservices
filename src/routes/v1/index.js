const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const otpRoute = require('./otp.route');
const requestRoute = require('./request.route');
const config = require('../../config/config');

const router = express.Router();

// health check
router.get('/health', (req, res) => res.send('OK'));

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/otp',
    route: otpRoute,
  }, {
    path: '/requests',
    route: requestRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
  // add health check route and swagger docs only in development
}

module.exports = router;
