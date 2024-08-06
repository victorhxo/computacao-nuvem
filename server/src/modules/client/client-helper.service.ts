import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { Client } from '@prisma/client';

@Injectable()
export class ClientHelperService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async validateUniqueClient(cpf: string, email: string): Promise<void> {
    const clientByCpf = await this.clientRepository.findByCpf(cpf);
    if (clientByCpf) {
      throw new BadRequestException('Client already exists with this CPF');
    }

    const clientByEmail = await this.clientRepository.findByEmail(email);
    if (clientByEmail) {
      throw new BadRequestException('Client already exists with this email');
    }
  }

  async validateClientExists(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne(id);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  async validateClientCpf(cpf: string): Promise<Client> {
    const client = await this.clientRepository.findByCpf(cpf);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  async validateClientEmail(email: string): Promise<Client> {
    const client = await this.clientRepository.findByEmail(email);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  async validateUniqueClientUpdate(
    cpf: string,
    email: string,
    id: string,
  ): Promise<void> {
    const clientByCpf = await this.clientRepository.findByCpf(cpf);
    if (clientByCpf && clientByCpf.id !== id) {
      throw new BadRequestException('Client already exists with this CPF');
    }

    const clientByEmail = await this.clientRepository.findByEmail(email);
    if (clientByEmail && clientByEmail.id !== id) {
      throw new BadRequestException('Client already exists with this email');
    }
  }

  async validateClientWasDeleted(id: string): Promise<void> {
    const client = await this.clientRepository.findOne(id);
    if (client.deletedAt) {
      throw new BadRequestException('Client already deleted');
    }
  }
}
