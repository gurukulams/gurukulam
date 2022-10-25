---
title: 'electromagnetic_induction_and_alternating_current'
date: 2018-11-14T19:02:50-07:00
draft: false
weight: 1
extensions:
    - katex
---


{{<box title = "Learning Objectives">}}

**In this unit, the student is exposed to** 

- the phenomenon of electromagnetic induction

- the application of Lenz’s law to find the direction of induced emf

- the concept of Eddy current and its uses

- the phenomenon of self-induction and mutual-induction

- the various methods of producing induced emfs

- the construction and working of AC generators

- the principle of transformers and its role in long distance power communication

- the notion of root mean square value of alternating current

- the idea of phasors and phase relationships in different AC circuits

- the insight about power in an AC circuit and wattless current

- the understanding of energy conservation during LC oscillations

{{</box>}}

### 4.1 ELECTROMAGNETIC INDUCTION

#### 4.1.1 Introduction

In the previous chapter, we have learnt
that whenever an electric current flows
through a conductor, it produces a magnetic
field around it. This was discovered by
Christian Oersted. Later, Ampere proved
that a current-carrying loop behaves like a
bar magnet. These are the magnetic effects
produced by the electric current.

Physicists then began to think of the
converse effect. Is it possible to produce an
electric current with the help of a magnetic
field? A series of experiments were
conducted to establish the converse effect.
These experiments were done by Michael
Faraday of UK and Joseph Henry of USA,
almost simultaneously and independently.
These attempts became successful and
led to the discovery of the phenomenon,
called Electromagnetic Induction. Michael
Faraday is credited with the discovery of
electromagnetic induction in 1831. 

In this chapter, let us see a few
experiments of Faraday, the results and the
phenomenon of Electromagnetic Induction.
Before that, we will recollect the concept of
magnetic flux linked with a surface area.

{{<box title = "An anecdote!">}}

Michael Faraday was enormously
popular for his lectures as well. In
one of his lectures, he demonstrated
his experiments which led to
the discovery of electromagnetic
induction.

At the end of the lecture, one
member of the audience approached
Faraday and said, “Mr. Faraday, the
behaviour of the magnet and the coil
of wire was interesting, but what is the
use of it?”  Faraday answered politely,
“Sir, what is the use of a newborn
baby?”

**Note**: We will soon see the greatness
of ‘that little child’ who has now
grown as an adult to cater to the
energy needs.

{{</box>}}

#### 4.1.2 Magnetic Flux (\\(\Phi_B\\))

The magnetic flux \\(\Phi_B\\) through an area A
in a magnetic field is defined as the number
of magnetic field lines passing through that
area normally and is given by the equation
(Figure 4.1(a)).

\\(\Phi_B = \int_A \overrightharpoon{B}.\overrightharpoon{dA}\\)


where the integral is taken over the area
A and θ is the angle between the direction of
the magnetic field and the outward normal
to the area. 

**figure 4.1**

If the magnetic field \overrightharpoon{B}
 is uniform over
the area A and is perpendicular to the area
as shown in Figure 4.1(b), then the above
equation becomes 

\\(\Phi_B = \int_A \overrightharpoon{B}.\overrightharpoon{dA} = BA cos \theta \\)


\\(=BA since \theta = 0° , cos0° = 1 \\)

The SI unit of magnetic flux is \\(T m^2\\)
. It is also measured in weber or \\(Wb\\).

\\(1 Wb = 1 T m^2\\)

### EXAMPLE 4.1

A circular antenna of area \\(3 m^2\\)
 is installed
at a place in Madurai. The plane of the
area of antenna is inclined at  \\(47°\\)
 with the
direction of Earth’s magnetic field. If the
magnitude of Earth’s field at that place is
\\(4.1 × 10^{–5} T\\) find the magnetic flux linked
with the antenna.

**Solution**

\\(B = 4.1 × 10^{–5} T; \theta = 90° – 47° = 43°;\\) 

\\(A = 3m^2\\)

\\(We know that \phi_B = BA cos \theta \\)

\\(\phi_B = 4.1 × 10^{–5} × 3 × cos 43°\\)

