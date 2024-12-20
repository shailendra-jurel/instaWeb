const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// Redirect user to Instagram authentication
router.get('/login', (req, res) => {
const redirectUrl = `https://www.facebook.com/v16.0/dialog/oauth?client_id=${process.env.INSTAGRAM_APP_ID}&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URI}&scope=instagram_basic,instagram_content_publish&response_type=code`;
res.redirect(redirectUrl);
});

// Callback to exchange code for access token
router.get('/callback', async (req, res) => {
const code = req.query.code;
try {
const response = await axios.post(
    `https://graph.facebook.com/v16.0/oauth/access_token`,
    {
    client_id: process.env.INSTAGRAM_APP_ID,
    redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
    client_secret: process.env.INSTAGRAM_APP_SECRET,
    code,
    }
);
const { access_token } = response.data;
res.json({ accessToken: access_token });
} catch (error) {
res.status(500).send(error.message);
}
});

module.exports = router;
