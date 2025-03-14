const validateCompany = (req, res, next) => {
  // Check if required fields are present
  const requiredFields = [
    'name',
    'shortDescription',
    'detail',
    'founderName',
    'founderDetails',
    'founderEmail',
    'url',
    'category'
  ];

  const missingFields = requiredFields.filter(field => !req.body[field]);

  // Check for required logo file
  if (!req.files || !req.files.logo) {
    return res.status(400).json({
      success: false,
      error: 'Company logo is required'
    });
  }

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(', ')}`
    });
  }

  // Validate email format
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(req.body.founderEmail)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format'
    });
  }

  // Validate URL format
  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  if (!urlRegex.test(req.body.url)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid URL format'
    });
  }

  // Validate description length
  if (req.body.shortDescription.length > 200) {
    return res.status(400).json({
      success: false,
      error: 'Short description cannot exceed 200 characters'
    });
  }

  next();
};

module.exports = validateCompany; 