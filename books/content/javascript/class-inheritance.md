

## Class inheritance


Class inheritance is a way for one class to extend another class.

So we can create new functionality on top of the existing.


### [The “extends” keyword]()


#### Let’s say we have class  `Animal`:


```javascript
1 class Animal {
2   constructor(name) {
3     this.speed = 0;
4     this.name = name;
5   }
6   run(speed) {
7     this.speed = speed;
8     alert(`${this.name} runs with speed ${this.speed}.`);
9   }
10   stop() {
11     this.speed = 0;
12     alert(`${this.name} stands still.`);
13   }
14 }
15 
16 let animal = new Animal("My animal");
```

#### Here’s how we can represent animal object and Animal class graphically:

___

<img src="/images/cls.jpg" width="50%" height="400px" alt="flowchart">

___

…And we would like to create another `class Rabbit`.

As rabbits are animals, `Rabbit` class should be based on `Animal`, have access to animal methods, so that rabbits can do what “generic” animals can do.

The syntax to extend another class is: `class Child extends Parent`.

Let’s create` class Rabbit` that inherits from `Animal`:

```javascript
1 class Rabbit extends Animal {
2   hide() {
3     alert(`${this.name} hides!`);
4   }
5 }
6 
7 let rabbit = new Rabbit("White Rabbit");
8 
9 rabbit.run(5); // White Rabbit runs with speed 5.
10 rabbit.hide(); // White Rabbit hides!
```


Object of `Rabbit` class have access both to `Rabbit` methods, such as `rabbit.hide()`, and also to `Animal` methods, such as `rabbit.run()`.

Internally, `extends` keyword works using the good old prototype mechanics. It sets `Rabbit.prototype.[[Prototype]]` to `Animal.prototype`. So, if a method is not found in `Rabbit.prototype,` JavaScript takes it from `Animal.prototype`.


___

<img src="/images/clsi2.jpg" width="50%" height="400px" alt="flowchart">


___

#### For instance, to find `rabbit.run `method, the engine checks (bottom-up on the picture):

1.The `rabbit` object (has no `run`).
2.Its prototype, that is `Rabbit.prototype `(has `hide`, but not `run`).
3.Its prototype, that is (due to `extends`) `Animal`.prototype, that finally has the `run` method.


As we can recall from the chapter [Native prototypes](), JavaScript itself uses prototypal inheritance for built-in objects. E.g.

`Date.prototype.[[Prototype]]` is `Object.prototype`. That’s why dates have access to generic object methods.


### ℹ️ Any expression is allowed after extends

Class syntax allows to specify not just a class, but any expression after `extends`.

For instance, a function call that generates the parent class:

```javascript
function f(phrase) {
  return class {
    sayHi() { alert(phrase); }
  };
}

class User extends f("Hello") {}

new User().sayHi(); // Hello
```

Here `class User` inherits from the result of `f("Hello")`.

That may be useful for advanced programming patterns when we use functions to generate classes depending on many conditions and can inherit from them.

### [Overriding a method]()

Now let’s move forward and override a method. By default, all methods that are not specified in `class Rabbit` are taken directly “as is” from `class Animal`.

But if we specify our own method in` Rabbit`, such as `stop()` then it will be used instead:

```javascript
1 class Rabbit extends Animal {
2   stop() {
3     // ...now this will be used for rabbit.stop()
4     // instead of stop() from class Animal
5   }
6 }
```

Usually we don’t want to totally replace a parent method, but rather to build on top of it to tweak or extend its functionality. We do something in our method, but call the parent method before/after it or in the process.

Classes provide `"super"` keyword for that.

- ` super.method(...)` to call a parent method.

- `super(...) `to call a parent constructor (inside our constructor only).


#### For instance, let our rabbit autohide when stopped:


