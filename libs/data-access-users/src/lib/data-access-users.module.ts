import { Module, Global } from '@nestjs/common';
import { DataAccessUsersService } from './data-access-users.service';
import { PrismaModule } from '@malac-prodavac/prisma-module';

@Global()
@Module({
  imports: [PrismaModule.forRoot()],
  controllers: [],
  providers: [DataAccessUsersService],
  exports: [DataAccessUsersService],
})
export class DataAccessUsersModule {}
