const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/api/register', async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send()
        }else {

            const userEmailExists = await User.findOne({
				email: req.body.email,
			});

			if (userEmailExists)
				return res
					.status(400)
					.send();

            const user = new User(req.body)
            await user.save()
            const token = await user.generateAuthToken()
            return res.status(201).json({token})
        }
        
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.post('/api/login', async (req, res) => {
    try {
        // console.log(req.body)
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        return res.status(200).json({token})
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

router.get('/api/profile', auth, async (req, res) => {
    res.status(200).json({name: req.user.name, email: req.user.email})
})

router.post('/api/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})



module.exports = router