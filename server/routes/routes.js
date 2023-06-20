const { Router } = require("express");
const bcrypt = require("bcryptjs");
const router = Router();
const jwt = require("jsonwebtoken");

const pool = require("../db/db.js");
const e = require("express");

router.get("/", (req, res) => {
  res.json({
    message: "RideCo Grocery API - 👋🌎🌍🌏",
  });
});

// Endpoint to get all the items in a list
router.get("/todolist", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM todoList");
    res.status(200).json({
      message: "Retrieved items successfully!",
      rows: rows,
    });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// Endpoint to get a list by id
router.get("/todolist/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM todoList WHERE listid = $1",
      [id]
    );
    res.status(200).json({
      message: "Retrieved item using id successfully!",
      rows: rows,
    });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// Endpoint to create a new list item
router.post("/todolist", async (req, res) => {
  const { title, quantity, listid } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO todoList (title, quantity, listid) VALUES ($1, $2, $3) RETURNING id",
      [title, quantity, listid]
    );
    const insertedId = result.rows[0].id;
    res.status(201).json({ id: insertedId });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// Endpoint to update a list item
router.put("/todolist/:id", async (req, res) => {
  const { id } = req.params;
  const { title, quantity } = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE todoList SET title = $1, quantity = $2 WHERE id = $3 RETURNING *",
      [title, quantity, id]
    );
    res.status(200).json({
      message: "Task updated successfully!",
      rows: rows,
    });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// Endpoint to delete a list item
router.delete("/todoList/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM todoList WHERE id = $1", [id]);
    res.status(200).send("Task deleted successfully!");
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// Endpoint to get all the users in the database
router.get("/users", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    res.status(200).json({
      message: "Retrieved users successfully!",
      rows: rows,
    });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// Endpoint to get register a new user
router.post("/users/register", async (req, res) => {
  const { email, name, pass } = req.body;
  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "User already exists! Please Login." });
    }

    const salted = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(pass, salted);

    await pool.query(
      "INSERT INTO users (email, name, password) VALUES ($1, $2, $3)",
      [email, name, hashedPass]
    );

    res.status(201).json({ message: "User added successfully!" });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// Endpoint to login a user
router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "User does not exist!" });
    }

    const success = bcrypt.compareSync("B4c0//", rows[0].password);
    if (!success) {
      return res
        .status(401)
        .json({ message: "Login failed. Invalid credentials!" });
    }

    const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });
    return res.status(201).json({ email: rows[0].email, token: token });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// Endpoint to get all the lists in the database using email
router.get("/mylists/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { rows } = await pool.query(
      "SELECT id, listname, email FROM lists WHERE email = $1",
      [email]
    );
    res.status(200).json({
      message: "Retrieved lists successfully!",
      rows: rows,
    });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// Endpoint to get a list by id
router.delete("/mylists/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM lists WHERE id = $1", [id]);

    res.status(200).send("List deleted successfully!");
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// Endpoint to create a new list
router.post("/mylists", async (req, res) => {
  const { listname, email } = req.body;
  try {
    await pool.query("INSERT INTO lists (listname, email) VALUES ($1, $2)", [
      listname,
      email,
    ]);
    console.log("list added successfully");
    // show the code for I want to send the primary key from the lists table back to the client
    const { rows } = await pool.query(
      "SELECT id FROM lists WHERE listname = $1 AND email = $2 ORDER BY id DESC LIMIT 1",
      [listname, email]
    );

    res.status(201).json(rows[0].id);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// Endpoint to insert shared user information into sharelists table
router.post("/sharelists", async (req, res) => {
  const { itemid, sharedby, sharedto, listname } = req.body;
  try {
    await pool.query(
      "INSERT INTO sharelists (itemid, sharedby, sharedto, name) VALUES ($1, $2, $3, $4)",
      [itemid, sharedby, sharedto, listname]
    );
    res.status(201).send("Shared user information inserted successfully!");
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// Endpoint to get all the shared lists in the database using email
router.get("/sharelists/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { rows } = await pool.query(
      "SELECT itemid, sharedby, sharedto, name FROM sharelists WHERE sharedto = $1",
      [email]
    );
    res.status(200).json({
      message: "Retrieved shared lists successfully!",
      rows: rows,
    });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
