const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'sdesantis',
  password: 'Ian10683',
  database: 'worker-tracker'
});

// Create the departments table
connection.query(`
  CREATE TABLE IF NOT EXISTS department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
  );
`, (error, results) => {
  if (error) {
    console.error('Error creating department table:', error);
  } else {
    console.log('Created department table.');
  }
});

// Create the roles table
connection.query(`
  CREATE TABLE IF NOT EXISTS role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
  );
`, (error, results) => {
  if (error) {
    console.error('Error creating role table:', error);
  } else {
    console.log('Created role table.');
  }
});

// Create the employees table
connection.query(`
  CREATE TABLE IF NOT EXISTS employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
  );
`, (error, results) => {
  if (error) {
    console.error('Error creating employee table:', error);
  } else {
    console.log('Created employee table.');
  }
});

// Insert initial data into the departments table
connection.query(`
  INSERT INTO department (name) VALUES
  ('Sales'),
  ('Marketing'),
  ('Engineering'),
  ('Finance');
`, (error, results) => {
  if (error) {
    console.error('Error inserting data into department table:', error);
  } else {
    console.log('Inserted data into department table.');
  }
});

// Insert initial data into the roles table
connection.query(`
  INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Manager', 80000.00, 1),
  ('Sales Representative', 50000.00, 1),
  ('Marketing Manager', 90000.00, 2),
  ('Marketing Coordinator', 40000.00, 2),
  ('Software Engineer', 100000.00, 3),
  ('DevOps Engineer', 120000.00, 3),
  ('Financial Analyst', 70000.00, 4);
`, (error, results) => {
  if (error) {
    console.error('Error inserting data into role table:', error);
  } else {
    console.log('Inserted data into role table.');
  }
});

// Insert initial data into the employees table
connection.query(`
  INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Doe', 2, 1),
  ('Bob', 'Smith', 3, NULL),
  ('Alice', 'Johnson', 4, 3),
  ('Dave', 'Lee', 5, NULL),
  ('Tom', 'Wong', 6, 5);
`, (error, results) => {
  if (error) {
    console.error('Error inserting data into employee table:', error);
  } else {
    console.log('Inserted data into employee table.');
}
});
   
module.exports = connection;
