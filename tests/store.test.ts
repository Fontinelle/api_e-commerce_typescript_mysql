import supertest from 'supertest';
import app from '../src/app';
import db from '../src/config/database';
import Store from '../src/models/Store';
import Address from '../src/models/Address';

const request = supertest(app);

const id = 4;

const storeMock = {
  id: 1,
  name: 'any_store1',
  email: 'any1@email.com',
  CNPJ: '00.000.000/0000-01',
  phoneNumber: '1545487841',
  address: {
    CEP: '00000-001',
    state: 'any_state1',
    city: 'any_city1',
    district: 'any_district1',
    street: 'any_street1',
    number: 'any_number1',
  },
};

const storeMock2 = {
  id: 2,
  name: 'any_store2',
  email: 'any2@email.com',
  CNPJ: '00.000.000/0000-02',
  phoneNumber: '1545487842',
  address: {
    CEP: '00000-002',
    state: 'any_state2',
    city: 'any_city2',
    district: 'any_district2',
    street: 'any_street2',
    number: 'any_number2',
  },
};

beforeAll(async () => {
  await db.sync({ force: true });
});

describe('Store - Create', () => {
  it('Should return status 400 if no all information is provided', async () => {
    const store = await request.post('/api/v1/store').send({});
    expect(store.statusCode).toBe(400);
    expect(store.body).toMatchObject({
      errors: [
        'body[name]: Deve ser do tipo texto',
        'body[name]: Deve ter no minimo 3 caracteres',
        'body[email]: Não é um email válido',
        'body[CNPJ]: Não é um CNPJ válido',
        'body[phoneNumber]: Não é um numero de telefone válido',
        'body[address.CEP]: Não é um CEP válido',
        'body[address.state]: Deve ser do tipo texto',
        'body[address.state]: Deve ter no minimo 3 caracteres',
        'body[address.city]: Deve ser do tipo texto',
        'body[address.city]: Deve ter no minimo 3 caracteres',
        'body[address.district]: Deve ser do tipo texto',
        'body[address.district]: Deve ter no minimo 3 caracteres',
        'body[address.street]: Deve ser do tipo texto',
        'body[address.street]: Deve ter no minimo 3 caracteres',
        'body[address.number]: Deve ser do tipo texto',
        'body[address.number]: Deve ter no minimo 1 caracteres',
      ],
    });
  });

  it('Should return status 400 if no name is provided', async () => {
    const store = await request.post('/api/v1/store').send({
      email: storeMock.email,
      CNPJ: storeMock.CNPJ,
      phoneNumber: storeMock.phoneNumber,
      address: {
        CEP: storeMock.address.CEP,
        state: storeMock.address.state,
        city: storeMock.address.city,
        district: storeMock.address.district,
        street: storeMock.address.street,
        number: storeMock.address.number,
      },
    });
    expect(store.statusCode).toBe(400);
    expect(store.body).toMatchObject({
      errors: ['body[name]: Deve ser do tipo texto', 'body[name]: Deve ter no minimo 3 caracteres'],
    });
  });

  it('Should return status 400 if no email is provided', async () => {
    const store = await request.post('/api/v1/store').send({
      name: storeMock.name,
      CNPJ: storeMock.CNPJ,
      phoneNumber: storeMock.phoneNumber,
      address: {
        CEP: storeMock.address.CEP,
        state: storeMock.address.state,
        city: storeMock.address.city,
        district: storeMock.address.district,
        street: storeMock.address.street,
        number: storeMock.address.number,
      },
    });
    expect(store.statusCode).toBe(400);
    expect(store.body).toMatchObject({
      errors: ['body[email]: Não é um email válido'],
    });
  });

  it('Should return status 400 if no CNPJ is provided', async () => {
    const store = await request.post('/api/v1/store').send({
      name: storeMock.name,
      email: storeMock.email,
      phoneNumber: storeMock.phoneNumber,
      address: {
        CEP: storeMock.address.CEP,
        state: storeMock.address.state,
        city: storeMock.address.city,
        district: storeMock.address.district,
        street: storeMock.address.street,
        number: storeMock.address.number,
      },
    });
    expect(store.statusCode).toBe(400);
    expect(store.body).toMatchObject({
      errors: ['body[CNPJ]: Não é um CNPJ válido'],
    });
  });

  it('Should return status 400 if no phoneNumber is provided', async () => {
    const store = await request.post('/api/v1/store').send({
      name: storeMock.name,
      email: storeMock.email,
      CNPJ: storeMock.CNPJ,
      address: {
        CEP: storeMock.address.CEP,
        state: storeMock.address.state,
        city: storeMock.address.city,
        district: storeMock.address.district,
        street: storeMock.address.street,
        number: storeMock.address.number,
      },
    });
    expect(store.statusCode).toBe(400);
    expect(store.body).toMatchObject({
      errors: ['body[phoneNumber]: Não é um numero de telefone válido'],
    });
  });

  it('Should return status 400 if no address is provided', async () => {
    const store = await request.post('/api/v1/store').send({
      name: storeMock.name,
      email: storeMock.email,
      CNPJ: storeMock.CNPJ,
      phoneNumber: storeMock.phoneNumber,
    });
    expect(store.statusCode).toBe(400);
    expect(store.body).toMatchObject({
      errors: [
        'body[address.CEP]: Não é um CEP válido',
        'body[address.state]: Deve ser do tipo texto',
        'body[address.state]: Deve ter no minimo 3 caracteres',
        'body[address.city]: Deve ser do tipo texto',
        'body[address.city]: Deve ter no minimo 3 caracteres',
        'body[address.district]: Deve ser do tipo texto',
        'body[address.district]: Deve ter no minimo 3 caracteres',
        'body[address.street]: Deve ser do tipo texto',
        'body[address.street]: Deve ter no minimo 3 caracteres',
        'body[address.number]: Deve ser do tipo texto',
        'body[address.number]: Deve ter no minimo 1 caracteres',
      ],
    });
  });

  it('Should return status 400 if any data provided wrong', async () => {
    const store = await request.post('/api/v1/store').send({
      name: 10001,
      email: 'any.com',
      CNPJ: '00.000.000/000000',
      phoneNumber: '0000000000',
      address: {
        CEP: '00000000',
        state: 10001,
        city: 10001,
        district: 10001,
        street: 111,
        number: 10001,
      },
    });
    expect(store.statusCode).toBe(400);
    expect(store.body).toMatchObject({
      errors: [
        'body[name]: Deve ser do tipo texto',
        'body[email]: Não é um email válido',
        'body[CNPJ]: Não é um CNPJ válido',
        'body[phoneNumber]: Não é um numero de telefone válido',
        'body[address.CEP]: Não é um CEP válido',
        'body[address.state]: Deve ser do tipo texto',
        'body[address.city]: Deve ser do tipo texto',
        'body[address.district]: Deve ser do tipo texto',
        'body[address.street]: Deve ser do tipo texto',
        'body[address.number]: Deve ser do tipo texto',
      ],
    });
  });

  it('Should return status 200 if all information is provided', async () => {
    const store = await request.post('/api/v1/store').send(storeMock);
    expect(store.statusCode).toBe(200);
    expect(store.body).toMatchObject({ store: storeMock });
  });

  it('Should return status 422 if name, email or CNPJ have already been registered', async () => {
    const store = await request.post('/api/v1/store').send(storeMock);
    expect(store.statusCode).toBe(422);
    expect(store.body).toMatchObject({
      errors: [
        'Uma loja já foi cadastrada com esse nome',
        'Uma loja já foi cadastrada com esse e-mail',
        'Uma loja já foi cadastrada com esse numero de telefone',
        'Uma loja já foi cadastrada com esse CNPJ',
      ],
    });
  });
});

