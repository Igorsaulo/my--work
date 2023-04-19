const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

export default async function Users (req,res){
    await prisma.$connect()
    const { method } =req
    switch (method){
        case 'POST':
        try {
            const {email,password} = req.body

            const user = await prisma.Users.findUnique({
                where:{
                    email:email
                }
            })
            console.log(user)
            const comparar = bcrypt.compare(password,user.password)
            if(!comparar){
                return res.status(422).json({msg:'Senha invalida'})
            }
            const secret = process.env.SECRET
            const token = jwt.sign(
                {
                    id:user.id,
                    username:user.username,
                    profilephoto:user.profilephoto
                },
                secret,
                {expiresIn: "1d"}
                )
            
            res.status(200).json({msg:'Autenticação realizada com sucesso',user:user.username,token:token})
        }catch(error){
            console.log(error)
        }
    }
};