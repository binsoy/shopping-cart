import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('password', 10),
    isAdmin: true,
  },
  {
    name: 'Mark Doe',
    email: 'markdoe@example.com',
    password: bcrypt.hashSync('password', 10),
  },
  {
    name: 'Ana Miles',
    email: 'ana.miles@example.com',
    password: bcrypt.hashSync('password', 10),
  },
]

export default users
