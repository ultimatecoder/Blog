---
layout: post
title: "Analyzing the behaviour of Python function slice"
date: "2018-09-29 10:17:46 +0530"
tags:
  - python
  - slice
  - python-trick-questions
---


![Title Image]({{ site.baseurl }}/assets/images/python_slice_function/title_image.jpg)

Last Friday, I was sitting in one of the good coffee shops in Bangalore with my
friend. Coffee and discussion is the best combination to release stress. It was
looking like a perfect Friday evening until my friend was struck by an idea of
asking me a question.

“Let me conduct a quiz.” he said, interrupting our conversation.

“A quiz? Quiz on what?”, I asked.

“On programming”, he said

“What is the level of difficulty then?” I said.

Asking the level of difficulty is important. I never invest my efforts in
solving something easy. If he had said easy, I would have ignored to answer, but
he said “It is a bit difficult, but not that difficult. I gave a wrong answer to
this question in my last interview.”

There was no reason to go back from here. Taking some deep breaths I said,
“Please go ahead.”

He stood up, took a tissue paper from a nearby counter and scratched below code
on it. [^1] And he asked me by pointing towards that code, “What will be the output
of this code?”

```python
def my_function():
    l = [0, 1, 2]
    print(l[30:])

my_function()
```

Now it was my turn to give the answer. I looked at the code and tried parsing it
in my head --- line by line. In my mind, I observed the first line. It was
defining a function which seems to be correct. I moved my eyes to the next line.
It was defining a variable `l` of type `list` and assigning values ranging from
`0` to `2`.  Even this wasn’t looking problematic. So I forwarded to the next
line where it was trying to print that variable `l` by slicing it from starting
value `30` to the infinity.

“Well, the start value is `30` which is greater than the length of the list.
This should raise an `IndexError`” I said in my mind. I was about to speak an
answer, but suddenly Devil of me flashed.

“It is less than [a banana job][4] my dear,” the Devil said to me, “You should
take a little advantage of this opportunity my boy.”

Because things were looking in my control, I shook my hands with the Devil.

I said to my friend, “How about betting for some real values?”

Going closer I spoke, “If I answer correctly, You will pay the bill and If I am
wrong, This will be a treat from my side.”

He thought for a while and nodded. Now it was my turn to unveil the cards.

I said in a strong voice, “It will raise an `IndexError`.” And shifted my focus
towards the chocolate.

He starred my face for a second and spoke, “Okay. Are you sure about this?”.

This was the hint he gave. I should have taken another shot here.  What happens
next become a lesson for me.

I said with a flat face, “Yes I am.”

With my answer, he instantly opened his backpack, took his Laptop out and typed
the code which he wrote on that tissue.

When I stopped hearing a sound of typing I yelled, “So did I win?”

He turned his laptop towards me and exclaimed, “Not at all!”

When I focused on the screen, the interpreter was printing `[]`. Damn! I lost
the bet.  Why the hell `slice` is returning an empty `list` even when we are
trying to slice it with a value which is greater than the length of it! It was
surely looking unpythonic behavior. I paid whatever the bill amount was. Entire
evening this question was all roaming my mind. After coming home, I decided to
justify reasons for returning an empty list instead of raising an `IndexError`
from a `slice`.

Below are a few reasons justifying such behavior of slice function. I am sharing
this with you so that you don’t lose a bet with your friend :) For those who
haven’t used slice anytime in their life, I advise to read [this][1] tutorial.
Reading [this][2] guide for understanding how a slice function converts the
input values. Especially rule number 3 and 4 referenced there.

* **Reason number one:**

  Python lists are more commonly used in iterations. Consider below example:

  ```python
  numbers = [0, 1, 2, 3]
  for number in numbers[30:]:
      print(number)
  ```

  If `slice` was raising an `IndexError`, then the above code would have to
  written like this

  written like like this

  ```python
  numbers = [0, 1, 2, 3]
  try:
      for number in numbers[30:]:
          print(numbers)
  except IndexError:
      pass
  ```

  Or in another way below is also looking reasonable

  ```python
  numbers = [0, 1, 2, 3]
  start = 30
  if start < len(numbers):
      for number in numbers[start:]:
          print(number)
  ```

  Both the approaches are looking little lengthy by an obvious reason. And that
  reason is to prevent executing loop if there are no elements in it.  When we
  observe the behavior of `slice` called at `for in`, it makes sense to return
  an empty list instead of raising an `IndexError`.

* **Reason number two:**

  Both mutable and iterable object created by you can be of any length on
  runtime. For example,

  ```python
  names = ['jay', 'ajay', 'vijay']

  with open('user_names.txt') as f:
    raw_names = f.read()
    names.extend(raw_names.split())
  print(names)
  ```
  In above code, we can be sure that the `list` variable `name` is initialized
  with `3 elements. But we are unsure, how many new names will be added from
  the file `user_names.txt`. Total number of names at runtime can be anything
  greater than `3`.

  Assume you have a robot which can clone a human. You instructed the robot to
  clone first 100 humans from one queue of humans. You both don't know the
  length of the queue. The robot will pick the first human, cloned it and put
  that cloned human to a new queue. The robot is repeating that process of
  cloning human one by one from the queue. While clonning 95th human the robot
  realized that there isn't any other human left in the queue. Which means
  there are 95 people in the queue. The queue of cloned humans will also have
  95 people long. The robot will not shim the queue for remaining 5 people. On
  the contrary, if the queue was 110 people long the robot will only clone
  first 100 people. It will not clone those remaining 10 people from the queue.
  There can be many senarios to clone humans standing in a queue, but I would
  like to discuss one important. There is a queue of 10 people. What if I
  instruct that robot to clone 5 people from 300th position? In a result, we
  will get an empty queue of cloned people.

  From the above example, consider the queue is an iterable object of Python
  and the function `slice` is our robot. It makes sense to clamp the
  `IndexError` at `slice` and return an empty interable object.

  > > Thinking it this way: when you slice like that you don't know how long it
  > > will be anyway, so returning an empty list is just as likely as a list
  > > that you didn't index past (same with negative indexing), not raising
  > > `IndexError` makes this expectation consistent
  > > by [Brett Cannon](https://twitter.com/brettsky)


I am not able to find further reasons to return an empty list instead of raising
the `IndexError`. But I am sure, there will be. If you know any other potential
reasons for such behavior of `slice`, please drop me a mail at **jaysinhp** at
**gmail** dot **com** or contact me over Twitter [@jaysinhp][3].  I will update
the reasons at this post and give credits to you. Thanks for reading this post.


###### Proofreaders: [Geoffrey Sneddon](https://github.com/gsnedders), [Elijah](https://mailto:thyarmageddon@gmail.com), [Mahendra Yadav](mailto:mahendra.k12@gmail.com), [Dhavan Vaidya](http://codingquark.com/),

[1]: https://docs.python.org/3.7/tutorial/introduction.html#lists
[2]: https://docs.python.org/3.7/library/stdtypes.html#sequence-types-list-tuple-range
[3]: https://twitter.com/jaysinhp
[4]: http://catb.org/jargon/html/O/one-banana-problem.html

[^1]: I am using the word "Scratch" because that tissue paper was such a thin that writing by a ballpen torn it.
