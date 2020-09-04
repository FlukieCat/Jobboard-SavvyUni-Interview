const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials.' });
        }
        return res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/auth
// @desc     Auth user & get token
// @access   Public
router.post('/', async (req, res) => {
    const { name, password } = req.body;

    try {
        let user = await User.findOne({ name });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials.' });
        }

        if (password !== user.password) {
            return res.status(400).json({ msg: 'Invalid Credentials.' });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {
                expiresIn: 99999,
            },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
