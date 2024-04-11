import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateStatusDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) { }

  @ApiOperation({ summary: 'Search todos' })
  @ApiResponse({ status: 200, description: 'List of todos.' })
  @ApiQuery({ name: 'letter', description: 'Letter of the articles', type: String })
  @ApiParam({ name: 'letter', description: 'Letter of the articles', type: String })
  @Get('search')
  async searchTodos(@Query() query: Object) {
    return this.todosService.searchTodos(query);
  }

  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ status: 201, description: 'The todo has been successfully created.', type: CreateTodoDto })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @ApiOperation({ summary: 'Group by status' })
  @ApiResponse({ status: 200, description: 'List of todos.' })
  @Get('group-by-status')
  async groupByStatus() {
    return this.todosService.groupByStatus();
  }

  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'List of todos.', type: [CreateTodoDto] })
  @Get()
  async findAll() {
    return this.todosService.findAll();
  }

  @ApiOperation({ summary: 'Get a todo by ID' })
  @ApiResponse({ status: 200, description: 'The todo with the specified ID.', type: CreateTodoDto })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a todo by ID' })
  @ApiResponse({ status: 200, description: 'The todo has been successfully updated.', type: UpdateTodoDto })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @ApiOperation({ summary: 'Delete a todo by ID' })
  @ApiResponse({ status: 200, description: 'The todo has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string, @Query('isHard') isHard: boolean) {
    return this.todosService.remove(id, isHard);
  }

  @ApiOperation({ summary: 'Update a status by ID' })
  @ApiResponse({ status: 200, description: 'The status has been successfully updated.', type: UpdateTodoDto })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  @Put('changestatus/:id')
  async updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.todosService.updateStatus(id, updateStatusDto);
  }
}
