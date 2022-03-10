---
title: 'Matrices'
date: 2018-11-14T19:02:50-07:00
draft: false
extensions:
    - katex
weight: 2
---


A matrix is a rectangular array or arrangement of entries or elements displayed in rows and
columns put within a square bracket [ ].

In general, the entries of a matrix may be real or complex numbers or functions of one variable
(such as polynomials, trigonometric functions or a combination of them) or more variables or any
other object. Usually, matrices are denoted by capital letters A, B, C, ... etc. In this chapter the entries
of matrices are restricted to either real numbers or real valued functions on real variables.

#### General form of a matrix
If a matrix A has m rows and n columns, then it is written as
\\(\begin{bmatrix} 
    {a_{ij}} \end{bmatrix}_{m×n} ,1 \le i \le m, 1 \le j \le n\\)


\\(\begin{bmatrix} 
    {a_{ij}} \end{bmatrix}_{m×n}=
    \begin{bmatrix} 
    a_{11} & a_{12} & \cdots & a_{1f} & \cdots & a_{1n} \\\\ 
    a_{21} & a_{22} & \cdots & a_{2f} & \cdots & a_{2n} \\\\ 
    \vdots & \vdots & \ddots & \vdots & \vdots & \vdots \\\\ 
    a_{i1} & a_{i2} & \cdots & a_{if} & \cdots & a_{in} \\\\ 
    \vdots & \vdots & \vdots & \vdots & \ddots & \vdots \\\\ 
    a_{m1} & a_{m2} & \cdots & a_{mf} & \cdots & a_{mn} \\\\ \end{bmatrix}
    \\)

Note that m and n are positive integers.

The following are some examples of matrices :

\\(A=\begin{bmatrix} 
    2 & 0 & -1\\\\ 
    1 & 4 & 5\\\\ 
    9 & -8 & 6\end{bmatrix}\\)

\\(B=\begin{bmatrix} 
    7 & -9 & 1.2 & 0\\\\ 
    sin \cfrac{x}{4} & 2 & x^2 & 4\\\\ 
    cos \cfrac{x}{2} & 1 & 3 & -6\end{bmatrix}\\),

\\(C=\begin{bmatrix} 
    2 & 0 & -1\\\\ 
    1 & 4 & 5\\\\ 
    9 & -8 & 6\end{bmatrix}\\)

In a matrix, the horizontal lines of elements are known as rows and the vertical lines of elements
are known as columns. Thus A has 3 rows and 3 columns, B has 3 rows and 4 columns, and C has 4
rows and 3 columns.

#### **Definition**
If a matrix A has m rows and n columns then the order or size of the matrix A is defined to be
m × n (read as m by n).

The objects \\(a_{11},a_{12}, ..., a_{mn}\\) are called elements or entries of the matrix
\\(\begin{bmatrix} 
    {a_{ij}} \end{bmatrix}_{m×n}\\). The element
\\(a_{ij}\\) is common to \\(i^{th}\\)
row and  \\(j^{th}\\)
column and is called  \\((i,j)^{th}\\)
element of A. Observe that the  \\(i^{th}\\)
row and \\(j^{th}\\) column of A are 1 and 1 × n and m× 1 matrices respectively and are given by
\\(a_{i1},a_{i2},a_{i3}\\) and 

\\(\begin{bmatrix} 
    {a_{ij}} \end{bmatrix}_{m×n}=
    \begin{bmatrix} 
    a_{1j}\\\\ 
    a_{2j}\\\\ 
    \vdots\\\\ 
    a_{mj}\end{bmatrix}
    \\)
    We shall now visualize the representation and construction of matrices for simplifying day-to-day
problems.

##### **Illustration**
Consider the marks scored by a student in different subjects and in different terminal examinations.
They are exhibited in a tabular form as given below :


{.table}
|  |  Tamil | English | Mathematics  | Science  |  Social Science |
|---|---|---|---|---|---|
| Exam 1 | 48 | 71 |  80 | 62  | 55 |
| Exam 2 | 70 | 68  |  91 | 73  | 60 |
| Exam 3 | 77 | 84  |  95 | 82 | 62 |


This tabulation represents the above information in the form of matrix. What does the entry in the
third row and second column represent?

The above information may be represented in the form of a 3 × 5 matrix A as


