// import { Test, TestingModule } from '@nestjs/testing';
// import { TodosService } from './todos.service';

// describe('TodosService', () => {
//   let service: TodosService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [TodosService],
//     }).compile();

//     service = module.get<TodosService>(TodosService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
//  ============================================================================
import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { KnexService } from '../../shared/providers/knex.service';

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
      //   const createTodoDto = { title: 'Test Todo', description: 'Test Description', estimate: new Date(), status: 'todo' };
      //   jest.spyOn(service['knex'].instance('todos'), 'insert').mockRejectedValue(new Error('Database error'));
      //   await expect(service.create(createTodoDto)).rejects.toThrowError(new HttpException('Database error', HttpStatus.INTERNAL_SERVER_ERROR));
    });
  });

  describe('findAll', () => {
    it('should return a list of todos', async () => {

    });

    it('should throw an error if database operation fails', async () => {

    });
  });

  describe('findOne', () => {
    it('should return a todo by ID', async () => {

    });

    it('should throw an error if todo not found', async () => {

    });

    it('should throw an error if database operation fails', async () => {

    });
  });

  describe('update', () => {
    it('should update a todo by ID', async () => {

    });

    it('should throw an error if todo not found', async () => {

    });

    it('should throw an error if database operation fails', async () => {

    });
  });

  describe('remove', () => {
    it('should delete a todo by ID', async () => {

    });

    it('should soft delete a todo by ID if isHard is false', async () => {

    });

    it('should throw an error if todo not found', async () => {

    });

    it('should throw an error if database operation fails', async () => {

    });
  });

  describe('updateStatus', () => {
    it('should update status of a todo by ID', async () => {

    });

    it('should throw an error if todo not found', async () => {

    });

    it('should throw an error if database operation fails', async () => {

    });
  });

  describe('groupByStatus', () => {
    it('should group todos by status', async () => {

    });

    it('should throw an error if database operation fails', async () => {

    });
  });

  describe('searchTodos', () => {
    it('should search todos by title', async () => {

    });

    it('should throw an error if no matching todos found', async () => {

    });

    it('should throw an error if database operation fails', async () => {

    });
  });
});

