import Database from '../global/database'

const database = new Database();
export default async function Users (req,res){
    const { method } = req
    switch (method){
        case 'GET':
        try {
            const { id } = req.body
            const users = await database.Get('Users',id);
            return res.status(200).json(users)

        } catch (erro) {
            console.log(erro)
            return res.status(400).json(erro)
        }
        case 'POST':
            try {
                const user = await database.Post('Users',req.body)
                return res.status(201).json({ success: true, data: user })
            } catch (error) {
                console.log(error)
                return res.status(400).json({ success: false })
            }
            case 'PATCH':
                try {
                    const {email,novoEmail} = req.body
                    const att = await prisma.Users.update({
                        where:{
                            email:email,
                        },
                        data:{
                            email:novoEmail,
                        },
                    })
                    res.status(201).json({ success: true, data: "atualizado" })
                } catch (erro) {
                    return res.status(400).json({ success: false,error:erro })
                }
            break
            case 'DELETE':
                try{
                    const { id } = req.body
                    await database.Delet('Users',id)
                    res.status(201).json({success:true})
                }catch(error){
                    console.log(error)
                    return res.status(400).json({success:false})
                }
    }
};