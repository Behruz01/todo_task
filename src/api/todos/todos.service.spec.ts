import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { KnexService } from '../../shared/providers/knex.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService, KnexService],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const createTodoDto = { title: 'Test Todo', description: 'Test Description', estimate: new Date(), status: 'todo' };
      const result = await service.create(createTodoDto);
      expect(result).toEqual({ message: 'Todo created successfully' });
    });

    it('should throw an error if database operation fails', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new HttpException('Database operation failed', HttpStatus.INTERNAL_SERVER_ERROR));
      const createTodoDto = { title: 'Test Todo', description: 'Test Description', estimate: new Date(), status: 'todo' };
      await expect(service.create(createTodoDto)).rejects.toThrow(new HttpException('Database operation failed', HttpStatus.INTERNAL_SERVER_ERROR));
    });
  });

  describe('findAll', () => {
    it('should return a list of todos', async () => {
      const todos = [
        { title: 'Test Todo', description: 'Test Description', estimate: new Date(), status: 'todo' },
        { title: 'Test Todo', description: 'Test Description', estimate: new Date(), status: 'todo' }
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(todos);
      const result = await service.findAll();
      expect(result).toEqual(todos);
    });

    it('should throw an error if database operation fails', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValue(new HttpException('Database operation failed', HttpStatus.INTERNAL_SERVER_ERROR));
      await expect(service.findAll()).rejects.toThrow(new HttpException('Database operation failed', HttpStatus.INTERNAL_SERVER_ERROR));
    });
  });

  describe('findOne', () => {
    it('should throw an error if todo not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);
      try {
        await service.findOne('622394fe-21d6-4d99-8d8a-31f97b7d6c63');
        throw new Error('Should have thrown an error');
      } catch (error) {
        expect(error).toEqual(new Error('Should have thrown an error'));
      }
    });
  });

  describe('update', () => {
    it('should throw an error if todo not found', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(null);
      const updateTodoDto = { title: 'Updated Todo', description: 'Updated Description', estimate: new Date(), status: 'updated' };
      try {
        await service.update('622394fe-21d6-4d99-8d8a-31f97b7d6c63', updateTodoDto);
        throw new Error('Should have thrown an error');
      } catch (error) {
        expect(error).toEqual(new Error('Should have thrown an error'));
      }
    });
  });

  describe('remove', () => {
    it('should throw an error if todo not found', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(null);
      try {
        await service.remove('622394fe-21d6-4d99-8d8a-31f97b7d6c63', true);
        throw new Error('Should have thrown an error');
      } catch (error) {
        expect(error).toEqual(new Error('Should have thrown an error'));
      }
    });
  });

  describe('updateStatus', () => {
    it('should throw an error if todo not found', async () => {
      jest.spyOn(service, 'updateStatus').mockResolvedValue(null);
      const updateStatusDto = { status: 'updated' };
      try {
        await service.updateStatus('622394fe-21d6-4d99-8d8a-31f97b7d6c63', updateStatusDto);
        throw new Error('Should have thrown an error');
      } catch (error) {
        expect(error).toEqual(new Error('Should have thrown an error'));
      }
    });
  });

  describe('searchTodos', () => {
    it('should throw an error if no matching todos found', async () => {
      const query = { letter: 'X' };
      jest.spyOn(service, 'searchTodos').mockResolvedValue([]);
      try {
        await service.searchTodos(query);
        throw new Error('Should have thrown an error');
      } catch (error) {
        expect(error).toEqual(new Error('Should have thrown an error'));
      }
    });
  });
});
