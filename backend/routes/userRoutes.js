const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

const {
  getUser,
  updateUser,
  deleteUser,
  changePassword,
} = require("../controllers/userController");

router
  .route("/user/:id")
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);
router.route("/user/pass/:id").put(protect, changePassword);

module.exports = router;
