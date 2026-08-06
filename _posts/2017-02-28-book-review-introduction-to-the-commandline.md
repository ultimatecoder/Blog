---
layout: post
categories: book review
title: Book review 'Introduction to the Command Line'
tags:
  - books
  - linux
  - programming
excerpt: >
  Every chapter will introduce a bunch of comands and will point to its
  respective documentation for further learning. You should expect chapters
  describing from the grep command to GNU Octave which is a scientific
  programming language. The chapters are independent of each other.
---
![introduction_to_command_line]({{ site.url
}}{{ site.baseurl }}/assets/images/book_image_introduction_to_the_commandline.jpg)


## tl;dr


Every chapter will introduce a bunch of comands and will point to its
respective documentation for further learning. You should expect chapters
describing from the [grep](https://www.gnu.org/software/grep/manual/grep.html)
command to [GNU Octave](https://www.gnu.org/software/octave/) which is a
scientific programming language. The chapters are independent of each other.
The book is must read if you are new to the
[GNU/Linux](https://en.wikipedia.org/wiki/Linux) command line. If you are at
the intermediate level, then too investing time in reading this book will
unveil a few surprises for you.


## Detailed review

The book is community driven and published under [FLOSS
Manual](http://flossmanuals.net). It is a collaborative effort of the
[FSF](http://www.fsf.org/) community. The fun part is you can contribute to
this book by adding new chapters or by improving an existing one. I fixed one
typo in this book after reading. The best introduction is crafted comparing GUI
based image editing tools with the most unknown command
[convert](https://linux.die.net/man/1/convert). It conveys the importance of
command line well to the reader. Initial chapters will present the overview of
various [GNU/bash](https://www.gnu.org/software/bash/) commands. From my
personal experience, you have to use mentioned commands in this chapter daily.
The chapter of Command history shortcuts depicts geeky shell patterns.  I will
advise not to skip that chapter and read through once. The advanced section was
not much advance for me.  It demonstrates
[ssh](https://linux.die.net/man/1/ssh) and related commands like
[scp](https://linux.die.net/man/1/scp) and more. I appreciated the preference
of using [GNU Screen](https://www.gnu.org/software/screen/) though I use
[tmux](https://tmux.github.io/) over it. If you are possessed by moving around
on multiple directories simultaneously, then **directory stacks** under
**Moving Again** section is worth scanning.  This functionality is saving
dozens of my keystrokes now.  There is one entire division dedicated to various
editors. That section is not limited to [GNU
Emacs](https://www.gnu.org/software/emacs/) or [vim][vim], but also briefs [GNU
NANO](https://www.nano-editor.org/), [Kedit](http://www.kedit.com/) and
[Gedit](https://wiki.gnome.org/Apps/Gedit). This section does not compare the
pros and cons of several editors, but describes basics of each which should be
counted as a good part.  I skipped this part because I am comfortable with
[vim][vim] editor at present and don’t want to invest much in others.

The scripting section turned out to be the most interesting division for me.
Though I was aware about the tools like
[sed](https://www.gnu.org/software/sed/manual/sed.html) and language
[awk](https://linux.die.net/man/1/awk) I was not using them often.  Reading
their chapters and implementing mentioned examples built little confidence in
me. Now I am much comfortable in utilizing them. The irregular **Regular
expressions** are everywhere.  You should not pass over this section and pay
careful attention to various examples.  It is worth to invest your time in this
segment.

This is not the ending.  This book presents a glimpse of various scripting level
programming languages like [Perl](https://www.perl.org/),
[Python](http://python.org) and [Ruby](https://www.ruby-lang.org/en/). Because I
am a python developer for a few years and I was not much interested in other
languages, I skipped this section.  A shallow introduction to [GNU
Octave](https://www.gnu.org/software/octave/) is nice to study if you are
interested in knowing a little about this scientific programming language.


### How to read this book?

Do not read to read. This book contains nice shell examples.  By merely
reading, you will end up without bringing about anything meaningful.  I will
advise you to interpret the description first, observe the examples and then
implement them on your own.  If you have any confusions, read the example and
description again or obtain help from `man` or `info` are the best options.  To
remember, I revised the important chapters more than once in a week.  It helped
me to refresh what I learned before.  I will attempt to re-read the important
sections once again after a few days to refresh my memory.


### What is missing?

Considerably, the book is nicely written, equally distributed
and largely acceptable, but I would prefer to have a small set exercises section
at the end of each topic.  Exercise might help the reader to identify their weak
points early and refer on them again if they desire to.


### Typo / Mistakes

I didn't encounter any sever mistakes except one typo. The section of **Userful
customizations** on page number 80 of my printed version, contains following
example:

```
function manyargs {
  $arg=$1
  shift
  ...
}
```

Here, **$arg** is a misprint. A shell variable is never assigned with **$**. It
should be `args=$1`.  I myself has corrected the typographical error in the
book.  This change will be published maybe in the next release of this book.

If you are encountering any mistakes while reading, I request you to fix the
change in [the FLOSS Manuals editing
interface](http://write.flossmanuals.net/command-line/introduction/). The
interface for editing the book is beginner friendly. It took less than 5
minutes to drive the change.


### Where to buy/download?

* [Buy printed
  version](https://shop.fsf.org/books-docs/introduction-command-line).

* [Read Online](http://write.flossmanuals.net/command-line/introduction/).

* [Download
  PDF](http://archive.flossmanuals.net/_booki/command-line/command-line.pdf)


###### Proofreader: [Dhavan Vaidya](http://codingquark.com/)


[vim]: http://www.vim.org/
