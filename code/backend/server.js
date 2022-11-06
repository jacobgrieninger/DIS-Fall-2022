const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path');

//Connect Db
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/schedule', require('./routes/api/schedule'));
app.use('/api/staticSchedule', require('./routes/api/staticSchedule'));
app.use('/api/availability', require('./routes/api/availability'));
app.use('/api/timeoff', require('./routes/api/timeoff'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../production/build'));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../production', 'build', 'index.html')
    );
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
