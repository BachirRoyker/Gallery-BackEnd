const Item = require("../models/Item.js");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllItemsUserLogged = async (req, res) => {
  const items = await Item.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ items, count: items.length });
};

const getItem = async (req, res) => {
  const {
    user: { userId },
    params: { id: itemId },
  } = req;
  const item = await Item.findOne({
    _id: itemId,
    createdBy: userId,
  });
  if (!item) {
    throw new NotFoundError(`No item with id ${itemId}`);
  }
  res.status(StatusCodes.OK).json({ item });
};

const createItem = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const item = await Item.create(req.body);
  res.status(StatusCodes.CREATED).json({ item });
};

const updateItem = async (req, res) => {
  const {
    body: { name, description, price, status },
    user: { userId },
    params: { id: itemId },
  } = req;

  if (name === "" || description === "" || price === "" || status === "") {
    throw new BadRequestError(
      "name or description or price or status fields cannot be empty"
    );
  }
  const item = await Item.findByIdAndUpdate(
    { _id: itemId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!item) {
    throw new NotFoundError(`No item with id ${itemId}`);
  }
  res.status(StatusCodes.OK).json({ item });
};

const deleteItem = async (req, res) => {
  const {
    user: { userId },
    params: { id: itemId },
  } = req;

  const item = await Item.findByIdAndRemove({
    _id: itemId,
    createdBy: userId,
  });
  if (!item) {
    throw new NotFoundError(`No item with id ${itemId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  createItem,
  deleteItem,
  getAllItemsUserLogged,
  updateItem,
  getItem,
};
