import Database from "../global/database"

const database = new Database()
export default async function  createFriend(req,res){
    const { method } = req
    switch (method){
        case 'GET':
        try {
            const { id } = req.body
            const user = await database.Get('Friends',id);
            return res.status(200).json(user)

        } catch (erro) {
            console.log(erro)
            return res.status(400).json(erro)
        }
        case 'POST':
            try{
                const { username } =  req.body
                console.log(username)
                const users = await database.Get('Users',{username: username})
                const userProfiles = users.map(user => {
                    return {
                        id: user.id,
                        username: user.username,
                        bio: user.bio,
                        profilephoto: user.profilephoto
                    }
                  });
                return res.status(201).json({ success: true, data: userProfiles })
            }catch (error) {
                console.log(error)
                return res.status(400).json({ success: false })
        }
        case 'DELETE':
            try{
                const { id } = req.body
                await database.Delet('Friends',id)
                return res.status(201).json({success:true})
            }catch(error){
                res.status(400).json({success:false})
            }
    case 'PATCH':
        try {
            const { myuserid,frienduserid } = req.body
            console.log(myuserid, frienduserid)
            data = {
                solicitacao: {
                    remetente: myuserid,
                    frienduserid: frienduserid,
                    status: 'pendente'
                }
            }
            const user = await database.Patch('Users',{id:myuserid ,data:data})
            const userFriendUser = await database.Patch('Users',{id:frienduserid ,data:data})
            console.log(id)
            return res.status(200).json({sucess:true})

        } catch (erro) {
            console.log(erro)
            return res.status(400).json(erro)
        }
    }
}