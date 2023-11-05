const express = require("express");
const categoryRouter = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoriesContoller");

// Route to get a list of categories
categoryRouter.get("/", getCategories);

// Route to create a new category
categoryRouter.post("/", createCategory);

// Route to update an existing category by ID
categoryRouter
  .route("/:id")
  .put(updateCategory)
  .delete(deleteCategory)
  .get(getCategory);
categoryRouter
  .route("/name/:name")
  .put(updateCategory)
  .delete(deleteCategory)
  .get(getCategory);
module.exports = categoryRouter;
