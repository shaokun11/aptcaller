const express = require('express');
const router= express.Router();
const { db } = require('./db');

router.get('/latestTx', async function (req, res) {
    const count = req.query.count || 10;
    const ret = await db.get(count);
    res.json(
        ret.map(it => ({
            tx: it.tx,
            height: it.height,
            timestamp: it.timestamp || '',
        })),
    );
});

exports.router_query = router;
