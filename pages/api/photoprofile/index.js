import Database from '../global/database';

const database = new Database()
export default async function  profilePhotos(req,res){
    const { method } = req
    switch (method){
        case 'POST':
            try {
                const { id } = req.body
                console.log(id)
                const photo = await database.Get('Users',{id:id});
                return res.status(200).json(photo)
    
            } catch (erro) {
                console.log(erro)
                return res.status(400).json(erro)
            }
        case 'DELETE':
            try{
                const {id} = req.body
                await database.Delet('ProfilePhoto',id)
                return res.status(201).json({success:true})
            }catch(error){
                res.status(400).json({success:false})
            }
    }
};