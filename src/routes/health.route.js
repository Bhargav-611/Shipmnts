const router = require("express").Router();

router.get("/", (req, res) => {
    res.json({
        success : true,
        message : "API Working"
    });
});

module.exports = router;