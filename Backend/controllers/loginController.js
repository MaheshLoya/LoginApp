const loginService = require('../services/loginService');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await loginService.login(username,password);
    if (users.length > 0) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};