const SERVER_URL = "http://127.0.0.1:3000";
async function markLinks() {
    
    var links = [].slice.call(document.getElementsByTagName('a')).map(function (a) {
        return a.href;
      });
    // var links = document.getElementsByName("(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?\/[a-zA-Z0-9]{2,}")
    // for (var i = 0; i < links.length; i++) {
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

    const response = await fetch(SERVER_URL, {
        method: "POST", 
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ "urls": links}), // body data type must match "Content-Type" header
      });
    var body = await response.json()
    console.log(body)
}
// // Run the function when the page finishes loading
window.addEventListener('load', markLinks);


// const links = scrapeWebPage();
// console.log('Links:', links);

// function scrapeWebPage() {
//     try {
//       const links = [];
//       const anchorElements = document.getElementsByTagName('a');
//       for (let i = 0; i < anchorElements.length; i++) {
//         const href = anchorElements[i].getAttribute('href');
//         if (href) {
//           links.push(href);
//         }
//       }
      
//       return links;
//     } catch (error) {
//       console.error('Error scraping web page:', error);
//       return [];
//     }
//   }