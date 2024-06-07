
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routesproducts'); 
const logger = require('./middlewarelogger');


const app = express();


const uri = 'mongodb+srv://rubachuk7:1111@cluster0.qiqzm77.mongodb.net/';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.use(express.json());

app.use(logger);

app.use('/api', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
