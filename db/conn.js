import { connect } from 'mongoose';



const Connection=async()=>{
    const DB=process.env.DATABASE;
    // const DB='mongodb://localhost:27017/mernblog'
    

    connect(DB,{useNewUrlParser:true}).then(()=>{
        console.log('connection succesfull');
    }).catch((err)=>{
        console.log(err);
        console.log('error while connecting with database');
    })
}


export default Connection