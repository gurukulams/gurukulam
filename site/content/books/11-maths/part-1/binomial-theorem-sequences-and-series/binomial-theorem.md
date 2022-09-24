---
title: 'Binomial theorem'
date: 2018-11-14T19:02:50-07:00
draft: false
weight: 2
extensions:
    - katex
---

The prefix bi in the words bicycle, binocular, binary and in many more words means two. The word
binomial stands for expressions having two terms. For examples \\( (1 + x), (x + y), (x 2 + xy) \\) and
\\((2a + 3b)\\) are some binomial expressions.


#### 5.2.1 Binomial Coefficients

In Chapter 4 we have learnt and used the symbol \\( ^nC_r\\) which is defined as
 
 \\( ^n C_r= \frac{n( n-1)( n-2)...(n-(r-1))}{r(r-1)(r-2)...1}\\) = \\(\frac {n!}{(n-r)!r!}\\)

Since \\( ^n C_r \\) occurs as the coefficients of \\(x^r\\) in \\((1 + x)^n\\) \\(n ∈ \N\\) and as the coefficients of \\(a^r b^{n−r}\\)
in \\((a + b)^n\\) , they are called binomial coefficients. Though the values of \\( ^n C_r\\) can be computed by
formula, there is an interesting simple way to find \\( ^n C_r\\) without doing cumbersome multiplications.


#### Pascal Triangle

The Pascal triangle is an arrangement of the values of \\( ^n C_r \\) in a triangular form. The \\((k + 1)^{st}\\) row
consists values of

 \\(^kc_0,^kc_1,^kc_2,^kc_3,...,^kc_k\\)
 

 In fact, the Pascal triangle is

\\[^0c_0\\]
\\[^1c_0  \  ^1c_1\\]
\\[\ ^2c_0 \ ^2c_1 \ ^2c_2  \\]
\\[^3c_0 \ ^3c_1 \ ^3c_2 \ ^3c_3\\]
\\[^4c_0 \ ^4c_1 \ ^4c_2 \ ^4c_3 \ ^4c_4\\]
\\[... \ ... \ ... \ ...\\]
\\[... \ ... \ ... \ ...\\]
 
\\(\iff\\)

\\[ 1 \\]
\\[ 1  \  1 \\]
\\[ 1  \  2 \ 1  \\]
\\[ 1 \  3  \  3  \  1 \\]
\\[ 1  \  4  \  6  \  4  \ 1 \\]
\\[... \ ... \ ... \ ...\\]
\\[... \ ... \ ... \ ...\\]

Recall the expansion and observe the coefficients of each term of the identities \\( (a+b)^0,(a+b)^1,(a+b)^2,(a+b)^3\\) . There is a pattern in the arrangements of coefficents


\\[(a+b)^0=1\\]
\\[(a+b)^1=a+b\\]
\\[(a+b)^2=a^2+2ab+b^2\\]
\\[(a+b)^3=a^3+3a^2b+3ab^2+b^3\\]


\\[   1 \\]
\\[   1  \ \ 1 \\]
\\[   1 \  2  \ 1 \\]
\\[   1 \ 3 \ 3 \ 1 \\]
 

If we observe carefully the Pascal triangle, we may notice that each row starts and ends with 1
and other entries are the sum of the two numbers just above it. For example ‘3’ is the sum of 1 and 2
above it; ‘10’ is the sum of 4 and 6 above it. We will prove in a short while that


\\( (a+b)^ n = ^nC_o a^n b^0+ ^nC_1 a^{n-1} b^1 +...+ ^nC_r a^{n-r} b^r+...+ ^nC_n a^0b^n\\)


which is the binomial expansion of \\((a + b)^n\\) . The binomial expansion of \\((a + b)^n\\) for any \\(n ∈ \N \\) can
be written using Pascal triangle. For example, from the fifth row we can write down the expansion of
\\((a + b)^4\\) and from the sixth row we can write down the expansion of \\((a + b)^5\\) and so on. We know the
terms (without coefficients) of \\((a + b)^5\\) are


\\(a^5,a^4,b,a^3b^2,a^2b^3,ab^4,b^5\\)