\\(A=\begin{bmatrix} 
    48 & 71 & 80 & 62 & 55\\\\ 
    70 & 68 & 91 & 73 & 60\\\\ 
    77 & 84 & 95 & 82 & 62\end{bmatrix}\\)

The entry 84 common to the third row and the second column in the matrix represents the mark
scored by the student in English Exam 3.

###### **Example 7.1**
Suppose that a matrix has 12 elements. What are the possible orders it can have? What if it has
7 elements?
Solution
The number of elements is the product of number of rows and number of columns. Therefore,
we will find all ordered pairs of natural numbers whose product is 12. Thus, all the possible
orders of the matrix are 1 × 12, 12 × 1, 2× 6, 6× 2, 3 ×4 and 4× 3.
Since 7 is prime, the only possible orders of the matrix are 1 × 7 and 7 × 1.

###### **Example 7.2**
Construct a 2 × 3 matrix whose \\((i,j)^{th}\\) element is given by

\\(a_{ij}= \cfrac{\sqrt 3}{2} | 2i-3j | (1 \le i \le 2, 1 \le j \le 3).
\\)

**Solution:**
In general, a 2 × 3 matrix is given by
\\(A=
    \begin{bmatrix} 
    a_{11} & a_{12} & a_{13}\\\\ 
    a_{21} & a_{22} & a_{23} \\\\ 
    \end{bmatrix}
    \\)

By definition of \\(i^{th}\\), we easily have \\(a_{11}= \cfrac {\sqrt 3}{2} |2-3|=\cfrac {\sqrt 3}{2}\\)

and other entries of the matrix

A may be computed similarly. Thus, the required matrix A is

\\(A=
    \begin{bmatrix} 
    \cfrac {\sqrt 3}{2} & {2 \sqrt 3} & \cfrac {7 \sqrt 3}{2}\\\\ 
    \cfrac {\sqrt 3}{2} & {\sqrt 3} & \cfrac {5 \sqrt 3}{2} \\\\ 
    \end{bmatrix}
    \\)

#### Types of Matrices 
Row, Column, Zero matrices

##### **Definition 7.2**
A matrix having only one row is called a row matrix.
For instance,\\(A=[A]_{1×4}\\) =[1 0 -1.1 \\(\sqrt{2}\\) ] is a row matrix. More generally, \\(A=[a_{ij}]_{1×n}=[a_{1j}]_{1×n}\\)
is a row matrix of order 1× n .

##### **Definition 7.3**
A matrix having only one column is called a column matrix.

For instance, \\([A]_{1×4}=\\)\\(\begin{bmatrix} 
    {a_{ij}} \end{bmatrix}_{m×n}=
    \begin{bmatrix} 
    x+!\\\\ 
    x^2\\\\ 
    3x\\\\ 
    4\end{bmatrix}
    \\)
    is a column matrix whose entries are real valued functions of real
variable x. More generally,\\(A=[a_{ij}]_{m×1}=[a_{1j}]_{m×1}\\)

##### **Definition**

A matrix \\(A=[a_{ij}]_{m×n}\\) is said to be a zero matrix or null matrix or void matrix denoted by O if
\\(a_ij = 0\\) for all values of \\(1 \le i \le m \\) and \\(1 \le j \le n\\)

For instance, [0],\\(\begin{bmatrix} 
    0 & 0 & 0\\\\ 
    0 & 0 & 0\\\\ 
    0 & 0 & 0\end{bmatrix}\\) and \\(A=
    \begin{bmatrix} 
    0 & 0 & 0 & 0\\\\ 
    0 & 0 & 0 & 0 
    \end{bmatrix}
    \\) are zero matrices of order 1 × 1, 3 × 3 and 2 × 4
respectively.

A matrix A is said to be a non-zero matrix if at least one of the entries of A is non-zero.
Square, Diagonal, Unit, Triangular matrices

##### **Definition 7.5**
A matrix in which number of rows is equal to the number of columns, is called a square
matrix. That is, a matrix of order n × n is often referred to as a square matrix of order n.

or instance, \\(\begin{bmatrix} 
    a & b & c\\\\ 
    d & c & f\\\\ 
    g & h & l \end{bmatrix}\\) is a square matrix of order 3.

##### **Definition 7.6**
In a square matrix A = \\([ a_{ij} ]_{n × n}\\) of order n, the elements \\(a_{11} , a_{22} , a_{33} ,..., a_{nn}\\)are called the principal
diagonal or simply the diagonal or main diagonal or leading diagonal elements.

