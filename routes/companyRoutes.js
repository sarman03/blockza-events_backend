const express = require('express');
const router = express.Router();
const { 
  createCompany, 
  getCompanies, 
  getCompany, 
  updateCompany, 
  deleteCompany 
} = require('../controllers/companyController');
const { uploadCompanyFiles } = require('../middleware/upload');
const validateCompany = require('../middleware/validateCompany');

router.route('/')
  .post(uploadCompanyFiles, validateCompany, createCompany)
  .get(getCompanies);

router.route('/:id')
  .get(getCompany)
  .put(uploadCompanyFiles, validateCompany, updateCompany)
  .delete(deleteCompany);

module.exports = router;