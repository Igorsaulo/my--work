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
        console.log(id)
        const dados = await prisma[model].findUnique({
          where: {
            id,
          }
        })
        console.log(dados)
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
      async Patch(model, { id, data }) {
        console.log(data)
        const updatedObjeto = await prisma[model].update({
          where: {
            id,
          },
          data: {
            ...data,
          },
        });
        console.log('ok')
        console.log(updatedObjeto)
        return updatedObjeto;
      }      
}