const Category = require("../models/categories");

// Controller function to get a list of categories
const getCategories = async (req, res) => {
  try {
    // Retrieve a list of categories from the database
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

// Controller function to get a single category by ID
const getCategory= async (req, res) => {
  const categoryId = req.params.id;

  try {
    // Retrieve the category by its ID
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Failed to fetch category" });
  }
};

// Controller function to create a new category
const createCategory = async (req, res) => {
  const { name, podcastIds } = req.body;

  try {
    // Create a new category document
    const newCategory = new Category({ name, podcastIds });

    // Save the new category to the database
    await newCategory.save();

    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Failed to create category" });
  }
};

// Controller function to update an existing category
const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { name, podcastIds } = req.body;
  try {
    // Find the category by ID
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update the category properties
    category.name = name;
    category.podcastIds = podcastIds;

    // Save the updated category to the database
    await category.save();

    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Failed to update category" });
  }
};

// Controller function to delete an existing category
const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    // Find the category by ID and remove it
    const result = await Category.findByIdAndRemove(categoryId);

    if (!result) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