\\(= 4.1 × 10^{–5} × 3 × 0.7314\\)

\\(= 89.96 \mu Wb\\)

### EXAMPLE 4.2

A circular loop of area \\(5 \times 10^{–2} m^2\\)
 rotates
in a uniform magnetic field of \\(0.2 T.\\)
If the loop rotates about its diameter which
is perpendicular to the magnetic field as
shown in figure. Find the magnetic flux
linked with the loop when its plane is
(i) normal to the field (ii) inclined 60o
 to
the field and (iii) parallel to the field.


**figure**

**Solution**

\\(A = 5 \times 10^{–2} m^2; B = 0.2 T\\)

\\((i) θ = 0°;\\)

\\(\phi_B = BA cos \theta = 0.2 \times 5 \times 10^{-2} \times cos0°\\)

\\(\phi_B = 1 \times 10^{-3} Wb\\)

\\((ii) θ = 90° – 60° = 30° ;\\)

\\(\phi_B = BA cos \theta = 0.2 \times 5 \times 10^{-2} \times cos30°\\)

\\(\phi_B = 1 \times 10^{-2} \times \frac{\sqrt{3}}{2} = 8.66 \times 10^{-3} Wb\\)

\\((iii) θ = 90°;\\)

\\(\phi_B = BA cos 90° = 0\\)

#### 4.1.3 Faraday’s Experiments on Electromagnetic Induction

**First Experiment**

Consider a closed circuit consisting of a
coil \\(C\\) of insulated wire and a galvanometer
\\(G\\) (Figure 4.2(a)). The galvanometer does
not indicate deflection as there is no electric
current in the circuit.

When a bar magnet is inserted into the
stationary coil, with its north pole facing the
coil, there is a momentary deflection in the
galvanometer. This indicates that an electric
current is set up in the coil (Figure 4.2(b)).
If the magnet is kept stationary inside the coil, the galvanometer does not indicate
deflection (Figure 4.2(c)). 

**figure**

The bar magnet is now withdrawn from
the coil, the galvanometer again gives a
momentary deflection but in the opposite
direction. So the electric current flows in
opposite direction (Figure 4.2(d)). Now if
the magnet is moved faster, it gives a larger
deflection due to a greater current in the
circuit (Figure 4.2(e)).

The bar magnet is reversed i.e., the south
pole now faces the coil. When the above
experiment is repeated, the deflections are
opposite to that obtained in the case of north
pole (Figure 4.2(f)).

If the magnet is kept stationary and the
coil is moved towards or away from the coil,
similar results are obtained. It is concluded
that whenever there is a relative motion
between the coil and the magnet, there is
deflection in the galvanometer, indicating
the electric current setup in the coil.

**Second Experiment**

Consider two closed circuits as shown
in Figure 4.3(a). The circuit consisting of a
coil \\(P\\), a battery \\(B\\) and a key \\(K\\) is called as
primary circuit while the circuit with a coil S
and a galvanometer \\(G\\) is known as secondary
circuit. The coils \\(P\\) and \\(S\\) are kept at rest in
close proximity with respect to one another.

If the primary circuit is closed, electric
current starts flowing in the primary circuit.
At that time, the galvanometer gives a
momentary deflection (Figure 4.3(a)).

After that, when the electric current
reaches a certain steady value, no deflection
is observed in the galvanometer.

Likewise if the primary circuit is broken,
the electric current starts decreasing and
there is again a sudden deflection but in
the opposite direction (Figure 4.3(b)). 

**figure 4.3**

When the electric current becomes zero, the
galvanometer shows no deflection.

From the above observations, it is
concluded that whenever the electric
current in the primary circuit changes, the
galvanometer shows a deflection.

**Faraday’s Law of Electromagnetic Induction**

From the results of his experiments,
Faraday realized that

**whenever the magnetic flux linked with a closed coil changes, an emf (electromotive force) is induced and hence an electric current flows in the circuit. This current is called an induced current and the emf giving rise to such current is called an induced emf. This phenomenon is known as electromagnetic induction.**

**figure 4.4**

