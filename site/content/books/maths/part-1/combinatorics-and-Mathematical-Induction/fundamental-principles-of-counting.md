---
title: 'Fundamental principles of counting'
date: 2018-11-14T19:02:50-07:00
draft: false
weight: 2
extensions:
    - katex

---




1.
Fundamental principles of counting
The Sum Rule Let us consider two tasks which need to be completed. If the first task can be completed in M different ways and the second in N different ways, and if these cannot be performed simultaneously, then there are M + N ways of doing either task. This is the sum rule of counting.
 
Example 4.1 Suppose one girl or one boy has to be selected for a competition from a class comprising 17 boys and 29 girls. In how many different ways can this selection be made?
Solution:
The first task of selecting a girl can be done in 29 ways. The second task of selecting a boy can be done in 17 ways. It follows from the sum rule, that there are 17+29 = 46 ways of making this selection.
 The sum rule may be extended to more than two tasks. Thus if there are n non-simultaneous tasks T1, T2, T3, · · · , Tn which can be performed in m1, m2, · · · , mn ways respectively, then thenumberofwaysofdoingoneofthesetasksism1 +m2 +···+mn.
 2.
The Product Rule Let us suppose that a task comprises of two procedures. If the first procedure can be completed in M different ways and the second procedure can be done in N different ways after the first procedure is done, then the total number of ways of completing the task is M × N
Example 4.2 Consider the 3 cities Chennai, Trichy and Tirunelveli. In order to reach Tirunelveli from Chennai, one has to pass through Trichy. There are 2 roads connecting Chennai with Trichy and there are 3 roads connecting Trichy with Tirunelveli. What are the total number of ways of travelling from Chennai to Tirunelveli?
Combinatorics and Mathematical Induction
156
www.tntextbooks.in
     Solution:
There are 2 roads connecting Chennai to Trichy. Suppose these are R1 and R2. Further there are 3 roads connecting Trichy to Tirunelveli . Let us name them as S1,S2 and S3. Suppose a person chooses R1 to travel from Chennai to Trichy and may further choose any of the 3 roads S1, S2 or S3 to travel from Trichy to Tirunelveli. Thus the possible road choices are (R1, S1), (R1, S2), (R1, S3). Similarly, if the person chooses R2 to travel from Chennai to Trichy, the choices would be (R2, S1), (R2, S2), (R2, S3).
R1 S1
S2
CH TR TV
   R2
S3
Thus there are 2 × 3 = 6 ways of travelling from Chennai to Tirunelveli.
Figure 4.1
  An extension of the product rule may be stated as follows:
If a task comprises of n procedures P1, P2, P3, · · · , Pn which can be performed in m1, m2, · · · , mn ways respectively, and procedure Pi can be done after procedures P1, P2, P3, · · · , Pi−1 are done, then the number of ways of completing the task is m1 ×m2 ×···×mn.
 3. The Inclusion-Exclusion Principle Suppose two tasks A and B can be performed simulta- neously. Let n(A) and n(B) represent the number of ways of performing the tasks A and B independent of each other. Also let n(A ∩ B) be the number of ways of performing the two tasks simultaneously. We cannot use the sum rule to count the number of ways of performing one of the tasks as that would lead to over counting. To obtain the correct number of ways we add the number of ways of performing each of the two tasks and then subtract the number of ways of doing both tasks simultaneously. This method is referred to as the principle of inclusion - exclusion. Using the notation of set theory we write it as
n(A ∪ B) = n(A) + n(B) − n(A ∩ B).
Suppose we have to find the number of positive integers divisible by 2 or 7 (but not both), upto 1000. Let n(A) denote the number of integers divisible by 2, n(B) denote the number of integers divisible by 7 and n(A ∩ B) the number of integers divisible by both 2 and 7. Then the number of positive integers divisible by 2 or 7 is given by
n(A ∪ B) = n(A) + n(B) − n(A ∩ B) = 500 + 142 − 71 = 571.
(Note that n(A) will include all multiples of 2 upto 1000, n(B) will include all multiples of 7 upto
1000 and so on.)
Tree Diagrams: Tree diagrams are often helpful in representing the possibilities in a counting problem. Typically in a tree the branches represent the various possibilities. For example, suppose a person wants to buy a Car for the family. There are two different branded cars and five colours are available for each brand. Each colour will have three different variant on it namely GL,SS,SL. Then the various choices for choosing a car can be represented through a tree diagram as follows:
157 4.2 Fundamental principles of counting