describe('Store - Index', () => {
  it('Should return status 200 with all stores found', async () => {
    const store = await Store.create(storeMock2);
    await Address.create({ store_id: store.id, ...storeMock2.address });

    const stores = await request.get('/api/v1/store');
    expect(stores.statusCode).toBe(200);
    expect(stores.body).toMatchObject({ store: [storeMock, storeMock2] });
  });

  it('Should return status 200 if no stores are found', async () => {
    await db.sync({ force: true });
    const stores = await request.get('/api/v1/store');
    expect(stores.statusCode).toBe(200);
    expect(stores.body).toMatchObject({ store: [] });
  });
});

describe('Store - Show', () => {
  it('Should return status 200 with one stores found', async () => {
    const newStore = await Store.create(storeMock);
    await Address.create({ store_id: newStore.id, ...storeMock.address });

    const store = await request.get(`/api/v1/store/${newStore.id}`);
    expect(store.statusCode).toBe(200);
    expect(store.body).toMatchObject({ store: storeMock });
    expect(store.body).not.toMatchObject({ store: storeMock2 });
  });

  it('Should return status 404 if no store is found by the given id', async () => {
    const store = await request.get(`/api/v1/store/${id}`);
    expect(store.statusCode).toBe(404);
    expect(store.body).toMatchObject({ errors: 'Loja não encontrada' });
    expect(store.body).not.toMatchObject({ store: storeMock });
    expect(store.body).not.toMatchObject({ store: storeMock2 });
  });

  it('Should return status 400 if given id is invalid', async () => {
    const store = await request.get('/api/v1/store/dwe');
    expect(store.statusCode).toBe(400);
    expect(store.body).toMatchObject({ errors: ['params[id]: Não é um ID válido'] });
    expect(store.body).not.toMatchObject({ store: storeMock });
    expect(store.body).not.toMatchObject({ store: storeMock2 });
  });
});

