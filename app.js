const express = require('express');
const app = express();
const port = 5000;
const {adduser,getUserData,getImages}=require('./controllers/usersController')
const cors = require('cors');
const upload=require('./multer');
const path = require('path');

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// app.get('/add', adduser);
app.post('/add',upload.array('images'), adduser);
app.get('/userDetails', getUserData);
app.get('/user/:userId', getImages);


// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