```javascript

1    class Animal {
2
3    constructor(name) {
4        this.speed = 0;
5        this.name = name;
6    }
7
8    run(speed) {
9        this.speed = speed;
10        alert(`${this.name} runs with speed ${this.speed}.`);
11    }
12
13    stop() {
14        this.speed = 0;
15        alert(`${this.name} stands still.`);
16    }
17
18    }
19
20    class Rabbit extends Animal {
21    hide() {
22        alert(`${this.name} hides!`);
23    }
24
25    stop() {
26        super.stop(); // call parent stop
27        this.hide(); // and then hide
28    }
29    }
30
31    let rabbit = new Rabbit("White Rabbit");
32
33    rabbit.run(5); // White Rabbit runs with speed 5.
34    rabbit.stop(); // White Rabbit stands still. White Rabbit hides!
```


Now Rabbit has the stop method that calls the parent super.stop() in the process.

___


### ℹ️ Arrow functions have no super

As was mentioned in the chapter [Arrow functions revisited](), arrow functions do not have super.

If accessed, it’s taken from the outer function. For instance:

```javascript

1    class Rabbit extends Animal {
2    stop() {
3        setTimeout(() => super.stop(), 1000); // call parent stop after 1sec
4    }
5    }
```

The `super` in the arrow function is the same as in `stop()`, so it works as intended. If we specified a “regular” function here, there would be an error:

```javascript

1    // Unexpected super
2    setTimeout(function() { super.stop() }, 1000);
```

___


### [Overriding constructor]()


With constructors it gets a little bit tricky.

Until now, `Rabbit `did not have its own` constructor.`

According to the [specification](), if a class extends another class and has no `constructor`, then the following “empty” `constructor` is generated:


```javascript

1    class Rabbit extends Animal {
2    // generated for extending classes without own constructors
3    constructor(...args) {
4    super(...args);
5    }
6    }
```

As we can see, it basically calls the parent `constructor` passing it all the arguments. That happens if we don’t write a constructor of our own.

Now let’s add a custom constructor to `Rabbit`. It will specify the` earLength `in addition to `name`:



```javascript

1    class Animal {
2    constructor(name) {
3        this.speed = 0;
4        this.name = name;
5    }
6    // ...
7    }
8
9    class Rabbit extends Animal {
10
11    constructor(name, earLength) {
12        this.speed = 0;
13        this.name = name;
14        this.earLength = earLength;
15    }
16
17    // ...
18    }
19
20    // Doesn't work!
21    let rabbit = new Rabbit("White Rabbit", 10); // Error: this is not defined.
```

Whoops! We’ve got an error. Now we can’t create rabbits. What went wrong?

#### The short answer is:

- Constructors in inheriting classes must call `super(...)`, and (!) do it before using `this`.

…But why? What’s going on here? Indeed, the requirement seems strange.

Of course, there’s an explanation. Let’s get into details, so you’ll really understand what’s going on.

In JavaScript, there’s a distinction between a constructor function of an inheriting class (so-called “derived constructor”) and other functions. A derived constructor has a special internal property `[[ConstructorKind]]:"derived"`. That’s a special internal label.


That label affects its behavior with` new`.

- When a regular function is executed with `new`, it creates an empty object and assigns it to `this`.
- But when a derived constructor runs, it doesn’t do this. It expects the parent constructor to do this job.


So a derived constructor must call `super` in order to execute its parent (base) constructor, otherwise the object for `this` won’t be created. And we’ll get an error.

For the `Rabbit` constructor to work, it needs to call `super()` before using `this`, like here:


```javascript

1    class Animal {
2
3    constructor(name) {
4        this.speed = 0;
5        this.name = name;
6    }
7
8    // ...
9    }
10
11    class Rabbit extends Animal {
12
13    constructor(name, earLength) {
14        super(name);
15        this.earLength = earLength;
16    }
17
18    // ...
19    }
20
21    // now fine
22    let rabbit = new Rabbit("White Rabbit", 10);
23    alert(rabbit.name); // White Rabbit
24    alert(rabbit.earLength); // 10
```

### **[Overriding class fields: a tricky note]()**

> ⚠️   **Advanced note**

