const SERVER_URL = "https://gcp-url-analyzer-qh7fkw5ema-ew.a.run.app";
var isPopupDisplayed = false; // Variable to track pop-up display status

async function markLinks() {
  var linksObjects = document.getElementsByTagName('a');
  var linksStrings = [].slice.call(linksObjects).map(function (a) {
      return a.href;
    });
  console.log("Sending request to server")
  const response = await fetch(SERVER_URL, {
      method: "POST", 
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ "urls": linksStrings}), // body data type must match "Content-Type" header
    });
  var body = await response.json();
  console.log(body)
  for (var i = 0; i < linksObjects.length; i++) {
    var link = linksObjects[i];
    if (linksStrings[i] in body){
      if (body[linksStrings[i]] == '1'){
        var emTag = createStyledEmElement(link.textContent);
        emTag.addEventListener('click', function (event) {
          if (!isPopupDisplayed) {
            // Create a pop-up (an alert) with options to proceed or cancel
            event.preventDefault(); // Prevent the default link behavior
            var confirmation = confirm('This is potentially malicious. Click OK to proceed to the link or Cancel to stay on this page.');
            if (confirmation) {
              // User clicked OK, allow the link to be followed
              isPopupDisplayed = false;
              window.location.href = link.href;
            } else {
              // User clicked Cancel, do not follow the link
              isPopupDisplayed = false;
            }
          }
        });
        link.innerHTML = '';
        link.appendChild(emTag);
      }
    }
  }
}

function createStyledEmElement(text) {
  var emTag = document.createElement('em');
  emTag.textContent = text;
  applyStyles(emTag);
  return emTag;
}

function applyStyles(element) {
  element.style.border = '2px solid red';
  element.style.padding = '2px 6px';
  element.style.backgroundColor = '#ffc6b3';
  element.style.color = 'red';
  element.style.borderRadius = '5px';
  element.style.fontFamily = 'Arial, sans-serif';
  element.style.fontWeight = 'bold';
  element.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)';
  element.style.cursor = 'pointer';
}

// Run the function when the page finishes loading
window.addEventListener('load', markLinks);
