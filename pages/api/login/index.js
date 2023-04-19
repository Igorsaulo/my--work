const jwt = require('jsonwebtoken')

export default function Login(req,res){
    const { method } =req
    switch (method){
        case 'POST':
            try{
                const token = req.body.token
                jwt.verify(token,process.env.SECRET,(err,user)=>{
                    if (err){
                        console.log(err)
                        return
                    }
                res.status(200).json({auth:true ,dados:user})
                console.log(user)
                })
            }catch(error){
                console.log(error)
            }
    }
}