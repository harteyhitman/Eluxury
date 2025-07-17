import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'test',
          password: 'test',
          database: 'auth_test_db',
          entities: [User],
          synchronize: true,
          dropSchema: true, // Clean database between tests
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/signup (POST)', () => {
    it('should register a new user', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'Password123!',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.user.email).toEqual('test@example.com');
        });
    });

    it('should prevent duplicate emails', async () => {
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          username: 'testuser1',
          email: 'duplicate@example.com',
          password: 'Password123!',
        });

      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          username: 'testuser2',
          email: 'duplicate@example.com',
          password: 'Password123!',
        })
        .expect(409);
    });
  });

  describe('/auth/login (POST)', () => {
    it('should login with valid credentials', async () => {
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          username: 'loginuser',
          email: 'login@example.com',
          password: 'Password123!',
        });

      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'login@example.com',
          password: 'Password123!',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.access_token).toBeDefined();
        });
    });

    it('should reject invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'wrongpassword',
        })
        .expect(401);
    });
  });
});