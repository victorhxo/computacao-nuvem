import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @MaxLength(100, { message: 'Name max length is 100 characters' })
  name: string;

  @IsNotEmpty()
  @MinLength(11, { message: 'CPF min length is 11 characters' })
  @MaxLength(11, { message: 'CPF max length is 11 characters' })
  cpf: string;

  @IsNotEmpty()
  birthDate: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100, { message: 'Email max length is 100 characters' })
  email: string;
}
