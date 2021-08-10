const router = require('express').Router();
const { userController } = require('../controller');
const { userMiddleware, loginMiddleware } = require('../middlewares');

router.use('/:userId', userMiddleware.checkIsIdValid);

router.post('/', userMiddleware.checkIsUserValid, userController.createUser);
router.get('/:userId', userController.getUserById);
router.put('/:userId', userMiddleware.checkIsUserValid, loginMiddleware.checkIsTokenValid, userController.updateUserById);

module.exports = router;
