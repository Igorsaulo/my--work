import { PrismaClient } from "@prisma/client";
const bcrypt = require ('bcrypt')

const prisma = new PrismaClient()
export default class Database{
    async Post(model,dados){
        if(model === 'Users'){
            const password = bcrypt.hashSync(dados.password,12)
            const user = await prisma.Users.create({data:{
                email:dados.email,
                password:password,
                username:dados.username
            },})
            return user
        }
        else{
            const objeto = await prisma[model].create({data:dados})
            return objeto
        }}

    async Get(model,id){
        const dados = await prisma[model].findMany({
            where:{
                id,
            }
        })
        return dados
    }
    async Delet(model,itemId){
        await prisma[model].delete({
            where:{
                id:itemId,
            },
        },)
        return true
    }
}