describe('Store - Update', () => {
  it('Should return status 400 if no all information is provided', async () => {
    const store = await request.put(`/api/v1/store/${storeMock.id}`).send({});
    expect(store.statusCode).toBe(400);
    expect(store.body).toMatchObject({ errors: 'Uma das informações deve ser fornecida' });
  });

  it('Should return status 404 if no store is found by the given id', async () => {
    const store = await request.put(`/api/v1/store/${id}`).send({
      name: storeMock2.name,
    });
    expect(store.statusCode).toBe(404);
    expect(store.body).toMatchObject({ errors: 'Loja não encontrada' });
    expect(store.body).not.toMatchObject({ store: storeMock });
  });

  it('Should return status 400 if given id is invalid', async () => {
    const store = await request.put('/api/v1/store/dwe');
    expect(store.statusCode).toBe(400);
    expect(store.body).toMatchObject({ errors: ['params[id]: Não é um ID válido'] });
    expect(store.body).not.toMatchObject({ store: storeMock });
    expect(store.body).not.toMatchObject({ store: storeMock2 });
  });

  it('Should return status 200 if only name is given', async () => {
    const store = await request.put(`/api/v1/store/${storeMock.id}`).send({
      name: storeMock2.name,
    });
    expect(store.statusCode).toBe(200);
    expect(store.body).toMatchObject({
      store: {
        name: storeMock2.name,
        email: storeMock.email,
        CNPJ: storeMock.CNPJ,
        phoneNumber: storeMock.phoneNumber,
        address: storeMock.address,
      },
    });
  });

  it('Should return status 200 if only email is given', async () => {
    const store = await request.put(`/api/v1/store/${storeMock.id}`).send({
      email: storeMock2.email,
    });
    expect(store.statusCode).toBe(200);
    expect(store.body).toMatchObject({
      store: {
        name: storeMock2.name,
        email: storeMock2.email,
        CNPJ: storeMock.CNPJ,
        phoneNumber: storeMock.phoneNumber,
        address: storeMock.address,
      },
    });
  });

  it('Should return status 200 if only CNPJ is given', async () => {
    const store = await request.put(`/api/v1/store/${storeMock.id}`).send({
      CNPJ: storeMock2.CNPJ,
    });
    expect(store.statusCode).toBe(200);
    expect(store.body).toMatchObject({
      store: {
        name: storeMock2.name,
        email: storeMock2.email,
        CNPJ: storeMock2.CNPJ,
        phoneNumber: storeMock.phoneNumber,
        address: storeMock.address,
      },
    });
  });

  it('Should return status 200 if only phone number is given', async () => {
    const store = await request.put(`/api/v1/store/${storeMock.id}`).send({
      phoneNumber: storeMock2.phoneNumber,
    });
    expect(store.statusCode).toBe(200);
    expect(store.body).toMatchObject({
      store: {
        name: storeMock2.name,
        email: storeMock2.email,
        CNPJ: storeMock2.CNPJ,
        phoneNumber: storeMock2.phoneNumber,
        address: storeMock.address,
      },
    });
  });

  it('Should return status 200 if only address is given', async () => {
    const store = await request.put(`/api/v1/store/${storeMock.id}`).send({
      address: storeMock2.address,
    });
    expect(store.statusCode).toBe(200);
    expect(store.body).toMatchObject({
      store: {
        name: storeMock2.name,
        email: storeMock2.email,
        CNPJ: storeMock2.CNPJ,
        phoneNumber: storeMock2.phoneNumber,
        address: storeMock2.address,
      },
    });
  });

  it('Should return status 422 if name, email or CNPJ have already been registered', async () => {
    const store = await request.put(`/api/v1/store/${storeMock.id}`).send({
      name: storeMock2.name,
      email: storeMock2.email,
      CNPJ: storeMock2.CNPJ,
      phoneNumber: storeMock2.phoneNumber,
    });
    expect(store.statusCode).toBe(422);
    expect(store.body).toMatchObject({
      errors: [
        'Uma loja já foi cadastrada com esse nome',
        'Uma loja já foi cadastrada com esse e-mail',
        'Uma loja já foi cadastrada com esse numero de telefone',
        'Uma loja já foi cadastrada com esse CNPJ',
      ],
    });
  });
});

describe('Store - Remove', () => {
  it('Should return status 404 if no store is found by the given id', async () => {
    const store = await request.delete(`/api/v1/store/${id}`);
    expect(store.statusCode).toBe(404);
    expect(store.body).toMatchObject({ errors: 'Loja não encontrada' });
  });

  it('Should return status 400 if given id is invalid', async () => {
    const store = await request.delete('/api/v1/store/dwe');
    expect(store.statusCode).toBe(400);
    expect(store.body).toMatchObject({ errors: ['params[id]: Não é um ID válido'] });
  });

  it('Should return status 200 if store is successfully removed', async () => {
    const store = await request.delete(`/api/v1/store/${storeMock.id}`);
    expect(store.statusCode).toBe(200);
    expect(store.body).toMatchObject({ deleted: true });
  });
});