```
This note assumes you have a certain experience with classes, maybe in other programming languages.

It provides better insight into the language and also explains the behavior that might be a source of bugs (but not very often).

If you find it difficult to understand, just go on, continue reading, then return to it some time later.
```

We can override not only methods, but also class fields.

Although, there’s a tricky behavior when we access an overridden field in parent constructor, quite different from most other programming languages.

#### Consider this example:

```javascript

1    class Animal {
2    name = 'animal';
3
4    constructor() {
5        alert(this.name); // (*)
6    }
7    }
8
9    class Rabbit extends Animal {
10    name = 'rabbit';
11    }
12
13    new Animal(); // animal
14    new Rabbit(); // animal
```

Here, class `Rabbit` extends `Animal` and overrides` name `field with its own value.

There’s no own constructor in `Rabbit`, so `Animal` constructor is called.

What’s interesting is that in both cases: `new Animal()` and `new Rabbit()`, the `alert` in the line `(*) `shows `animal`.

**In other words, parent constructor always uses its own field value, not the overridden one.**

What’s odd about it?

If it’s not clear yet, please compare with methods.

Here’s the same code, but instead of` this.name` field we call `this.showName()` method:


```javascript

1    class Animal {
2    showName() {  // instead of this.name = 'animal'
3        alert('animal');
4    }
5
6    constructor() {
7        this.showName(); // instead of alert(this.name);
8    }
9    }
10
11    class Rabbit extends Animal {
12    showName() {
13        alert('rabbit');
14    }
15    }
16
17    new Animal(); // animal
18    new Rabbit(); // rabbit
```

Please note: now the output is different.

And that’s what we naturally expect. When the parent constructor is called in the derived class, it uses the overridden method.

…But for class fields it’s not so. As said, the parent constructor always uses the parent field.

Why is there the difference?


Well, the reason is in the field initialization order. The class field is initialized:

- Before constructor for the base class (that doesn’t extend anything),
- Immediately after super() for the derived class.


In our case, `Rabbit` is the derived class. There’s no `constructor()` in it. As said previously, that’s the same as if there was an empty constructor with only `super(...args)`.

So, new `Rabbit()` calls `super()`, thus executing the parent constructor, and (per the rule for derived classes) only after that its class fields are initialized. At the time of the parent constructor execution, there are no `Rabbit` class fields yet, that’s why `Animal` fields are used.

This subtle difference between fields and methods is specific to JavaScript

Luckily, this behavior only reveals itself if an overridden field is used in the parent constructor. Then it may be difficult to understand what’s going on, so we’re explaining it here.

If it becomes a problem, one can fix it by using methods or getters/setters instead of fields.

### **[Super: internals, [[HomeObject]]]()**

>**⚠️  Advanced information**

```
If you’re reading the tutorial for the first time – this section may be skipped.

It’s about the internal mechanisms behind inheritance and` super`.
```
Let’s get a little deeper under the hood of` super`. We’ll see some interesting things along the way.

First to say, from all that we’ve learned till now, it’s impossible for `super `to work at all!

Yeah, indeed, let’s ask ourselves, how it should technically work? When an object method runs, it gets the current object as` this`. If we call `super.method()` then, the engine needs to get the `method` from the prototype of the current object. But how?    

The task may seem simple, but it isn’t. The engine knows the current object `this`, so it could get the parent `method` as `this.__proto__`.method. Unfortunately, such a “naive” solution won’t work.

Let’s demonstrate the problem. Without classes, using plain objects for the sake of simplicity.


You may skip this part and go below to the `[[HomeObject]] `subsection if you don’t want to know the details. That won’t harm. Or read on if you’re interested in understanding things in-depth.

In the example below, `rabbit.__proto__ = animal`. Now let’s try: in `rabbit.eat()` we’ll call `animal.eat()`, using `this.__proto__`:


