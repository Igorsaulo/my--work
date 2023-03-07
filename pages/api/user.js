const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')


const prisma = new PrismaClient()
export default async function Users (req,res){
    await prisma.$connect()
    const { method } =req
    switch (method){
        case 'GET':
        try {
            const users = await prisma.Users.findMany()
            return res.status(200).json(users)
        } catch (erro) {
            return res.status(400).json(erro)
        }
        break
        case 'POST':
            try {
                let {email,password,username} = await req.body
                password = bcrypt.hashSync(password,12)
                const user = await prisma.Users.create({data:{
                    email:email,
                    password:password,
                    username:username
                },})
                console.log(user)
                return res.status(201).json({ success: true, data: user })
            } catch (error) {
                return res.status(400).json({ success: false })
            }
            break
            case 'PATCH':
                try {
                    const {email,novoEmail} = req.body
                    console.log(req.body)
                    console.log(email)
                    console.log(novoEmail)
                    const att = await prisma.Users.update({
                        where:{
                            email:email,
                        },
                        data:{
                            email:novoEmail,
                        },
                    })
                    console.log(att)
                    res.status(201).json({ success: true, data: "atualizado" })
                } catch (erro) {
                    res.status(400).json({ success: false,error:erro })
                }
            break
            case 'DELETE':
                try{
                    const {email} = await req.body
                    await prisma.Users.delete({
                        where:{
                            email:email,
                        },
                    },)
                    res.status(201).json({success:true})
                }catch(error){
                    res.status(400).json({success:false})
                }
    }
}
