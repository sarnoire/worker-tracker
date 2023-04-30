const connection = require('./db/connection');

connection.query(`
  SELECT employee.first_name, employee.last_name, role.title, department.name
  FROM employee
  JOIN role ON employee.role_id = role.id
  JOIN department ON role.department_id = department.id;
`, (error, results) => {
  if (error) {
    console.error('Error executing SQL query:', error);
  } else {
    console.log('Results:', results);
  }
});

connection.end((error) => {
  if (error) {
    console.error('Error closing MySQL database connection:', error);
  } else {
    console.log('Closed MySQL database connection.');
  }
});