##### **Definition 7.7**
A square matrix A = \\([ a_{ij} ]_{n × n}\\) is called a diagonal matrix if \\(a_{ij}=0\\) whenever \\(i \ne j\\) .

hus, in a diagonal matrix all the entries except the entries along the main diagonal are zero. For
instance,

\\(\begin{bmatrix} 
    2.5 & 0 & 0\\\\ 
    0 & \sqrt{3} & 0\\\\ 
    0 & 0 & 0.5 \end{bmatrix}\\),\\(\begin{bmatrix} 
    r & 0\\\\ 
    0 & s\end{bmatrix}\\) ,C=[6],\\(D=\begin{bmatrix} 
    {a_{ij}} \end{bmatrix}_{m×n}=
    \begin{bmatrix} 
    a_{11} & 0 & \cdots & 0\\\\ 
    0 & a_{22} & \cdots & 0\\\\ 
    \vdots & \vdots & \ddots & \vdots \\\\ 
    0 & \vdots & \vdots & a_{nn} \\\\ 
    \end{bmatrix}
    \\) are diagonal matrices of order 3, 2, 1, and n respectively.
Is a square zero matrix, a diagonal matrix?

##### **Definition 7.8**
A diagonal matrix whose entries along the principal diagonal are equal, is called a
Scalar matrix

That is, a square matrix A = \\([ a_{ij} ]_{n × n}\\)  is said to be a scalar matrix if if
0 if x = \begin{cases}
   a &\text{if } b \\\\
   c &\text{if } d
\end{cases}
where c is a fixed number. For instance,

\\(\begin{bmatrix} 
    \sqrt{2} & 0 & 0\\\\ 
    0 & \sqrt{2} & 0\\\\ 
    0 & 0 & \sqrt{2} \end{bmatrix}\\),\\(\begin{bmatrix} 
    -5 & 0\\\\ 
    0 & -5\end{bmatrix}\\) ,\\(C=\sqrt{3}\\),\\(D=
    \begin{bmatrix} 
    c & 0 & \cdots & 0\\\\ 
    0 & c & \cdots & 0\\\\ 
    \vdots & \vdots & \ddots & \vdots \\\\ 
    0 & \vdots & \vdots & c \\\\ 
    \end{bmatrix}
    \\)  are unit matrices of order 1, 2, 3 and n respectively.

##### **Note 7.1**
Unit matrix is an example of a scalar matrix.
There are two kinds of triangular matrices namely upper triangular and lower triangular matrices.

##### **Definition 7.10**
A square matrix is said to be an upper triangular matrix if all the elements below the main
diagonal are zero.
Thus, the square matrix A = \\([ a_{ij} ]_{n × n}\\) is said to be an upper triangular matrix if \\(a_{ij}=0\\) for all \\(i > j\\).

 For instance,
\\(\begin{bmatrix} 
    4 & 3 & 0\\\\ 
    0 & 7 & 8\\\\ 
    0 & 0 & 2 \end{bmatrix}\\),\\(\begin{bmatrix} 
    -5 & 2\\\\ 
    0 & 1\end{bmatrix}\\) ,\\(D=
    \begin{bmatrix} 
    a_{11} & 0 & \cdots & 0\\\\ 
    0 & a_{22} & \cdots & 0\\\\ 
    \vdots & \vdots & \ddots & \vdots \\\\ 
    0 & 0 & 0 & a_{nn} \\\\ 
    \end{bmatrix}
    \\) 

##### **Definition 7.11**

A square matrix is said to be a lower triangular matrix if all the elements above the main
diagonal are zero.

More precisely, a square matrix A = \\([ a_{ij} ]_{n × n}\\) is said to be a lower triangular matrix if
\\(a_{ij}=0\\) for all \\(i > j\\). For instance,

\\(\begin{bmatrix} 
    2 & 0 & 0\\\\ 
    4 & 1 & 0\\\\ 
    0 & 0 & 0 \end{bmatrix}\\),
    \\(\begin{bmatrix} 
    2 & 0 & 0\\\\ 
    4 & 1 & 0\\\\ 
    8 & -5 & 7 \end{bmatrix}\\) ,\\(\begin{bmatrix} 
    -2 & 0\\\\ 
    9 & -3\end{bmatrix}\\),\\(
    \begin{bmatrix} 
    a_{11} & 0 & \cdots & 0\\\\ 
    0 & a_{22} & \cdots & 0\\\\ 
    \vdots & \vdots & \ddots & \vdots \\\\ 
    0 & 0 & 0 & a_{nn} \\\\ 
    \end{bmatrix}
    \\) are all lower triangular
