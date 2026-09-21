---
layout: post
title: "JS-Recon is no more!"
date: "2019-04-23 17:47:21 +0530"
tag:
  - security
  - attack
  - vulnerability
  - javascript
  - jsrecon
---

In 2010, Andlabs discovered an attack which fingerprints open TCP ports in
client workstations. You can read [this blog post][andlabs_blogpost] which
describes the details of this method. JS-Recon was a tool implementing this
attack on its clients to prove the danger of this vulnerability. Unfortunately,
JS-Recon is no longer available on the aforementioned link for unknown reasons.
I tried my best to find the source code of this tool, but I finished with no
results.  For this reason, the only way to confirm the possibility of this
attack was to reconstruct it from the steps mentioned in that blog post.

In this post I will share my experience of rebuilding this attack. As this
attack is from the front-end side, knowledge of basic Javascript and [XML Http
Request API][mdn_xmr] are expected from the reader. The original blog post did
not include any code samples. For the benefit of the reader, I have prepared
small code snippets and attached them with related sections. I expect you run
code samples in the developer console of your browser.

### Glossary

* **Empty / Available port**: A port where no service is running.
* **Non-empty / Occupied port**: A port where some service is running.
* **XHR**: A short form of [XML Http Request][mdn_xhr].
* **Socket**: A raw TCP/IP socket.

According to that blog post, If I write a Javascript code to open an XHR to
`http://localhost:8084` and host that code at `example.com` then when you visit
the `example.com` the browser will open that XHR to port `8084` of your
workstation, because the `localhost` for your browser is your workstation. This
gap lead to many vulnerabilities for users. One of them is the possibility to
fingerprint open TCP ports at the client workstation.

That post further claims that the browser takes recognizably more time to open
an XHR targeting an occupied port. Comparatively, time took to open an XHR aimed
at an empty port was short.

```javascript
//Sample code to measure the time browser took to open the socket.

var requestPort = function(port) {
  var startTime = null;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 1) {
      var timeTook = Date.now() - startTime;
      console.log("Browser took : " + timeTook + " microseconds to open.");
    }
  };
  startTime = Date.now();
  url = "http://localhost:" + port;
  xhr.open("GET", url, true);
};
```

You can paste this code into the developer console of your browser. Calling this
function by writing `requestPort(8084)` at the console will open an XHR for port
`8084`. The function will print how long the browser took to open a socket on
that port. I recommended you to call this function with a combination of empty
and non-empty ports to observe the difference in response timings.

I tried opening a bunch of requests using `requestPort()` function at suspected
ports. For me the method was giving unidentifiable patterns in the time the
browser took to open a socket. Below is a histogram of comparing times taken to
open a socket on empty port(8084) and non-empty port(27017).

![Graph showing response time to open socket.]({{site.url}}/assets/images/js_recon_is_no_more/graph_response_time_open_socket.png)


Above is a graph of 6000 requests done to measure the response times using the
function I shared earlier. More than 5000 requests have ended in nearly no time.
There were less than 1000 requests which ended in 1 microseconds. From the above
results, we can conclude that mentioned method is not giving different results
for occupied and empty port. We can conclude that mentioned method by AndLabs is
failing to distinguish occupied ports from nonoccupied ports.

I tried hard to find possible causes for the failure of this attack. I didn't
find any conclusive evidence. I will be honest, but it took sometime to
understand the anatomy of this attack from that abstract blog post by Andlabs.
However I was not about to give up and turn back from this point. To satisfy my
curiosity, I tried every possible combinations of `xhr.readyState` values to
find any pattern. From my observation, I recognized the timings for returning a
header from an occupied port were delayed.  Comparatively, this response was
quick for ports where no service was running. I am comparing the time in which
the browser returned a response headers whereas in the previous method it was
dependent on the time browser took for opening a socket.

```javascript
var requestPort = function(port) {
  var startTime = null;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 2) {
      var timeTook = Date.now() - startTime;
      console.log("Browser took : " + timeTook + " microseconds to send response headers.");
    }
  };
  startTime = Date.now();
  url = "http://localhost:" + port;
  xhr.open("GET", url, true);
  xhr.send(null);
};
```

The above code will measure the time browser has taken to receive headers from
the destination. You should try calling the `requestPort` function with several
combinations of empty and non-empty ports.

![Graph showing header response time.]({{site.url}}/assets/images/js_recon_is_no_more/graph_header_response_time.png)

This graph is representing header response times of 6000 requests fired at both
active (27017) and inactive port (8084). The response times of inactive ports do
not go beyond 200 microseconds. Comparing this with a header response time of
occupied ports, we can see that response time of non-empty port is recognizably
higher than empty port.

The web browser is the most common tool we use. Asserting this vulnerability
requires knowledge of Javascript and everyone is not a developer. As I mentioned
earlier, I failed to find the source code of JS-Recon (the tool written by
AndLabs proving possibility of this attack). For these reasons I have decided to
write a tool based on my improvements on an attempt of Andlabs.  Today, I have
successfully completed that tool. I have decided to name it
["Chatur"][chatur_pronounciation]. You can find its source code [on
Github][chatur_github]. Chatur is a free software. Please try it out and share
your thoughts on it with me.

###### Proofreaders: Trent W. Buck, [quakerquickoats via #emacs at Freenode](mailto:quakerquickoats@gmail.com), [Vasilij Schneidermann](https://github.com/wasamasa)

[andlabs_blogpost]: http://blog.andlabs.org/2010/12/port-scanning-with-html5-and-js-recon.html
[mdn_xhr]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[chatur_pronounciation]: https://youtu.be/Tih_dP_Tv2w
[chatur_github]: https://github.com/ultimatecoder/chatur
