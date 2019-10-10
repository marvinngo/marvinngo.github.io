function toggleAddArtist() {
  var form = document.getElementById("newEntryForm");

  //Toggle form to add artist
  if(getComputedStyle(form, null).display == "none"){
    form.style.display = "block";
  } else {
    form.style.display = "none";
    document.getElementById("artistName").value = "";
    document.getElementById("artistAbout").value = "";
    document.getElementById("artistImage").value = "";
  }
}

//Used for debugging
function clearlocalstorage(){
  localStorage.clear();
  console.log(localStorage);
}

function loadFromLocalStorage(){
  //Load from local storage if artist array exists
  if(localStorage.getItem("artists")!==null){
    var artists = JSON.parse(localStorage.getItem("artists" || []));

    //Render each JSON artist object to page
    for(var i = 0; i < artists.length; i++){
      var name = artists[i].artistName;
      var about = artists[i].artistAbout;
      var imageURL = artists[i].artistImage;
      addtoCatalogue(name, about, imageURL);
    }
  }
}

function addNewArtist(){
  
  //Check all fields are filled in
  if (document.getElementById("artistName").value == "" | 
      document.getElementById("artistAbout").value == "" | 
      document.getElementById("artistImage").value == ""){
    document.getElementById("error").style.visibility = "visible";
    return;
  } else {
    document.getElementById("error").style.visibility = "hidden";
  }

  //Get values
  var name = document.getElementById("artistName").value;
  var about = document.getElementById("artistAbout").value;
  var imageURL = document.getElementById("artistImage").value;

  //Save to local storage and add to catalogue
  saveToLocalStorage(name, about, imageURL);
  addtoCatalogue(name, about, imageURL);
  toggleAddArtist();
}

function addtoCatalogue(name, about, imageURL){
  //Create catalogue entry div
  var newEntryDiv = document.createElement("div");
  newEntryDiv.className = "artistEntry";

  //Create image and add to entry div
  var newArtistImage = document.createElement("img");
  newArtistImage.className = "artistPic";
  newArtistImage.src = imageURL;
  newEntryDiv.appendChild(newArtistImage);

  //Create artist info div and add to entry div
  var newArtistInfo = document.createElement("div");
  newArtistInfo.className = "artistInfo";
  newEntryDiv.appendChild(newArtistInfo);

  //Create artist name span and add to artist info div
  var newArtistName = document.createElement("span");
  newArtistName.className = "artistName";
  newArtistName.textContent = name;
  newArtistInfo.appendChild(newArtistName);

  //Create artist description span and add to artist info div
  var newArtistDesc = document.createElement("span");
  newArtistDesc.className = "description";
  newArtistDesc.textContent = about;
  newArtistInfo.appendChild(newArtistDesc);

  //Create delete button and add to entry div
  var newDeleteButton = document.createElement("input");
  newDeleteButton.className = "deleteButton";
  newDeleteButton.type = "button";
  newDeleteButton.value = "Delete";
  newDeleteButton.setAttribute("onClick", "deleteArtist(this)");
  newEntryDiv.appendChild(newDeleteButton);

  //Add to catalogue
  var catalogue = document.getElementById("artistCatalogue");
  catalogue.appendChild(newEntryDiv);
}

function saveToLocalStorage(name, about, imageURL){
  //Create new artist array if does not exist in localStorage
  if(localStorage.getItem("artists")===null){
    var artists = [];
  } else{
    //Get artist array from local storage
    var artists = JSON.parse(localStorage.getItem("artists" || []));
  }

  //JSON object for new artist entry 
  var artist = {
    artistName: name,
    artistAbout: about,
    artistImage: imageURL
  }

  //Add new artist entry to array and push to local storage
  artists.push(artist)
  localStorage.setItem("artists", JSON.stringify(artists));
}

function deleteArtist(element){
  //Get artist name and about
  var children = element.parentElement.children;
  var artistInfo = children[1];
  var artistName = artistInfo.children[0].textContent;
  var artistAbout = artistInfo.children[1].textContent;

  var artists = JSON.parse(localStorage.getItem("artists" || []));

  //Delete from local storage
  for(var i = 0; i < artists.length; i++){
    if((artists[i].artistName === artistName) && (artists[i].artistAbout === artistAbout)){
      artists.splice(i, 1);
    }
  }
  
  //Push changes to local storage
  localStorage.setItem("artists", JSON.stringify(artists));

  //Delete artist entry 
  element.parentElement.remove();
}

function search(){
  //Get search input and artist entries
  var searchInput = document.getElementById("searchBar").value.toLowerCase();
  var catalogueEntries = document.getElementById("artistCatalogue").children;

  //If no input then display all entries
  if(searchInput == ""){
    for(var i = 0; i < catalogueEntries.length; i++){
      catalogueEntries[i].style.display = "";
    }
  } else {
    //Loop through entries and only show if contains matching letters
    for(var i = 0; i < catalogueEntries.length; i++){
      var children = catalogueEntries[i].children;
      var artistInfo = children[1];
      var artistName = artistInfo.children[0].textContent;

      //Show if search input found in artist name
      if(artistName.toLowerCase().indexOf(searchInput) > -1) {
        catalogueEntries[i].style.display = "";
      } else {
        catalogueEntries[i].style.display = "none";
      }
    }
  }

  
}