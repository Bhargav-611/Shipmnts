const express = require("express");

const router = express.Router();

router.use("/health", require("./health.route"));
router.use("/", require("./user.route"));

module.exports = router;