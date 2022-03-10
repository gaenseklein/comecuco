function deleteOldSelection(inputField){
  inputField.value="";
  inputField.previousElementSibling.innerHTML="Agregar Fotos";
}

function showNextFileUploads(inputField){
  let classname = inputField.name.substring(0,inputField.name.length-1)+"Upload";
  let allFields = document.querySelectorAll('.'+classname);
  for (let x=1;x<allFields.length;x++){
    if(!allFields[x].classList.contains('active')){
      allFields[x].classList.add('active');
      break;
    }
  }
  if(inputField.name.substring(0,4)=="foto"){
    //create preview-image and show it on page? would be nice
    let targetcontainer = inputField.previousElementSibling;
    targetcontainer.innerHTML = "";
    if(inputField.files.length==0){
      targetcontainer.innerHTML = "Agregar Fotos";
      return;
    }
    let target = new Image();
    targetcontainer.appendChild(target);
    target.style.height="100px";
    const reader = new FileReader();
    reader.addEventListener("load", () => {
     const uploaded_image = reader.result;
     target.src = uploaded_image;
   });
   reader.readAsDataURL(inputField.files[0]);
  }
}
