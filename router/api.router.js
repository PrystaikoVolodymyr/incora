const router = require('express').Router();
const userRouter = require('./users.router');
const loginRouter = require('./login.router');

router.use('/users', userRouter);
router.use('/login', loginRouter);

module.exports = router;
