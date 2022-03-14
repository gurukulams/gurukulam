---
title: 'Factorials'
date: 2018-11-14T19:02:50-07:00
draft: false
weight: 3
extensions:
    - katex
---

{{< box title="" type="objective" >}}
Factorial of a natural number n is the product of the first n natural numbers. It is denoted by n!. That is,
n! = 1 × 2 × 3 × · · · × n.

{{< /box >}}

We read this symbol as “n factorial” or “factorial of n”. The notation n! was introduced by the French
mathematician Christian Kramp in the year 1808. Note that for a positive integer n

\\(n!=n×(n-1)×(n-2)×...×3×2×1\\)

\\(=n(n-1)! for n>1\\)

\\(=n(n-1)(n-2)! for n>2 \\)

\\(=n(n-1)(n-2)(n-3)! for n>3 and so on.

Observe that,
   1! = 1

 2!=2×1×=2

3! = 3×2×1=6

4! = 4×3×2×1=24

5! = 5×4×3×2×1  = 120

... = ...

22! = 22 ×21× 20× = 1124000727777607680000

The number 22 ( the Birth date of Ramanujan) has a special place with respect to factorial that, it is the least integer N greater than 1 whose factorial has exactly N digits.
It will be a good exercise for both students and teachers to find the next number N such that N! has exactly N digits.

Note that 0! = 1 is evident by substituting n = 0 in the equation (n+1)! = (n+1)×n! as 1!=(0+1)×0!⟹0!=\\(\frac{1!}{5}\\)=1  This way, we talk of factorial for non-negative integers.
Note that factorials can be extended to certain negative numbers and also to complex numbers, which are beyond the scope of this book.
We shall now discuss certain examples in order to familiarise the computation of factorials.

{{< box title="Example 4.16" type="objective" >}}
 Find the value of

 (i) 5!     (ii) 6!-5!      (iii)\\(\frac{8!}{5!×2!}\\)

**Solution:**

(i) 5! = 5×4×3×2×1 = 120.

(ii) 6! - 5! = 6×5!-5! =(6-1)×5!=5×120=600

(iii)\\(\frac{8!}{5!×2!}\\)=\\(\frac{8×7×6×5!}{5!×2!}\\)=\\(\frac{8×7×6}
{2}\\)=168

{{< /box >}}

{{< box title="Example 4.17" type="objective" >}}
 
Simplify:\\(\frac{7!}{2!}\\)

**Solution:**

(\\(\frac{7!}{2!}\\)=\\(frac{7×6×5×4×3×2!}\\)=7×6×5×4×3=2520}

{{< /box >}}

{{< box title="Example 4.18" type="objective" >}}

Evaluate \\(\frac{n!}{n!(n-r)}!\\)  when(i) n=7,r=5 (ii) n=50,r=47 (iii)For any n with r = 3.

**Solution:**

(i) When n = 7, r = 5

\\(\frac{n!}{n!(n-r)!}\\)=\\(\frac{7!}{5!(7-5)!}\\)=\\(\frac{7×6×5!}{5!×2!}\\)=\\(\frac{7×6}{1×2}=21\\)

(ii)When n = 50, r = 47

\\(\frac{n!}{n!(n-r)!}\\)=\\(\frac{50!}{47!(50-47)!}\\)=\\(\frac{50×49×48×47!}{47!×3!}\\)=\\(\frac{50×49×48}{1×2×3}\\)=19600.

(iii) For any n and r=3

\\(\frac{n!}{n!(n-r)!}\\)=\\(\frac{n!}{3!(n-3)!}\\)=\\(\frac{n(n-1)(n-2)(n-3)!}{1×2×3×(n-3)!}\\)=\\(\frac{n(n-1)(n-2)}{6}\\)

{{< /box >}}

{{< box title="Example 4.19" type="objective" >}}

Let N denote the number of days. If the value of N! is equal to the total number of hours in N days then find the value of N ?

**Solution:**
We need to solve the equation N! = 24 × N.
For N = 1,2,3,4, N!<24×N.
For N = 5,we have N!=5!=4!×5=24N.
For N > 5,we have N!≥5!N >24×N . Hence N =5.

{{< /box >}}

{{< box title="Example 4.20" type="objective" >}}

If \\(\frac{6!}{n!}\\)=6 ,  then find the value of n.

**Solution:**

\\(\frac{6!}{n!}\\)=\\(\frac{1.2.3.4.5.6.}{1.2.3...n}\\)=6.

As n < 6 we get ,n = 5.

{{< /box >}}

{{< box title="Example 4.21" type="objective" >}}

If n! + (n−1) ! = 30,then find the value of n.
 
 **Solution:**

 Now, 
 30 = 6×5. 
 As n!+(n−1)! = (n+1)(n−1)! , equating (n−1)! = 6 = 3!, we get n = 4.

{{< /box >}}

{{< box title="Example 4.22" type="objective" >}}

What is the unit digit of the sum 2! + 3! + 4! +..... + 22!?

 **Solution:**

 From 5! onwards for all n! the unit digit is zero and hence the contribution to the unit digit is through 2! + 3! + 4! only. which is 2 + 6 + 24 = 32 . Therefore the required unit digit is 2.

{{< /box >}}

{{< box title="Example 4.23" type="objective" >}}

If \\(\frac{1}{7!}\\)+\\(\frac{1}{8!}\\)=\\(\frac{A}{9!}\\)  then find the value of A.

 **Solution:**

We have,

\\(\frac{A}{9×8×7!}\\)=\\(\frac{1}{7!}\\)+\\(\frac{1}{8×7!}\\)

Therefore,\\(\frac{1}{7!}\\)×\\(\frac{A}{9×8}\\)=\\(\frac{1}{7!}\\)×[1=\\(\frac{1}{8}\\)] equivalently,
\\(\frac{A}{72}\\)=\\(\frac{9}{8}\\)
whichimply A = 81.

{{< /box >}}

{{< box title="Example 4.24" type="objective" >}}

Prove that \\(\frac{(2n)!}{n!}\\)=\\(2^n\\)(1.3.5...(2n-1) 

**Solution:**

\\(\frac{(2n)!}{n!}\\)=\\(\frac{1.3.5...(2n-2)(2n-1)×2n}{n!}\\)

=\\(\frac{1.2.3.4(2n-1)(2.4.6(2n-2)×2n)}{n!}\\)

(Grouping the odd and even numbers separately)

=\\(\frac{1.2.3.4(2n-1)×2^{n}×(1.2.3...(n-1).n)}{n!}\\)

(taking out the 2’ s)

=\\(\frac{(1.3.5..(2n-1)) ×2^{n}×n!}{n!}\\)

=\\(2^{n}\\)\\(1.3.5...(2n-1)\\).

{{< /box >}}

## Exercise 4.1

1. (i) A person went to a restaurant for dinner. In the menu card, the person saw 10 Indian and 7 Chinese food items. In how many ways the person can select either an Indian or a Chinese food?

(ii) There are 3 types of toy car and 2 types of toy train available in a shop. Find the number of ways a baby can buy a toy car and a toy train?

(iii) How many two-digit numbers can be formed using 1,2,3,4,5 without repetition of digits?

(iv) Three persons enter in to a conference hall in which there are 10 seats. In how many ways they can take their seats?

(v) In how many ways 5 persons can be seated in a row?

2. (i) A mobile phone has a passcode of 6 distinct digits. What is the maximum number of attempts one makes to retrieve the passcode?

(ii) Given four flags of different colours, how many different signals can be generated if each signal requires the use of three flags, one below the other?

3. Four children are running a race.

(i) In how many ways can the first two places be filled?

(ii) In how many different ways could they finish the race?

4. Count the number of three-digit numbers which can be formed from the digits 2,4,6,8 if

(i) repetitions of digits is allowed.

 (ii) repetitions of digits is not allowed

5. How many three-digit numbers are there with 3 in the unit place? (i) with repetition (ii) without repetition.

6. How many numbers are there between 100 and 500 with the digits 0, 1, 2, 3, 4, 5 ?
 if (i) repetition of digits allowed (ii) the repetition of digits is not allowed.

7. How many three-digit odd numbers can be formed by using the digits 0, 1, 2, 3, 4, 5 ? if (i) the repetition of digits is not allowed (ii) the repetition of digits is allowed.

8. Count the numbers between 999 and 10000 subject to the condition that there are 

(i) no restriction. 

(ii) no digit is repeated.

  (iii) at least one of the digits is repeated.

9. How many three-digit numbers, which are divisible by 5, can be formed using the digits 0, 1, 2, 3, 4, 5 if 

(i) repetition of digits are not allowed? 

(ii) repetition of digits are allowed?

10. To travel from a place A to place B, there are two different bus routes  \\(B_1 ,B_2\\)  two different train routes \\(T_1,T_2\\) and one air route \\(A_1\\). From place B to place C there is one bus route say \\(B_1\\) , two different train routes say \\(T_1,T_2\\) and one air route \\)A_1\\) . Find the number of routes of commuting from place A to place C via place B without using similar mode of transportation.

