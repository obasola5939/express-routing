// app.js - Main server file
const express = require('express');
const path = require('path');
const workingHoursMiddleware = require('./middleware/workingHours');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(workingHoursMiddleware); // Apply working hours middleware

// Set view engine (optional - using EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define route data for consistency
const siteData = {
  title: 'Business Solutions Inc.',
  navLinks: [
    { name: 'Home', path: '/' },
    { name: 'Our Services', path: '/services' },
    { name: 'Contact Us', path: '/contact' }
  ],
  workingHours: 'Monday-Friday, 9 AM - 5 PM',
  currentYear: new Date().getFullYear()
};

// Routes
app.get('/', (req, res) => {
  const pageData = {
    ...siteData,
    pageTitle: 'Home - Business Solutions',
    heroTitle: 'Welcome to Business Solutions',
    heroSubtitle: 'Your trusted partner for innovative solutions',
    features: [
      {
        title: 'Expert Consultation',
        description: 'Get expert advice from industry professionals.',
        icon: '💼'
      },
      {
        title: '24/7 Support',
        description: 'Round-the-clock support for your business needs.',
        icon: '🛡️'
      },
      {
        title: 'Custom Solutions',
        description: 'Tailored solutions for your unique requirements.',
        icon: '⚙️'
      }
    ]
  };
  res.render('home', pageData);
});

app.get('/services', (req, res) => {
  const pageData = {
    ...siteData,
    pageTitle: 'Our Services - Business Solutions',
    services: [
      {
        name: 'Web Development',
        description: 'Custom web applications and websites built with modern technologies.',
        price: '$2,000 - $10,000',
        features: ['Responsive Design', 'SEO Optimization', 'Content Management']
      },
      {
        name: 'Digital Marketing',
        description: 'Comprehensive digital marketing strategies to grow your online presence.',
        price: '$500 - $3,000/month',
        features: ['SEO', 'Social Media', 'Email Marketing']
      },
      {
        name: 'IT Consulting',
        description: 'Expert IT consultation and infrastructure setup.',
        price: '$150/hour',
        features: ['Network Setup', 'Security Audit', 'Cloud Migration']
      },
      {
        name: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications.',
        price: '$5,000 - $50,000',
        features: ['iOS & Android', 'UI/UX Design', 'App Store Deployment']
      }
    ]
  };
  res.render('services', pageData);
});

app.get('/contact', (req, res) => {
  const pageData = {
    ...siteData,
    pageTitle: 'Contact Us - Business Solutions',
    contactInfo: {
      address: '123 Business Street, Suite 100, New York, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'info@businesssolutions.com',
      workingHours: 'Monday-Friday: 9 AM - 5 PM'
    }
  };
  res.render('contact', pageData);
});

// Error handling for unavailable routes
app.use((req, res) => {
  res.status(404).render('error', {
    ...siteData,
    pageTitle: '404 - Page Not Found',
    message: 'The page you are looking for does not exist.',
    statusCode: 404
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    ...siteData,
    pageTitle: '500 - Server Error',
    message: 'Something went wrong on our end.',
    statusCode: 500
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`⏰ Application is available: Monday-Friday, 9 AM - 5 PM`);
  console.log(`🕐 Current server time: ${new Date().toLocaleString()}`);
});

module.exports = app;
