const mongoose = require('mongoose');

const familyMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthYear: { type: Number, required: true },
  deathYear: { type: Number, default: null }, // optional for those still alive
  isAlive: { type: Boolean, default: true },  // indicates if the person is still alive
  gender: { type: String, enum: ['male', 'female'], required: true },
  parents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FamilyMember' }],
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FamilyMember' }],
  spouses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FamilyMember' }],
});

module.exports = mongoose.model('FamilyMember', familyMemberSchema);
