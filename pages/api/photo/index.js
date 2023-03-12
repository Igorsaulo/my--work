const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
export default async function  Photos(req,res){
    await prisma.$connect()
    const { method } = req
    switch (method){
        case 'POST':
            try{
                const {userId,photo} = req.body
                console.log(userId)
                console.log(photo)
                const photodb = await prisma.Photo.create({data:{
                    userId:userId,
                    photo:photo
                }})
                console.log(photo)
                return res.status(201).json({ success: true, data: photo })
            }catch (error) {
                console.log(error)
                return res.status(400).json({ success: false })
        }
        case 'DELETE':
            try{
                const {id} = req.body
                await prisma.Photo.delete({
                    where:{
                        id,
                    }
                })
                return res.status(201).json({success:true})
            }catch(error){
                res.status(400).json({success:false})
            }
    }
}