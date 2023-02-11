export default {
  secret_token: process.env.ACCESS_TOKEN_SECRET,
  expires_in_token: "15m",
  secret_refresh_token: process.env.REFRESH_TOKEN_SECRET,
  expires_in_refresh_token: "30d",
  expires_refresh_token_days: 30,
};
