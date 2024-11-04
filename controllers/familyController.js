const FamilyMember = require('../models/FamilyMember'); // Import the FamilyMember model
const parseGedcom = require('gedcom-js'); // Import GEDCOM parser

// Function to get all family members
exports.getFamilyMembers = async (req, res) => {
  try {
    const members = await FamilyMember.find();
    res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching family members:", error);
    res.status(500).json({ message: 'Error fetching family members' });
  }
};

// Function to add a new family member
exports.addFamilyMember = async (req, res) => {
  try {
    const newMember = new FamilyMember(req.body);
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    console.error("Error adding family member:", error);
    res.status(500).json({ message: 'Error adding family member' });
  }
};

// Function to save parsed GEDCOM data into MongoDB
exports.saveGedcomData = async function(parsedData) {
  const members = {}; // Store mapping of GEDCOM IDs to MongoDB IDs
  const newMembers = []; // Array to hold new family members for batch insertion

  // Step 1: Create family members without relationships for batch insertion
  for (const person of parsedData.individuals) {
      const newMember = new FamilyMember({
          name: person.names[0]?.value,
          birthYear: person.birth?.date?.value,
          deathYear: person.death?.date?.value,
          isAlive: !person.death, // Assume alive if no death info
          gender: person.sex === 'M' ? 'male' : 'female'
      });
      newMembers.push(newMember);
      members[person.id] = newMember; // Temporarily store reference for relationship linking
  }

  // Insert all new family members at once
  const savedMembers = await FamilyMember.insertMany(newMembers);

  // Step 2: Map MongoDB IDs to each member by original GEDCOM ID
  savedMembers.forEach((member, index) => {
    members[parsedData.individuals[index].id] = member._id;
  });

  // Step 3: Update relationships for each family member
  for (const person of parsedData.individuals) {
    const memberId = members[person.id];
    const familyMember = await FamilyMember.findById(memberId);

    if (familyMember) {
      // Set parents, spouses, and children relationships if defined
      if (person.famc && person.famc.parents) {
        const parentIds = person.famc.parents.map(id => members[id]).filter(Boolean);
        familyMember.parents = parentIds;
      }
      if (person.spouses) {
        const spouseIds = person.spouses.map(id => members[id]).filter(Boolean);
        familyMember.spouses = spouseIds;
      }
      if (person.children) {
        const childIds = person.children.map(id => members[id]).filter(Boolean);
        familyMember.children = childIds;
      }

      await familyMember.save(); // Save updated relationships for each family member
    }
  }
};

// Function to handle GEDCOM file upload, parse, and save
exports.uploadGedcomFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const gedcomData = req.file.buffer.toString();
    const parsedData = parseGedcom.parse(gedcomData); // Parse the GEDCOM data

    // Process and save parsed GEDCOM data
    await exports.saveGedcomData(parsedData);

    res.status(200).json({ message: 'GEDCOM file uploaded and parsed successfully' });
  } catch (error) {
    console.error('Error uploading GEDCOM file:', error);
    res.status(500).json({ message: 'Failed to parse GEDCOM file' });
  }
};
