var Myfile =document.querySelector('#Myfile');
const btn =document.querySelector('#btn');
const hint =document.querySelector('#hint');
console.log(hint);
console.log(btn);
console.log(Myfile);

let file;
//选择文件//
Myfile.addEventListener('change',function(e){

     file=e.target.files[0];
    hint.innerHTML='已选择文件';
});

btn.addEventListener('click',function(){
  if(!file){
        hint.innerHTML='未选择文件';
        return;
    }
    var  reader=new FileReader();
    reader.onload=function(e){

      
        let formData = new FormData();
        const imgUrl3=e.target.result;
        console.log(imgUrl3);
        
       const MD5=SparkMD5.ArrayBuffer.hash(imgUrl3);
       var timestamp = Math.round(new Date().getTime()/1000).toString();
      //  var timestamp = new Date().getTime()/1000;
      
       var s1=timestamp. concat(MD5);
       var token="hCm08IuoA6OAEJL8jyrZTSB4aR13R1ggXML0557QwB5HqIpDeBteQgyzjrPI9qr6";
       var SignString=s1. concat(token);//构造签名串
       //计算签名串的MD5值

       
       var sign = md5(SignString);
    		
      //  const sign=SparkMD5.ArrayBuffer.hash(SignString);
       
       console.log(sign);
       formData.append('img', file);  
      //  hint.innerHTML=`SignString:${SignString} sign:${sign}`;
    
    var httpRequest = new XMLHttpRequest();
var url = `https://u338197-a083-a04ca16e.westc.gpuhub.com:8443/api/v1/?timestamp=${timestamp}&sign=${sign}`;
httpRequest.open("POST", url);
// httpRequest.setRequestHeader("", "");

  httpRequest.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
     console.log(this.response);
    }
    });
httpRequest.onreadystatechange = function () {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
   
      var result = httpRequest.responseText;
      
      var obj=eval('('+result+')');
     
      console.log(obj.Data.Image_origin);
      var imgUrl1=obj.Data.Image_origin
      console.log(imgUrl1);
      console.log(obj.Data.Image);
      var imgUrl2=obj.Data.Image
      console.log(imgUrl2);
     
      var img1=document.createElement("img");
      img1.src=imgUrl1;
       document.getElementById("image-container1").appendChild(img1);
      img1.style.height="350px";
      img1.style.width="400px";
      img1.style.top="250px";
      
     
      var img2=document.createElement("img");
      img2.src=imgUrl2;
      document.getElementById("image-container2").appendChild(img2);
      img2.style.height="350px";
      img2.style.width="400px";
      img2.style.top="250px";
      
     
      
  
      
  }
};
httpRequest.send(formData);

}
reader.readAsArrayBuffer(file);

})








 

