import { Module } from '@nestjs/common';
import { DataAccessCustomersService } from './data-access-customers.service';

@Module({
  controllers: [],
  providers: [DataAccessCustomersService],
  exports: [DataAccessCustomersService],
})
export class DataAccessCustomersModule {}
