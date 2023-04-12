import { IsString, MinLength } from 'class-validator';

type ContactMethod = 'Correo' | 'WhatsApp';

export class CreateMailDto {
  @IsString()
  @MinLength(1)
  fullName: string;
  @IsString()
  @MinLength(1)
  expIdentifier: string;
  @IsString()
  @MinLength(1)
  documentId: string;
  @IsString()
  @MinLength(1)
  email: string;
  @IsString()
  @MinLength(1)
  phone: string;
  @IsString()
  @MinLength(1)
  problemDescription: string;
  @IsString()
  @MinLength(1)
  town: string;
  @IsString()
  @MinLength(1)
  contactMethod: ContactMethod;
}
