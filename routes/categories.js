const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('Get Categories');

    res.json('Hello!');
});

module.exports = router;
