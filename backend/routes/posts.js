const express = require('express');
const axios = require('axios');
const router = express.Router();

// Fetch user posts
router.get('/user-posts', async (req, res) => {
const { accessToken } = req.query;
try {
const response = await axios.get(
    `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&access_token=${accessToken}`
);
res.json(response.data);
} catch (error) {
res.status(500).send(error.message);
}
});

module.exports = router;
