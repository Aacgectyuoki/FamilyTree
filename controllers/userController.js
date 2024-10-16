// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// // Login user
// exports.login = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
//       expiresIn: '1d',
//     });

//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in' });
//   }
// };