const express = require('express');
const app = express();

const mongoose = require('mongoose');
const config = require('config');
const crawler = require('./crawler');
mongoose.connect(config.get('mongoURL'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => {
    console.log('MongoDB connected');
    if (config.get('initDB')) {
        crawler(db);
    }
});

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/jobs', require('./routes/api/jobs'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
