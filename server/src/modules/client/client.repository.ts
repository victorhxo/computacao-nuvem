import { PrismaService } from 'src/database/prisma.service';
import { Client } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateClientDto): Promise<Client> {
    const { name, cpf, birthDate, email } = data;
    console.log(data);

    return await this.prismaService.client.create({
      data: {
        name,
        cpf,
        birthDate,
        email,
      },
    });
  }

  async findMany(): Promise<Client[]> {
    return await this.prismaService.client.findMany();
  }

  async findOne(id: string): Promise<Client | null> {
    return await this.prismaService.client.findUnique({ where: { id } });
  }

  async findByCpf(cpf: string): Promise<Client | null> {
    return await this.prismaService.client.findFirst({ where: { cpf } });
  }

  async findByEmail(email: string): Promise<Client | null> {
    return await this.prismaService.client.findFirst({ where: { email } });
  }

  async update(id: string, data: UpdateClientDto): Promise<Client> {
    const { name, cpf, birthDate, email } = data;

    return await this.prismaService.client.update({
      where: { id },
      data: { name, cpf, birthDate, email },
    });
  }

  async delete(id: string): Promise<Client> {
    return await this.prismaService.client.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
