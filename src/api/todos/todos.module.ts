import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { SharedModule } from '../../shared/shared.module';
import { KnexService } from '../../shared/providers/knex.service';

@Module({
  imports: [SharedModule],
  controllers: [TodosController],
  providers: [TodosService, KnexService],
})
export class TodosModule { }
