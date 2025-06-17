const menuModel = require("../models/menuModel.js");

exports.addMenuPage = (req, res) => {
  menuModel.getCategories().then((categories) => {
    res.render("addMenu.ejs", { categories, msg: "" });
  });
};

exports.addMenu = (req, res) => {
  const { item_name, category_id, price, description } = req.body;
  const image = req.file ? req.file.filename : null;                   //Grab file name if an image was uploade

  const data = { item_name, category_id, price, description, image };

  menuModel.insertMenu(data)
    .then(() => {
      return menuModel.getCategories();
    })
    .then((categories) => {
      res.render("addMenu.ejs", { categories, msg: "Menu item added successfully." });
    })
    .catch((err) => {
      console.error(err);
      res.render("addMenu.ejs", { categories: [], msg: "Error adding menu item." });
    });
};
exports.viewMenus = (req, res) => {
    const search = req.query.search || "";
    menuModel.getMenus(search).then(menus => {
      res.render("viewMenus.ejs", { menus, search });
    }).catch(err => {
      console.error(err);
      res.render("viewMenus.ejs", { menus: [], search: "", msg: "Failed to load menus." });
    });
  };
  
  exports.editMenuPage = (req, res) => {
    const menuId = req.params.id;
    Promise.all([
      menuModel.getMenuById(menuId),
      menuModel.getCategories()
    ])
    .then(([menu, categories]) => {
      res.render("editMenu.ejs", { menu, categories, msg: "" });
    })
    .catch((err) => {
      console.error(err);
      res.send("Error loading edit page");
    });
  };
  
  // Update Menu
  exports.updateMenu = (req, res) => {
    const menuId = req.params.id;
    const { item_name, category_id, price, description } = req.body;
    const image = req.file ? req.file.filename : req.body.old_image;     // Keep old image if no new image uploaded
  
    const updatedData = { item_name, category_id, price, description, image };
  
    menuModel.updateMenu(menuId, updatedData)
      .then(() => res.redirect("/menu/view"))
      .catch((err) => {
        console.error(err);
        res.send("Error updating menu item");
      });
  };
  
  // Delete Menu
  exports.deleteMenu = (req, res) => {
    const menuId = req.params.id;
    menuModel.deleteMenu(menuId)
      .then(() => res.redirect("/menu/view"))
      .catch((err) => {
        console.error(err);
        res.send("Error deleting menu item");
      });
  };
  exports.searchMenus = (req, res) => {
    const search = req.query.search || "";
    menuModel.getMenus(search)
      .then(menus => {
        res.render("viewMenus.ejs", { menus, search, layout: false });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error loading menus.");
      });
  };
  