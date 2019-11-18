const testCaseA = {
  id: 'Test case A',
  query: `
    query {
      animals {
         origin
      }
    }
  `,
  variables: {},
  context: {},
  expected: {data: {animals: [{kind: 'Dog'}]}}
};

const getAllUsers = {
  id: 'Get all users',
  query: `
    query {
      getAllUsers {
        id
        firstName
        lastName
        email
      }
    }
  `,
  variables: {},
  context: {},
  expected: {
    "data": {
      "getAllUsers": [
        {
          "id": "5da8e09aa42743a12eb10ebd",
          "firstName": "Daniel",
          "lastName": "Peach",
          "email": "dp@gmail.com"
        },
        {
          "id": "5da8e0cda42743a12eb10ebe",
          "firstName": "Jayden",
          "lastName": "Thrasher",
          "email": "jd@gmail.com"
        },
        {
          "id": "5dc7a474b2f66aa719ea0d31",
          "firstName": "Dan",
          "lastName": "Peach",
          "email": "dpeach@gmail.com"
        },
        {
          "id": "5dc7a48c67775aa71fe6e6e8",
          "firstName": "Dan",
          "lastName": "Peach",
          "email": "dpeach@gmail.com"
        }
      ]
    }
  }
}

const typeDef = {}

describe('Schema Test', () => {

})