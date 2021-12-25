### TL;DR;

Chatur is a Javascript based port scanner. This tool proves the vulnerability of
fingerprinting open TCP ports at client workstation using Javascript.


### Background

Recently, I came across a possibility to fingerprint open TCP ports at client
workstation using browser side (aka client side) Javascript. This attack is
discovered by AndLabs in the year 2010. In this section, I will explain the
anatomy of this venerability in the simplest way. Knowledge of basic XML HTTP
Request is expected to understand this post.


#### What happens when you fire an XHR?

Browser initiates a TCP socket at the destination URL and sends header and body
of the request. Once header and body is sent, browser terminates the active
socket and waits for the server to deliver a response. That is how HTTP works
under the hood.


#### How to fingerprint open TCP port of client workstation?


If I write a Javascript code to put a XHR to 'http://localhost:8084' and host
that code at 'xyz.com' then when you visit the 'xyz.com' the browser will fire
that XHR to port '8084' of your workstation because 'localhost' for your browser
is your workstation. This gap invites many vulnerabilities for user.  One of
them is the possibility to fingerprint open TCP ports at client workstation.

While counting the time browser took to receive headers from the destination
were highlighting a clear pattern. A XHR to port where no service was running
were returning quick than a occupied port.


#### Algorithm

1. Fire a bunch of XHR at a target port of client workstation.
2. Measure the time browser took to receive the response headers
3. If timing of response headers is greater than the usual response time
   repetitively consider that any service is running on that port.


You should read
[this](http://blog.andlabs.org/2010/12/port-scanning-with-html5-and-js-recon.html)
blog post published by the AndLabs which is briefly describing this
venerability.

### Chatur

#### How to pronounce Chatur?

The Cha is Charming and Tur is Turn. Cha-Tur. You can observe
[this][chatur_videp]

#### How Chatur works?

Chatur accepts range of ports and floods all them with XHR. It captures the
response time browser took to return the headers for all the requests. From
header response time of all the requests, unusual hike is considered as occupied
port.

#### My motivation for writing this tool

Browser is the most common tool used by us. Asserting this venerability requires
knowledge of Javascript and everyone is not a developer. Despite trying hard, I
failed to find the source code of JS-Recon (the tool written by AndLabs proving
possibility of this attack). I am sharing this tool so that you or anyone else
irrespective of your technical backgrounds can try this tool to verify the
possibility of this attack.


#### Feedback

Please share your feedback with me.

[cors_guide]: https://add-cors-guide.com
[chatur_video]: https://add-chatur-video.com
