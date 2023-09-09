const SERVER_URL = "https://gcp-url-analyzer-qh7fkw5ema-ew.a.run.app";
async function markLinks() {
    
    var links = [].slice.call(document.getElementsByTagName('a')).map(function (a) {
        return a.href;
      });
    // var linksDict = new Object(); 
    const response = await fetch(SERVER_URL, {
        method: "POST", 
        mode: 'no-cors',
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ "urls": links}), // body data type must match "Content-Type" header
      });
    var body = await response.json();
    console.log(body);
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      if (link.innerHTML in body){
        if (body[link.innerHTML] == '1'){
          var emTag = document.createElement('em');
          emTag.innerHTML = link.innerHTML;
          emTag.style.backgroundColor = '#ffc6b3';
          link.appendChild(emTag)
        }
      }
    }
}
// // Run the function when the page finishes loading
window.addEventListener('load', markLinks);


//     // var link = links[i];
    //     // var emTag = document.createElement('em');
    //     // emTag.innerHTML = link.innerHTML;
    //     // // if (link.innerHTML == 'https://www.sdtek.net/malicious-urls-and-how-to-fight-them'){
    //     // //     emTag.style.backgroundColor = '#ffc6b3'
    //     // // }
    //     // if (link.innerHTML.length%11 == 0) {
    //     //     emTag.style.backgroundColor = '#ffc6b3';
    //     // } 
    //     // // else {
    //     // //     emTag.style.backgroundColor = '#b3e6b3'
    //     // // }
    //     // link.innerHTML = '';
    //     // link.appendChild(emTag);
    //     var link = links[i].innerHTML;
    //     fetch("http://127.0.0.1:3000?url=" + link)
    //     .then(res => {
    //         console.log(link + ":" + res);
    //     })
    // }