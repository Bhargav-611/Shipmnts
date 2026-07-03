const router = require("express").Router();
const controller = require("../controllers/user.controller");

router.post("/users", controller.createUser);
router.post("/connect", controller.connectionRequest);

module.exports = router;