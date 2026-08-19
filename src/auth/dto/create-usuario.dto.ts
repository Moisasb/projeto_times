import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'João Silva', description: 'O nome completo do usuário' })
  nome!: string;

  @ApiProperty({ example: 'joao.silva@email.com', description: 'O e-mail único do usuário' })
  email!: string;

  @ApiProperty({ example: '123456', description: 'A senha de acesso do usuário' })
  senha!: string;
}