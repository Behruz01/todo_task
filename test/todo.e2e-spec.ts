import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('TodosController E2E test', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const modulFixture: TestingModule = await Test.
            createTestingModule({
                imports: [AppModule],
            }).compile();

        app = modulFixture.createNestApplication();
        await app.init()
    })

    it('should create a new todo', () => {
        return request(app.getHttpServer())
            .post("/api/todos")
            .send({
                title: "Todo_title_test",
                description: "Todo_description_test",
                estimate: new Date(),
                status: "todo"
            })
            .expect(201)
    })
})