and the sixth row of the Pascal triangle is
 
 1  5  10  10  5  1

 Using these two we can write

 \\( (a+b)^5=a^5+5a^4b+10a^3b^2+10a^2b^3+5ab^4+b5\\)

The Pascal triangle can be constructed using addition alone, without using any multiplication or
division. So without multiplication we can write down the binomial expansion for \\((a + b)^n\\) for any
\\(n ∈ \N\\).

The above pattern resembling a triangle, is credited in the name of the seventeenth century French
Mathematician Blaise Pascal, who studied mathematical properties of this structure and used this
concept effectively in Probability Theory


##### 5.2.2 Binomial Theorem for Positive Integral Index

Now we prove the most celebrated theorem called Binomial Theorem.

###### theorem 5.1 (Binomial Theorem for Positive Integral Index) : 
If n is any positive integer, then


\,\\( (a+b)^n=^nc_0a^nb^0+^nc_1a^{n-1}b^1+...+^nc_ra^{n-r}b^r+...+^nc_na^0b^n\\)

Proof. We prove the theorem by using mathematical induction. For any positive integer n, let P (n)
be the statement


 \\( (a+b)^n = ^nC_0a^nb^0 + ^nC_1a^{n-1}b^1 + ...+ ^nc_ra^{n-r} +...+ ^nc_na^0b^n.\\)

Since

 \\( ^1C_0 = 1\\) and \\( ^1C_1 = 1\\)
 
the expression in the right hand side of \\(P(1)\\) is \\(a^1 b^0 + a^0 b^1\\) which is same as \\(a + b\\); the left hand side
is \\((a + b)^1\\) . Hence \\(P(1)\\) is true.
We assume that for a positive integer \\( k, P(k)\\) is true. That is,

\\( (a+b)^k = ^kC_0 a^kb^0 + ^kC_1 a^{k-1}b^1 + ... + ^kC^r a^{k-r}b^r + ... + ^kC^k a^0b^k\\)

Let us use the identity

\\(^nC_r + ^rC_{r - 1} = ^{n+1}C_r\\) 

in the proof. Now

\\( (a+b)^{k+1} = (a+b)(a+b)^k\\)

\\(= (a+b) [^kC_0a^kb^0+^kC_1a^{k-1}b^1 + ... + ^kC_ra^{k-r}b^r+...+^kC_ka^0b^k] \\)


\\( = [^kC_0a^{k+1}b^0+^kC_1a^kb^1 + ... + ^kC_ra^{k-r+1}b^r +...+ ^kC_ka^1b^k] + [^kC_0a^kb^1+^kC_1a^{k-1}b^2 + ... + ^kC_ra^{k-r}b^{r+1} + ... + ^kC_ka^0b^ {k+1}] \\)


 \\( = ^kC_0a^{k+1}b^0+[^kC_1 + ^kC_0 ]a^kb^1 +...+[^kC_r+^kC_{r-1} ]a^{k-r+1}b^r +...+ [ ^kC_k+^kC_{k-1}]a^1b^k+^kC_ka^0b^{k+1}\\)


\\( =^{k+1}C_0a^{k+1}b^0+^{k+1}C_1a^kb^1+^{k+1}C_2a^{k-1}b^2 +...+ ^{k+1}C_ra^{k-r+1}b^r + ... + ^{k+1}C_ka^1b^k+^{k+2}C_{k+1}a^0b^{k+1} \\)

\\( (a+b)^{k+1} = ^{k+1}C_0a^{(k+1)}b^0+^{k+1}C_1a^{(k+1)-1}b^1+^{k+1}C_2a^{(k+1)-2}b^2 + ... +^{k+1}C_ra^{(k+1)-r}b^r + ... + ^{k+1}C_ka^1b^{(k+1)-1} + ^{k+1}C_{k+1}a^0b^{k+1} \\)

This shows that \\(P(k + 1)\\) is true whenever \\(P(k)\\) is true. Thus, by the principle of mathematical
induction, \\(P(n)\\) is true for all natural numbers n. Hence,

\\( (a+b)^n=^nC_0a^nb^o+^nC_1a^{n-1}b^1+...+^nC_ra^{n-r}b^r+...+^nC_na^0b^n,n\in \N\\)


