const express = require ('express');
const bodyParser = require ('body-parser');
const ejs = require ('ejs');
const Nexmo = require ('nexmo');
const socketio = require ('socket.io');

// Init Nexmo
const nexmo = new Nexmo({
  apiKey: '32faece6',
  apiSecret: 'z0pltuvuKjKkbNRE'
}, {debug: true});

// Init App
const app = express();

// Template Engine
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Public folder Setup
app.use(express.static(__dirname + '/public'));

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index route
app.get('/', (req, res) => {
  res.render('index');
});

// Catch form submit
app.post('/', (req, res) => {
  const number = req.body.number;
  const text = req.body.text;

  nexmo.message.sendSms(
    '60147130680', number, text, { type: 'unicode' },
    (err, responseData) => {
      if(err) {
        console.log(err);
      } else {
        console.dir(responseData);
      }
    }
  );
});

// Define port
const port = 3000;

// Start server
const server = app.listen(port, () => console.log(`Server started on port ${port}`));
