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

categoryRouter
  .route("/id/:id")
  .delete(deleteCategory)
  
categoryRouter
  .route("/:name")
  .put(updateCategory)
  .delete(deleteCategory)
  .get(getCategory);
module.exports = categoryRouter;
