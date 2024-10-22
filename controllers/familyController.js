const FamilyMember = require('../models/FamilyMember');

// Get all family members
exports.getFamilyMembers = async (req, res) => {
  try {
    const members = await FamilyMember.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching family members' });
  }
};

// Add a new family member
exports.addFamilyMember = async (req, res) => {
  try {
    const newMember = new FamilyMember(req.body);
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: 'Error adding family member' });
  }
};
