## Class basic syntax




>*In object-oriented programming, a class is an extensible program-code-template for creating objects, providing initial values for state (member variables) and implementations of behavior (member functions or*

In practice, we often need to create many objects of the same kind, like users, or goods or whatever.

As we already know from the [chapter Constructor, operator "new"](), ` new function ` can help with that.

But in the modern JavaScript, there’s a more advanced “class” construct, that introduces great new features which are useful for object-oriented programming.

## [The “class” syntax]()

##### The basic syntax is:

```java
1   class MyClass {
2   // class methods
3   constructor() { ... }
4   method1() { ... }
5   method2() { ... }
6   method3() { ... }
7   ...
8   }
```

Then use  `new MyClass()` to create a new object with all the listed methods.

The `constructor`() method is called automatically by  `new`, so we can initialize the object there.

#### For example:
```java
1  class User {
2
3  constructor(name) {
4    this.name = name;
5  }
6
7   sayHi() {
8     alert(this.name);
9  }
10
11  }
12
13  // Usage:
14  let user = new User("John");
15  user.sayHi();

```
A new object is created.
The `constructor` runs with the given argument and assigns it to `this.name.`

…Then we can call object methods, such as `user.sayHi()`.
>⚠️  No comma between class methods
A common pitfall for novice developers is to put a comma between class methods, which would result in a syntax error.
The notation here is not to be confused with object literals. Within the class, no commas are required.


## [What is a class?]()

So, what exactly is a `class?` That’s not an entirely new language-level entity, as one might think.

Let’s unveil any magic and see what a class really is. That’ll help in understanding many complex aspects.

In JavaScript, a class is a kind of function.

Here, take a look:

```java
1 class User {
2  constructor(name) { this.name = name; }
3  sayHi() { alert(this.name); }
4 }
5 
6 // proof: User is a function
7 alert(typeof User); // function
```

#### What class User {...} construct really does is:

1.Creates a function named User, that becomes the result of the class declaration. The function code is taken from the constructor method (assumed empty if we don’t write such method).

2.Stores class methods, such as `sayHi`, `in User.prototype`.

After `new User` object is created, when we call its method, it’s taken from the prototype, just as described in the chapter [F.prototype.]() So the object has access to class methods.

### We can illustrate the result of class User declaration as:


## user
```
constructor(name) {
   thish.name=name;
}
```
⬇️

## User.prototype
```
sayHi: function
constructor: User
```

#### Here’s the code to introspect it:

```java
1 class User {
2   constructor(name) { this.name = name; }
3   sayHi() { alert(this.name); }
4 }
5 
6 // class is a function
7 alert(typeof User); // function
8 
9 // ...or, more precisely, the constructor method
10 alert(User === User.prototype.constructor); // true
11 
12 // The methods are in User.prototype, e.g:
13 alert(User.prototype.sayHi); // the code of the sayHi method
14 
15 // there are exactly two methods in the prototype
16 alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

## [Not just a syntactic sugar]()

Sometimes people say that `class` is a “syntactic sugar” (syntax that is designed to make things easier to read, but doesn’t introduce anything new), because we could actually declare the same without `class` keyword at all:


```java
1 // rewriting class User in pure functions
2 
3 // 1. Create constructor function
4 function User(name) {
5   this.name = name;
6 }
7 // a function prototype has "constructor" property by default,
8 // so we don't need to create it
9 
10// 2. Add the method to prototype
11 User.prototype.sayHi = function() {
12   alert(this.name);
13 };
14 
15 // Usage:
16 let user = new User("John");
17 user.sayHi();

```

The result of this definition is about the same. So, there are indeed reasons why `class` can be considered a syntactic sugar to define a constructor together with its prototype methods.

Still, there are important differences.

1.First, a function created by `class` is labelled by a special internal `property [[IsClassConstructor]]: true`. So it’s not entirely the same as creating it manually.

The language checks for that property in a variety of places. For example, unlike a regular function, it must be called with `new`:


```java
1  class User {
2   constructor() {}
3 }
4 
5 alert(typeof User); // function
6 User(); // Error: Class constructor User cannot be invoked without 'new'
```

Also, a string representation of a class constructor in most JavaScript engines starts with the “class…”

```java
1 class User {
2   constructor() {}
3 }
4 
5 alert(User); // class User { ... }
```

There are other differences, we’ll see them soon.
2.Class methods are non-enumerable. A class definition sets `enumerable `flag to `false `for all methods in the `"prototype"`.

That’s good, because if we for..in over an object, we usually don’t want its class methods.

3.Classes always `use strict`. All code inside the class construct is automatically in strict mode.

Besides, `class` syntax brings many other features that we’ll explore later.

## [Class Expression]()

Just like functions, classes can be defined inside another expression, passed around, returned, assigned, etc.

#### Here’s an example of a class expression:

```java
1 let User = class {
2   sayHi() {
3     alert("Hello");
4   }
5 };

```

Similar to Named Function Expressions, class expressions may have a name.

#### If a class expression has a name, it’s visible inside the class only:


```java
1 // "Named Class Expression"
2 // (no such term in the spec, but that's similar to Named Function Expression)
3 let User = class MyClass {
4   sayHi() {
5     alert(MyClass); // MyClass name is visible only inside the class
6   }
7 };
8 
9 new User().sayHi(); // works, shows MyClass definition
10
11 alert(MyClass); // error, MyClass name isn't visible outside of the class

```

#### We can even make classes dynamically “on-demand”, like this:

``` java
1 function makeClass(phrase) {
2  // declare a class and return it
3   return class {
4     sayHi() {
5      alert(phrase);
6     }
7   };
8 }
9
10 // Create a new class
11 let User = makeClass("Hello");
12
13 new User().sayHi(); // Hello
```

## [Getters/setters]()

Just like literal objects, classes may include getters/setters, computed properties etc.

#### Here’s an example for user.name implemented using get/set:

```java
1 class User {
2 
3   constructor(name) {
4     // invokes the setter
5     this.name = name;
6  }
7
8  get name() {
9    return this._name;
10   }
11
12   set name(value) {
13     if (value.length < 4) {
14       alert("Name is too short.");
15       return;
16     }
17     this._name = value;
18   }
19 
20 }
21
22 let user = new User("John");
23 alert(user.name); // John
24
25 user = new User(""); // Name is too short.
```

Technically, such class declaration works by creating getters and setters in `User.prototype`.

## [Computed names […]]()

Here’s an example with a computed method name using brackets [...]:

```java
1 class User {
2 
3   ['say' + 'Hi']() {
4     alert("Hello");
5   }
6 
7 }
8 
9 new User().sayHi();
```

Such features are easy to remember, as they resemble that of literal objects.

## [Class fields]()


>⚠️   Old browsers may need a polyfill:
Class fields are a recent addition to the language.


Previously, our classes only had methods.

“Class fields” is a syntax that allows to add any properties.

For instance, let’s add `name` property to `class User`:


```java

1 class User {
2   name = "John";
3 
4   sayHi() {
5     alert(`Hello, ${this.name}!`);
6   }
7 }
8 
9 new User().sayHi(); // Hello, John!
```

So, we just write " = " in the declaration, and that’s it.

The important difference of class fields is that they are set on individual objects, not `User.prototype`:

```java
1 class User {
2   name = "John";
3 }
4 
5 let user = new User();
6 alert(user.name); // John
7 alert(User.prototype.name); // undefined
```

We can also assign values using more complex expressions and function calls:

```java
1 class User {
2   name = prompt("Name, please?", "John");
3 }
4 
5 let user = new User();
6 alert(user.name); // John
```

## [Making bound methods with class fields]()


As demonstrated in the chapter Function binding functions in JavaScript have a dynamic `this`. It depends on the context of the call.

So if an object method is passed around and called in another context, `this` won’t be a reference to its object any more.

For instance, this code will show `undefined`:

```java
1 class Button {
2   constructor(value) {
3     this.value = value;
4    }
5 
6   click() {
7     alert(this.value);
8   }
9  }
10
11 let button = new Button("hello");
12 
13 setTimeout(button.click, 1000); // undefined
```

The problem is called "losing this".

There are two approaches to fixing it, as discussed in the chapter 
[Function binding:]()

1.Pass a wrapper-function, `such as setTimeout(() => button.click(), 1000)`.

2.Bind the method to object, e.g. in the constructor.

#### Class fields provide another, quite elegant syntax:

```java
1 class Button {
2   constructor(value) {
3     this.value = value;
4   }
5   click = () => {
6     alert(this.value);
7   }
8 }
9 
10 let button = new Button("hello");
11 
12 setTimeout(button.click, 1000); // hello
```

The class field `click = () => {...} `is created on a per-object basis, there’s a separate function for each Button object, with this inside it referencing that object. We can pass `button.click` around anywhere, and the value of `this` will always be correct.


#### That’s especially useful in browser environment, for event listeners.

## [Summary]()

The basic class syntax looks like this

```java
1 class MyClass {
2   prop = value; // property
3 
4   constructor(...) { // constructor
5     // ...
6   }
7 
8   method(...) {} // method
9 
10   get something(...) {} // getter method
11   set something(...) {} // setter method
12 
13   [Symbol.iterator]() {} // method with computed name (symbol here)
14   // ...
15 }
```

 `MyClass` is technically a function (the one that we provide as `constructor`), while methods, getters and setters are written to  `MyClass.prototype`.

In the next chapters we’ll learn more about classes, including inheritance and other features.


## [☑️ Tasks]() 
`importance: 5`

The `Clock class` (see the sandbox) is written in functional style. Rewrite it in the “class” syntax.

P.S. The clock ticks in the console, open it to see.

[Open a sandbox for the task.]()

[solution]()

