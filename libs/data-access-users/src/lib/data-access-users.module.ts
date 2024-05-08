import { Global, Module } from '@nestjs/common';
import { DataAccessUsersService } from './data-access-users.service';

@Global()
@Module({
  controllers: [],
  providers: [DataAccessUsersService],
  exports: [DataAccessUsersService],
})
export class DataAccessUsersModule {}
