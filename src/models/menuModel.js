const conn = require("../config/db");

// ---------- insert ----------
exports.insertMenu = (data) => {
  const sql = `insert into menu (item_name, category_id, price, description, image)
               values (?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    conn.query(
      sql,
      [data.item_name, data.category_id, data.price, data.description, data.image],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// ---------- get all categories ----------
exports.getCategories = () => {
  return new Promise((resolve, reject) => {
    conn.query("select * from category", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// ---------- search / list menus ----------
exports.getMenus = (search) => {
  const sql = `
    select m.id,
           m.item_name,
           c.name as category,
           m.price,
           m.description
    from menu m
    join category c on m.category_id = c.id
    where m.item_name like ?
       or c.name like ?
       or m.description like ?
  `;
  const keyword = `%${search}%`;
  return new Promise((resolve, reject) => {
    conn.query(sql, [keyword, keyword, keyword], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// ---------- get single menu by id ----------
exports.getMenuById = (id) => {
  return new Promise((resolve, reject) => {
    conn.query("select * from menu where id = ?", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

// ---------- update menu ----------
exports.updateMenu = (id, data) => {
  const sql = `
    update menu
       set item_name   = ?,
           category_id = ?,
           price       = ?,
           description = ?,
           image       = ?
     where id = ?
  `;
  return new Promise((resolve, reject) => {
    conn.query(
      sql,
      [data.item_name, data.category_id, data.price, data.description, data.image, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// ---------- delete menu ----------
exports.deleteMenu = (id) => {
  return new Promise((resolve, reject) => {
    conn.query("delete from menu where id = ?", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
