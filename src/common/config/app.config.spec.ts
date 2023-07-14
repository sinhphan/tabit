import appConfig from './app.config';

describe('appConfig', () => {
  it('should have correct port', () => {
    expect(appConfig().port).toEqual(process.env.PORT || 3000);
  });

  it('should have correct isSwagger', () => {
    expect(appConfig().isSwagger).toEqual(process.env.IS_SWAGGER || true);
  });

  it('should have correct uploadDir', () => {
    expect(appConfig().uploadDir).toEqual(
      process.env.UPLOAD_DIR || './uploads',
    );
  });

  it('should have correct urlImg', () => {
    expect(appConfig().urlImg).toEqual(
      process.env.IMAGE_URL || 'http://localhost:3000',
    );
  });

  it('should have correct host', () => {
    expect(appConfig().host).toEqual(
      process.env.HOST || 'http://localhost:3000',
    );
  });
});