Based on this idea, Faraday’s experiments
are understood in the following way. In the
first experiment, when a bar magnet is placed
close to a coil, some of the magnetic field
lines of the bar magnet pass through the coil
i.e., the magnetic flux is linked with the coil.
When the bar magnet and the coil approach
each other, the magnetic flux linked with the
coil increases. So this increase in magnetic
flux induces an emf and hence a transient
electric current flows in the circuit in one
direction (Figure 4.4(a)). 

At the same time, when they recede away
from one another, the magnetic flux linked
with the coil decreases. The decrease in
magnetic flux again induces an emf in opposite direction and hence an electric current flows
in opposite direction (Figure 4.4(b)). So there
is deflection in the galvanometer when there
is a relative motion between the coil and the
magnet.

In the second experiment, when the
primary coil P carries an electric current, a
magnetic field is established around it. The
magnetic lines of this field pass through
itself and the neighbouring secondary coil \\(S\\).

When the primary circuit is open, no
electric current flows in it and hence the
magnetic flux linked with the secondary
coil is zero (Figure 4.5(a)).

However, when the primary circuit is
closed, the increasing current builds up a magnetic field around the primary coil.
Therefore, the magnetic flux linked with the
secondary coil increases. This increasing flux
linked induces a transient electric current in
the secondary coil (Figure 4.5(b)). When the
electric current in the primary coil reaches a
steady value, the magnetic flux linked with
the secondary coil does not change and the
electric current in the secondary coil will
disappear.

**figure 4.5**

Similarly, when the primary circuit is
broken, the decreasing primary current 
Similarly, when the primary circuit is
broken, the decreasing primary current.

The conclusions of Faraday’s experiments
are stated as two laws.

**First law**

**Whenever magnetic flux linked with a closed circuit changes, an emf is induced in the circuit which lasts in the circuit as long as the magnetic flux is changing.**

**Second law**

**The magnitude of induced emf in a**
**closed circuit is equal to the time rate**
**of change of magnetic flux linked with**
**the circuit.**

If the magnetic flux linked with each
turn of the coil changes by \\(dΦB\\) in a time
dt, then the induced emf in each turn is
given by 

\\(\varepsilon = \frac{d\phi_B}{dt}\\)

If a coil consisting of N turns is tightly
wound such that each turn covers the same
area, then the flux through each turn will be
the same. Then total emf induced in the coil
is given by

\\(\varepsilon = N \frac{d(\phi_B)}{dt}\\)

\\(\varepsilon = \frac{d(N \phi_B)}{dt}\\)

Here \\(NΦB\\) is called flux linkage, defined
as the product of number of turns N of the
coil and the magnetic flux linking each turn
of the coil \\(ΦB\\).

{{<box title = "Importance of Electromagnetic Induction!">}}

The application of the phenomenon
of Electromagnetic Induction is almost
everywhere in the present day life. Right
from home appliances to huge factory
machineries, from cellphone to computers
and internet, from electric guitar to satellite
communication, all need electricity for
their operation. There is an ever growing
demand for electric power.

All these are met with the help of
electric generators and transformers which
function on electromagnetic induction.
The modern, sophisticated human
life would not be possible without the
discovery of electromagnetic induction.

{{</box>}}

{{<box title = "ACTIVITY">}}

Exploring Electromagnetic Induction

**figure**

Make a circuit containing a coil of
insulated wire wound around soft hollow
core and a galvanometer as shown in
Figure. It is better to use a thin wire for
the coil so that we can wind many turns
in the available space. Perform the steps
described in first experiment of Faraday
with the help of a strong bar magnet.
Students will get hands-on experience
about electromagnetic induction.

{{</box>}}

#### EXAMPLE 4.3

A cylindrical bar magnet is kept along the
axis of a circular solenoid. If the magnet is
rotated about its axis, find out whether an
electric current is induced in the coil.

**Solution**

The magnetic field of a cylindrical magnet is
symmetrical about its axis. As the magnet is
rotated along the axis of the solenoid, there is
no induced current in the solenoid because
the flux linked with the solenoid does not
change due to the rotation of the magnet.








































