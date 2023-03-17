import Database from '../global/database';

const database = new Database()
export default async function  profilePhotos(req,res){
    const { method } = req
    switch (method){
        case 'GET':
            try {
                const { id } = req.body
                const photo = await database.Get('ProfilePhoto',id);
                return res.status(200).json(photo)
    
            } catch (erro) {
                console.log(erro)
                return res.status(400).json(erro)
            }
        case 'POST':
            try{
                const profilephotourl = await database.Post('ProfilePhoto',req.body)
                return res.status(201).json({ success: true, url:profilephotourl })
            }catch (error) {
                console.log(error)
                return res.status(400).json({ success: false })
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