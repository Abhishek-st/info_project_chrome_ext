// $(function() {
//     $('#name').keyup(function() {
//         $('#greet').text('Hello ' + $('#name').val())
//     })
// });

let arr = []
let data;
let domain;

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
    console.log(arr)

    // condition 2 : checking length in url
    let x = url.toString().length
    if (x > 54)
        arr.push(1)
    else
        arr.push(0)

    console.log(arr)

    fetch('https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_W6RcSJvbpXymvJmyGwkTkvEODCWGQ&domainName=' + domain).then(r => r.text()).then(result => {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(result, "text/xml");

        console.log(result);
        console.log(xmlDoc.getElementsByTagName("createdDate")[0].childNodes[0].nodeValue);
        let datecreated = xmlDoc.getElementsByTagName("createdDate")[0].childNodes[0].nodeValue;
        var diff = Math.abs(new Date() - datecreated);
        console.log(diff);
    });


    //condition 3 : checking tiny url
    if (url.toString().includes("t.co") || url.includes("bit.ly"))
        arr.push(1)
    else
        arr.push(0)

    // condition 4 : checking "//" more than 2
    let c4 = url.toString().split("//")
    if (c4.length > 2)
        arr.push(1)
    else
        arr.push(0)

    // condition 5 : checking . greater than 4
    let c5 = url.toString().split("//")
    c5 = c5[1].split(".")
    if (c4.length > 4)
        arr.push(1)
    else
        arr.push(0)

    // condition 6 : checking for https
    let c6 = url.toString().split("//")
    if (c6[0].includes("https"))
        arr.push(0)
    else
        arr.push(1)

    // condition 7 : https in the domain part
    let c7 = url.toString().split("//")
    if (c7[1].includes("https"))
        arr.push(1)
    else
        arr.push(0)

    // condition 8 : @ symbol

    if (url.toString().includes("@"))
        arr.push(1)
    else
        arr.push(0)
        // condition 9 : - symbol

    if (url.toString().includes("-"))
        arr.push(1)
    else
        arr.push(0)

    let sum = 0
    for (i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    // if (sum >= 2)
    //     alert("its suspious")
    // else
    //     alert("its safe ")

});


function ValidateIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        console.log("yeyes")
        arr.push(1)
    } else {
        console.log("no")
        arr.push(0)
    }

}