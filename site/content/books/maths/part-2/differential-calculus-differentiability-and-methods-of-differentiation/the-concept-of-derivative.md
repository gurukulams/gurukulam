---
title: 'The concept of derivative'
date: 2018-11-14T19:02:50-07:00
draft: false
weight: 2
extensions:
    - katex
---


Calculus grew out of four major problems that mathematicians were working on during the
seventeenth century.

(1) The tangent line problem
(2) The velocity and acceleration problem
(3) The minimum and maximum problem
(4) The minimum and maximum problem


We take up the above problems 1 and 2 for discussion in this chapter while the last two problems
are dealt with in the later chapters.


#### The tangent line problem
What does it mean to say that a line is tangent to a curve at a point? For a circle, the tangent line
at a point P is the line that is perpendicular to the radial line at a point P, as shown in fig. 10.1.

For a general curve, however, the problem is more difficult, for example, how would you define the tangent lines shown in the following figures 10.2 to 10.4.

You might say that a line is tangent to a curve at a point P if it touches, but does not cross, the curve at point P. This definition would work for the first curve (Fig. 10.2), but not for the second (Fig. 10.3). Or you might say that a line is tangent to a curve if the line touches or intersects the curve exactly at one point. This definition would work for a circle but not for more general curves, as the third curve shows (Fig. 10.4).

Essentially, the problem of finding the tangent line at a point P boils down to the problem of finding the slope of the tangent line at point P. You can approximate this slope using a secant line through the point of tangency and a second point on the curve as in the following Fig. 10.5.

Let \\(P(x_{0})\\) be the point of tangency and \\(Q(x_{0}+\vartriangle x, f(x_{0}+\vartriangle x))\\) be the second point. 

m=\\(\frac{y_{2}-y_{1}}{x_2-x_1}\\) எனும் சாய்வு விதியில் பிரதியிடுவதன் மூலம் இரு புள்ளிகள் வழியாகச் செல்லும்

வெட்டுக் கோட்டின் சாய்வைப் பெற இயலும்.

\\(m_{sec}\\)=\\(\frac{f(x_0+\Delta x)-f(x_0)}{(x_0+\Delta x)-x_0}\\)=\\(\frac{y-ன் மாற்றம்}{x-ன் மாற்றம்}\\)=\\(\frac{\Delta y}{\Delta x}\\)

அதாவது,\\(m_{sec}\\)=\\(\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}\\)என்பது

வெட்டுக்கோட்டின் சாய்வாக அமையும்.
இந்தச் சமன்பாட்டின் வலப்பக்கம் இருப்பது **வேறுபாட்டுப்
பின்னம் (Difference quotient)** ஆகும்.

பகுதி \\(\Delta x\\)என்பது x-ன் மாற்றம் (x-ன் அதிகரிப்பு) மற்றும்
தொகுதி \\(\Delta y= f(x_0+\Delta x)-f(x_0)\\) என்பது **y-ன் மாற்றம்** ஆகும்.

தொடுவரைப்புள்ளிக்கு மிக அருகே புள்ளிகளைத் தேர்ந்தெடுப்பதன் மூலம் தொடுகோட்டின்
சாய்விற்கான சிறந்த தோராய மதிப்பினைப் பெற இயலும் என்பதே இம்முறையின் சிறப்பம்சம் ஆகும்.

![relation](/books/maths/part-2/differential-calculus-differentiability-and-methods-of-differentiation/1.png "relation")
![relation](/books/maths/part-2/differential-calculus-differentiability-and-methods-of-differentiation/2.png "relation")

#### விளக்க எடுத்துக்காட்டு 
f(x) = \\(x_2\\) எனும் வளைவரைக்கு (1, 1)
என்ற புள்ளியில் தொடுககோட்டின் சாய்வினைக்
கண்டவோறிம்.
முதலில்
![relation](/books/maths/part-2/differential-calculus-differentiability-and-methods-of-differentiation/3.png "relation")
![relation](/books/maths/part-2/differential-calculus-differentiability-and-methods-of-differentiation/3.png "relation")

