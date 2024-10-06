const express = require('express')
const router = express.Router();
const User = require('../modals/User')
const { check, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const secret_Key = 'ArpanSinghJi'
const fetchUser = require('../middleware/fetchUser');

// Route: 1 Sign Up Routes

router.post('/sign-up', [
    // Validation for input fields
    check('email', 'Email length should be 5 to 30 characters')
        .isEmail().isLength({ min: 5, max: 30 }),
    check('name', 'Name length should be 3 to 20 characters')
        .isLength({ min: 3, max: 20 }),
    check('number', 'Mobile number should contains 10 digits')
        .isLength({ min: 10, max: 10 }),
    check('password', 'Password length should be 8  characters')
        .isLength({ min: 8 })
], async (req, res) => {
    // If any Error then it will return this
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors, success: 'false' });
    }

    try {

        const { email, number } = req.body

        // Checking any exists Email and number
        const useremail = await User.findOne({ email });
        if (useremail) {
            return res.status(400).json({ msg: "This Email Already Exists", success: 'false' });
        }
        const usernumber = await User.findOne({ number })
        if (usernumber) {
            return res.status(400).json({ msg: "This Number Already Exists", success: 'false' });
        }

        // Doing Hashing of Password
        var salt = bcrypt.genSaltSync(10);
        var securedPassword = bcrypt.hashSync(req.body.password, salt);

        // Making expiration of token
        const expirationTime = Math.floor(Date.now() / 1000) + 5 * 60 * 60;

        // Creating the user in MongooDb backend
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            password: securedPassword
        })

        // The data that will appear in token
        const payLoad = {
            user: {
                id: user._id
            },
            exp: expirationTime,
        }

        const authToken = jwt.sign(payLoad, secret_Key)
        res.json({ authToken, success: 'true' })
    } catch (error) {
        res.status(400).send('Internal Sever Error')
    }

})

// Route: 2 Login Routes

router.post('/login', async (req, res) => {
    // If any Error then it will return this
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(errors)
    }

    try {
        const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;
        const { email } = req.body

        // Checking any exists Email 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({ msg: "Login with correct cerdentials", success: 'false' })
        }
        const passwordCompare = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCompare) {
            return res.status(200).json({ msg: "Login with correct cerdentials", success: 'false' })
        }
        const payLoad = {
            user: {
                id: user._id
            },
            exp: expirationTime,
        }

        const authToken = jwt.sign(payLoad, secret_Key)
        res.json({ authToken, success: 'true' })

    } catch (error) {
        res.status(400).send('Internal Sever Error')
    }

})

// Route 3 --> Checking the token
router.get('/checkToken', fetchUser, async (req, res) => {
    try {
        res.status(400).json({ msg: "All okay", success: 'true' })
    }
    catch {
        res.status(400).json({ msg: "Internal server error", success: 'false' })
    }
})

// Route 4 --> Getting the user details
router.get('/getUser', fetchUser, async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId).select('-password');
        return res.status(200).json({ user, success: 'true' })
    } catch {
        res.status(400).json({ msg: "Internal server error", success: 'false' })
    }
})

module.exports = router;
