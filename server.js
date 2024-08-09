const express = require('express');
const path = require('path');
const fs = require('fs');
const WebSocket = require('ws');

const app = express();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads')); // Serve static files from 'uploads' directory


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());

// Serve HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public', 'register.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));

app.get('/student/:username', (req, res) => {
    const { username } = req.params;
       
  let users = [];
  try {
    const data = fs.readFileSync('users.json', 'utf8');
    users = data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading or parsing users.json:', err);
    return res.status(500).send('Internal Server Error');
  }

  const user = users.find(user => user.username === username);
  console.log(user)
  
  if (user) {
    res.render('student', { username, user });
  } else {
    res.status(404).send('User not found');
  }
    res.render('student', { username, user });
});

app.get('/teacher', (req, res) => res.sendFile(path.join(__dirname, 'public', 'teacher.html')));

app.get('/aboutUs/:username', (req, res) => {
    const { username } = req.params;
       
  let users = [];
  try {
    const data = fs.readFileSync('users.json', 'utf8');
    users = data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading or parsing users.json:', err);
    return res.status(500).send('Internal Server Error');
  }

  const user = users.find(user => user.username === username);
  console.log(user)
  
  if (user) {
    res.render('aboutUs', { username, user });
  } else {
    res.status(404).send('User not found');
  }
    // res.render('aboutUs', { username, user });
});

app.get('/contactUs/:username', (req, res) => {
    const { username } = req.params;
       
  let users = [];
  try {
    const data = fs.readFileSync('users.json', 'utf8');
    users = data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading or parsing users.json:', err);
    return res.status(500).send('Internal Server Error');
  }

  const user = users.find(user => user.username === username);
  console.log(user)
  
  if (user) {
    res.render('contactUs', { username, user });
  } else {
    res.status(404).send('User not found');
  }
    // res.render('contactUs', { username, user });
});

app.get('/profile/:username', (req, res) => {
    const { username } = req.params;
       
  let users = [];
  try {
    const data = fs.readFileSync('users.json', 'utf8');
    users = data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading or parsing users.json:', err);
    return res.status(500).send('Internal Server Error');
  }

  const user = users.find(user => user.username === username);
  console.log(user)
  
  if (user) {
    res.render('profile', { username, user });
  } else {
    res.status(404).send('User not found');
  }
    // res.render('contactUs', { username, user });
});


app.get('/dashboard/:username', (req, res) => {
    const { username } = req.params;
    console.log(username)
     
  let users = [];
  try {
    const data = fs.readFileSync('users.json', 'utf8');
    users = data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading or parsing users.json:', err);
    return res.status(500).send('Internal Server Error');
  }

  const user = users.find(user => user.username === username);
  console.log(user)
  
  if (user) {
    res.render('student', { username, user });
  } else {
    res.status(404).send('User not found');
  }
    // res.render('student', { username, user });
});

// Handle user registration
app.post('/register', upload.single('profilePic'), (req, res) => {
    // console.log('File:', req.file); // Check file details
    // console.log('Body:', req.body); // Check form data

    const { username, password, role, phone, UserId } = req.body;
    const profilePic = req.file; // Access the uploaded profile picture

    if (!username || !password || !role || !phone || !UserId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    let users = [];
    try {
        const data = fs.readFileSync('users.json', 'utf8');
        users = data ? JSON.parse(data) : [];
    } catch (err) {
        console.error('Error reading or parsing users.json:', err);
        return res.status(500).json({ message: 'Error reading users data' });
    }

    if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already taken' });
    }

    // Save file path or URL instead of the file buffer
    const profilePicPath = profilePic ? `/uploads/${path.basename(profilePic.path)}` : null;

    users.push({ username, password, role, phone, UserId, profilePicPath });
    
    try {
        fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    } catch (err) {
        console.error('Error writing to users.json:', err);
        return res.status(500).json({ message: 'Error saving user data' });
    }

    res.json({ message: 'Registration successful' });
});

// Serve static files from the 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    let users = [];

    try {
        const data = fs.readFileSync('users.json', 'utf8');
        users = data ? JSON.parse(data) : [];
    } catch (err) {
        console.error('Error reading or parsing users.json:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        const redirectUrl = user.role === 'student' ? `/student/${username}` : `/teacher`;
        res.json({ success: true, redirectUrl });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

// File upload
app.post('/upload', upload.single('file'), (req, res) => {
    const { task, username } = req.body;
    const file = req.file;

    let files = [];
    try {
        const data = fs.readFileSync('files.json', 'utf8');
        files = data ? JSON.parse(data) : [];
    } catch (err) {
        console.error('Error reading or parsing files.json:', err);
    }

    files.push({
        username,
        task,
        fileData: file.filename,
        fileName: file.originalname,
        status: 'Initial Submit'
    });
    fs.writeFileSync('files.json', JSON.stringify(files, null, 2));
    res.json({ message: 'File uploaded successfully' });

    broadcastUpdate(username);
});

app.post('/update-status', (req, res) => {
    const { username, fileName, status } = req.body;

    let files = [];
    try {
        const data = fs.readFileSync('files.json', 'utf8');
        files = data ? JSON.parse(data) : [];
    } catch (err) {
        console.error('Error reading or parsing files.json:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    const file = files.find(file => file.username === username && file.fileName === fileName);
    if (file) {
        file.status = status;
        fs.writeFileSync('files.json', JSON.stringify(files, null, 2));
        res.json({ message: 'File status updated successfully' });

        broadcastUpdate(username);
    } else {
        res.status(404).json({ message: 'File not found' });
    }
});

// Get list of files
app.get('/files', (req, res) => {
    let files = [];
    try {
        const data = fs.readFileSync('files.json', 'utf8');
        files = data ? JSON.parse(data) : [];
    } catch (err) {
        console.error('Error reading or parsing files.json:', err);
    }
    res.json(files);
});

app.get('/file-status', (req, res) => {
    const { username } = req.query;
    let files = [];
    try {
        const data = fs.readFileSync('files.json', 'utf8');
        files = data ? JSON.parse(data) : [];
    } catch (err) {
        console.error('Error reading or parsing files.json:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    const userFiles = files.filter(file => file.username === username);
    res.json(userFiles);
});

// WebSocket server
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.type === 'subscribe') {
            ws.username = data.username;
        }
    });
});

function broadcastUpdate(username) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN && client.username === username) {
            client.send(JSON.stringify({ type: 'update', username }));
        }
    });
}

const server = app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});
