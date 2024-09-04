const express = require('express');
const promClient = require('prom-client');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set the public folder for static assets
app.use(express.static(path.join(__dirname, 'public')));

// Initialize a Registry to register the metrics
const register = new promClient.Registry();

// Create a default metrics collector and register it
promClient.collectDefaultMetrics({ register });

// Create a custom metric (example: a counter for page views)
const pageViewCounter = new promClient.Counter({
  name: 'page_views_total',
  help: 'Total number of page views',
});

// Define routes
app.get('/', (req, res) => {
    pageViewCounter.inc(); // Increment the counter for page views
    res.render('home');
});

app.get('/services', (req, res) => {
    pageViewCounter.inc(); // Increment the counter for page views
    res.render('services');
});

app.get('/contact', (req, res) => {
    pageViewCounter.inc(); // Increment the counter for page views
    res.render('contact');
});

// Define the metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



// const express = require('express');
// const promClient = require('prom-client');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Set the view engine to EJS
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // Set the public folder for static assets
// app.use(express.static(path.join(__dirname, 'public')));

// // Define routes
// app.get('/', (req, res) => {
//     res.render('home');
// });

// app.get('/services', (req, res) => {
//     res.render('services');
// });

// app.get('/contact', (req, res) => {
//     res.render('contact');
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
