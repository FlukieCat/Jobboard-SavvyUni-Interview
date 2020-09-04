const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');

// @route POST api/users
// @desc  Register a new user
// @acce  Public
router.post('/', async (req, res) => {
    const { name, password } = req.body;
    try {
        let user = await User.findOne({ name });
        if (user) {
            return res.status(400).json({
                errors: [{ msg: 'User already exists' }],
            });
        }
        user = new User({ name, password });
        await user.save();

        // Return JWT
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 99999 },
            (err, token) => {
                if (err) throw err;
                return res.json({ token });
            }
        );
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
