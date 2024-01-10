import { User } from "../interfaces/user";

const dummyUsers = [
    {
        username:"John",
        password:"passwordJohn123",
        email:"john@test.com",
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        username:"Steve",
        password:"passwordSteve123",
        email:"steve@test.com",
        created_at: new Date(),
        updated_at: new Date()
    }
]

export default dummyUsers;