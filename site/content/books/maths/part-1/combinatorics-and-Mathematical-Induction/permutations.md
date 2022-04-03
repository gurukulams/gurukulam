---
title: 'Permutations'
date: 2018-11-14T19:02:50-07:00
draft: false
weight: 4
extensions:
    - katex
---


What is a permutation ?

Permuations come in various disguises.

Suppose three friends A, B and C have to stand in line for a
photograph. In how many order can they stand? Some of the possible arrangements (from left to right) are

A, B, C : A, C, B : B, A, C

B, C, A : C, A, B : C, B, A

Thus there are six possible ways in which they can arrange themselves for the photograph.

Thus if 3 objects have to be arranged in a row there are 3 × 2 × 1 = 3! possible permutations. The number of permutations of 4 objects taken all at a time is 4×3×2×1 = 4! Thus if n objects have to be arranged in a line there are n × (n − 1) × (n − 2) × · · · × 3 × 2 × 1 = n! possible arrangements or permutations.

Suppose you have 7 letters A,B,C,D,E,F and G. We want to make a 4 letter string. We have 7 choices for the 1st letter. Having chosen the first letter, we have 6 choices for the second letter. Proceeding this way, we have 4 choices for the 4th letter.

Hence, the number of permutations of 4 letters chosen from 7 letters is

7×6×5×4=\\(\frac{7×6×5×4×3×2×1}{3×2×1}\\)=\\(\frac{7!}{3!}\\)=\\(\frac{7!}{(7-4)!}\\)


More generally, the number of distinct permutations of r objects which can be made from n distinct
objects is \\(\frac{n!}{(n-r)!}\\) . It is denoted by \\(^n P_r\\). The formal proof of this result will be proved in this section.

**4.4.1 Permutations of distinct objects**

In terms of function on any finite set say S = \\({x_1,x_2,....,x_n}\\), a permutation can be defined as a bijective mapping on the set S onto itself. The number of permutation on the set S is the same as the total number of bijective mappings on the set S.

We denote the number of permutations by \\(^n P_r\\).

**Theorem 4.1**

If n, r are positive integers and r ≤ n, then the number of permutations of n distinct
objects taken r at a time is n (n − 1) (n − 2) · · · (n − r + 1).


**Proof**

A permutation is an ordering. A permutation of n distinct objects taken r at a time is formed
by filling of r positions, in a row with objects chosen from the given n distinct objects.

There are n objects that can be filled in the first position. For the second position there are remaining n − 1 objects. There are n − 2 objects for the third position. Continuing like this until finally we place one of the (n − (r − 1)) possible objects in the rth position. By the rule of product we conclude 

n\\(^n P_r\\) =n(n−1)(n−2)···(n−r+1).


**Theorem 4.2**
If n\\(\ge\\) 1 , and 0\\(\le\\) r \\(\le\\) n , then \\(^n P_r\\)=\\(\frac{n!}{(n-r)!}\\)

**Proof**

\\(^n P_r\\)=n×(n-1)×(n-2)×...×(n-r+1)

=\\(\frac{n×(n-1)×(n-2)×...×(n-r+1)×(n-r)×(n-r-1)×...×2×1}{(n-r)×(n-r-1)×...×2×1}\\)

=\\(\frac{n!}{(n-r)!}\\)




