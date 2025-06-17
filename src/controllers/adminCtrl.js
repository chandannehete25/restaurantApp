const adminModel = require("../models/adminModel");

exports.addCategory = (req, res) => {
  const categoryName = req.body.name;

  if (!categoryName) {
    return res.render("adminDashboard", {
      page: "addCategory",
      msg: "Category name required.",
    });
  }

  adminModel
    .insertCategory(categoryName)
    .then(() => {
      res.render("adminDashboard", {
        page: "addCategory",
        msg: "Category added successfully.",
      });
    })
    .catch((err) => {
      console.error(err);
      let errorMsg =
        err.code === "ER_DUP_ENTRY"
          ? "Category already exists."
          : "Error adding category.";
      res.render("adminDashboard", { page: "addCategory", msg: errorMsg });
    });
};

exports.viewCategories = (req, res) => {
  adminModel
    .getAllCategories()
    .then((categories) => {
      res.render("viewCategory.ejs", { categories });
    })
    .catch((err) => {
      console.error(err);
      res.render("viewCategory.ejs", {
        categories: [],
        msg: "Failed to fetch categories.",
      });
    });
};

exports.editCategoryPage = (req, res) => {
  const categoryId = req.params.id;

  adminModel
    .getCategoryById(categoryId)
    .then((category) => {
      res.render("editCategory", { category });
    })
    .catch((err) => {
      console.error(err);
      res.redirect("/viewCategory");
    });
};

exports.updateCategory = (req, res) => {
  const { id, name } = req.body;

  if (!name) {
    return res.render("editCategory", {
      category: { id, name },
      msg: "Category name required.",
    });
  }

  adminModel
    .updateCategoryById(id, name)
    .then(() => {
      res.redirect("/viewCategory");
    })
    .catch((err) => {
      console.error(err);
      res.render("editCategory", {
        category: { id, name },
        msg: "Error updating category.",
      });
    });
};

exports.deleteCategory = (req, res) => {
  const id = req.params.id;

  adminModel
    .deleteCategoryById(id)
    .then(() => {
      res.redirect("/viewCategory");
    })
    .catch((err) => {
      console.error(err);
      res.redirect("/viewCategory");
    });
};
// exports.searchCategoriesAjax = (req, res) => {
//     const search = req.query.search || "";
  
//     const sql = "SELECT * FROM category WHERE name LIKE ?";
//     conn.query(sql, [`%${search}%`], (err, result) => {
//       if (err) {
//         console.error("Search error:", err);
//         return res.status(500).json({ error: "Failed to fetch categories" });
//       }
//       res.json(result);
//     });
//   };

exports.searchCategoriesAjax = (req, res) => {
    const search = req.query.search || "";
  
    adminModel
      .searchCategories(search)
      .then((categories) => {
        res.json(categories);
      })
      .catch((err) => {
        console.error("Search error:", err);
        res.status(500).json({ error: "Failed to fetch categories" });
      });
  };

  exports.dashboard = (req, res) => {
    res.render("adminDashboard");
  };
  
  
  