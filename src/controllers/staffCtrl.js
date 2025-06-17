const staffModel = require("../models/staffModel");

exports.showAddForm = (req, res) => {
  res.render("addStaff", { msg: "" });
};

exports.addStaff = (req, res) => {
  staffModel.insertStaff(req.body)
    .then(() => res.render("addStaff", { msg: "Staff added successfully." }))
    .catch((err) => {
      console.error(err);
      res.render("addStaff", { msg: "Error adding staff." });
    });
};
exports.viewStaffs = (req, res) => {
    const search = req.query.search || "";
    staffModel.getAllStaffs(search)
      .then((data) => {
        res.render("viewStaff", { staffs: data, search, msg: "" });  // Always pass msg
      })
      .catch((err) => {
        console.error(err);
        res.render("viewStaff", {
          data: [],
          search: "",
          msg: "Error loading staff data."  // Now msg is defined
        });
      });
  };
  

exports.showEditForm = (req, res) => {
  const id = req.params.id;
  staffModel.getStaffById(id)
    .then((staff) => res.render("editStaff", { staff, msg: "" }))
    .catch((err) => {
      console.error(err);
      res.send("Error loading edit page");
    });
};

exports.updateStaff = (req, res) => {
  const id = req.params.id;
  staffModel.updateStaff(id, req.body)
    .then(() => res.redirect("/staffs/view"))
    .catch((err) => {
      console.error(err);
      res.send("Error updating staff");
    });
};

exports.deleteStaff = (req, res) => {
  const id = req.params.id;
  staffModel.deleteStaff(id)
    .then(() => res.redirect("/staffs/view"))
    .catch((err) => {
      console.error(err);
      res.send("Error deleting staff");
    });
};