matrices.

##### **Definition 7.12**
A square matrix which is either upper triangular or lower triangular is called a triangular
matrix.

Observe that a square matrix that is both upper and lower triangular simultaneously will turn out
to be a diagonal matrix.

#### Equality of Matrices

##### **Definition 7.13**
Two matrices \\(A=[a_{ij}]\\) and \\(B=[b_{ij}]\\) are equal (written as A = B) if and only if
(i) both A and B are of the same order
(ii) the corresponding entries of A and B are equal. That is, \\(a_{ij}=b_{ij}\\) for all i and j.

For instance, if
\\(\begin{bmatrix} 
    x & y\\\\ 
    u & v\end{bmatrix}\\)=\\(\begin{bmatrix} 
    2.5 & -1\\\\ 
    \cfrac{1}{\sqrt{2}} & \cfrac{3}{5}\end{bmatrix}\\), then we must have x=
2.5,y= 1,\\(u=\cfrac{1}{\sqrt 2}\\) and \\(v=\cfrac{3}{5}\\).

##### **Definition 7.14**
Two matrices A and B are called unequal if either of condition (i) or (ii) of Definition 7.13 does
not hold.

For instance, \\(\begin{bmatrix} 
    4 & -3\\\\ 
    0 & 8\end{bmatrix}\\) \\(\ne\\) \\(\begin{bmatrix} 
    8 & -5\\\\ 
    0 & 4\end{bmatrix}\\) as the corresponding entries are not equal. Also  \\(\begin{bmatrix} 
    4 & -3\\\\ 
    0 & 8\end{bmatrix}\\) \\(\ne\\) \\(\begin{bmatrix}
    5 & -8\\\\ 
    3 & 4\\\\ 
    6 & 7\end{bmatrix}\\) as the orders are not the same.

 ##### **Example 7.3**

Find x, y, a, and b if \\(\begin{bmatrix} 
    3x+4y & 6 & x-2y\\\\ 
    a+b & 2a-b & -3\end{bmatrix}\\)=\\(\begin{bmatrix} 
    2 & 6 & 4\\\\ 
    5 & -5 & -3\end{bmatrix}\\)

##### **Solution**
As the orders of the two matrices are same, they are equal if and only if the corresponding
entries are equal. Thus, by comparing the corresponding elements, we get
3x+4y=2,x-2y=4,a+b=5, and 2a-b=-5.
Solving these equations, we get x=2,y=-1,a=0,b=5

#### Algebraic Operations on Matrices
Basic operations on matrices are
  (1) multiplication of a matrix by a scalar,
(2) addition/subtraction of two matrices, and
(3) multiplication of two matrices.
There is no concept of dividing a matrix by another matrix and thus, the operation \\(\cfrac{A}{B}\\) , where A
and B are matrices, is not defined.

##### (1) Multiplication of a matrix by a scalar
For a given matrix A = \\([ a_{ij} ]_{m× n}\\) and a scalar k, we define a new matrix kA=\\([b_{ij}]_{m× n}\\) where \\(b_{ij}=ka_{ij}\\) 
for all i and j.

For instance, if \\(\begin{bmatrix} 
    a & b & c\\\\ 
    d & e & f\end{bmatrix}\\)=\\(\begin{bmatrix} 
    ka & kb & kc\\\\ 
    kd & ke & kf\end{bmatrix}\\)

    In particular if k=-1 , we obtain -A = \\([ -a_{ij} ]_{m× n}\\)  . This - A is called negative of the matrix A.
Don’t say -A as a negative matrix.
\\(a_{ij}=0\\) for all \\(i > j\\). For instance,

\\(\begin{bmatrix} 
    2 & 0 & 0\\\\ 
    4 & 1 & 0\\\\ 
    0 & 0 & 0 \end{bmatrix}\\),
    \\(\begin{bmatrix} 
    2 & 0 & 0\\\\ 
    4 & 1 & 0\\\\ 
    8 & -5 & 7 \end{bmatrix}\\) ,\\(\begin{bmatrix} 
    -2 & 0\\\\ 
    9 & -3\end{bmatrix}\\),\\(
    \begin{bmatrix} 
    a_{11} & 0 & \cdots & 0\\\\ 
    0 & a_{22} & \cdots & 0\\\\ 
    \vdots & \vdots & \ddots & \vdots \\\\ 
    0 & 0 & 0 & a_{nn} \\\\ 
    \end{bmatrix}
    \\) are all lower triangular
