const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
export default async function  profilePhotos(req,res){
    await prisma.$connect()
    const { method } = req
    switch (method){
        case 'POST':
            try{
                const {id,profilephoto} = req.body
                const profilephotourl = await prisma.ProfilePhoto.create({data:{
                    id,
                    profilephoto
                }})
                return res.status(201).json({ success: true, url:profilephotourl })
            }catch (error) {
                console.log(error)
                return res.status(400).json({ success: false })
        }
        case 'DELETE':
            try{
                const {id} = req.body
                await prisma.ProfilePhoto.delete({
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