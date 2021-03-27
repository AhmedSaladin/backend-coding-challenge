const express = require('express');
const app = express();
const route = require('./route/home');


app.use(route);

// Error handler.
app.use((err, req, res, next) => {
    if (err) {
        res.status(500);
        res.send('something went wrong try later.')
    }
})

// Server configuration.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
})