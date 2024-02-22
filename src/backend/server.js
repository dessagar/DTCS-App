const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');
const OpenAI = require('openai');
const cors = require('cors')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // for generating JWT tokens

// header('Access-Control-Allow-Origin : *');
// header('Access-Control-Allow-Origin : POST,GET,OPTIONS,PIT,DELETE');
// header('Access-Control-Allow-Origin : Content-Type, X-Auth-Token, Origin, Authorization');


const app = express();
const port=3000;
app.use(cors());

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save with the original filename
  }
});

const upload = multer({ storage });

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// File upload route
app.post('/upload-file', upload.single('file'), (req, res) => {
  // Access the uploaded file details
  const uploadedFile = req.file;
  // Do something with the file, e.g., respond with a success message
  res.status(200).json({ message: 'File uploaded successfully', filename: uploadedFile.originalname });
});
app.get('/preview/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'public/uploads', filename);
  res.sendFile(filePath);
});

app.post('/upload-files-and-data', upload.array('files'), (req, res) => {

  const files = req.files;

  res.status(200).json({ message: 'Data and files uploaded successfully' ,filename: files.originalname});
});

const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true, // Allow cookies to be sent with the request
};

app.use(cors(corsOptions));
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


const openai = new OpenAI({ apiKey: "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"});

app.post('/ask-openai', async (req, res) => {
  const { userQuery } = req.body;

  try {
    // Make a request to OpenAI API
    const openaiResponse = await openai.completions.create({
      model: "text-davinci-003",
      prompt: userQuery,
      max_tokens: 100,
    });

    const answer = openaiResponse.choices[0].text;
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use(express.static('public')); 

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
 
//************************new code for database************************

// MongoDB connection
mongoose.connect('mongodb+srv://trainingapp111:VCot0hMvKkDwjDnv@cluster0.z8saabe.mongodb.net/?retryWrites=true&w=majority');
// mongoose.connect(process.env.MONGODB_URI);
// mongoose.connect(process.env.mongodb_connect_str);

// Define question schema
const questionSchema = new mongoose.Schema({
  text: String,
  userName: String,
  timestamp: { type: Date, default: Date.now },
  answered: { type: Boolean, default: false },
  answers: [{
    text: String,
    timestamp: { type: Date, default: Date.now }
  }]
});

const Question = mongoose.model('Question', questionSchema);


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: 'employee',
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'employee'],
    default: 'employee',
  },
});

const User = mongoose.model('User', userSchema);


app.use(bodyParser.json());

