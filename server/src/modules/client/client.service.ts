import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientRepository } from './client.repository';
import { ClientHelperService } from './client-helper.service';
import { Client } from '@prisma/client';

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly clientHelperService: ClientHelperService,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const { name, cpf, birthDate, email } = createClientDto;

    await this.clientHelperService.validateUniqueClient(cpf, email);

    const client = {
      name,
      cpf,
      birthDate,
      email,
    };

    return await this.clientRepository.create(client);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.findMany();
  }

  async findOne(id: string): Promise<Client> {
    return await this.clientHelperService.validateClientExists(id);
  }

  async findByCpf(cpf: string): Promise<Client> {
    return await this.clientHelperService.validateClientCpf(cpf);
  }

  async findByEmail(email: string): Promise<Client> {
    return await this.clientHelperService.validateClientEmail(email);
  }

  async findByName(name: string): Promise<Client> {
    return await this.clientHelperService.validateClientName(name);
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const { name, cpf, birthDate, email } = updateClientDto;

    await this.clientHelperService.validateUniqueClientUpdate(cpf, email, id);

    const client = {
      name,
      cpf,
      birthDate,
      email,
    };

    return await this.clientRepository.update(id, client);
  }

  async remove(id: string): Promise<Client> {
    await this.clientHelperService.validateClientExists(id);

    await this.clientHelperService.validateClientWasDeleted(id);

    return await this.clientRepository.delete(id);
  }
}
