const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  shortDescription: {
    type: String,
    required: [true, 'Company description is required'],
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  detail: {
    type: String,
    required: [true, 'Company detail is required']
  },
  
  // Founder Info
  founderName: {
    type: String,
    required: [true, 'Founder name is required'],
    trim: true
  },
  founderDetails: {
    type: String,
    required: [true, 'Founder details are required']
  },
  founderEmail: {
    type: String,
    required: [true, 'Founder email is required'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  
  // URLs and Social Links
  url: {
    type: String,
    required: [true, 'Company URL is required'],
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please enter a valid URL with HTTP or HTTPS'
    ]
  },
  socialLinks: {
    facebook: String,
    linkedin: String,
    youtube: String,
    twitter: String,
    telegram: String
  },
  
  // Category
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  
  // Media
  logo: {
    type: String,
    required: [true, 'Company logo is required']
  },
  founderImage: {
    type: String
  },
  banner: {
    type: String
  },
  
  // Promotion Settings
  isPromoted: {
    type: Boolean,
    default: false
  },
  promotionSettings: {
    interestedInBusinessPartnership: {
      type: Boolean,
      default: false
    },
    hasAffiliateProgram: {
      type: Boolean,
      default: false
    }
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Company', CompanySchema);
