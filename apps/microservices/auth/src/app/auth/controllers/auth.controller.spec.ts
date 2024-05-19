import { AuthController } from './auth.controller';
import { Test } from '@nestjs/testing';

describe(AuthController.name, () => {
  let authController: AuthController;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    authController = testingModule.get(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeTruthy();
  });
});
