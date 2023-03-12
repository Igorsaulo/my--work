const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
export default async function  createFriend(req,res){
    await prisma.$connect()
    const { method } = req
    switch (method){
        case 'POST':
            try{
                const {friendid,userid,blocked} = req.body
                const friend = await prisma.Friends.create({data:{
                    friendid,
                    userid,
                    blocked
                }})
                return res.status(201).json({ success: true})
            }catch (error) {
                console.log(error)
                return res.status(400).json({ success: false })
        }
        case 'DELETE':
            try{
                const {friendid} = req.body
                await prisma.Friends.delete({
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