11. How many numbers are there between 1 and 1000 (both inclusive) which are divisible neither by 2 nor by 5?

12. How many strings can be formed using the letters of the word LOTUS if the word

(i) either starts with L or ends with S? 

(ii) neither starts with L nor ends with S?

13. (i) Count the total number of ways of answering 6 objective type questions, each question having 4 choices.

(ii) In how many ways 10 pigeons can be placed in 3 different pigeon holes ?

(iii) Find the number of ways of distributing 12 distinct prizes to 10 students?

14. Find the value of

(i) 6! (ii)4! + 5! (iii)3!-2! (iv)3!×4! (v)\\(\frac{12!}{9!×3!}\\) (vi) \\(\frac{(n+3)!}{(n+1)!}\\)

15.  Evaluate \\(\frac{n!}{n!(n-r)!}\\) when

(i) n = 6 , r = 2 (ii) n = 10, r = 3 (iii) For any n with, r = 2

16. Find the value of n if

(i) (n + 1)! = 20(n - 1)! (ii)\\(\frac{1}{8!}\\)+\\(\frac{1}{9!}\\)=\\(\frac{n}{10!}\\)

Factorials can be generalised as double factorial as follows:

{{< box title="Double Factorial of n" type="objective" >}}

Factorial of an integer n, denoted by n! can be viewed as a function f : N ∪ {0} → N, where N is the set of all Natural numbers, defined as f:\\(\N\\)∪{0} \\(\to\\) \\(\N\\)

f(n) =\\(\begin{cases} 1 &\text{}   \\n×(n-1)×(n-2)×...×3×2×1,n &\text{} \neq\end{cases}\\)

One can define n!! ( double factorial of n ) as

