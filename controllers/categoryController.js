import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        message: "Name is required",
      });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      category,
      message: "Category created successfully",
    });
  } catch (error) {
    console.log("Error while creating category: ", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in category",
    });
  }
};

export const updateCategoryController = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      category,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.log("Error updating category: ", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error updating category",
    });
  }
};

export const getAllCategoriesController = async (req, res, next) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      category,
      message: "All categories list",
    });
  } catch (error) {
    console.log("Error getting all categories: ", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error getting all categories",
    });
  }
};

export const singleCategoryController = async (req, res, next) => {
  try {
    const category = await categoryModel.findOne({
      slug: slugify(req.params.slug),
    });
    res.status(200).send({
      success: true,
      category,
      message: "Get Single category successful",
    });
  } catch (error) {
    console.log("Error getting single category: ", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error getting single category",
    });
  }
};

export const deleteCategoryController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting category: ", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error deleting category",
    });
  }
};