matrices.

##### **Definition 7.12**
A square matrix which is either upper triangular or lower triangular is called a triangular
matrix.

Observe that a square matrix that is both upper and lower triangular simultaneously will turn out
to be a diagonal matrix.

#### Equality of Matrices

##### **Definition 7.13**
Two matrices \\(A=[a_{ij}]\\) and \\(B=[b_{ij}]\\) are equal (written as A = B) if and only if
(i) both A and B are of the same order
(ii) the corresponding entries of A and B are equal. That is, \\(a_{ij}=b_{ij}\\) for all i and j.

For instance, if
\\(\begin{bmatrix} 
    x & y\\\\ 
    u & v\end{bmatrix}\\)=\\(\begin{bmatrix} 
    2.5 & -1\\\\ 
    \cfrac{1}{\sqrt{2}} & \cfrac{3}{5}\end{bmatrix}\\), then we must have x=
2.5,y= 1,\\(u=\cfrac{1}{\sqrt 2}\\) and \\(v=\cfrac{3}{5}\\).

##### **Definition 7.14**
Two matrices A and B are called unequal if either of condition (i) or (ii) of Definition 7.13 does
not hold.

For instance, \\(\begin{bmatrix} 
    4 & -3\\\\ 
    0 & 8\end{bmatrix}\\) \\(\ne\\) \\(\begin{bmatrix} 
    8 & -5\\\\ 
    0 & 4\end{bmatrix}\\) as the corresponding entries are not equal. Also  \\(\begin{bmatrix} 
    4 & -3\\\\ 
    0 & 8\end{bmatrix}\\) \\(\ne\\) \\(\begin{bmatrix}
    5 & -8\\\\ 
    3 & 4\\\\ 
    6 & 7\end{bmatrix}\\) as the orders are not the same.

 ##### **Example 7.3**

Find x, y, a, and b if \\(\begin{bmatrix} 
    3x+4y & 6 & x-2y\\\\ 
    a+b & 2a-b & -3\end{bmatrix}\\)=\\(\begin{bmatrix} 
    2 & 6 & 4\\\\ 
    5 & -5 & -3\end{bmatrix}\\)

##### **Solution**
As the orders of the two matrices are same, they are equal if and only if the corresponding
entries are equal. Thus, by comparing the corresponding elements, we get
3x+4y=2,x-2y=4,a+b=5, and 2a-b=-5.
Solving these equations, we get x=2,y=-1,a=0,b=5

#### Algebraic Operations on Matrices
Basic operations on matrices are
  (1) multiplication of a matrix by a scalar,
(2) addition/subtraction of two matrices, and
(3) multiplication of two matrices.
There is no concept of dividing a matrix by another matrix and thus, the operation \\(\cfrac{A}{B}\\) , where A
and B are matrices, is not defined.

##### (1) Multiplication of a matrix by a scalar
For a given matrix A = \\([ a_{ij} ]_{m× n}\\) and a scalar k, we define a new matrix kA=\\([b_{ij}]_{m× n}\\) where \\(b_{ij}=ka_{ij}\\) 
for all i and j.

For instance, if \\(\begin{bmatrix} 
    a & b & c\\\\ 
    d & e & f\end{bmatrix}\\)=\\(\begin{bmatrix} 
    ka & kb & kc\\\\ 
    kd & ke & kf\end{bmatrix}\\)

    In particular if k=-1 , we obtain -A = \\([ -a_{ij} ]_{m× n}\\)  . This - A is called negative of the matrix A.
Don’t say -A as a negative matrix.

##### (2) Addition and Subtraction of two matrices
If A and B are two matrices of the same order, then their sum denoted by A + B, is again a matrix
of same order, obtained by adding the corresponding entries of A and B.

More precisely, if A = \\([ a_{ij} ]_{m× n}\\)  and B= \\([ b_{ij} ]_{m× n}\\)  are two matrices, then the sum A + B of A and B is
a matrix given by

A+B = \\([ c_{ij} ]_{m× n}\\) where \\(c_0 =a_{ij}+b_{ij}\\) for all i and j.

Similarly subtraction A - B is defined as A-B=A+(-B).

