
const mysql = require('mysql2');
const express = require('express');
const path = require('path');
const app = express();
//var connection=require('./database');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'farewell',
  });

app.get('/',function(req,res){
    let sql="SELECT * FROM Student";
    connection.query(sql,function(err,results){
        if (err) throw err;
        res.send(results);
    });
});

app.listen(3001,function(){
    console.log('Appn listening on port 3001');
    connection.connect(function(err){
        if (err) throw err;
        console.log('Database connected! ');
    });
});

const bodyParser = require('body-parser');

// Use bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/dashboard', async(req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
  });
  app.get('/signupteacher', async(req, res) => {
    res.sendFile(path.join(__dirname, 'signupteacher.html'));
  });
  app.post('/signupteacher', function(req, res) {
    const { TeacherID, FirstName, LastName, UserName, Password } = req.body;
    // Insert the data into the person table
  let sql = `
  INSERT INTO Teacher (TeacherID, FirstName, LastName, UserName, Password)
  VALUES (?, ?, ?, ?, ?)
`;
connection.query(sql, [TeacherID, FirstName, LastName, UserName, Password], function(err, results) {
  if (err) {
    console.error(err);
    res.json({ authentication: false, message: 'Error occurred during signup' });
  } else {
    res.json({ authentication: true, message: 'Signup successful' });
  }
});
});
app.get('/signupstudent', async(req, res) => {
  res.sendFile(path.join(__dirname, 'signupstudent.html'));
});
app.post('/signupstudent', function(req, res) {
  const { StudentID,LastName, FirstName, Password,UserName,DietaryPreferences  } = req.body;
  // Insert the data into the person table
let sql = `
INSERT INTO Student (StudentID,LastName, FirstName, Password,UserName,DietaryPreferences)
VALUES (?, ?, ?, ?, ?,?)
`;
connection.query(sql, [StudentID,LastName, FirstName, Password,UserName,DietaryPreferences], function(err, results) {
if (err) {
  console.error(err);
  res.json({ authentication: false, message: 'Error occurred during signup' });
} else {
  res.json({ authentication: true, message: 'Signup successful' });
}
});
});
  app.get('/loginteacher', async(req, res) => {
    res.sendFile(path.join(__dirname, 'loginteacher.html'));
  });
  app.get('/loginteam', async(req, res) => {
    res.sendFile(path.join(__dirname, 'loginteam.html'));
  });
  
  app.get('/loginstudent', async(req, res) => {
    res.sendFile(path.join(__dirname, 'loginstudent.html'));
  });
  app.get('/report', async(req, res) => {
    res.sendFile(path.join(__dirname, 'report.html'));
  });
  app.get('/loginorganizer', async(req, res) => {
    res.sendFile(path.join(__dirname, 'loginorganizer.html'));
  });
  app.get('/organizerpage', async(req, res) => {
    res.sendFile(path.join(__dirname, 'organizerpage.html'));
  });
  app.get('/teacherpage', async(req, res) => {
    res.sendFile(path.join(__dirname, 'teacherpage.html'));
  });
  app.get('/teampage', async(req, res) => {
    res.sendFile(path.join(__dirname, 'teampage.html'));
  });
  app.get('/invitation', async(req, res) => {
    res.sendFile(path.join(__dirname, 'invitation.html'));
  });
  app.get('/dinnerplan', async(req, res) => {
    res.sendFile(path.join(__dirname, 'dinnerplan.html'));
  });
  
  app.post('/dinnerplan', function(req, res) {
    const { SuggestionID, ItemNames, Votes, StudentID,TeacherID } = req.body;
  
    // Insert the data into the person table
    let sql = `
      INSERT INTO MenuSuggestion (SuggestionID, ItemNames, Votes)
      VALUES (?, ?, ?)
    `;
    connection.query(sql, [SuggestionID, ItemNames, Votes, StudentID,TeacherID], function(err, results) {
      if (err) {
        console.error(err);
        res.json({ authentication: false, message: 'Error occurred ' });
      } else {
        res.json({ authentication: true, message: 'Added' });
      }
    });
  });
  app.get('/theme', async(req, res) => {
    res.sendFile(path.join(__dirname, 'theme.html'));
  });
  app.get('/reldetail', async(req, res) => {
    res.sendFile(path.join(__dirname, 'reldetail.html'));
  });
  app.get('/perproposal', async(req, res) => {
    res.sendFile(path.join(__dirname, 'perproposal.html'));
  });
  app.post('/perproposal', function(req, res) {
    const { ProposeID, PerformanceType, SpecialRequirements, Duration,Votes } = req.body;
  
    // Insert the data into the person table
    let sql = `
      INSERT INTO PerformanceProposal (ProposeID, PerformanceType, SpecialRequirements, Duration,Votes)
      VALUES (?, ?, ?, ?,?)
    `;
    connection.query(sql, [ProposeID, PerformanceType, SpecialRequirements, Duration,Votes], function(err, results) {
      if (err) {
        console.error(err);
        res.json({ authentication: false, message: 'Error occurred ' });
      } else {
        res.json({ authentication: true, message: 'Added' });
      }
    });
  });