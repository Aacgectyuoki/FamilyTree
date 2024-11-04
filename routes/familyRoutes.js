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
const { getFamilyMembers, addFamilyMember, saveGedcomData } = require('../controllers/familyController');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getFamilyMembers); // Route to get family members
router.post('/', addFamilyMember); // Route to add a family member
router.post('/upload', upload.single('gedcomFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const gedcomData = req.file.buffer.toString();

  try {
    const parsedData = parseGedcom.parse(gedcomData); // Parse GEDCOM file
    await saveGedcomData(parsedData);
    res.status(200).json({ message: 'GEDCOM file uploaded and parsed successfully' });
  } catch (error) {
    console.error('Error parsing GEDCOM file:', error);
    res.status(500).json({ message: 'Failed to parse GEDCOM file' });
  }
});

module.exports = router;