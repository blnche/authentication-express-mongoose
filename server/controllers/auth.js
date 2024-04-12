const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// REGISTER
const register = async (req, res, next) => {
    const { username, email, password, confirm } = req.body;
    console.log({ username, email, password, confirm });
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });

        await user.save();
        res.json({message: 'Register ok'});

    } catch (err) {
        next(err);
    }
}


// LOGIN
const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if(!user) {
            console.log('User not found');
            return res.status(404).json({message: 'User not found'});
        }

        const passwordMatch =await user.comparePassword(password);
        if(!passwordMatch) {
            console.log('Incorrect password');
            return res.status(401).json({message: 'Incorrect password'});
        }

        const token = jwt.sign(
            { userID: user._id }, 
            process.env.SECRET_KEY, 
            { expiresIn: '1 hour' }
        );

        res.json({ token });

    } catch (err) {
        next(err);
    }
};

module.exports= { register, login };