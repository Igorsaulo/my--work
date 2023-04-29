import Database from '../global/database'

const database = new Database();
export default async function Users (req,res){
    const { method } = req
    switch (method){
        case 'PATCH':
        try {
            const { id,data} = req.body
            console.log(id)
            const users = await database.Patch('Users',{id:id ,data:data})
            console.log(id)
            return res.status(200).json(users)

        } catch (erro) {
            console.log(erro)
            return res.status(400).json(erro)
        }
        case 'GET':
            try {
                const { id, username } = req.body
                console.log(id)
                const users = await database.Get('Users',{id:id ,username:username })
                console.log(id)
                return res.status(200).json(users)
    
            } catch (erro) {
                console.log(erro)
                return res.status(400).json(erro)
            }
    }
}