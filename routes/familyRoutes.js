// const express = require('express');
// const router = express.Router();
// const { getFamilyMembers, addFamilyMember } = require('../controllers/familyController');

// // Get all family members
// router.get('/', getFamilyMembers);

// // Add a new family member (Admin only)
// router.post('/', addFamilyMember);

// module.exports = router;


const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadGedcom, getFamilyMembers, addFamilyMember } = require('../controllers/familyController');

// Initialize Multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Route for uploading and parsing GEDCOM files
router.post('/upload', upload.single('gedcomFile'), uploadGedcom);

// Other routes
router.get('/', getFamilyMembers);
router.post('/add', addFamilyMember);

module.exports = router;
