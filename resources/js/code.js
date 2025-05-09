window.onload = function() {
  var letterContents = document.getElementById("lovelettercontents");
  
  fetch('https://southerncharm-146b.restdb.io/rest/lovenotes', {
    headers: 
    { 'cache-control': 'no-cache',
      'x-apikey': '681ba99a72702c62d9b3d4cb' } 
  })
  .then(response => response.json())
  .then(data => {
    letter = findMostRecentLetter(data);
    if(letter == null)
      letterContents.innerHTML="An error occured getting the love letter, but I still love you :)";
    else
      letterContents.innerHTML=letter.contents;
    console.log(data);
  })
  .catch(error => {console.error('Error:', error); letterContents.innerHTML="An error occured getting the love letter, but I still love you :)"});
}

function openLetter() {
  var letter = document.getElementById("loveletter");

  letter.classList.toggle("active");
  var content = letter.nextElementSibling;
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
}

function findMostRecentLetter(data) {
  var readStoredId = -1;
  var unreadstoredId = data.length;
  var currentMessage = null;
  var isNewLetter = false;
  const todayDate = new Date();

  data.forEach(msg => {
    var hasBeenRead = (null != msg.dateRead);
    var readDate;
    if(hasBeenRead) {
      readDate = new Date(msg.dateRead);
    }
    if(hasBeenRead && readDate.toDateString()==todayDate.toDateString())
      return msg;
    if(!isNewLetter && hasBeenRead) {
      if(msg.id > readStoredId) {
        readStoredId = msg.id;
        currentMessage = msg;
      }
    }
    else {
      isNewLetter = true;
      if(!hasBeenRead && msg.id < unreadstoredId) {
        unreadstoredId = msg.id;
        currentMessage = msg;
      }
    }
  });
  return currentMessage;
}