import { Module, forwardRef } from '@nestjs/common';
import { CronjobsService } from './cronjobs.service';
import { ExitModule } from 'src/exit/exit.module';
import { EntryModule } from 'src/entry/entry.module';

@Module({
  providers: [CronjobsService],
  imports: [forwardRef(() => ExitModule), forwardRef(() => EntryModule)],
})
export class CronjobsModule {}
