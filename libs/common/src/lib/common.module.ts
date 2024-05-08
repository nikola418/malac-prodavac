import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './guards';

@Module({
  controllers: [],
  providers: [JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class CommonModule {}