// Get all questions
app.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/questions', async (req, res) => {
  const question = new Question({
    text: req.body.text,
    userName: 'User' // Update with user information if available
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// app.post('/questions/:id/reply', async (req, res) => {
//   try {
//     const question = await Question.findById(req.params.id);
//     if (!question) {
//       return res.status(404).json({ message: 'Question not found' });
//     }

//     question.answers.push(req.body.answer); // Add new answer to the array
//     question.answered = true;

//     await question.save();

//     res.status(200).json({ message: 'Answer added successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.get('/questions/:id/answers', async (req, res) => {
//   try {
//     const question = await Question.findById(req.params.id);
//     if (!question) {
//       return res.status(404).json({ message: 'Question not found' });
//     }

//     res.json(question.answers);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post('/api/questions/:id/answers', async (req, res) => {
//   try {
//     const question = await Question.findById(req.params.id);
//     question.answers.push(req.body.answer);
//     await question.save();
//     res.json(question);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

app.post('/questions/:id/reply', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Push the new answer into the array of answers
    question.answers.push(req.body.answer);
    question.answered = true;

    await question.save();

    res.status(200).json({ message: 'Answer added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post multiple answers to a question
app.post('/questions/:id/answers', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Filter out existing answers
    const newAnswers = req.body.answers.filter(newAnswer => !question.answers.includes(newAnswer));

    // Push only new answers into the array of answers
    question.answers.push(...newAnswers);
    question.answered = true;

    await question.save();

    res.status(200).json({ message: 'Answers added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for handling user registration

// Routes setup
app.post('/signup', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Login route
// app.post('/login', async (req, res) => {
//   console.log('received login request..');
//   try {
//     const { username, password } = req.body;

//     // Find user by username
//     const user = await User.findOne({ username });

    // Check if the user exists
    // if (!user) {
    //   console.log('user not found');
      // return res.status(401).json({ message: 'Invalid username or password' });
    // }

    // Compare the password
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   console.log('invalid password');
      // return res.status(401).json({ message: 'Invalid username or password' });
    // }

    // Generate JWT token
    // const token = jwt.sign({ userId: user._id, username: user.username }, '905ff3a2d0202cdc929f98296190703bb1e7ad96a94e8645279f3819807672f7fcdd9b766f4baf82465d792e1bdfbc6490d2c0106f8378a0e20e2483f9ae38b2', {
    //   expiresIn: '1h', // token expires in 1 hour
    // });

//     res.status(200).json({ token, expiresIn: 3600, role: user.role });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
//=================================================================================================================================
async function rehashExistingPasswords() {
  try {
    // Fetch all users from the database
    const users = await User.find().maxTimeMS(50000);

    // Loop through users and rehash passwords
    // for (const user of users) {
    //   const hashedPassword = await bcrypt.hash(user.password, 10);
    //   user.password = hashedPassword;
    //   await user.save();
    // }

    const batchSize = 200; // Adjust based on your needs

for (let i = 0; i < users.length; i += batchSize) {
  const batch = users.slice(i, i + batchSize);
  await Promise.all(batch.map(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    await user.save();
  }));
}

    console.log('Passwords rehashed successfully.');
  } catch (error) {
    console.error('Error rehashing passwords:', error);
  }
}

// Call the function to rehash existing passwords
rehashExistingPasswords();

//=====================================================================================================================================
//================================================new login code====================================================
app.post('/login', async (req, res) => {
  console.log('received login request..');
  try {
    const { username, password , role} = req.body;

    // Find user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      console.log('user not found');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if the user has a plain text password
    // if (user.password === password) {
      // Authenticate using plain text (temporary solution)
      // console.log('Login successful with plain text password');

      // Generate JWT token for the user
      // const token = jwt.sign({ userId: user._id, username: user.username }, '905ff3a2d0202cdc929f98296190703bb1e7ad96a94e8645279f3819807672f7fcdd9b766f4baf82465d792e1bdfbc6490d2c0106f8378a0e20e2483f9ae38b2', {
      //   expiresIn: '1h', // token expires in 1 hour
      // });

      // return res.status(200).json({ message: 'Login successful', token, expiresIn: 3600, role: user.role });
    // }


    console.log('Entered password:', password);
console.log('Stored password:', user.password);
    // If not, compare using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('invalid password');
      // return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Authentication successful using bcrypt

    // Generate JWT token for the user
    const token = jwt.sign({ userId: user._id, username: user.username }, '905ff3a2d0202cdc929f98296190703bb1e7ad96a94e8645279f3819807672f7fcdd9b766f4baf82465d792e1bdfbc6490d2c0106f8378a0e20e2483f9ae38b2', {
      expiresIn: '1h', // token expires in 1 hour
    });

    return res.status(200).json({ message: 'Login successful', token, expiresIn: 3600, role: user.role });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//==========================================================================================================================================

// Add this to your server.js or relevant file
const slideSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  performer: String,
  image: String,
  externalVideos: [
    {
      videoTitle: String,
      videoDescription: String,
      youtubeUrl: String,
    },
  ],
  internalVideos: [
    {
      videoTitle: String,
      videoDescription: String,
      localVideoFile: String,
    },
  ],
  selectedModules: [String],
  timestamp: { type: Date, default: Date.now },
});

const SlideModel = mongoose.model('Slide', slideSchema);

app.post('/slides', async (req, res) => {
  const slideData = req.body;

  try {
    const newSlide = await SlideModel.create(slideData);
    res.status(201).json(newSlide);
  } catch (error) {
    console.error('Error adding slide:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/slides', async (req, res) => {
  try {
    const slides = await SlideModel.find();
    res.status(200).json(slides);
  } catch (error) {
    console.error('Error retrieving slides:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Delete a slide by ID
app.delete('/slides/:id', async (req, res) => {
  const slideId = req.params.id;

  try {
    // Use the findByIdAndDelete method to remove the slide by ID
    const deletedSlide = await SlideModel.findByIdAndDelete(slideId);

    if (deletedSlide) {
      res.status(204).send(); // Successfully deleted
    } else {
      res.status(404).json({ message: 'Slide not found' });
    }
  } catch (error) {
    console.error('Error deleting slide:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Update a slide by ID
app.put('/slides/:id', async (req, res) => {
  const slideId = req.params.id;
  const updatedSlideData = req.body;

  try {
    const updatedSlide = await SlideModel.findByIdAndUpdate(
      slideId,
      updatedSlideData,
      { new: true }
    );

    if (updatedSlide) {
      res.status(200).json(updatedSlide);
    } else {
      res.status(404).json({ message: 'Slide not found' });
    }
  } catch (error) {
    console.error('Error updating slide:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint for uploading images
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ filename: req.file.filename });
});

// Endpoint for uploading videos
app.post('/upload-video', upload.single('video'), (req, res) => {
  res.json({ filename: req.file.filename });
});

const titleDescriptionSchema = new mongoose.Schema({
  title: String,
  description: String,
  timestamp: { type: Date, default: Date.now },
});

const TitleDescriptionModel = mongoose.model('TitleDescription', titleDescriptionSchema);

app.post('/store-content', async (req, res) => {
  const { title, description } = req.body;

  try {
    // Save title and description separately
    const newTitleDescription = await TitleDescriptionModel.create({ title, description });

    // For demonstration, print the saved data to console
    console.log('Title and Description saved:', newTitleDescription);

    // You should perform the logic to store 'content' in your database here

    res.status(200).json({ message: 'Data stored successfully' });
  } catch (error) {
    console.error('Error storing data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/update-content', async (req, res) => {
  console.log('Received update request:', req.body);
  const { title, description, content } = req.body;

  try {
    // Find the existing document by title and description
    const existingDocument = await TitleDescriptionModel.findOne({ title, description });

    if (!existingDocument) {
      // If the document doesn't exist, handle accordingly (e.g., send a 404 response)
      res.status(404).json({ message: 'Document not found' });
      return;
    }

    // Update the title and description fields in the existing document
    existingDocument.title = title;
    existingDocument.description = description;
    existingDocument.content = content; // Update content if needed

    await existingDocument.save();

    // For demonstration, print the updated data to console
    console.log('Title, description, and content updated:', existingDocument);
    console.log('Update complete.');

    res.status(200).json({ message: 'Title, description, and content updated successfully' });
  } catch (error) {
    console.error('Error updating title, description, and content:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/get-title-description', async (req, res) => {
  try {
    // Retrieve title and description data from the database
    const titleDescriptionData = await TitleDescriptionModel.find({}, 'title description');
    res.status(200).json(titleDescriptionData);
  } catch (error) {
    console.error('Error fetching title and description data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.delete('/delete-title-description/:id', async (req, res) => {
  const itemId = req.params.id;

  try {
    // Delete the item from the database using its ID
    await TitleDescriptionModel.findByIdAndDelete(itemId);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  eligibility: {
    type: String,
    required: false, // Make it optional
  },
  chosenOption: {
    type: String,
    required: true,
  },
  textareaContent: {
    type: String,
    required: false, // Make it optional
  },
  // Add other fields as needed
});

const DataModel = mongoose.model('Data', dataSchema);


app.post('/submitData', async (req, res) => {
  try {
    const { name, eligibility, chosenOption, textareaContent } = req.body;

    const newData = new DataModel({
      name,
      eligibility,
      chosenOption,
      textareaContent,
      // Add other fields as needed
    });
// subject
    await newData.save();

    res.status(201).json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      console.error('Validation error:', errors);
      res.status(400).json({ success: false, errors });
    } else {
      console.error('Error saving data:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
});
// Add this route after the existing route for saving data
app.get('/getRecentData', async (req, res) => {
  try {
    const recentData = await DataModel.find().sort({ _id: -1 }).limit(1);

    res.status(200).json(recentData);
  } catch (error) {
    console.error('Error fetching recent data:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/api/subjects', (req, res) => {
  const { chosenOption } = req.query;
  Subject.find({ chosenOption })
    .then(subjects => {
      res.json(subjects);
    })
    .catch(error => {
      console.error('Error fetching subjects:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
