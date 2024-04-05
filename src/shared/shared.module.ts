import { Module } from '@nestjs/common';
import { KnexService } from './providers/knex.service';

@Module({
  providers: [KnexService],
  exports: [],
  imports: [],
})
export class SharedModule {}
