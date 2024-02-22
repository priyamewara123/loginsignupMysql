const { create, login } = require('../services/Service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error"
        });
      }
      return res.status(200).json({
        success: true,
        data: results
      });
    });
  },

  loginPage: (req, res) => {
    const body = req.body;

    login(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error"
        });
      }

      if (results.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }

      // Assuming that 'results' contains user information
      const user = results[0];

      // Compare the provided password with the stored password
      const passwordMatch = compareSync(body.password, user.password);

      if (passwordMatch) {
        return res.status(200).json({
          success: true,
          data: user
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }
    });
  }
};
