//This code is written by Harshit Gupta(Certifyme).
const express= require('express') // This line imports the Express.js module and assigns it to the variable express.
const axios = require('axios')  // This line imports the Axios library and assigns it to the variable axios.
const port = process.env.PORT || 3000;  
// This line sets the port for the server to either the value of the environment variable "PORT" or 3000 if it is not defined.

const app = express();  // This line creates a new instance of an Express application and assigns it to the variable app.
const router = express.Router();  // This line creates a new router object for an Express application and assigns it to the variable router.
const bodyParser = require('body-parser');  // This line imports the body-parser middleware library and assigns it to the variable bodyParser.
const path = require('path') // This line imports the built-in Node.js path module and assigns it to the variable path.
var name;   // This line declares a global variable named 'name' without assigning it a value.
var email;   // This line declares a global variable named 'email' without assigning it a value.

const username="your account of certifyme"; 
// This line declares a global constant variable named username and assigns it the value "your account of certifyme".
const password="your password of certifyme";    
// This line declares a global constant variable named password and assigns it the value "your password of certifyme".

app.use(bodyParser.urlencoded({extended: true})) 
// This line adds middleware to the Express app that parses incoming request bodies
// with URL-encoded payloads and makes the resulting data available on the `req.body` object.
// The `extended` option allows for parsing of rich objects and arrays, and is set to `true`.
// This middleware is necessary to handle form submissions and other types of requests that
// send data in the request body.

//api middlewares
app.use(express.static('public'));  
// This line serves static files such as images, CSS files, and JavaScript files from a directory named public in the Express application.

router.get('/',function(req,res){ // This code sends the index.html file located in the public directory to the client, 
    res.sendFile(path.join(__dirname+'/public/index.html'));  //when a GET request is made to the root URL ("/").
     //__dirname : It will resolve to your project folder.
});
  

//Api middlewares
app.get('/form',(req,res)=>{  // This code sends the index.html file located in the public directory to the client,
    res.sendFile(__dirname + '/public/index.html'); // when a GET request is made to the "/form" URL.
})

app.post('/',(req,res)=>{ // This code logs the request body data sent in a POST request to the root URL ("/") in the server console.
    console.log(req.body);
})

app.post('/formPost',(req,res)=>{  // This code logs the request body data sent in a POST request to the "/formPost" URL in the server console.
  console.log(req,body);  
})

// This code handles a POST request to the "/Create_Credential" URL and assigns the values
// of the "name1" and "email" fields in the request body to variables name and email, respectively.
app.post('/Create_Credential', function(req, res) {  
    name=req.body.name1;
    email=req.body.email;
    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
    // The token variable is created by encoding the username and password variables as a base64 string using the Buffer object.
    // The purpose of the token is likely to be used for authentication or authorization purposes.
    const data = {"name": name,  
                  "template_ID":5020, 
                  "email": email,
                  "text": "VP Quadralogics", 
                  "license_number": "TPR-1267Af23",
                   "verify_mode": "Passport Number", 
                   "verify_code": "13678AJKJY678JHGP0" };
    // This line creates an object named data with key-value pairs representing various data fields, 
    //such as name, email, license_number, and verify_code.
        
    
    
    // This code sends a POST request to the "https://my.certifyme.online/api/v1/credential" URL 
    // with data in the data object and an Authorization header containing a token.
    axios.post("https://my.certifyme.online/api/v1/credential",data,{
        headers:{
        'Authorization': `Basic ${token}`
        }}
        ).then((response)=>{  // If the request is successful, the response data is stored in a global variable responsedata.
            responsedata = response.data;
        }).catch((err)=>{
            console.log(err);
        })
    res.redirect('/form');  // The code then redirects the client to the "/form" URL.
    });

// This code starts the server and listens for incoming requests on the specified port.
// When the server starts, it logs a message to the console indicating the server's URL.
app.listen(port,()=>{ 
    console.log(`Server started at http://localhost:${port}`) 
});
