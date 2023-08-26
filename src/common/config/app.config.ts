import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.PORT || 3000,
  isSwagger: process.env.IS_SWAGGER || true,
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  urlImg: process.env.IMAGE_URL || 'http://localhost:3000',
  host: process.env.HOST || 'http://localhost:3000',
  jwt_constants:
    process.env.JWT_CONSTANTS ||
    'b2a41c25633780c6b9246ed91bd010fef718359c10e7cfc75948b1d3b1552d3d',
}));
