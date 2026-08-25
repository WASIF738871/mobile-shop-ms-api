const authService = require('../services/auth.service');
const { sendResponse } = require('../utils/response');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken, permissions } = await authService.login(email, password);

    // Set refresh token in httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    sendResponse(res, 200, 'Login successful', { user, accessToken, permissions });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
