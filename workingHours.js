// middleware/workingHours.js
/**
 * Middleware to restrict access during non-working hours
 * Working hours: Monday-Friday, 9 AM to 5 PM
 */
function workingHoursMiddleware(req, res, next) {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hour = now.getHours();
  const minute = now.getMinutes();

  // Check if it's within working hours
  const isWorkingDay = day >= 1 && day <= 5; // Monday to Friday
  const isWorkingHour = hour >= 9 && hour < 17; // 9 AM to 5 PM
  
  // Special case: exactly at 5 PM (17:00) should be considered after hours
  const isExactly5PM = hour === 17 && minute === 0;

  if (isWorkingDay && isWorkingHour && !isExactly5PM) {
    // Within working hours - proceed to the next middleware/route
    next();
  } else {
    // Outside working hours - show maintenance page
    const currentTime = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = dayNames[day];
    
    res.status(503).render('maintenance', {
      title: 'Business Solutions Inc.',
      pageTitle: 'Out of Service Hours',
      currentDay: currentDay,
      currentTime: currentTime,
      workingDays: 'Monday - Friday',
      workingHours: '9:00 AM - 5:00 PM',
      nextWorkingDay: getNextWorkingDay(day),
      contactEmail: 'support@businesssolutions.com'
    });
  }
}

/**
 * Helper function to determine the next working day
 */
function getNextWorkingDay(currentDay) {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  if (currentDay === 5) { // Friday
    return 'Monday';
  } else if (currentDay === 6) { // Saturday
    return 'Monday';
  } else {
    return dayNames[currentDay + 1];
  }
}

module.exports = workingHoursMiddleware;
