import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTimesDto } from './dto/create-times.dto';
import { UpdateTimesDto } from './dto/update-times.dto';

@Injectable()
export class TimesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTimesDto: CreateTimesDto) {
    const { nome, origem, ano, registrado } = createTimesDto;
    
    const query = 'INSERT INTO Times (nome, origem, ano_fundacao, ativo) VALUES (?, ?, ?, ?)';
    const values = [nome, origem, ano, registrado];

    const result: any = await this.databaseService.query(query, values);

    return {
      mensagem: 'Time cadastrado com sucesso!',
      id: result.insertId,
      dados: {
        nome,
        origem,
        ano,
        registrado,
      }
    };
  } 

  async listarTodos() {
    const query = 'SELECT * FROM Times';
    return this.databaseService.query(query);
  }

  async buscarPorId(id: number) {
    
    const query = 'SELECT * FROM Times WHERE id = ?';
    const resultado: any = await this.databaseService.query(query, [id]);

    if (resultado.length === 0) {
      throw new NotFoundException('Time não encontrado!');
    }

    return resultado[0]; 
  }
 async atualizar(id: number, dadosAtualizados: UpdateTimesDto) {
    // Primeiro, verifica se o time existe (se não existir, já lança o erro 404)
    await this.buscarPorId(id);

    const { nome, origem, ano, registrado } = dadosAtualizados;
    
    // Comando SQL para atualizar os dados
    const query = 'UPDATE Times SET nome = ?, origem = ?, ano_fundacao = ?, ativo = ? WHERE id = ?';
    const values = [nome, origem, ano, registrado, id];

    await this.databaseService.query(query, values);

    return {
      mensagem: 'Time atualizado com sucesso!',
      id: id,
      dadosAtualizados
    };
  }

  async deletar(id: number) {
    // Verifica se o time existe antes de tentar deletar
    await this.buscarPorId(id);

    // Comando SQL para deletar a linha
    const query = 'DELETE FROM Times WHERE id = ?';
    await this.databaseService.query(query, [id]);

    return { mensagem: 'Time deletado com sucesso!' };
  }
}