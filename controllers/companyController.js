const Company = require('../models/Directory');

exports.createCompany = async (req, res) => {
    try {
      const {
        name,
        shortDescription,
        detail,
        founderName,
        founderDetails,
        founderEmail,
        url,
        category
      } = req.body;
  
      // Handle file uploads
      const companyData = {
        name,
        shortDescription,
        detail,
        founderName,
        founderDetails,
        founderEmail,
        url,
        category,
        isPromoted: req.body.isPromoted === 'true',
        socialLinks: {
          facebook: req.body.facebook || '',
          linkedin: req.body.linkedin || '',
          youtube: req.body.youtube || '',
          twitter: req.body.twitter || '',
          telegram: req.body.telegram || ''
        },
        promotionSettings: {
          interestedInBusinessPartnership: req.body.interestedInBusinessPartnership === 'true',
          hasAffiliateProgram: req.body.hasAffiliateProgram === 'true'
        }
      };
  
      // Handle file uploads - logo is required, others are optional
      if (req.files) {
        // Logo is required and should be validated by middleware
        companyData.logo = req.files.logo[0].path;
        
        // Optional files
        if (req.files.founderImage) {
          companyData.founderImage = req.files.founderImage[0].path;
        }
        if (req.files.banner) {
          companyData.banner = req.files.banner[0].path;
        }
      }
  
      // Create company in database
      const company = await Company.create(companyData);
  
      res.status(201).json({
        success: true,
        data: company
      });
    } catch (error) {
      console.error(`Error creating company: ${error.message}`);
      res.status(500).json({
        success: false,
        error: `Server error: ${error.message}`
      });
    }
  };
  
  // Get all companies
  exports.getCompanies = async (req, res) => {
    try {
      const companies = await Company.find().sort({ createdAt: -1 });
      
      res.status(200).json({
        success: true,
        count: companies.length,
        data: companies
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: `Server error: ${error.message}`
      });
    }
  };
  
  // Get single company by ID
  exports.getCompany = async (req, res) => {
    try {
      const company = await Company.findById(req.params.id);
      
      if (!company) {
        return res.status(404).json({
          success: false,
          error: 'Company not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: company
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: `Server error: ${error.message}`
      });
    }
  };
  
  // Update company
  exports.updateCompany = async (req, res) => {
    try {
      let company = await Company.findById(req.params.id);
      
      if (!company) {
        return res.status(404).json({
          success: false,
          error: 'Company not found'
        });
      }
      
      // Handle file uploads
      const updateData = { ...req.body };
      
      if (req.files) {
        // Handle logo update
        if (req.files.logo) {
          if (company.logo) {
            const publicId = company.logo.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`company-directory/logos/${publicId}`);
          }
          updateData.logo = req.files.logo[0].path;
        }
        
        // Handle founder image update
        if (req.files.founderImage) {
          if (company.founderImage) {
            const publicId = company.founderImage.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`company-directory/founders/${publicId}`);
          }
          updateData.founderImage = req.files.founderImage[0].path;
        }
        
        // Handle banner update
        if (req.files.banner) {
          if (company.banner) {
            const publicId = company.banner.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`company-directory/banners/${publicId}`);
          }
          updateData.banner = req.files.banner[0].path;
        }
      }
      
      // Update company data
      company = await Company.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true
      });
      
      res.status(200).json({
        success: true,
        data: company
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: `Server error: ${error.message}`
      });
    }
  };

  exports.deleteCompany = async (req, res) => {
    try {
      const company = await Company.findById(req.params.id);
      
      if (!company) {
        return res.status(404).json({
          success: false,
          error: 'Company not found'
        });
      }
      
      // Delete associated images from Cloudinary
      if (company.logo) {
        const publicId = company.logo.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`company-directory/logos/${publicId}`);
      }
      
      if (company.founderImage) {
        const publicId = company.founderImage.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`company-directory/founders/${publicId}`);
      }
      
      if (company.banner) {
        const publicId = company.banner.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`company-directory/banners/${publicId}`);
      }
      
      // Delete company from database
      await company.deleteOne();
      
      res.status(200).json({
        success: true,
        data: {}
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: `Server error: ${error.message}`
      });
    }
  };