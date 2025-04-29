const express = require('express');
const app = express();
const PORT = process.env.PORT || 3010;
const connectDb = require('./config/db');
const authRoutes = require('./routes/authRoute');
const homeRoutes = require('./routes/homeRoute');
const adminRoutes = require('./routes/adminRoute');
// const imageRoutes = require('./routes/imageRoute');
const uploadImageRoutes = require('./routes/imageRoutes');
// middleware
app.use(express.json());

// route
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/image', uploadImageRoutes);

connectDb();
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
