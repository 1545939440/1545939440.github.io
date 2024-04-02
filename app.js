const express=require("express")
const multiparty=require('multiparty')
const app=express()
app.post('upload',(req,res)=>{
    let form=new multiparty.Form({uploadDir:'.upload'})
    form.parse(req,(err,fields,files)=>{
          console.log(fields,'fields');
          console.log(files,'files');
    })
    res.setHeader('Access-Control-Allow-Origin','*')
    res.send('11')
})
app.listen(8000,()=>{
    console.log('服务器已上线');
})