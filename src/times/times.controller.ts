import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { TimesService } from './times.service';
import { CreateTimesDto } from './dto/create-times.dto';
import { UpdateTimesDto } from './dto/update-times.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Times') // Isso cria um bloco bonitão chamado "Times" no Swagger
@Controller('times')
export class TimesController {
  constructor(private readonly timesService: TimesService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo time' })
  @ApiResponse({ status: 201, description: 'Time cadastrado com sucesso.' })
  create(@Body() createTimesDto: CreateTimesDto) {
    return this.timesService.create(createTimesDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os times' })
  @ApiResponse({ status: 200, description: 'Lista de times retornada com sucesso.' })
  listarTodos() {
    return this.timesService.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um time pelo ID' })
  @ApiResponse({ status: 200, description: 'Time encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Time não encontrado.' })
  buscarPorId(@Param('id') id: string) {
    return this.timesService.buscarPorId(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar os dados de um time' })
  @ApiResponse({ status: 200, description: 'Time atualizado com sucesso.' })
  atualizar(@Param('id') id: string, @Body() updateTimesDto: UpdateTimesDto) {
    return this.timesService.atualizar(+id, updateTimesDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um time' })
  @ApiResponse({ status: 200, description: 'Time deletado com sucesso.' })
  deletar(@Param('id') id: string) {
    return this.timesService.deletar(+id);
  }
}