import { Module } from '@nestjs/common';
import { TimesController } from './times.controller';
import { TimesService } from './times.service';
import { DatabaseModule } from '../database/database.module'; // <--- Importe o módulo

@Module({
  imports: [DatabaseModule], // <--- Adicione aqui
  controllers: [TimesController],
  providers: [TimesService],
})
export class TimesModule {}