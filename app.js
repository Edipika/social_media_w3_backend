const express = require('express');
const app = express();
const port = 5000;
const {adduser,getUserData}=require('./controllers/usersController')
const cors = require('cors');
const upload=require('./multer');

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
  };

app.use(cors(corsOptions));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// app.get('/add', adduser);
app.post('/add',upload.array('images'), adduser);
app.get('/userDetails', getUserData);

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