www.tntextbooks.in
My New Car
GL SS SL GL SS SL GL SS SL GL SS SL GL SS SL GL SS SL GL SS SL GL SS SL GL SS SL GL SS SL
Figure 4.2
We shall now illustrate the different rules described above through examples
              Example 4.3 A School library has 75 books on Mathematics, 35 books on Physics. A student can choose only one book. In how many ways a student can choose a book on Mathematics or Physics?
Solution:
(i) A student can choose a Mathematics book in “75” different ways. (ii) A student can choose a Physics book in “35” different ways.
Hence applying the Rule of Sum, the number of ways a student can choose a book is 75+35 = 110.
 Now we shall discuss the problem stated in our introduction.
     Example 4.4 If an electricity consumer has the consumer number say 238:110: 29, then describe the linking and count the number of house connections upto the 29th consumer connection linked to the larger capacity transformer number 238 subject to the condition that each smaller capacity transformer can have a maximal consumer link of say 100.
Solution:
The following figure illustrates the electricity distribution network.
Transmission System Monitoring & Control Disribution System
Substation
Figure 4.3
There are 110 smaller capacity transformers attached to a larger capacity transformer. As each smaller capacity transformer can be linked with only 100 consumers, we have for the 109 transformers, there will be 109 × 100 = 10900 links. For the 110th transformer there are only 29 consumers linked. Hence, the total number of consumers linked to the 238th larger capacity transformer is 10900 + 29 = 10929.
                          Combinatorics and Mathematical Induction
158

www.tntextbooks.in
     Example 4.5 A person wants to buy a car. There are two brands of car available in the market and each brand has 3 variant models and each model comes in five different colours as in Figure 4.2 In how many ways she can choose a car to buy?
Solution:
A car can be bought by choosing a brand, then a variant model, and then a colour. A brand can be chosen in 2 ways; a model can be chosen in 3 ways and a colour can be chosen in 5 ways. By the rule of product the person can buy a car in 2 × 3 × 5 = 30 different ways.
      Example 4.6 A Woman wants to select one silk saree and one sungudi saree from a textile shop located at Kancheepuram. In that shop, there are 20 different varieties of silk sarees and 8 different varieties of sungudi sarees. In how many ways she can select her sarees?
Solution:
The work is done when she selects one silk saree and one sungudi saree. The Woman can select a silk saree in 20 ways and sungudi saree in 8 ways. By the rule of product, the total number of ways of selecting these 2 sarees is 20 × 8 = 160.
      Example 4.7 In a village, out of the total number of people, 80 percentage of the people own Coconut groves and 65 percent of the people own Paddy fields. What is the minimum percentage of people own both?
Solution:
Let n(C) denote the percentage of people who own the Coconut groves and n(P) denote the percentage of people who own Paddy fields. We are given n(C) = 80 and n(P) = 65. By the rule of inclusion - exclusion n(C ∩ P) = n(C) + n(P) − n(C ∪ P) . The maximum value of n(C ∪ P ) is 100. Therefore, the minimum value of n(C ∩ P ) is 80 + 65 − 100 = 45. That is, the minimum percentage of the people who own both is 45.
  In the next problem, we use the notion of a ’string’. A string is formed by writing given letters one by one in a sequence. For instance, strings of length three formed out of the letters a,b,c & d are aaa, abb, bda, dca, cdd · · · .
     Example 4.8
