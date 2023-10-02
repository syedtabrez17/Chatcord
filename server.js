const express = require('express');
const path = require('path');

const app = express();

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000 || process.env.port;

app.listen(port, () => console.log(`Server running on port ${port}`));