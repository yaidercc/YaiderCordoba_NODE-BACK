const jwt = require("jsonwebtoken");
require("dotenv").config()


const generarJWT=(correo,id_user,nombre,timeExpirate)=>{

    const payload={correo,id_user,nombre};

    return new Promise((res,rej)=>{
        jwt.sign(payload,process.env.SECRET_JWT_SEED,{
            expiresIn: timeExpirate
        },(err,token)=>{
            if(err){
                console.log(err);
            }else{
                if(err){
                    console.log(err);
                    rej(err)
                }else{
                    res(token)
                }
            }
        });
    })
}


module.exports = generarJWT;