```javascript

1    let animal = {
2    name: "Animal",
3    eat() {
4        alert(`${this.name} eats.`);
5    }
6    };
7
8    let rabbit = {
9    __proto__: animal,
10    name: "Rabbit",
11    eat() {
12        // that's how super.eat() could presumably work
13        this.__proto__.eat.call(this); // (*)
14    }
15    };
16
17     rabbit.eat(); // Rabbit eats.
```

At the line `(*) `we take `eat` from the prototype` (animal)` and call it in the context of the current object. Please note that .`call(this)` is important here, because a simple `this.__proto__.eat() `would execute parent `eat` in the context of the prototype, not the current object.


And in the code above it actually works as intended: we have the correct `alert`.

Now let’s add one more object to the chain. We’ll see how things break:

```javascript

1    let animal = {
2    name: "Animal",
3    eat() {
4        alert(`${this.name} eats.`);
5    }
6    };
7
8    let rabbit = {
9    __proto__: animal,
10    eat() {
11        // ...bounce around rabbit-style and call parent (animal) method
12        this.__proto__.eat.call(this); // (*)
13    }
14    };
15
16    let longEar = {
17    __proto__: rabbit,
18    eat() {
19        // ...do something with long ears and call parent (rabbit) method
20        this.__proto__.eat.call(this); // (**)
21    }
22    };
23
24    longEar.eat(); // Error: Maximum call stack size exceeded
```

The code doesn’t work anymore! We can see the error trying to call `longEar.eat()`.

It may be not that obvious, but if we trace `longEar.eat()` call, then we can see why. In both lines `(*) `and `(**) `the value of `this `is the current object `(longEar)`. That’s essential: all object methods get the current object as` this`, not a prototype or something.

So, in both lines` (*)` and` (**)` the value of` this.__proto__` is exactly the same: `rabbit`. They both call `rabbit.eat` without going up the chain in the endless loop.

#### Here’s the picture of what happens:
___
flow chaart 
___

1.Inside `longEar.eat()`, the line `(**)` calls `rabbit.eat` providing it with `this=longEar`.

```javascript

1    // inside longEar.eat() we have this = longEar
2    this.__proto__.eat.call(this) // (**)
3    // becomes
4    longEar.__proto__.eat.call(this)
5    // that is
6    rabbit.eat.call(this);
```

2.Then in the line `(*)` of` rabbit.eat`, we’d like to pass the call even higher in the chain, but `this=longEar`, so `this.__proto__.eat` is again `rabbit.eat`!


3.…So rabbit.eat calls itself in the endless loop, because it can’t ascend any further.

The problem can’t be solved by using this alone.

### **[[[HomeObject]]]()**


To provide the solution, JavaScript adds one more special internal property for functions: `[[HomeObject]]`.

When a function is specified as a class or object method, its `[[HomeObject]]` property becomes that object.

Then `super` uses it to resolve the parent prototype and its methods.

Let’s see how it works, first with plain objects:



```javascript

1    let animal = {
2    name: "Animal",
3    eat() {         // animal.eat.[[HomeObject]] == animal
4        alert(`${this.name} eats.`);
5    }
6    };
7
8    let rabbit = {
9    __proto__: animal,
10    name: "Rabbit",
11    eat() {         // rabbit.eat.[[HomeObject]] == rabbit
12        super.eat();
13    }
14    };
15
16    let longEar = {
17    __proto__: rabbit,
18    name: "Long Ear",
19    eat() {         // longEar.eat.[[HomeObject]] == longEar
20        super.eat();
21    }
22    };
23
24    // works correctly
25    longEar.eat();  // Long Ear eats.
```

It works as intended, due to` [[HomeObject]]` mechanics. A method, such as `longEar.eat`, knows its` [[HomeObject]] `and takes the parent method from its prototype. Without any use of `this`.

### **[Methods are not “free”]()**


As we’ve known before, generally functions are “free”, not bound to objects in JavaScript. So they can be copied between objects and called with another `this`.

The very existence of `[[HomeObject]]` violates that principle, because methods remember their objects.` [[HomeObject]]` can’t be changed, so this bond is forever.

