const User = require('../dataBase/models/User');
const O_Auth = require('../dataBase/models/O_Auth');
const { passwordHasher, tokenizer } = require('../helpers');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            console.log('ccccc');
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            await passwordHasher.compare(password, user.password);
            const tokens = tokenizer();

            await O_Auth.create({ ...tokens, user: user._id });

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }
};
