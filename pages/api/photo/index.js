import Database from "../global/database";

const database = new  Database();
export default async function  Photos(req,res){
    const { method } = req
    switch (method){
        case 'GET':
            try {
                const { id } = req.body
                const photo = await database.Get('Photo',id);
                return res.status(200).json(photo)
    
            } catch (erro) {
                console.log(erro)
                return res.status(400).json(erro)
            }
        case 'POST':
            try{
                const photo = await database.Post('Photo',req.body);
                return res.status(201).json({ success: true, data: photo });
            }catch (error) {
                console.log(error);
                return res.status(400).json({ success: false });
        };
        case 'DELETE':
            try{
                const {id} = req.body
                await database.Delet('Photo',id);
                return res.status(201).json({success:true});
            }catch(error){
                res.status(400).json({success:false});
            };
    };
};