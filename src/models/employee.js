const pool = require('../db');

const createEmployee = async ({ name, email, department, salary }) => {
  const sql = 'INSERT INTO employees (name, email, department, salary) VALUES (?, ?, ?, ?)';
  const [result] = await pool.execute(sql, [name, email, department, salary]);
  return { id: result.insertId, name, email, department, salary };
};

const getAllEmployees = async (search) => {
  if (search) {
    const s = `%${search}%`;
    const [rows] = await pool.query(
      "SELECT * FROM employees WHERE name LIKE ? OR email LIKE ? ORDER BY id DESC",
      [s, s]
    );
    return rows;
  }

  const [rows] = await pool.query("SELECT * FROM employees ORDER BY id DESC");
  return rows;
};

const getEmployeeById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [id]);
  return rows[0];
};

const updateEmployee = async (id, { name, email, department, salary }) => {
  const sql = 'UPDATE employees SET name = ?, email = ?, department = ?, salary = ? WHERE id = ?';
  await pool.execute(sql, [name, email, department, salary, id]);
  return getEmployeeById(id);
};

const deleteEmployee = async (id) => {
  const [result] = await pool.execute('DELETE FROM employees WHERE id = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