(i) Find the number of strings of length 4, which can be formed using the letters of the word BIRD, without repetition of the letters.
(ii) How many strings of length 5 can be formed out of the letters of the word PRIME taking all the letters at a time without repetition.
Solution:
(i) There are as many strings as filling the 4 vacant places by the 4 letters, keeping in mind that repetition is not allowed. The first place can be filled in 4 different ways by any one of the letters B,I,R,D. Following which, the second place can be filled in by any one of the remaining 3 letters in 3 different ways, following which the third place can be filled in 2 different ways, following which fourth place can be filled in 1 way.
 159 4.2 Fundamental principles of counting

Observe the similarity between the above two cases.
www.tntextbooks.in
     Thus the number of ways in which the 4 places can be filled, by the rule of product is
4 × 3 × 2 × 1 = 24. Hence, the required number of strings is 24.
(ii) There are 5 different letters with which 5 places are to be filled. The first place can be filled
in 5 ways as any one of the five letters P,R,I,M,E can be placed there. Having filled the first place with any of the 5 letters, 4 letters are left to be placed in the second place, three letters are left for the third place and 2 letters are left to be put in the fourth place. The remaining 1 letter has to be placed in the fifth place.
Hence, the total number of ways filling up five places is 5 × 4 × 3 × 2 × 1 = 120.
       Example 4.9 How many strings of length 6 can be formed using letters of the word FLOWER if (i) either starts with F or ends with R?
(ii) neither starts with F nor ends with R?
Solution:
In any such string, each of the letters F,L,O,W,E,R is used exactly once.
(i) If such a string starts with F, then the other five positions are to be filled with the letters L, O, W, E, R.
As there cannot be any repetition of let- ters in the formation of the strings we can fill up the 2nd, 3rd, 4th, 5th and 6th places in 5, 4, 3, 2 and 1 ways.
Hence, by the rule of product, the number of strings of length 6 starting with F is equal to 5 × 4 × 3 × 2 × 1 = 120.
If such a string ends with R, then the other five positions are to be filled with the letters F,L,O,W,E.
As in the previous case, we conclude that the number of strings of length ending with R is 120.
If a string starts with F and also ends with
R, then the other 4 positions are to be filled
Figure 4.4
Figure 4.5
Figure 4.6
with letters L, O, W, E.
As in the previous cases, the number of strings of length of 6 starting with F and ending
with R is 4 × 3 × 2 × 1 = 24.
By the principle of inclusion - exclusion, the number of strings of length 6, either starting
with F or ending with R is 120 + 120 − 24 = 216.
(ii) A string that neither starts with F nor ends with R is one which has not been counted in
(i). Together, they account for all possible strings of length 6 formed out of the letters, F,L,O,W,E,R, where no letter is repeated.
Now, the number of all such strings is formed by filling the first position by any of the 6 letters, the second by any of the remaining 5 letters and so on. That is, there are in total 6 × 5 × 4 × 3 × 2 × 1 = 720 such strings. The number of words neither starting with F nor ending with R is the same as the difference between total number of letter strings and the number of strings either starting with F or end with R which is 720 − 216 = 504.
 Combinatorics and Mathematical Induction
160

www.tntextbooks.in
     Example 4.10 How many licence plates may be made using either two distinct letters followed by four digits or two digits followed by 4 distinct letters where all digits or letters are distinct?
Solution:
Here we have two cases:
Case 1: The number of licence plates having two letters followed by four digits is 26 × 25 × 10 × 9 × 8 × 7 = 32, 76, 000.
Case 2: The number of licence plates having two digits followed by four letters is
10 × 9 × 26 × 25 × 24 × 23 = 3, 22, 92, 000.
Since either case 1 or case 2 is possible, the total number of licence plates is (26 × 25 × 10 × 9 × 8 × 7) + (10 × 9 × 26 × 25 × 24 × 23) = 3, 55, 68, 000.
     Example 4.11 Count the number of positive integers greater than 7000 and less than 8000 which are divisible by 5, provided that no digits are repeated.
Solution:
It should be a 4-digit number greater than 7000 and less than 8000. Then the 1000th place will be the digit 7. Further, as the number must be divisible by 5 the unit place should be either 0 or 5.
Figure 4.7
 As repetition is not permitted, the 100th place can be filled in 8 ways using remaining numbers and 10th place can be filled in 7 ways.
