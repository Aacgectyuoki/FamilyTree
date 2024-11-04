require('dotenv').config();
const multer = require('multer');
const parseGedcom = require('gedcom-js'); // Import GEDCOM parser
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const familyRoutes = require('./routes/familyRoutes');
const FamilyMember = require('./models/FamilyMember'); // Import your FamilyMember model

const upload = multer({ storage: multer.memoryStorage() });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route to upload GEDCOM file
app.post('/api/family/upload', upload.single('gedcomFile'), async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
      }
      const gedcomData = req.file.buffer.toString();
      const parsedData = parseGedcom.parse(gedcomData); // Parse GEDCOM file into JSON

      // Process and save parsed data to the database
      await saveGedcomData(parsedData);
      
      res.status(200).json({ message: 'GEDCOM file uploaded and parsed successfully' });
  } catch (error) {
      console.error('Error uploading GEDCOM file:', error);
      res.status(500).json({ message: 'Failed to parse GEDCOM file' });
  }
});

// Function to save parsed GEDCOM data into MongoDB
async function saveGedcomData(parsedData) {
    const members = {};

    // First, create family members without relationships
    for (const person of parsedData.individuals) {
        const newMember = new FamilyMember({
            name: person.names[0]?.value,
            birthYear: person.birth?.date?.value,
            deathYear: person.death?.date?.value,
            isAlive: !person.death, // Assume alive if no death info
            gender: person.sex === 'M' ? 'male' : 'female'
        });
        await newMember.save();
        members[person.id] = newMember._id; // Store ID for relationship linking
    }

    // Next, update family relationships
    for (const person of parsedData.individuals) {
        const memberId = members[person.id];
        const familyMember = await FamilyMember.findById(memberId);

        // Set parents, spouses, and children relationships
        if (person.famc) {
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

        await familyMember.save();
    }
}

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'family_tree',
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

connectToMongoDB();
app.use('/api/family', familyRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));