The only place in the language where` [[HomeObject]]` is used – is `super`. So, if a method does not use `super`, then we can still consider it free and copy between objects. But with `super` things may go wrong.

Here’s the demo of a wrong `super` result after copying:

```javascript

1    let animal = {
2    sayHi() {
3        alert(`I'm an animal`);
4    }
5    };
6
7    // rabbit inherits from animal
8    let rabbit = {
9    __proto__: animal,
10    sayHi() {
11        super.sayHi();
12    }
13    };
14
15    let plant = {
16    sayHi() {
17        alert("I'm a plant");
18    }
19    };
20
21    // tree inherits from plant
22    let tree = {
23    __proto__: plant,
24    sayHi: rabbit.sayHi // (*)
25    };
26
27    tree.sayHi();  // I'm an animal (?!?)
```

A call to `tree.sayHi()` shows “I’m an animal”. Definitely wrong.

The reason is simple:


- In the line `(*)`, the method `tree.sayHi` was copied from `rabbit`. Maybe we just wanted to avoid code duplication?
- Its `[[HomeObject]]` is `rabbit`, as it was created in `rabbit`. There’s no way to change `[[HomeObject]]`.
- The code of `tree.sayHi()` has `super.sayHi()` inside. It goes up from `rabbit` and takes the method from` animal`.


Here’s the diagram of what happens:
____
flow chart
____


### **[Methods, not function properties]()**

 is defined for methods both in classes and in plain objects. But for objects, methods must be specified exactly as` method()`, not as` "method: function()"`.

 The difference may be non-essential for us, but it’s important for JavaScript.

In the example below a non-method syntax is used for comparison. `[[HomeObject]]` property is not set and the inheritance doesn’t work:

```javascript

1    let animal = {
2    eat: function() { // intentionally writing like this instead of eat() {...
3        // ...
4    }
5    };
6
7    let rabbit = {
8    __proto__: animal,
9    eat: function() {
10        super.eat();
11    }
12    };
13
14    rabbit.eat();  // Error calling super (because there's no [[HomeObject]])
```

### **[Summary]()**


1.To extend a class: `class Child extends Parent`:

- That means `Child.prototype.__proto__` will be `Parent.prototype`, so methods are inherited.

2.When overriding a constructor:

- We must call parent constructor as` super()` in `Child` constructor before using `this`.

3.When overriding another method:
We can use `super.method()` in a `Child `method to call `Parent` method.

4.Internals:

- Methods remember their class/object in the internal `[[HomeObject]] `property. That’s how super resolves parent methods.

- So it’s not safe to copy a method with `super `from one object to another.

Also:

- Arrow functions don’t have their own `this `or `super`, so they transparently fit into the surrounding context.


### **✅ Tasks**

___

### **[Error creating an instance]()   [↗️]()** 

`importance: 5`

Here’s the code with` Rabbit` extending `Animal`.

Unfortunately,` Rabbit` objects can’t be created. What’s wrong? Fix it.

```javascript

1    class Animal {
2
3    constructor(name) {
4        this.name = name;
5    }
6
7    }
8
9    class Rabbit extends Animal {
10    constructor(name) {
11        this.name = name;
12        this.created = Date.now();
13    }
14    }
15
16    let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined
17    alert(rabbit.name);
```
**[Solution]()**


### **[Extended clock]()   [↗️]()** 

`importance: 5`

We’ve got a` Clock` class. As of now, it prints the time every second.

```javascript

class Clock {
  constructor({ template }) {
    this.template = template;
  }

  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    let output = this.template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    console.log(output);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}
```


Create a new class `ExtendedClock` that inherits from `Clock` and adds the parameter `precision `– the number of` ms` between “ticks”. Should be `1000 `(1 second) by default.

- Your code should be in the file` extended-clock.js`
- Don’t modify the original` clock.js`. Extend it.

#### [Open a sandbox for the task.]()


#### [solution]()

