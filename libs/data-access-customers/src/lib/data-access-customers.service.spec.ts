import { Test } from '@nestjs/testing';
import { DataAccessCustomersService } from './data-access-customers.service';

describe('DataAccessCustomersService', () => {
  let service: DataAccessCustomersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DataAccessCustomersService],
    }).compile();

    service = module.get(DataAccessCustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
