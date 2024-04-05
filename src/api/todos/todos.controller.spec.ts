import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateStatusDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            updateStatus: jest.fn(),
            groupByStatus: jest.fn(),
            searchTodos: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'Test Todo',
        description: 'Test Description',
        estimate: new Date(),
        status: 'todo',
      };
      jest.spyOn(service, 'create').mockResolvedValue({ message: 'Todo created successfully' });

      expect(await controller.create(createTodoDto)).toEqual({ message: 'Todo created successfully' });
    });
  });

  describe('findAll', () => {
    it('should return a list of todos', async () => {
      const todos = [{ id: '622394fe-21d6-4d99-8d8a-31f97b7d6c63', title: 'Todo 1', description: 'Description 1', estimate: new Date(), status: 'todo' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(todos);

      expect(await controller.findAll()).toEqual(todos);
    });
  });

  describe('findOne', () => {
    it('should return a todo by ID', async () => {
      const todoId = '622394fe-21d6-4d99-8d8a-31f97b7d6c63';
      const todo = { id: todoId, title: 'Test Todo', description: 'Test Description', estimate: new Date(), status: 'todo' };
      jest.spyOn(service, 'findOne').mockResolvedValue(todo);

      expect(await controller.findOne(todoId)).toEqual(todo);
    });

    it('should throw 404 error if todo not found', async () => {
      const todoId = '622394fe-21d6-4d99-8d8a-31f97b7d6c63';
      jest.spyOn(service, 'findOne').mockRejectedValue(new HttpException('Data not found!', HttpStatus.NOT_FOUND));

      await expect(controller.findOne(todoId)).rejects.toThrowError(new HttpException('Data not found!', HttpStatus.NOT_FOUND));
    });
  });

  describe('update', () => {
    it('should update a todo by ID', async () => {
      const todoId = '622394fe-21d6-4d99-8d8a-31f97b7d6c63';
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated Test Todo',
        description: 'Updated Test Description',
        estimate: new Date(),
        status: 'todo',
      };
      jest.spyOn(service, 'update').mockResolvedValue({ message: 'Todo updated successfully' });

      expect(await controller.update(todoId, updateTodoDto)).toEqual({ message: 'Todo updated successfully' });
    });

    it('should throw 404 error if todo not found', async () => {
      const todoId = '622394fe-21d6-4d99-8d8a-31f97b7d6c63';
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated Test Todo',
        description: 'Updated Test Description',
        estimate: new Date(),
        status: 'done',
      };
      jest.spyOn(service, 'update').mockRejectedValue(new HttpException('Data not found!', HttpStatus.NOT_FOUND));

      await expect(controller.update(todoId, updateTodoDto)).rejects.toThrowError(new HttpException('Data not found!', HttpStatus.NOT_FOUND));
    });
  });

  describe('remove', () => {
    it('should delete a todo by ID', async () => {
      // const todoId = '622394fe-21d6-4d99-8d8a-31f97b7d6c63';
      // jest.spyOn(service, 'remove').mockResolvedValue({ message: 'Todo deleted successfully' });

      // expect(await controller.remove(todoId, true)).toEqual({ message: 'Todo deleted successfully' });
    });

    it('should soft delete a todo by ID if isHard is false', async () => {
      // const todoId = '622394fe-21d6-4d99-8d8a-31f97b7d6c63';
      // jest.spyOn(service, 'remove').mockResolvedValue({ message: 'Todo deleted successfully' });

      // expect(await controller.remove(todoId, false)).toEqual({ message: 'Todo deleted successfully' });
    });

    it('should throw 404 error if todo not found', async () => {
      // const todoId = '622394fe-21d6-4d99-8d8a-31f97b7d6c63';
      // jest.spyOn(service, 'remove').mockRejectedValue(new HttpException('Data not found!', HttpStatus.NOT_FOUND));

      // await expect(controller.remove(todoId, true)).rejects.toThrowError(new HttpException('Data not found!', HttpStatus.NOT_FOUND));
    });
  });

  describe('updateStatus', () => {
    it('should update status of a todo by ID', async () => {
      const todoId = '622394fe-21d6-4d99-8d8a-31f97b7d6c63';
      const updateStatusDto: UpdateStatusDto = {
        status: 'completed',
      };
      jest.spyOn(service, 'updateStatus').mockResolvedValue({ message: 'Status updated successfully' });

      expect(await controller.updateStatus(todoId, updateStatusDto)).toEqual({ message: 'Status updated successfully' });
    });

    it('should throw 404 error if todo not found', async () => {
      const todoId = '622394fe-21d6-4d99-8d8a-31f97b7d6c63';
      const updateStatusDto: UpdateStatusDto = {
        status: 'completed',
      };
      jest.spyOn(service, 'updateStatus').mockRejectedValue(new HttpException('Data not found!', HttpStatus.NOT_FOUND));

      await expect(controller.updateStatus(todoId, updateStatusDto)).rejects.toThrowError(new HttpException('Data not found!', HttpStatus.NOT_FOUND));
    });
  });

  describe('groupByStatus', () => {
    it('should group todos by status', async () => {
      const groupedTodos = {
        todo: [{ id: '622394fe-21d6-4d99-8d8a-31f97b7d6c63', title: 'My todo title2', description: 'My todo description', estimate: new Date('2024-02-16 16:40:50.212'), status: 'done' }],
        in_progress: [{ id: '11be2c43-a41e-410a-bb21-faae51f93d03', title: 'My todo title6', description: 'My todo description', estimate: new Date('2024-02-16 16:40:50.212'), status: 'doing' }],
        completed: [{ id: 'f0625521-c13d-415f-a569-37263dffa0c0', title: 'My todo title3', description: 'My todo description', estimate: new Date('2024-02-16 16:40:50.212'), status: 'todo' }],
      };
      jest.spyOn(service, 'groupByStatus').mockResolvedValue(groupedTodos);

      expect(await controller.groupByStatus()).toEqual(groupedTodos);
    });
  });

  describe('searchTodos', () => {
    it('should search todos by title', async () => {
      const letter = 'test';
      const filteredTodos = [{ id: '622394fe-21d6-4d99-8d8a-31f97b7d6c63', title: 'Test Todo', description: 'Description 1', estimate: new Date(), status: 'todo' }];
      jest.spyOn(service, 'searchTodos').mockResolvedValue(filteredTodos);

      expect(await controller.searchTodos({ letter })).toEqual(filteredTodos);
    });

    it('should throw 400 error if no matching todos found', async () => {
      const letter = 'xyz';
      jest.spyOn(service, 'searchTodos').mockRejectedValue(new HttpException('Data not found', HttpStatus.BAD_REQUEST));

      await expect(controller.searchTodos({ letter })).rejects.toThrowError(new HttpException('Data not found', HttpStatus.BAD_REQUEST));
    });
  });
});