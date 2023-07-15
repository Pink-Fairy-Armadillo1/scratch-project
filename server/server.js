const path = require('path');
const express = require('express');

const app = express();

const router = require('./routes/router');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


//app.use('/api', router);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});


app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);


app.use((err, req, res, _next) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }, 
  };
  const errorObj = Object.assign(err, defaultError);
  console.log(errorObj.log);
  const message = errorObj.message;
  res.status(errorObj.status).json(message);
});



app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});



module.exports = app;