முதலில் Dx = 0.1 எனக் கருதுவோம்.
(1, 1) மற்றும் (1.1, \\((1.1)^{2}\\) புள்ளிகள் வழியாகச்
செல்லும் வெட்டுக்கோட்டின் சாய்வினைக்
கண்டறிவோம்.

(i) f(1.1) = \\((1.1)^2\\)= 1.21

(ii) \\(\Delta y\\) = f(1.1) - f(1)
= 1.21 - 1 = 0.21

\\(\frac{\Delta y}{\Delta x}\\)=\\(\frac{0.21}{0.1}\\)=2.1

1-க்கு வலப்பக்கமும் இடப்பக்கமும் அமையும் அடுத்தடுத்த மதிப்புகளைக் கீழ்க்காணும்
வகையில் அட்டவணைப்படுத்துவோம்.

![relation](/books/maths/part-2/differential-calculus-differentiability-and-methods-of-differentiation/4.png "relation")

![relation](/books/maths/part-2/differential-calculus-differentiability-and-methods-of-differentiation/5.png "relation")

\\((x_0,f(x_0))\\) என்ற புள்ளியில் வரையப்பட்ட தொடுகோட்டின் சாய்வு, அப்புள்ளியில்வளைவரையின் சாய்வு எனவும் அழைக்கப்படுகிறது,வரையறையின் மூலம் ஒரு வளைவரை \\((x_{0},f(x_0))\\) என்ற புள்ளியில் ஒரு தொடுவோட்டினைத்தருமாயின் அது தனித்ததாக இருக்கும். ஏனெனில் வோடுக்கப்பட்ட ஒரு புள்ளி மற்றும் சாய்வுவழியாகஒரே ஒரு வோட்டினையே வரைய இயலும்.

வளைவரையின் சாய்வைக் காண்பதற்கான நிபந்தனைகளை 4 படி நிலைகளாக எழுதலாம்.

(i) \\(x_{0}\\) மற்றும்  \\(x_{0}\\) என்ற புள்ளிகளில் f-ன் மதிப்புகளைக் காண்க. அதாவது, \\(f(x_{0})\\) மற்றும் \\(f(x_{0}+\Delta x)\\) ஆகியவற்றைக் காண்க.

(ii) \\(\Delta y\\) கணக்கிடுக: அதாவது \\(\Delta y\\) = \\(f(x_0+\Delta x)-f(x_0)\\) -ஐ காண்க.

(iii) \\(\Delta y\\)-ஐ \\(\Delta x\\)≠ 0ஆல் வகுக்க : அதாவது,\\(\frac{\Delta y}{\Delta x}\\)=
\\(\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}\\) -ஐ காண்க.

(iv) \\(\Delta x\\) \\(\to\\) எனும்போது :\\(\frac{\Delta y}{\Delta x}\\) -ன் எல்லையைக் காண்க. அதாவது, \\(m_{tan}\\) = \\(\displaystyle\lim_{x\to1}\\)\\(\frac{\Delta y}{\Delta x}\\)

விளக்க எடுத்துக்காட்டு 10.1-ல் உள்ள வளைவரையின்சாய்வினைக் காண்பதை எளிமைப்படுத்த
வரையறைகள் பயன்படுவதைக் காணலாம்.

(i) f(1) = \\(1_{2}\\)=1 .
எந்தவோரு \\(\Delta x\\)≠ 0-க்கும் \\(f(1 + \Delta x) = (1 + \Delta x)^2=1+2\Delta x+(\Delta x)^2\\)

(ii)\\(\Delta  = f(1 +\Delta x) - f(1) = 2\Delta x + (\Delta x)^2=\Delta x(2+\Delta x)\\)


(iii)\\(\frac{\Delta y}{\Delta x}\\)=\\(\frac{\Delta x(2+\Delta x)}{\Delta x}\\)

=2+\\(\Delta\\) x

(iv) \\(m_tan\\) = \\(\displaystyle\lim_{\Delta x \to 0}\\)\\(\frac{\Delta y}{\Delta x}\\)

\\(\displaystyle\lim_{\Delta x \to 0}\\)(2+\Delta x)=2+0=2


{{< box title="எடுத்துக்காட்டு 10.1" type="objective" >}}

f(x) = 7x + 5 எனும் வளைவரைக்கு \\(f எனும் புள்ளியில் தொடுக�ோட்டின் சாய்வினைக்

காண்க.









{{< /box >}}