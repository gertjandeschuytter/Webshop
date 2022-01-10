import bcrypt from 'bcryptjs'
//dummy data en aanmaak van admin
const users = [
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Peter Maes',
    email: 'Peter@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Berndt Storck',
    email: 'Berndt@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
