import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()
export default class Database{
    async Post(model, { email, password, username }) {
      if (password) password = bcrypt.hashSync(password, 12)
          const user = await prisma[model].create({ data: { email, password, username},
          })
          return user
      }
      async Get(model, { id, username,email }) {
        if( id ) {
          const dados = await prisma[model].findUnique({
             where: { id },
             include:{
              solicitacao: true,
             },
            })
          return dados
        }else if(username){
          const dados = await prisma[model].findMany({
            where: {
              username: {
                startsWith: username
              }
          }})
          return dados
        }else if(email){
          const dados = await prisma[model].findUnique({
            where: { email },
            include:{
             solicitacao: true,
            },
           })
         return dados
        }
        else{
          const dados = await prisma[model].findMany()
          return dados
        }
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
        let userdados = await  this.Get(model,{id:id});
        if (data.photos){
          if (userdados.photos) userdados.photos.push(data.photos.url)
          else userdados.photos = [data.photos.url,]
          data.photos = userdados.photos
        };
        const updatedObjeto = await prisma[model].update({
          where: {
            id,
          },
          data: {
            ...data
          },
        });
        return updatedObjeto;
      }      
}