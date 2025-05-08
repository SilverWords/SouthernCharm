window.onload = function() {
  var letterContents = document.getElementById("lovelettercontents");
  
  fetch('https://southerncharm-146b.restdb.io/rest/lovenotes', {
    headers: 
    { 'cache-control': 'no-cache',
      'x-apikey': '681ba99a72702c62d9b3d4cb' } 
  })
  .then(response => response.json())
  .then(data => {letterContents.innerHTML=data[data.length-1].contents; console.log(data)})
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
