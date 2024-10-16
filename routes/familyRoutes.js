const express = require('express');
const router = express.Router();
const { getFamilyMembers, addFamilyMember } = require('../controllers/familyController');

// Get all family members
router.get('/', getFamilyMembers);

// Add a new family member (Admin only)
router.post('/', addFamilyMember);

module.exports = router;