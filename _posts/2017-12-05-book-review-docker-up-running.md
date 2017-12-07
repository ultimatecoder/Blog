---
layout: post
title: "Book review 'Docker Up & Running'"
date: "2017-12-05 11:26:32 +0530"
tags:
  - books
  - docker
  - linux
---

In the modern era of software engineering, terms are coined with a new wrapper.
Such wrappers are required to make bread-and-butter out of it. Sometimes good
marketed terms are adopted as best practices. I was having a lot of confusion
about this Docker technology. Even I was unfamiliar with the concept of
containers. My certain goal was to get a higher level overview first and then
come to a conclusion. I started reading about the Docker from its official
getting started guide. It helped me to host this blog using Docker, but I was
expecting some more in-depth overview. With that reason, I decided to look for
better resources. By reading some Quora posts and Goodreads reviews, I decided
to read “Docker Up & Running by K. Matthias and S. Kane”. I am sharing my
reading experience here.


TL;DR

The book provides a nice overview of Docker toolchain. It is not a reference
book. Even though few options are deprecated, I will advise you to read this
book and then refer to the official documentation to get familiar with the
latest development.


Detailed overview

I got a printed copy at nearly 450 INR (roughly rounding to 7 USD, where 1 USD =
65 INR) from Amazon. The prize is fairly acceptable with respect to the print
quality. The book begins with a little history of the containers (Docker is an
implementation of the container). Initial chapters give a higher level overview
of Docker tools combining Docker engine, Docker image, Docker registry, Docker
compose and Docker container. Authors have pointed out situations where Docker
is not suitable. I insist you do not skip that topic. I skipped the dedicated
chapter on installing Docker. I will advise you to skip irrelevant topics
because the chapters are not interlinked. You should read chapter 5 discussing
the behavior of the container. That chapter cleared many of my confusions.
Somehow I got lost in between, but re-reading helped. Such chapters are enough
to get a general idea about Docker containers and images. Next chapters are
focused more on best practices to setup the Docker engine. Frankly, I was not
aware of possible ways to debug, log or monitor containers at runtime. This book
points few expected production glitches that you should keep in mind. I didn't
like the depicted testing workflow by authors. I will look for some other
references which highlight more strategies to construct your test workflow. If
you are aware of any, please share them with me via e-mail. I know about
achieving auto-scaling using various orchestration tools. This book provides
step by step guidance on configuring and using them. Mentioned tools are Docker
Swarm, Centurion and Amazon EC2 container service. Unfortunately, the book is
missing Kubernets and Helios here. As a part of advanced topics, you will find a
comparison of various filesystems with a shallow overview of how Docker engine
interacts with them. The same chapter is discussing available execution drivers
and introduces LXC as another container technology. This API option is
deprecated by Docker version 17.0.9 which makes libcontainer the only
dependency. I learned how Docker containers provide the virtualization layer
using Namespaces. Docker limits the execution of container using CGroups
(Control Groups). Namespaces and CGroups are GNU/Linux level dependencies used
by Docker under the hood. If you are an API developer, then you should not skip
Chapter 11. This chapter discusses two well-followed patterns Twelve-Factor App
and The Reactive manifesto. These guidelines are helpful while designing the
architecture of your services. The book concludes with further challenges of
using Docker as a container tool.


One typo I found at page number 123, second last line, 'expore some of the
tools...', here 'expore' is a typo and it should be 'explore some of the
tools...'. I have submitted it to the official errata. At the time of writing
this post, it has not confirmed by authors. Hope they will confirm it soon.


Who should read this book?

* Developers who want to get an in-depth overview of the Docker technology.

* If you set up deployment clusters using Docker, then this book will help you
  to get an overview of Docker engine internals. You will find security and
  performance guidelines.

* This is not a reference book. If you already well, then this book will not be
  useful. In that case, the Docker documentation is the best reference.

* I assume Docker was not supporting Windows platform natively when the book was
  written. The book focuses on GNU/Linux platform. It highlights ways to run
  Docker on Windows using VMs and Boot2Docker for Non-Linux VM-based servers.


What to keep in mind?

* Docker is changing rapidly. There will be situations where mentioned options
  are deprecated. In such situation, you have to browse the latest Docker
  documentation and try to follow them.

* You will be able to understand the official documentation better after reading
  this book.


Conclusion

* Your GNU/Linux skills are your Docker skills. Once you understand what the
  Docker is using internally, your decisions will become more mature.


Printed Copy

* Amazon
* Flipkart
* Website of Book
