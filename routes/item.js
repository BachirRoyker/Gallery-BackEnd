const express = require("express");

const router = express.Router();
const {
  createItem,
  deleteItem,
  getAllItemsUserLogged,
  updateItem,
  getItem,
} = require("../controllers/items");

router.route("/").post(createItem).get(getAllItemsUserLogged);

router.route("/:id").get(getItem).delete(deleteItem).patch(updateItem);

module.exports = router;
