function toggleAddArtist() {
  var form = document.getElementById("newEntryForm");

  if(getComputedStyle(form, null).display == "none"){
    form.style.display = "block";
  } else {
    form.style.display = "none";
    document.getElementById("artistName").value = "";
    document.getElementById("artistAbout").value = "";
    document.getElementById("artistImage").value = "";
  }

}

function addNewArtist(){
  
  if (document.getElementById("artistName").value == "" | 
      document.getElementById("artistAbout").value == "" | 
      document.getElementById("artistImage").value == ""){
    document.getElementById("error").style.visibility = "visible";
    return;
  } else {
    document.getElementById("error").style.visibility = "hidden";
  }

  var form = document.getElementById("newEntryForm");

  var name = document.getElementById("artistName").value;
  var about = document.getElementById("artistAbout").value;
  var imageURL = document.getElementById("artistImage").value;
  console.log(imageURL);

  var newEntryDiv = document.createElement("div");
  newEntryDiv.className = "artistEntry";

  var newArtistImage = document.createElement("img");
  newArtistImage.className = "artistPic";
  newArtistImage.src = imageURL;
  newEntryDiv.appendChild(newArtistImage);

  var newArtistInfo = document.createElement("div");
  newArtistInfo.className = "artistInfo";
  newEntryDiv.appendChild(newArtistInfo);

  var newArtistName = document.createElement("span");
  newArtistName.className = "artistName";
  newArtistName.textContent = name;
  newArtistInfo.appendChild(newArtistName);


  var newArtistDesc = document.createElement("span");
  newArtistDesc.className = "description";
  newArtistDesc.textContent = about;
  newArtistInfo.appendChild(newArtistDesc);


  // Create the delete button
  var newDeleteButton = document.createElement("input");
  newDeleteButton.className = "deleteButton";
  newDeleteButton.type = "button";
  newDeleteButton.value = "Delete";
  newDeleteButton.setAttribute("onClick", "deleteArtist(this)");
  newEntryDiv.appendChild(newDeleteButton);

  var catalogue = document.getElementById("artistCatalogue");
  catalogue.appendChild(newEntryDiv);
  toggleAddArtist();
}

function deleteArtist(element){
  element.parentElement.remove();
}