if(process.env.NODE_ENV==='production')
{
    module.exports={mongoURI:'mongodb+srv://brad:brad@cluster0-ml9hb.mongodb.net/test?retryWrites=true'}
}
else{
module.exports={mongoURI:'mongodb://localhost:27017/vidjot-dev'}
}