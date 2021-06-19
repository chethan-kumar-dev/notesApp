var title=document.getElementById('title');
var notedesc=document.getElementById('note-desc');
var rowContainer=document.getElementById('row-container');
window.onload=function(){
   for(var i=0;i<localStorage.length;i++){
      keyValue=localStorage.key(i);
      var newDiv=document.createElement('div');
      newDiv.setAttribute('class','p-2 col-lg-3 col-md-4 col-sm-6 col-12')
      newDiv.innerHTML=`
      <h6>${keyValue.slice(0,55)}</h6>
            <h4>${keyValue.slice(55,keyValue.length)}</h4>
            <p>${localStorage.getItem(keyValue)}</p>
         <div class='btn-container'>
            <button class="btn btn-danger btn-sm" onclick='deleteNote(event,this)'><i class="far fa-trash-alt"></i> delete</button>
            <button class="btn btn-primary edit btn-sm" onclick='editNote(this)'><i class="fas fa-edit"></i> Edit</button>
         </div>
           
   `
   rowContainer.appendChild(newDiv)
   }
}
function addNote(){

   if((title.value==='' && notedesc.value==='' )|| (title.value==='' || notedesc.value==='')){
      alert('enter the details in')
   }
   else
   {
      var newDiv=document.createElement('div');
      var dt=new Date();
      newDiv.setAttribute('class','p-2 col-lg-3 col-md-4 col-sm-6 col-12')
      newDiv.innerHTML=`
               <h6>${dt}</h6>
               <h4>${title.value}</h4>
               <p>${notedesc.value}</p>
               <div class='btn-container'>
               <button class="btn btn-danger btn-sm" onclick='deleteNote(event,this)'><i class="far fa-trash-alt"></i> delete</button>
               <button class="btn btn-primary edit btn-sm" onclick='editNote(this)'><i class="fas fa-edit"></i> Edit</button>
               </div>
               `
      rowContainer.appendChild(newDiv)
      localStorage.setItem(dt+title.value,notedesc.value)
      title.value=''
      notedesc.value=''
   }
}
function deleteNote(e,x){
   console.log(e.target)
   x.parentElement.parentElement.remove();
   notes=x.parentElement.previousElementSibling;
   titl=notes.previousElementSibling;
   dt=titl.previousElementSibling.innerHTML;
   console.log(dt+titl.innerHTML)
   localStorage.removeItem(dt+titl.innerHTML)
}
function editNote(x){
   var deleteBtn=x.previousElementSibling;
   var element=deleteBtn.parentElement.previousElementSibling;
   var tit=element.previousElementSibling;
   var displayDate=tit.previousElementSibling;

   //x.innerHTML==='Edit'?x.innerHTML='Done':x.innerHTML='Edit'
   if(x.innerHTML==='<i class="fas fa-edit"></i> Edit'){
      x.innerHTML='<i class="fas fa-check"></i> Done';
      element.contentEditable='true'
      element.focus()
   }
   else
   {
      x.innerHTML='<i class="fas fa-edit"></i> Edit';
      element.blur();
      element.contentEditable='false';
      localStorage.setItem(displayDate.innerHTML+tit.innerHTML,element.innerHTML);
   }
  
}