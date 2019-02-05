module.exports = {
  adminData: {
    email: process.env.ADMIN_EMAIL || 'happyuser_02@domain.com',
    password: process.env.ADMIN_PASSWORD || 'password',
    first_name: process.env.ADMIN_FIRST_NAME || 'Kirk',
    last_name: process.env.ADMIN_LAST_NAME || 'Hammet', 
    role: 'regular_user',
  },
};
