import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto, UpdateStatusDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { KnexService } from '../../shared/providers/knex.service';

export interface forQuery {
  letter?: string
}
@Injectable()
export class TodosService {
  @Inject() private readonly knex: KnexService
  async create(createTodoDto: CreateTodoDto) {
    try {
      const { title, description, estimate, status } = createTodoDto
      await this.knex.instance("todos").insert({ title, description, estimate, status })
      return { message: "Todo created successfully" }
    } catch (error) {
      console.log("error==", error);
      throw new HttpException(error.message, error.status ||
        HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    try {
      const data = await this.knex.instance("todos").select("*")
      return data
    } catch (error) {
      throw new HttpException(error.message, error.status ||
        HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: string) {
    try {
      const findData = await this.knex.instance("todos").where({ id }).first()
      if (!findData) {
        throw new HttpException("Data not found!", HttpStatus.NOT_FOUND)
      }
      return findData
    } catch (error) {
      throw new HttpException(error.message, error.status ||
        HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    try {
      const findData = await this.knex.instance("todos").where({ id })
      if (!findData) {
        throw new HttpException("Data not found!", HttpStatus.NOT_FOUND)
      }
      const { title, description, estimate, status } = updateTodoDto
      await this.knex.instance("todos").where({ id }).update({ title, description, estimate, status })
      return { message: "Todo updated successfully" }
    } catch (error) {
      throw new HttpException(error.message, error.status ||
        HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: string, isHard: boolean) {
    try {
      const findData = await this.knex.instance('todos').where({ id }).first();
      if (!findData) {
        throw new HttpException('Data not found!', HttpStatus.NOT_FOUND);
      }
      if (isHard) {
        await this.knex.instance('todos').where({ id }).del();
      } else {
        await this.knex.instance('todos').where({ id }).update({ is_active: false });
      }
      return { message: 'Todo deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateStatus(id: string, updateStatusDto: UpdateStatusDto) {
    try {
      const findData = await this.knex.instance("todos").where({ id })
      if (!findData) {
        throw new HttpException("Data not found!", HttpStatus.NOT_FOUND)
      }
      const { status } = updateStatusDto
      await this.knex.instance("todos").where({ id }).update({ status })
      return { message: "Status updated successfully" }
    } catch (error) {
      throw new HttpException(error.message, error.status ||
        HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async groupByStatus(): Promise<{ [key: string]: CreateTodoDto[] }> {
    try {
      const tasks = await this.knex
        .instance('todos')
        .select('id', 'title', 'description', 'status')

      // agar status bo'yicha todolar soni kerak bo'lsa
      // const data2 = await this.knex
      //   .instance('todos')
      //   .select('status')
      //   .count('* as count')
      //   .groupBy('status');
      // console.log(data2);

      const groupedTasks: { [key: string]: CreateTodoDto[] } = {};
      tasks.forEach((task) => {
        if (!groupedTasks[task.status]) {
          groupedTasks[task.status] = [];
        }
        groupedTasks[task.status].push(task);
      });

      return groupedTasks;
    } catch (error) {
      throw new HttpException(error.message, error.status ||
        HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchTodos(query: forQuery) {
    try {
      const { letter } = query
      const data = await this.knex
        .instance('todos')
        .where('title', 'ilike', `%${letter}%`);
      if (data.length == 0) {
        throw new HttpException("Data not find", HttpStatus.BAD_REQUEST)
      }
      return data;
    } catch (error) {
      throw new HttpException(error.message, error.status ||
        HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}