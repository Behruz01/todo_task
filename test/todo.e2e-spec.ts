import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('TodosController E2E test', () => {
    let app: INestApplication;
    const BASE_URL = '/todos'
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should create a new todo', async () => {
        const response = await request(app.getHttpServer())
            .post(BASE_URL)
            .send({
                title: "Todo_title_test",
                description: "Todo_description_test",
                estimate: new Date(),
                status: "todo"
            });
        expect(response.status).toBe(201);
    });

    it('should return a 400 Bad Request when invalid estimate is provided', async () => {
        const response = await request(app.getHttpServer())
            .post(BASE_URL)
            .send({
                title: "Todo_title_test",
                description: "Todo_description_test",
                estimate: 'invalid_date_format',
                status: "todo"
            });
        console.log(response.error);
        expect(response.status).toBe(400);
    });

    it('should return all todos', async () => {
        const response = await request(app.getHttpServer()).get(BASE_URL);

        expect(response.status).toBe(HttpStatus.OK);
        expect(Array.isArray(response.body)).toBeTruthy();
    });


    it('should return a specific todo', async () => {
        // Create a new todo
        const createResponse = await request(app.getHttpServer())
            .post(BASE_URL)
            .send({
                title: 'Test Todo',
                description: 'Test description',
                estimate: new Date(),
                status: 'todo',
            });

        const data = { ...createResponse.body, id: '622394fe-21d6-4d99-8d8a-31f97b7d6c63', }

        // Get the ID of the created todo
        const createdTodoId = data.id;

        // Fetch the created todo
        const response = await request(app.getHttpServer()).get(`${BASE_URL}/${createdTodoId}`);
        console.log(response.error);
        expect(response.status).toBe(HttpStatus.OK);
        expect(response.body.id).toBe(createdTodoId);
    });

    it('should update a specific todo', async () => {
        // Create a new todo
        const createResponse = await request(app.getHttpServer())
            .post(BASE_URL)
            .send({
                title: 'Test Todo',
                description: 'Test description',
                estimate: new Date(),
                status: 'todo',
            });

        const data = { ...createResponse.body, id: '622394fe-21d6-4d99-8d8a-31f97b7d6c63', }

        // Get the ID of the created todo
        const createdTodoId = data.id;

        // Update the created todo
        const updateResponse = await request(app.getHttpServer())
            .patch(`${BASE_URL}/${createdTodoId}`)
            .send({
                title: 'Updated Test Todo',
                description: 'Updated test description',
                estimate: new Date(),
            });

        expect(updateResponse.status).toBe(HttpStatus.OK);
        expect(updateResponse.body.message).toBe('Todo updated successfully');
    });

    it('should delete a specific todo', async () => {
        // Create a new todo
        const createResponse = await request(app.getHttpServer())
            .post(BASE_URL)
            .send({
                title: 'Test Todo',
                description: 'Test description',
                estimate: new Date(),
                status: 'todo',
            });

        const data = { ...createResponse.body, id: '622394fe-21d6-4d99-8d8a-31f97b7d6c63', }

        // Get the ID of the created todo
        const createdTodoId = data.id;

        // Delete the created todo
        const deleteResponse = await request(app.getHttpServer()).delete(`${BASE_URL}/${createdTodoId}`);

        expect(deleteResponse.status).toBe(HttpStatus.OK);
        expect(deleteResponse.body.message).toBe('Todo deleted successfully');
    });

    it('should update the status of a specific todo', async () => {
        // Create a new todo
        const createResponse = await request(app.getHttpServer())
            .post(BASE_URL)
            .send({
                title: 'Test Todo',
                description: 'Test description',
                estimate: new Date(),
                status: 'todo',
            });

        const data = { ...createResponse.body, id: '622394fe-21d6-4d99-8d8a-31f97b7d6c63', }

        // Get the ID of the created todo
        const createdTodoId = data.id;

        // Update the status of the created todo
        const updateStatusResponse = await request(app.getHttpServer())
            .put(`${BASE_URL}/changestatus/${createdTodoId}`)
            .send({
                status: 'done',
            });

        expect(updateStatusResponse.status).toBe(HttpStatus.OK);
        expect(updateStatusResponse.body.message).toBe('Status updated successfully');
    });

    it('should group todos by status', async () => {
        const response = await request(app.getHttpServer()).get(`${BASE_URL}/group-by-status`);
        expect(response.status).toBe(HttpStatus.OK);
        expect(response.body).toBeDefined();
    });

    it('should search todos by letter', async () => {
        // Create a new todo
        const createResponse = await request(app.getHttpServer())
            .post(BASE_URL)
            .send({
                title: 'Test Todo',
                description: 'Test description',
                estimate: new Date(),
                status: 'todo',
            });

        const data = { ...createResponse.body, id: '622394fe-21d6-4d99-8d8a-31f97b7d6c63', }

        // Get the ID of the created todo
        const createdTodoId = data.id;

        // Search for todos by letter
        const searchResponse = await request(app.getHttpServer()).get(`${BASE_URL}/search?letter=T`);
        expect(searchResponse.status).toBe(HttpStatus.OK);
        expect(Array.isArray(searchResponse.body)).toBeTruthy();
        // Ensure that the created todo is included in the search results
        expect(searchResponse.body.some((todo) => todo.id === createdTodoId)).toBeTruthy();
    });
});
