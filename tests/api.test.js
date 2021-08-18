const supertest = require('supertest');
const { app, server } = require('../index');
const axios = require('axios');
const { getInfo } = require('../routes/controller')

const api = supertest(app);

const descriptionGet = {
    "name": "reg003-roman-numerals-slack",
    "version": "1.0.0"
  }

//const reqBody = ['parse I', 'stringify 1']
//const respBody = ['1' , 'I']
// import axios from 'axios';


jest.mock('axios');

test('should fetch users', () => {
    let responseObject = {};
    const req = {};
    const res = {
        json: jest.fn().mockImplementation((result) => {
            responseObject = result;
        })
    };
  axios.get.mockResolvedValue(responseObject);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return getInfo(req, res).then(() => expect(responseObject).toEqual(descriptionGet));
});

test('data returned as json', async () =>{
    await api
    .get('/')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two descriptions', async () => {
   const response = await api.get('/');
   expect(response.body).toEqual(descriptionGet)
})

test ('from roman to arabigo', async () => {
    const text = {'text' : 'parse I'};
    await api
    .post('/')
    .send(text)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect({"response_type":"in channel","text":1})
})

test ('from roman to arabigo  bad', async () => {
    const text = {'text' : 'parse 8999'};
    await api
    .post('/')
    .send(text)
    .expect(200)
    .expect({"response_type":"in channel","text": 'Unknown roman numeral'})
})

test ('from arabigo to roman', async () => {
    const text = {'text' : 'stringify 5'};
    await api
    .post('/')
    .send(text)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect({"response_type":"in channel","text":'V'})
})

test ('from arabigo to roman bad', async () => {
    const text = {'text' : 'stringify VV'};
    await api
    .post('/')
    .send(text)
    .expect(200)
    .expect({"response_type":"in channel","text": ''})
})

test ('from err text', async () => {
    const text = {'text' : 'ahora 5'};
    await api
    .post('/')
    .send(text)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect({"response_type":"in channel","text":'error'})
})

afterAll(() => {
    server.close()
})