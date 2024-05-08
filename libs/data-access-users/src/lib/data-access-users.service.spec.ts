import { Test } from '@nestjs/testing';
import { DataAccessUsersService } from './data-access-users.service';

describe('DataAccessUsersService', () => {
  let service: DataAccessUsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DataAccessUsersService],
    }).compile();

    service = module.get(DataAccessUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
