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
                const user = await database.Post('Friends',req.body)
                return res.status(201).json({ success: true, data: user })
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
    }
}