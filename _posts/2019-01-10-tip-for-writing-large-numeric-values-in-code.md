---
layout: post
title: "Tip for writing large numeric values in code"
date: "2019-01-10 15:24:51 +0530"
---


### Putting underscores in defining Integers:

It is difficult to read when a variable is having a large decimal value. Many
times I myself put finger on the screen and count the places to get an idea. In
this version, you can put ```_``` for separating numbers for constructing more
readable value.

![Integer with underscore](/assets/images/numeric_value_with_underscores/integer_example.gif)

Below is the code used in the example

```python
x = 1_00_00_00
print(x)
```
