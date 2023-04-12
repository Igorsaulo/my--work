import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()
export default class Database{
    async Post(model, { email, password, username }) {
        if (model === 'Users') {
          const hashedPassword = bcrypt.hashSync(password, 12)
          const user = await prisma.Users.create({
            data: {
              email,
              password: hashedPassword,
              username
            },
          })
          return user
        } else {
          const objeto = await prisma[model].create({ data: { ...dados } })
          return objeto
        }
      }
      
      async Get(model, { id }) {
        const dados = await prisma[model].findMany({
          where: {
            id,
          }
        })
        return dados
      }
      
      async Delet(model, { id }) {
        await prisma[model].delete({
          where: {
            id,
          },
        })
        return true
      }      
}