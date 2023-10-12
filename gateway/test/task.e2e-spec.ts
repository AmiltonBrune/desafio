import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { AppModule } from './../src/app.module';
import { userSignupRequestSuccess } from './mocks/user-signup-request-success.mock';
import { itemCreateRequestSuccess } from './mocks/items-create-request-success.mock';
import { itemUpdateRequestSuccess } from './mocks/items-update-request-success.mock';

describe('Items (e2e)', () => {
  let app;
  let user;
  let itemId: string;
  let userToken: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_DSN);
    await mongoose.connection.dropDatabase();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/ (POST) - should create a user for checking items api', (done) => {
    return request(app.getHttpServer())
      .post('/users/')
      .send(userSignupRequestSuccess)
      .expect(201)
      .end(done);
  });

  it('/users/login (POST) - should create a token for valid credentials', (done) => {
    return request(app.getHttpServer())
      .post('/users/login')
      .send(userSignupRequestSuccess)
      .expect(201)
      .expect((res) => {
        userToken = res.body.data.token;
      })
      .end(done);
  });

  it('/items (GET) - should not return items without valid token', (done) => {
    return request(app.getHttpServer())
      .get('/items')
      .expect(401)
      .expect({
        message: 'token_decode_unauthorized',
        data: null,
        errors: null,
      })
      .end(done);
  });

  it('/items (POST) - should not create a items without a valid token', (done) => {
    return request(app.getHttpServer())
      .post('/items')
      .expect(401)
      .expect({
        message: 'token_decode_unauthorized',
        data: null,
        errors: null,
      })
      .end(done);
  });

  it('/items (POST) - should not create a items with an invalid token', (done) => {
    return request(app.getHttpServer())
      .post('/items')
      .set('Authorization', userToken + 1)
      .send(itemCreateRequestSuccess)
      .expect(401)
      .expect({
        message: 'token_decode_unauthorized',
        data: null,
        errors: null,
      })
      .end(done);
  });

  it('/items (POST) - should not create a items for an unconfirmed user with valid token', (done) => {
    return request(app.getHttpServer())
      .post('/items')
      .set('Authorization', userToken)
      .send(itemCreateRequestSuccess)
      .expect(403)
      .expect({
        message: 'permission_check_forbidden',
        data: null,
        errors: null,
      })
      .end(done);
  });

  it('/items (GET) - should not retrieve items without a valid token', (done) => {
    return request(app.getHttpServer())
      .get('/items')
      .expect(401)
      .expect({
        message: 'token_decode_unauthorized',
        data: null,
        errors: null,
      })
      .end(done);
  });

  it('/items (GET) - should not retrieve items with an valid token', (done) => {
    return request(app.getHttpServer())
      .get('/items')
      .set('Authorization', userToken + 1)
      .expect(401)
      .expect({
        message: 'token_decode_unauthorized',
        data: null,
        errors: null,
      })
      .end(done);
  });

  it('/items (POST) - should not retrieve items for an unconfirmed user with valid token', (done) => {
    return request(app.getHttpServer())
      .get('/items')
      .set('Authorization', userToken)
      .expect(403)
      .expect({
        message: 'permission_check_forbidden',
        data: null,
        errors: null,
      })
      .end(done);
  });

  it('/users/confirm/:link (GET) - should confirm user', async () => {
    user = await mongoose.connection
      .collection('users')
      .find({
        email: userSignupRequestSuccess.email,
      })
      .toArray();
    const userConfirmation = await mongoose.connection
      .collection('user_links')
      .find({
        user_id: user[0]._id.toString(),
      })
      .toArray();

    return request(app.getHttpServer())
      .get(`/users/confirm/${userConfirmation[0].link}`)
      .send()
      .expect(200)
      .expect({
        message: 'user_confirm_success',
        errors: null,
        data: null,
      });
  });

  it('/items (POST) - should create a items for the user with a valid token', (done) => {
    return request(app.getHttpServer())
      .post('/items')
      .set('Authorization', userToken)
      .send(itemCreateRequestSuccess)
      .expect(201)
      .expect((res) => {
        itemId = res.body.data.items.id;
        res.body.data.items.id = 'fake_value';
        res.body.data.items.created_at = 'fake_value';
        res.body.data.items.updated_at = 'fake_value';
      })
      .expect({
        message: 'item_create_success',
        data: {
          items: {
            name: itemCreateRequestSuccess.name,
            description: itemCreateRequestSuccess.description,
            user_id: user[0]._id.toString(),
            created_at: 'fake_value',
            updated_at: 'fake_value',
            id: 'fake_value',
          },
        },
        errors: null,
      })
      .end(done);
  });

  it('/items (POST) - should not create a items with invalid params', (done) => {
    return request(app.getHttpServer())
      .post('/items')
      .set('Authorization', userToken)
      .send(null)
      .expect(412)
      .expect((res) => {
        res.body.errors.duration.properties = 'fake_properties';
        res.body.errors.start_time.properties = 'fake_properties';
        res.body.errors.name.properties = 'fake_properties';
      })
      .expect({
        message: 'item_create_precondition_failed',
        data: null,
        errors: {
          duration: {
            message: 'Duration can not be empty',
            name: 'ValidatorError',
            properties: 'fake_properties',
            kind: 'required',
            path: 'duration',
          },
          start_time: {
            message: 'Start time can not be empty',
            name: 'ValidatorError',
            properties: 'fake_properties',
            kind: 'required',
            path: 'start_time',
          },
          name: {
            message: 'Name can not be empty',
            name: 'ValidatorError',
            properties: 'fake_properties',
            kind: 'required',
            path: 'name',
          },
        },
      })
      .end(done);
  });

  it('/items (GET) - should retrieve items for a valid token', (done) => {
    return request(app.getHttpServer())
      .get('/items')
      .set('Authorization', userToken)
      .expect(200)
      .expect((res) => {
        res.body.data.items[0].created_at = 'fake_value';
        res.body.data.items[0].updated_at = 'fake_value';
      })
      .expect({
        message: 'item_search_by_user_id_success',
        data: {
          items: [
            {
              name: itemCreateRequestSuccess.name,
              description: itemCreateRequestSuccess.description,
              created_at: 'fake_value',
              updated_at: 'fake_value',
              user_id: user[0]._id.toString(),
              id: itemId,
            },
          ],
        },
        errors: null,
      })
      .end(done);
  });

  it('/items/{id} (PUT) - should not items with invalid token', (done) => {
    return request(app.getHttpServer())
      .put(`/items/${itemId}`)
      .send(itemUpdateRequestSuccess)
      .expect(401)
      .expect({
        message: 'token_decode_unauthorized',
        data: null,
        errors: null,
      })
      .end(done);
  });

  it('/items/{id} (PUT) - should not update items with user_id param', (done) => {
    return request(app.getHttpServer())
      .put(`/items/${itemId}`)
      .set('Authorization', userToken)
      .send({
        ...itemUpdateRequestSuccess,
        user_id: user[0]._id.toString() + 1,
      })
      .expect(412)
      .expect((res) => {
        res.body.errors.user_id.properties = 'fake_properties';
      })
      .expect({
        message: 'item_update_by_id_precondition_failed',
        data: null,
        errors: {
          user_id: {
            message: 'The field value can not be updated',
            name: 'ValidatorError',
            properties: 'fake_properties',
            kind: 'user defined',
            path: 'user_id',
          },
        },
      })
      .end(done);
  });

  it('/items/{id} (PUT) - should update items with valid params', (done) => {
    return request(app.getHttpServer())
      .put(`/items/${itemId}`)
      .set('Authorization', userToken)
      .send(itemUpdateRequestSuccess)
      .expect(200)
      .expect((res) => {
        res.body.data.items.created_at = 'fake_value';
        res.body.data.items.updated_at = 'fake_value';
      })
      .expect({
        message: 'item_update_by_id_success',
        data: {
          items: {
            name: itemUpdateRequestSuccess.name,
            description: itemUpdateRequestSuccess.description,
            created_at: 'fake_value',
            updated_at: 'fake_value',
            user_id: user[0]._id.toString(),
            id: itemId,
          },
        },
        errors: null,
      })
      .end(done);
  });

  it('/items/{id} (DELETE) - should not delete items with invalid token', (done) => {
    return request(app.getHttpServer())
      .delete(`/items/${itemId}`)
      .send()
      .expect(401)
      .expect({
        message: 'token_decode_unauthorized',
        data: null,
        errors: null,
      })
      .end(done);
  });

  it('/items/{id} (DELETE) - should delete items with a valid token', (done) => {
    return request(app.getHttpServer())
      .delete(`/items/${itemId}`)
      .set('Authorization', userToken)
      .send()
      .expect(200)
      .expect({
        message: 'item_delete_by_id_success',
        data: null,
        errors: null,
      })
      .end(done);
  });
});