Hence, the required number of numbers is 1 × 8 × 7 × 2 = 112.
       Example 4.12 How many 4 - digit even numbers can be formed using the digits 0, 1, 2, 3 and 4, if repetition of digits are not permitted?
Solution:
There are two conditions as follows:
1. It is 4-digit number and hence its 1000th place cannot be 0.
2. It is an even number and hence its unit place can be either 0, 2 or 4.
Two cases arise in this situation. Either 0 in the unit place or not.
 Case 1.
Case 2.
When the unit place is filled by 0, then the 1000th place can be filled in 4 ways, 100th place can be filled in 3 ways and 10th place in 2 ways. Therefore, number of 4-digit numbers having 0 at unit place is
4 × 3 × 2 × 1 = 24.
When the unit place is filled with non-zero numbers, that is 2 or 4, the number of ways is 2, the number of ways of filling the 1000th place is in 3 ways (excluding ’0’), 100th place in 3 ways and 10th place in 2 ways. Therefore, number of 4-digit numbers without 0 at unit place is 3 × 3 × 2 × 2 = 36.
Figure 4.8
Figure 4.9
 Hence, by the rule of sum, the required number of 4 digit even numbers is 24+36 = 60.
 161 4.2 Fundamental principles of counting

www.tntextbooks.in
     Example 4.13 Find the total number of outcomes when 5 coins are tossed once.
Solution:
When a coin is tossed, the outcomes are in two ways which are {H ead, T ail}. By the rule of product rule, the number of outcomes when 5 coins are tossed is 2×2×2×2×2=25 =32.
  More generally, if n coins are tossed then the number of outcomes is 2n.
     Example 4.14 In how many ways (i) 5 different balls be distributed among 3 boxes? (ii) 3 different balls be distributed among 5 boxes?
Solution:
(i) Each ball can be placed into any one of the three boxes in 3 different ways. Therefore, by rule of product, the number of ways of distributing 5 different balls among three boxes is 3×3×3×3×3=35 =243.
(ii) Each ball can be placed into any one of the five boxes in 5 different ways. Therefore, by rule of product, the number of ways of distributing 3 different balls among five boxes is 5×5×5=53 =125.
  In order to avoid confusions, take the objects(balls) and distribute them in places(boxes). More generally, if n different objects are to be placed in m places, then the number of ways of placing is mn.
     Example 4.15 There are 10 bulbs in a room. Each one of them can be operated independently. Find the number of ways in which the room can be illuminated.
Solution:
Each of the 10 bulbs are operated independently means that each bulb can be operated in two ways. That is in off mode or on mode. The total number of doing this are 210 which includes the case in which 10 bulbs are off. Keeping all 10 bulbs in “off” mode, the room cannot be illuminated. Hence, thetotalnumberofwaysare210 −1=1024−1=1023.
 Another concept which is an essential tool in a counting process which is stated as follows:
 The Pigeonhole Principle:
 Suppose a flock of pigeons fly into a set of pigeonholes. If there are more pigeons than pigeonholes then there must be at least one pigeonhole with at least two pigeons in it. A generalised form of this may be applied to other objects and situations as well.
If k + 1 or more objects are placed in k boxes, then there is at least one box containing two or more of the objects.
Here are some examples.
1. In any group of 27 English words, there must be at least two words which begin with the same letter (since there are only 26 letters in the English alphabet).
2. If six meetings are held on weekdays only, then there must be at least two meetings held on the same day.
Combinatorics and Mathematical Induction
162

Observe that,
1! = 1
2! = 2×1=2
3! = 3×2×1=6
4! = 4×3×2×1=24
5! = 5×4×3×2×1=120 ... = ...
22! = 22×21×20×···×3×2×1
=1124000727777607680000
www.tntextbooks.in
In order to understand the Permutation and Combinations we need a concept called “Factorials” which will be discussed in the next section.
 

