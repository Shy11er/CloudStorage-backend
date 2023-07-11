export default () => ({
  port: process.env.PORT ?? 8080,
  database_username: process.env.DATABASE_USER_NAME ?? 'postgres',
  database_password: process.env.DATABASE_PASSWORD ?? 'pwd',
});
