import Database from '../global/database'
import { v4 as uuidv4 } from 'uuid';


const database = new Database();
export default async function Users (req,res){
    const { method } = req
    switch (method){
        case 'PATCH':
        try {
            const { myuserid,frienduserid } = req.body
            const data = {
                solicitacao: {
                    create:{
                        remetente:myuserid,
                        for: frienduserid,
                        status:'pendente'
                    }
                }
            }  
            const user = await database.Patch('Users', { id: myuserid, data: data })
            const userFriendUser = await database.Patch('Users', { id: frienduserid, data: data })
            return res.status(200).json({sucess:true ,data: {user:user}})

        } catch (erro) {
            console.log(erro)
            return res.status(400).json(erro)
        }
    }
}