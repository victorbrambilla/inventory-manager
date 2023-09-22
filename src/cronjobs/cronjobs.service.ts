import { Injectable } from '@nestjs/common';
import { EntryService } from 'src/entry/entry.service';
import { ExitService } from 'src/exit/exit.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronjobsService {
  constructor(
    private readonly entryService: EntryService,
    private readonly exitService: ExitService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'verifyExpirationDateOfEntries',
  })
  async updateEntriesStock() {
    const entries = await this.entryService.findAll();
    entries.forEach(async (entry) => {
      const isExpired = new Date(entry.expirationDate) < new Date();
      if (isExpired && entry.quantity > 0) {
        await this.exitService.addExitForEntryExpirated(entry.id);
      }
    });
  }
}
