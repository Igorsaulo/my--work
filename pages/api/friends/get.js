const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
export default async function  getFriends(req,res){
    await prisma.$connect()
    const { method } = req
    switch (method){
        case 'POST':
            try{
                const {userid} = req.body
                const friends = await prisma.Friends.findMany({
                    where:{
                        userid,
                    }
                })
                console.log(friends)
                return res.status(200).json({friendlist:friends})
            }catch(error){
                console.log(error)
                return res.status(400).json('not found')
            }
    }
}