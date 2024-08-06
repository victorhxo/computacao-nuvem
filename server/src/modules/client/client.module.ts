import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientHelperService } from './client-helper.service';
import { ClientRepository } from './client.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ClientController],
  providers: [
    ClientService,
    ClientHelperService,
    ClientRepository,
    PrismaService,
  ],
})
export class ClientModule {}
