const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
export default async function  getPhoto(req,res){
    await prisma.$connect()
    const { method } = req
    switch (method){
        case 'POST':
            try{
                const {id} = req.body
                const photo = await prisma.Photo.findUnique({
                    where:{
                        id,
                    }
                })
                console.log(photo)
                return res.status(200).json({url:photo})
            }catch(error){
                console.log(error)
                return res.status(400).json('not found')
            }
    }
}