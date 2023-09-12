const SERVER_URL = "https://gcp-url-analyzer-qh7fkw5ema-ew.a.run.app";
var isPopupDisplayed = false; // Variable to track pop-up display status
var isFirstPopupConfirmed = false; // Variable to track the first popup confirmation

async function markLinks() {
  var linksObjects = document.getElementsByTagName('a');
  var linksStrings = [].slice.call(linksObjects).map(function (a) {
      return a.href;
    });
  console.log("URLAdvisor: Sent request to server")
  const response = await fetch(SERVER_URL, {
    method: "POST",
    cache: "no-cache",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ "urls": linksStrings }),
  });
  var body = await response.json();
  console.log("URLAdvisor: Recieved response from server")

  for (var i = 0; i < linksObjects.length; i++) {
    var link = linksObjects[i];
    if (linksStrings[i] in body) {
      if (body[linksStrings[i]] == '1') {
        var emTag = createStyledEmElement(link.textContent, link.href);
        emTag.addEventListener('click', function (event) {
          if (!isPopupDisplayed) {
            event.preventDefault();
            var confirmation = confirm('This is potentially malicious. Click OK to proceed to the link or Cancel to stay on this page.');
            if (confirmation) {
              isPopupDisplayed = false;
              isFirstPopupConfirmed = true;
              var secondConfirmation = confirm('Are you sure you would like to continue?');
              if (secondConfirmation) {
                window.location.href = event.currentTarget.getAttribute('data-href');
              }
            } else {
              isPopupDisplayed = false;
              isFirstPopupConfirmed = false;
            }
          } else if (!isFirstPopupConfirmed) {
            event.preventDefault(); // Prevent navigation if the first popup was not confirmed
          }
        });
        link.innerHTML = '';
        link.appendChild(emTag);
      }
    }
  }
}

function createStyledEmElement(text, linkHref) {
  var emTag = document.createElement('em');
  emTag.textContent = text;
  applyStyles(emTag);
  emTag.setAttribute('data-href', linkHref);
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