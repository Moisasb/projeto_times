import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async cadastrar(createUsuarioDto: CreateUsuarioDto) {
    const { nome, email, senha } = createUsuarioDto;

    // Gera o hash da senha (o número 10 representa o "salt rounds", que define a complexidade)
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    try {
      const query = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)';
      const values = [nome, email, senhaHash];

      const result: any = await this.databaseService.query(query, values);

      return {
        mensagem: 'Usuário cadastrado com sucesso!',
        id: result.insertId,
        nome,
        email,
      };
    } catch (error) {
      throw new BadRequestException('Erro ao cadastrar usuário. O e-mail pode já estar em uso.');
    }
  }
}