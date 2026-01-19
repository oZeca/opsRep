require("dotenv").config();

module.exports = {
  useMockData: process.env.USE_MOCK_DATA !== "false",
  port: process.env.PORT || 3001,
};
