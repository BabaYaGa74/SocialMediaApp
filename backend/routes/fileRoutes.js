const express = require("express");
const router = express.Router();
const { upload } = require("../controllers/fileController");

router.post("/", upload);

module.exports = router;
