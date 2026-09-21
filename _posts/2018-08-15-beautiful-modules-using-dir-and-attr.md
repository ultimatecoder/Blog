---
layout: post
title: "Beautiful modules using __dir__ and __attr__"
date: "2018-08-15 16:51:41 +0530"
tag:
  - Python
  - Python3.7
  - DunderMethods
  ---

* Module level definition of dunder methods __dir__() and __attr__():

   I was facing this issue of hinding actual imports of my module with user. It	
  was always confusing when someone calls "dir()" on my modules. There is	
  already dunder method called "__dir__()" to override this behaviour, but this	
  method was limited to Classes. With this version, it is possible to override	
  the behaviour of module by defining module level ```__dir__()``` method.	
     # TODO: Write the example of them here.	
 * __attr__ : You can override this method for various purposes like firing an	
  API deprication warning. The method will behave just as it was behaving on	
  Class.	
     # TODO: Example of __attr__ at module level.	


