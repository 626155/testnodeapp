const User = require('../models/user.model');

exports.registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email already in use');
    }

    const user = new User({ name, email, password });
    await user.save();

    return { message: 'User registered successfully' };
};

exports.loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    if (user.password != password) {
        throw new Error('Incorrect password');
    }

    return { message: 'Login successful', user: { id: user._id, name: user.name, email: user.email, password: user.password } };
};