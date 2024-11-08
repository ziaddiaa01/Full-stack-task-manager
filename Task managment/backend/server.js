const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const requestLogger = require('./middleware/loggerMiddleware');  
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const errorHandler = require('./middleware/errorHandler');  
const cors = require('cors');
const app = express();

dotenv.config();

app.use(cors()); 

app.use(express.json());
app.use(requestLogger); 
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use(errorHandler);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('Server running')))
  .catch(err => console.log(err));
