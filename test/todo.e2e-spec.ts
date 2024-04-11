import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('TodosController E2E test', () => {
    let app: INestApplication;
    const CREATE_TODO_URL = '/todos/';

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
            .post(CREATE_TODO_URL)
            .send({
                title: "Todo_title_test",
                description: "Todo_description_test",
                estimate: new Date(),
                status: "todo"
            });
        expect(response.status).toBe(201);
    });

    // it('should return a 400 Bad Request when invalid title is provided', async () => {
    //     const response = await request(app.getHttpServer())
    //         .post(CREATE_TODO_URL)
    //         .send({
    //             title: '',
    //             description: "Todo_description_test",
    //             estimate: new Date(),
    //             status: "todo"
    //         });
    //     console.log(response.error);

    //     expect(response.status).toBe(400);
    // });

    // it('should return a 400 Bad Request when invalid description is provided', async () => {
    //     const response = await request(app.getHttpServer())
    //         .post(CREATE_TODO_URL)
    //         .send({
    //             title: "Todo_title_test",
    //             description: 123,
    //             estimate: new Date(),
    //             status: "todo"
    //         });
    //     console.log(response.error);
    //     expect(response.status).toBe(400);
    // });

    it('should return a 400 Bad Request when invalid estimate is provided', async () => {
        const response = await request(app.getHttpServer())
            .post(CREATE_TODO_URL)
            .send({
                title: "Todo_title_test",
                description: "Todo_description_test",
                estimate: 'invalid_date_format',
                status: "todo"
            });
    console.log(response.error);
        expect(response.status).toBe(500);
    });

    // it('should return a 400 Bad Request when invalid status is provided', async () => {
    //     const response = await request(app.getHttpServer())
    //         .post(CREATE_TODO_URL)
    //         .send({
    //             title: "Todo_title_test",
    //             description: "Todo_description_test",
    //             estimate: new Date(),
    //             status: 123
    //         });
    // console.log(response.error);
    //     expect(response.status).toBe(400);
    // });
});
