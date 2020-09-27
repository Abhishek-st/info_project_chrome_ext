// $(function() {
//     $('#name').keyup(function() {
//         $('#greet').text('Hello ' + $('#name').val())
//     })
// });

//$('a').click(function() {
  //  alert('You are about to go to ' + $(this).attr('href'))
//})




let arr = []
let data;
let domain;

let coeff = [ 2.63218725e-01, -1.80018483e-03, -3.48969767e-01,  1.95374029e-01,
        2.48116181e-01,  3.26308582e+00,  6.07711263e-01,  1.95768232e+00,
       -3.11055768e-01,  2.23558460e-02, -1.06728996e-01]

let intercept = 2.50796565

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {


    // var hostname = getHostname(tabs[0].url);
    console.log(tabs[0].url)
    let url = tabs[0].url.toString()



    // condition 1 : checking number in url
    let str = tabs[0].url
    str = str.toString().split("//")
    str = str[1].toString().split("/")
    console.log(str[0])
    domain = str[0];
    str = str[0].toString().split(":")
    ValidateIPaddress(str[0])
    console.log("cond1 " + arr)

    console.log(tabs[0].favIconUrl);



    // condition 2 : checking length in url
    let x = url.toString().length
    if (x > 54)
        arr.push(0)
    else
        arr.push(1)

    console.log("cond2 " + arr)

    // fetch(url).then(r => r.text()).then(result => {
    //     parser = new DOMParser();
    //     Doc = parser.parseFromString(result, "text/html");

    //     console.log(result);
    //     // console.log(Doc.getElementsByTagName("a")[0].childNodes[0].nodeValue);
    //     // var urls = Doc.getElementsByTagName("a")[0].childNodes[0].nodeValue;
    //     // for (url in urls) {
    //     //     console.log ( urls[url].href );
    //     // }
    //     // let datecreated = xmlDoc.getElementsByTagName("createdDate")[0].childNodes[0].nodeValue;
    //     // var diff = Math.abs(new Date() - datecreated);
    //     // console.log(diff);
    // });




    //condition 3 : checking tiny url
    if (url.toString().includes("t.co") || url.includes("bit.ly"))
        arr.push(0)
    else
        arr.push(1)
console.log("cond3 " + arr)
    // condition 4 : @ symbol

    if (url.toString().includes("@"))
        arr.push(0)
    else
        arr.push(1)
console.log("cond4 " + arr)
    // condition 5 : checking "//" more than 2
    let c4 = url.toString().split("//")
    if (c4.length > 2)
        arr.push(0)
    else
        arr.push(1)
console.log("cond5 " + arr)
        // condition 6 : - symbol

    if (url.toString().includes("-"))
        arr.push(0)
    else
        arr.push(1)
console.log("cond6 " + arr)
    // condition 7 : checking . greater than 4
    let c5 = url.toString().split("//")
    c5 = c5[1].split(".")
    if (c4.length > 4)
        arr.push(0)
    else
        arr.push(1)
console.log("cond7 " + arr)
    // condition 8 : checking for https
    let c6 = url.toString().split("//")
    if (c6[0].includes("https"))
        arr.push(1)
    else
        arr.push(0)


console.log("cond8 " + arr)
    fetch('https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_W6RcSJvbpXymvJmyGwkTkvEODCWGQ&domainName=' + domain).then(r => r.text()).then(result => {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(result, "text/xml");

        console.log(result);
        console.log(xmlDoc.getElementsByTagName("createdDate")[0].childNodes[0].nodeValue);

	 let datecreated = xmlDoc.getElementsByTagName("createdDate")[0].childNodes[0].nodeValue;
        lis = datecreated.split('-')
        lis = lis[0]
        var dt = new Date();
        console.log(lis)
        console.log(dt.getFullYear())
        var diff = Math.abs(dt.getFullYear() - lis);
        console.log(diff);
        // condition 9
        if (diff > 1)
            arr.push(1)
        else
            arr.push(0)


console.log("cond9 " + arr)

    }).then(()=>{
    let sum = 0
    console.log(arr.length)
    for (i = 0; i < arr.length; i++) {
        intercept += arr[i]*coeff[i];
	if(arr[i]==0)
		sum+=1
    }
    console.log(sum)

    let x = document.getElementById('tb')
    x.innerHTML += `
    <tr>        
        <td>If URL > 75</td>
        <td>${arr[1]}</td>
    </tr>
    <tr>   
    <td>Uses url shortening method</td>
    <td>${arr[2]}</td>
    </tr>
    <tr>   
    <td>URL has @ symbol</td>
    <td>${arr[3]}</td>
    </tr>
    <tr>   
    <td>URL has more than 2 //</td>
    <td>${arr[4]}</td>
    </tr>
    <tr>   
    <td>URL has - symbol</td>
    <td>${arr[5]}</td>
    </tr>
    <tr>   
    <td>URL has more than 4 .</td>
    <td>${arr[6]}</td>
    </tr>
    <tr>   
    <td>Is https</td>
    <td>${arr[7]}</td>
    </tr>
    <tr>   
    <td>length of web < 1 year</td>
    <td>${arr[8]}</td>
    </tr>
    <tr>   
    <td>Contains favicon</td>
    <td>${arr[9]}</td>
    </tr>
    <tr>   
    <td>Contains more than 2 https</td>
    <td>${arr[10]}</td>
    </tr>
`
	
if(sum>=3)
{
	console.log(sum)
	alert("its suspious be careful while entering your details")
}

});


    // condition 10 : favicon url domain check
    let favurl = tabs[0].favIconUrl;

    if (favurl) {
        favurl = favurl.toString().split("//")
        favurl = favurl[1].toString().split("/")
        console.log(favurl[0])
        if (domain != favurl[0])
            arr.push(0)
        else
            arr.push(1)
    } else
        arr.push(1)
console.log("cond10 " + arr)
    // condition11 : https in the domain part
    let c7 = url.toString().split("//")
    if (c7[1].includes("https"))
        arr.push(0)
    else
        arr.push(1)

console.log("cond11 " + arr)


    chrome.extension.onRequest.addListener(
        function(request, sender, sendResponse) {
            // LOG THE CONTENTS HERE
            console.log(request.content);
        });


    //fillTab();

let pred = 1 / (1+Math.exp(-intercept))

    // if (sum >= 2)
    //     alert("its suspious")
    // else
    //     alert("its safe ")

});


function ValidateIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        console.log("yeyes")
        arr.push(0)
    } else {
        console.log("no")
        arr.push(1)
    }

    let x = document.getElementById('tb')
    x.innerHTML += `
    <tr>
        
        <td>If website contains ip address</td>
        <td>${arr[0]}</td>
    </tr>
    `

}


function fillTab() {
    let x = document.getElementById('tb')
    x.innerHTML += `
    <tr>        
        <td>If URL > 75</td>
        <td>${arr[1]}</td>
    </tr>
    <tr>   
    <td>Uses url shortening method</td>
    <td>${arr[2]}</td>
    </tr>
    <tr>   
    <td>URL has @ symbol</td>
    <td>${arr[3]}</td>
    </tr>
    <tr>   
    <td>URL has more than 2 //</td>
    <td>${arr[4]}</td>
    </tr>
    <tr>   
    <td>URL has - symbol</td>
    <td>${arr[5]}</td>
    </tr>
    <tr>   
    <td>URL has more than 4 .</td>
    <td>${arr[6]}</td>
    </tr>
    <tr>   
    <td>Is https</td>
    <td>${arr[7]}</td>
    </tr>
    <tr>   
    <td>Contains favicon</td>
    <td>${arr[9]}</td>
    </tr>
    <tr>   
    <td>Contains more than 2 https</td>
    <td>${arr[10]}</td>
    </tr>
    `
}