(i) The expansion of (a + b) n , n ∈ N can also be written as

\\( (a + b)^n = \sum _{k = 0}^n \\)
\\(^nC_k a^{n-k}b^k or \sum _{k = 0}^n \\)
\\(^nC_k a^k b^{n-k}\\)

(ii) The expansion of \\((a + b) n , n ∈ \N\\), contains exactly \\((n + 1)\\) terms.

(iii) In \\((a + b) n = Σ ^n_{k=0} n C_k a^{n−k} b^k\\) , the powers of a decreases by 1 in each term,
whereas the powers of b increases by 1 in each term. However, the sum of powers
of a and b in each term is always n.

(iv) The \\((r + 1)^{th}\\) term in the expansion of \\((a + b) n , n ∈ \N\\), is

\\(T_{r+1} = ^nC_r b^r , r = 0,1,2,...,n. \\)
 
(v) In the product \\((a + b)(a + b) · · · (a + b)\\), n times, to get \\(b^r\\) , we need any r factors
out of these *n* factors. This can be done in \\(^nC_r\\) ways. That is why, we have \\(^nC_r\\)
as the coefficient of \\(a^{n−r} b^r \\).

(vi) In the expansion of \\((a + b)^n , n ∈ \N\\), the coefficients at equidistant from the
beginning and from the end are equal due to the fact that \\(^n C_r\\) = \\(^n C_{n−r}\\) .

(vii) In the expansion of \\((a + b)^n , n ∈ \N\\), the greatest coefficient is \\(^n C_\frac{n}{2}\\) if *n* is even
and the greatest coefficients are \\(^n C \frac{n−1}{2} or ^n C _frac{n+1}{2} \\), if *n* is odd.

(viii) In the expansion of \\((a + b)^n , n ∈ \N\\),
if *n* is even, the middle term is \\(T_{\frac{n}{2}+1}\\) = \\(^n C_{\frac{n}{2}}\\) \\(a^n-\frac{n}{2} b \frac{n}{2} \\). If n is odd, then the two
middle terms are \\(T_{\frac{n-1}{2}+1}\\) and \\(T_{\frac{n+1}{2}+1}\\)

##### 5.3 Particular cases of Binomial Theorem

(i) Replacing *b* by (−b), in the binomial expansion of \\((a + b)^n , n ∈ \N\\), we get

\\((a - b)^n\\) = \\(^n C_0 a^n b^0 -\\) \\(^n C_1 a^{n-1} b^1\\) \\(+ ^n C_2 a^{n-2} b^2 -\\) \\(... +(-1)^{r n} C_r a^{n - r}b^r\\) \\( + ... + (-1)^{r n} C_r a^0b^n\\)

Observe that the sign ‘+’ and ‘−’ appear alternately in the binomial expansion of \\((a − b)^n\\) .

(ii) Replacing \\(a\\) by \\(1\\) and \\(b\\) by \\(x\\), in the binomial expansion of \\((a + b)^n\\) , we get

\\((1 + x)^n = ^n C_0 + ^n C_1 x + ^n C_2 x^2 + ... + ^n C_r x^r + ... + ^n C_n x^n .\\)      

In particular, when \\(x = 1\\), \\(^n C_0 + ^n C_1 + ^n C_2 + ··· + ^n C_n = 2 n .\\)


If \\(X\\) is a set containing n elements, then we know that \\(^n C_r\\) is the number of
subsets of \\(X\\) having exactly r elements. So by adding \\(^n C_r\\) for \\(r = 0, 1, 2, . . . , n\\)
we get the number of subsets of \\(X\\). So by using the above identity we see that **a**
**set of n elements has** \\(2^n\\) **subsets**.


(iii) \\((1 - x)^n  = ^n C_0 - ^n C_1 x + ^n C_2 x^2 - ... + (-1)^{r  n} C_r  x^r + ... + (-1)^n x^n \\) In particular, when \\(x = 1, ^n C_0 + ^n C_2 + ^n C_2 + n C_4 + ... = n C_1 + ^n C_3 + ^n C^5 + ... = 2^{n-1} \\)