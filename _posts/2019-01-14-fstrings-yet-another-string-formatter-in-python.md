---
layout: post
title: "Fstring, yet another string formatter in Python"
date: "2019-01-14 20:52:03 +0530"
tag:
  - fstring
  - Python
  - Python3.6
  - FormattedStrings
---


Fstring is a cool feature introduced as a part of Python 3.6. Fstring can be
elaborated as "Formatted String". At the time of writing this post, Python
already has more than two ways to a format string. Still, Fstring is released by
giving yet another way to format a string. Fstrings can be easy to understand
and simple to read. When you prefix the string with ```f```, it becomes a
formatted string. All names wrapped inside the curly braces ({}) are resolved
with the value of variable available in local scope. If the variable isn’t found
in the local scope then it will raise a ```NameError``` exception.

TODO: ADD below things
1. Multiline Fstring
2. FString by calling function or class methods
3. Fstring as dictionary key
4. Fstring by using capital 'F'.

### Demonstration

![FString demonstration]({{site.url}}/assets/images/fstring_explaination/fstring_example.gif)

Below is the code used in the example

```python
name = "Jay"
print(f"Hello {name}")
```

In my view, this option of string formation is more concise and readable than
all other options. I advise migrating your code to Fstrings if your Python
interpreter is greater than or equal to version 3.6. You should note that
existing string formation approaches are still supported and are not subject to
depreciate in the near future.


### Summary


* Fstring can be elaborated as "Formatted String".

* Variable is always resolved at a local scope. If it isn’t found then it will
  raise the ```NameError``` exception.

* You can format your strings by Fstring approach only if your Python
  interpreter version is greater than or equal to 3.6.

* Existing string formation approaches are not subjected to deprecate soon.
