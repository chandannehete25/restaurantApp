const adminModel = require("../models/adminModel");

exports.addCategory = (req, res) => {
  const categoryName = req.body.name;

  if (!categoryName) {
    return res.render("adminDashboard", { page: "addCategory", msg: "Category name required." });
  }

  adminModel.insertCategory(categoryName)
    .then(() => {
      res.render("adminDashboard", { page: "addCategory", msg: "Category added successfully." });
    })
    .catch((err) => {
      console.error(err);
      let errorMsg = err.code === 'ER_DUP_ENTRY' ? "Category already exists." : "Error adding category.";
      res.render("adminDashboard", { page: "addCategory", msg: errorMsg });
    });
};

exports.viewCategories = (req, res) => {
    adminModel.getAllCategories()
      .then((categories) => {
        res.render("viewCategory.ejs", { categories });
      })
      .catch((err) => {
        console.error(err);
        res.render("viewCategory.ejs", { categories: [], msg: "Failed to fetch categories." });
      });
  };
