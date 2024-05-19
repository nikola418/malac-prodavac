import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';

describe(AuthService.name, () => {
  let authService: AuthService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    authService = testingModule.get(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeTruthy();
  });
});