That is A-B=\\([ d_{ij} ]_{m× n}\\) where \\(d_{ij}=a_{ij}-b_{ij} \\) \\(\forall \\) denotes for every or for
all).

##### **Note 7.2**
(i) If A and B are not of the same order, then A + B and A - B are not defined.
(ii) The addition and subtraction can be extended to any finite number of matrices.

##### **Example 7.4**
Compute A + B and A - B if
\\(\begin{bmatrix} 
    4 & \sqrt{5} & 7\\\\ 
    -1 & 0 & 0.5\end{bmatrix}\\)=\\(\begin{bmatrix} 
    \sqrt{3} & \sqrt{5} & 7.3\\\\ 
    1 & -\cfrac{1}{3} & \cfrac{1}{4}\end{bmatrix}\\)

##### Solution
By the definitions of addition and subtraction of matrices, we have
\\(A+B=\begin{bmatrix} 
    4+\sqrt{3} & 2\sqrt{5} & 14.3\\\\ 
    0 & \cfrac{1}{3} & \cfrac{3}{4}\end{bmatrix}\\)=\\(\begin{bmatrix} 
    4-\sqrt{3} & 0 & -0.3\\\\ 
    -2 & \cfrac{1}{3} & \cfrac{1}{4}\end{bmatrix}\\)

##### **Example 7.5**
Find the sum A + B + C if A, B, C are given by
\\(A=\begin{bmatrix} 
    sin^2 \theta & 1 \\\\ 
    cot^2 \theta & 0 \end{bmatrix}\\)=\\(B=\begin{bmatrix} 
    cos^2 \theta & 0\\\\ 
    -cosec^2 \theta & 1 \end{bmatrix}\\) and \\(C=\begin{bmatrix} 
    0  & -1 \\\\ 
    -1  & 0 \end{bmatrix}\\)

##### Solution
By the definition of sum of matrices, we have
\\(A+B+C=\begin{bmatrix} 
    sin^2 \theta+cos^2 \theta+0 & 1+0-1\\\\ 
    cot^2 \theta-cosec^2 \theta  & 0+1+0\end{bmatrix}\\)=\\(A+B+C=\begin{bmatrix} 
    1 & 0\\\\ 
    -2  & 1\end{bmatrix}\\)

##### **Example 7.6**
Determine 3B + 4C - D if B, C, and D are given by
\\(B=\begin{bmatrix} 
    2 & 3 & 0 \\\\ 
    1 & -1 & 5 \end{bmatrix}\\)=\\(C=\begin{bmatrix} 
    -1 & -2 & 3\\\\ 
    -1 & 0 & 2 \end{bmatrix}\\) and \\(D=\begin{bmatrix} 
    0  & 4 & 1 \\\\ 
    5  & 6 & -5\end{bmatrix}\\)

##### Solution
By the definition of sum of matrices, we have
\\(3B + 4C - D=\begin{bmatrix} 
    6 & 9 & 0 \\\\ 
    3 & -3 & 15 \end{bmatrix}\\)+\\(\begin{bmatrix} 
    --4 & -8 & 12\\\\ 
    -4 & 0 & 8 \end{bmatrix}\\)-\\(\begin{bmatrix} 
    0  & 4 & 1 \\\\ 
    5  & 6 & -5\end{bmatrix}\\)=\\(\begin{bmatrix} 
    2  & -3 & 13 \\\\ 
    -6  & -9 & 28\end{bmatrix}\\)

##### **Example 7.7**
Simplify :
\\(sec \theta \begin{bmatrix} 
    sec \theta & tan \theta \\\\ 
    sec \theta & sec \theta \end{bmatrix}\\)-\\(tan \theta \begin{bmatrix} 
    cos^2 \theta & 0\\\\ 
    -cosec^2 \theta & 1 \end{bmatrix}\\) and \\(C=\begin{bmatrix} 
    0  & -1 \\\\ 
    -1  & 0 \end{bmatrix}\\)

##### Solution
By the definition of sum of matrices, we have
\\(A+B+C=\begin{bmatrix} 
    sin^2 \theta+cos^2 \theta+0 & 1+0-1\\\\ 
    cot^2 \theta-cosec^2 \theta  & 0+1+0\end{bmatrix}\\)=\\(A+B+C=\begin{bmatrix} 
    1 & 0\\\\ 
    -2  & 1\end{bmatrix}\\)