import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from'dotenv'

import User from '../models/user.js'
import Token from '../models/token.js'

dotenv.config();


const signupUser= async(req,res)=>{
    try{
        // const salt=await bcrypt.genSalt(12);
        const hashedpass= await bcrypt.hash(req.body.password, 10);


        const user={username:req.body.username, name:req.body.name, password:hashedpass}
        // const user=req.body;
        const newuser= new User(user);
        await newuser.save();
        return res.status(200).json({msg:'signup-successful'})
    }catch(error){
        return res.status(500).json({msg:'signup-not successful'})
    }
}


export const loginUser=async (req,res)=>{
    let user=await User.findOne({username : req.body.username})
    if(!user){
        return res.status(400).json({msg:"username does not matched "})
    }

    try{
        let match = await bcrypt.compare(req.body.password, user.password)
        if(match){
            const accessToken=jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY, {expiresIn: 24})
            const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);
            
            // console.log(user.username);
            const newToken=new Token({token:refreshToken})
            await newToken.save();

            return res.status(200).json({accessToken:accessToken,refreshToken:refreshToken, name:user.name, username:user.username})


        }else{
            return res.status(400).json({msg:'password does not matched'});

        }
    }catch(e){
        console.log(e);
        return res.status(500).json({msg:'error while loging in user'});
    }
}
export default signupUser;