const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8000;
const initialData = require('./InitialData');
app.use(express.urlencoded());

let students = initialData;
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
app.get('/api/student', (req, res) => {
    res.json(students);
});
app.get('/api/student/:id', (req, res) => {
    const student = students.find((s) => s.id === parseInt(req.params.id));
    if (!student) {
      res.status(404).send('Student not found');
    } else {
      res.json(student);
    }
});

app.post('/api/student', (req, res) => {
    const { name, currentClass, division } = req.body;
    if (!name || !currentClass || !division) {
      res.status(400).send('Missing required fields');
    } else {
      const newStudent = {
        id: students.length + 1,
        name,
        currentClass,
        division,
      };
      students.push(newStudent);
      res.json({ id: newStudent.id });
    }
});
 
app.put('/api/student/:id', (req, res) => {
    const student = students.find((s) => s.id === parseInt(req.params.id));
    if (!student) {
      res.status(400).send('Invalid student ID');
    } else {
      const { name } = req.body;
      if (!name) {
        res.status(400).send('Invalid update');
      } else {
        student.name = name;
        res.json(student);
      }
    }
});
app.patch('/api/student/:id', (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) {
    res.status(400).send('Invalid student ID');
  } else {
    const { name } = req.body;
    if (!name) {
      res.status(400).send('Invalid update');
    } else {
      student.name = name;
      res.json(student);
    }
  }
});

app.delete('/api/student/:id', (req, res) => {
    const index = students.findIndex((s) => s.id === parseInt(req.params.id));
    if (index === -1) {
      res.status(404).send('Student not found');
    } else {
      students.splice(index, 1);
      res.send('Student deleted successfully');
    }
});


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   