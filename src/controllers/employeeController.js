const Employee = require('../models/employee');

// Create
const create = async (req, res) => {
  try {
    const { name, email, department, salary } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name and email required' });
    const employee = await Employee.createEmployee({ name, email, department, salary });
    res.status(201).json(employee);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Email already exists' });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all
const getAll = async (req, res) => {
  try {
    const search = req.query.search || "";
    const employees = await Employee.getAllEmployees(search);
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


// Get by id
const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await Employee.getEmployeeById(id);
    if (!emp) return res.status(404).json({ error: 'Employee not found' });
    res.json(emp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, department, salary } = req.body;
    const existing = await Employee.getEmployeeById(id);
    if (!existing) return res.status(404).json({ error: 'Employee not found' });
    const updated = await Employee.updateEmployee(id, { name, email, department, salary });
    res.json(updated);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Email already exists' });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Employee.deleteEmployee(id);
    if (!deleted) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { create, getAll, getOne, update, remove };
