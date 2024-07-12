const http = require('http');
const app = require('./App');

app.use(express.static('public'));


const port = process.env.PORT || 3000;
app.get('/favicon.ico', (req, res) => {
    res.status(204).end(); // No content response
});

const server = http.createServer(app);
server.listen(port,()=>{
    console.log('App is running on port '+port)
}) 
