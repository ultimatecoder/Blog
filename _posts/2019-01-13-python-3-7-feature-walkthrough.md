---
layout: post
title: "Python 3.7 feature walkthrough"
date: "2019-01-13 01:23:12 +0530"
tags:
  - python
  - core-python
  - python-3-7
---


In this post, I will explain improvements done in Core Python version 3.7. Below
is the outline of features covered in this post.

* Breakpoints

* Subprocess

* Dataclass

* Namedtuples

* Hash-based Python object file

### breakpoint()

Breakpoint is an extremely important tool for debugging. Since I started
learning Python, I am using the same API for putting breakpoints. With this
release, ```breakpoint()``` is introduced as a built-in function. Because it is
in a built-in scope, you don't have to import it from any module. You can call
this function to put breakpoints in your code. This approach is handier  than
importing ```pdb.set_trace()```.

![Breakpoint function in Python 3.7]({{ site.baseurl }}/assets/images/walkthrough_python_3_7/breakpoint_example.gif)

Code used in above example

```python
for i in range(100):
    if i == 10:
        breakpoint()
    else:
        print(i)

```

### PYTHONBREAKPOINT

There wasn't any handy option to disable or enable existing breakpoints with a
single flag. But with this release, you can certainly reduce your pain by using
```PYTHONBREAKPOINT``` environment variable. You can disable all breakpoints in
your code by setting the environment variable ```PYTHONBREAKPOINT``` to ```0```.


![Breakpoint environment variable in Python 3.7]({{ site.baseurl }}/assets/images/walkthrough_python_3_7/breakpoint_environment_variable_example.gif)

##### I advise putting "PYTHONBREAKPOINT=0" in your production environment to avoid unwanted pausing at forgotten breakpoints


### Subprocess.run(capture_output=True)

You can pipe the output of Standard Output Stream (stdout) and Standard Error
Stream (stderr) by enabling ```capture_output``` parameter of
```subprocess.run()``` function.

![subprocess.run got capture_output parameter]({{ site.baseurl }}/assets/images/walkthrough_python_3_7/subprocess_run_capture_output.gif)

You should note that it is an improvement over piping the stream manually. For
example, ```subprocess.run(["ls", "-l", "/var"], stdout=subprocess.PIPE,
stderr=subprocess.PIPE)``` was the previous approach to capture the output of
```stdout``` and ```stderr```.


### Dataclasses

The new class level decorator ```@dataclass``` introduced with the
```dataclasses``` module. Python is well-known for achieving more by writing
less. It seems that this module will receive more updates in future which can be
applied to reduce significant line of code. Basic understanding of Typehints is
expected to understand this feature.

When you wrap your class with the ```@dataclass``` decorator, the decorator will
put obvious constructor code for you.  Additionally, it defines a behaviour for
dander methods ```__repr__()```, ```__eq__()``` and ```__hash__()```.


![Dataclasses.dataclass]({{ site.baseurl }}/assets/images/walkthrough_python_3_7/dataclasses_dataclass.gif)

Below is the code before introducing a ```dataclasses.dataclass``` decorator.

```python
class Point:

    def __init__(self, x, y):
        self.x = x
        self.y = y
```


After wrapping with ```@dataclass``` decorator it reduces to below code

```python
from dataclasses import dataclass


@dataclass
class Point:
    x: float
    y: float
```


### Namedtuples

The namedtuples are a very helpful data structure, yet I found it is less known
amongst developers. With this release, you can set default values to argument
variables.

![Namedtuples with default arguments]({{ site.baseurl }}/assets/images/walkthrough_python_3_7/namedtuple_example.gif)

##### Note: Default arguments will be assigned from left to right. In the above example, default value ``2`` will be assigned to variable ``y``

Below is the code used in the example

```python
from collections import namedtuple


Point = namedtuple("Point", ["x", "y"], defaults=[2,])
p = Point(1)
print(p)
```


### .pyc

**.pyc** are object files generated everytime you change your code file (.py).
It is a collection of meta-data created by an interpreter for an executed code.
The interpreter will use this data when you re-execute this code next time.
Present approach to identify an outdated object file is done by comparing meta
fields of source code file like last edited date. With this release, that
identification process is improved by comparing files using a hash-based
approach. The hash-based approach is quick and consistent across various
platforms than comparing last edited dates. This improvement is considered
unstable. Core python will continue with the metadata approach and slowly
migrate to the hash-based approach.


### Summary

* Calling ```breakpoint()``` will put a breakpoint in your code.

* Disable all breakpoints in your code by setting an environment variable
  ```PYTHONBREAKPOINT=0```.

* ```subprocess.run([...], capture_output=True)``` will capture the output of
  ```stdout``` and ```stderr```.

* Class level decorator ```@dataclass``` will define default logic for
  constructor function. It will implement default logic for dunder methods
  ```__repr__()```, ```___eq__()``` and ```__hash__()```.

* Namedtuple data structure supports default values to its arguments using
  ```defaults```.

* Outdated Python object files (.pyc) are compared using the hash-based
  approach.


I hope you were able to learn something new by reading this post. If you want to
read an in-depth discussion on each feature introduced in Python 3.7, then
please read the
[official Python 3.7 changelog](https://docs.python.org/3.7/whatsnew/changelog.html#python-3-7-0-final).
Happy hacking!


###### Proofreaders: [Jason Braganza](https://janusworx.com/), Ninpo, basen_ from #python at Freenode, Ultron from #python-offtopic at Freenode, up|ime from ##English at Freenode
