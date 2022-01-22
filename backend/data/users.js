import bcrypt from 'bcryptjs'
const users = [
  {
    name: 'moein ghorbanali',
    email: 'moein@example.com',
    password: bcrypt.hashSync('123456', 10),
    phoneNumber: '0',
    isAdmin: true,
  },
  {
    name: 'mahboobe jafarzade',
    email: 'mahboobe@example.com',
    password: bcrypt.hashSync('123456', 10),
    phoneNumber: '1',
  },
  {
    name: 'hanie ghorbanali',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    phoneNumber: '2',
  },
  {
    name: 'mojtaba ghorbanali',
    email: 'mojtaba@example.com',
    password: bcrypt.hashSync('123456', 10),
    phoneNumber: '3',
  },
  {
    name: 'mehdi jafarzade',
    email: 'mehdi@example.com',
    password: bcrypt.hashSync('123456', 10),
    phoneNumber: '4',
  },
  {
    name: 'hasan jafarzade',
    email: 'hasan@example.com',
    password: bcrypt.hashSync('123456', 10),
    phoneNumber: '5',
  },
  {
    name: 'marzie ghorbanali',
    email: 'marzie@example.com',
    password: bcrypt.hashSync('123456', 10),
    phoneNumber: '6',
  },
  {
    name: 'malihe jafarzade',
    email: 'malihe@example.com',
    password: bcrypt.hashSync('123456', 10),
    phoneNumber: '7',
  },
  {
    name: 'mohammad jafarzade',
    email: 'mohammad@example.com',
    password: bcrypt.hashSync('123456', 10),
    phoneNumber: '8',
  },
  {
    name: 'mohsen jafarzade',
    email: 'mohsen@example.com',
    password: bcrypt.hashSync('123456', 10),
    phoneNumber: '9',
  },
  {
    name: 'reza jafarzade',
    email: 'reza@example.com',
    password: bcrypt.hashSync('123456', 10),
    phoneNumber: '10',
  },
  {
    name: 'nazanin shoghi',
    email: 'nazanin@example.com',
    password: bcrypt.hashSync('123456', 10),
    phoneNumber: '11',
  },
]

export default users
