---
title: 'Current Electricity'
date: 2018-11-14T19:02:50-07:00
draft: false
weight: 2
extensions:
    - katex
---





{{< box title=" learning objectives" type="objective">}}


**In this unit, the student is exposed to**

• Flow of charges in a metallic conductor

• Ohm’s law, electrical resistance, V-I characteristics

• Carbon resistors and combination of resistors

• Kirchhoff ’s laws - Wheatstone’s bridge and its applications

• Electric power and Electric energy

• Heating effect - Joule’s law – applications

• Thermoelectric effects – Seebeck effect – Peltier effect – Thomson effect

{{< /box >}}


**INTRODUCTION**


![lesson 1](/books/12-physics/unit2/py2.1.png )


In unit 1, we studied the properties of charges
when they are at rest. In reality, the charges
are always moving within the materials. For
example, the electrons in a copper wire are
never at rest and are continuously in random
motion. Therefore it is important to analyse the
behaviour of charges when they are in motion.
The motion of charges constitutes ‘electric
current’. Current electricity is the study of flow of
electric charges. It owes its origin to Alessandro
Volta (1745-1827), who invented the electric
battery which produced the first steady flow of
electric current. Modern world depends heavily
on the use of electricity. It is used to operate
machines, communication systems, electronic
devices, home appliances etc., In this unit, we
will study about the electric current, resistance
and related phenomenon in materials.




**ELECTRIC CURRENT**

Matter is made up of atoms. Each atom
consists of a positively charged nucleus with
negatively charged electrons moving around
the nucleus. Atoms in metals have one or
more electrons which are loosely bound to the
nucleus. These electrons are called free electrons
and can be easily detached from the atoms. The
substances which have an abundance of these
free electrons are called conductors. These
free electrons move randomly throughout
the conductor at a given temperature. In
general due to this random motion, there is
no net transfer of charges from one end of the conductor to other end and hence no current
in the conductor. When a potential difference
is applied by the battery across the ends of the
conductor, the free electrons drift towards the
positive terminal of the battery, producing a net
electric current. This is easily understandable
from the analogy given in the Figure 2.1.

In the XI Volume 2, unit 6, we studied,
that the mass move from higher gravitational
potential to lower gravitational potential.
Likewise, positive charge flows from region
of higher electric potential to region of lower
electric potential and negative charge flows
from region of lower electric potential to
region of higher electric potential. So battery
or electric cell simply creates potential
difference across the conductor.


![lesson 1](/books/12-physics/unit2/py2.2.png )


The electric current in a conductor is
defined as the rate of flow of charges through
a given cross-sectional area A. It is shown in
the Figure 2.2.


![lesson 1](/books/12-physics/unit2/py2.3.png )

**If a net charge Q passes through any cross section of a conductor in time t, then the current is defined as**  \\(I=\frac{Q}{t}\\) . But charge
flow is not always constant. Hence current
can more generally be defined as 

 \\( I_{avg}=\cfrac{\Delta{Q}}{\Delta{t}}\\)   ----(2.1)


 Where ∆Q is the amount of charge that
passes through the conductor at any cross
section during the time interval ∆t. If the
rate at which charge flows changes with time,
the current also changes. The instantaneous
current I is defined as the limit of the average
current, as \\({\Delta}{t}{\rarr}{0}\\)

\\(I = {lim_{\substack{\Delta}{t}{\rarr}{0}}\cfrac{\Delta{Q}}{\Delta{t}}=\cfrac{dQ}{dt}}\\)
**check above eqn**


The SI unit of current is the **ampere** (A)

\\(1A = \cfrac{1C}{1s}\\)

That is, 1A of current is equivalent to
1 coulomb of charge passing through a
perpendicular cross section in a conductor
in one second. The electric current is a
scalar quantity.

{{< box title=" EXAMPLE 2.1" type="objective">}}
Compute the current in the wire if a charge
of 120 C is flowing through a copper wire
in 1 minute.

**Solution**

The current (rate of flow of charge) in the
wire is

\\(I=\frac{Q}{t}=\frac{120}{60}=2A\\)
{{< /box >}}


**2.1.1 Conventional Current**

![lesson 1](/books/12-physics/unit2/py2.4.png )



In an electric circuit, arrow heads are used
to indicate the direction of flow of current. By
convention, this flow in the circuit should be
from the positive terminal of the battery to
the negative terminal. This current is called
the conventional current or simply current
and is in the direction in which a positive
test charge would move. In typical circuits
the charges that flow are actually electrons,
from the negative terminal of the battery to
the positive terminal. As a result, the flow of
electrons and the direction of conventional current
point in opposite direction as shown in Figure 2.3.
Mathematically, a transfer of positive charge is the same as a transfer of negative charge in the opposite direction.


{{< box title=" DID YOU KNOW" type="objective">}}

![lesson 1](/books/12-physics/unit2/py2.5.png )

Electric current is not only produced
by batteries. In nature, lightning bolt
produces enormous electric current
in a short time. During lightning, very
high potential difference is created
between the clouds and ground and
hence charges flow between the clouds
and ground.
{{< /box >}}


**2.1.2 Drift velocity**

In a conductor the charge carriers
are free electrons. These electrons move
freely through the conductor and collide
repeatedly with the positive ions. If there
is no electric field, the electrons move
in random directions, and hence their
velocities are also randomly oriented. On an
average, the number of electrons travelling
in any direction will be equal to the number
of electrons travelling in the opposite
direction. As a result, there is no net flow of
electrons in any direction and hence there
will not be any current.
Suppose a potential difference is set
across the conductor by connecting a
battery, an electric field \\(\vec{E}\\) is created in the conductor. This electric field exerts a force
on the electrons, producing a current. The electric field accelerates the electrons, while
ions scatter the electrons and change their
direction of motion. Thus, we see zigzag
motion of electrons. In addition to the
zigzag motion due to the collisions, the
electrons move slowly along the conductor
in a direction opposite to that of \\(\vec{E}\\) as shown in the Figure 2.4.


{{< box title=" ions" type="objective">}}
Any material is made up of neutral
atoms with equal number of electrons
and protons. If the outermost electrons
leave the atoms, they become free
electrons and are responsible for
electric current. The atoms after losing
their outer most electrons will have
more positive charges and hence are
called positive ions. These ions will not
move freely within the material like the
free electrons. Hence the positive ions
will not give rise to current.
{{< /box >}}


![lesson 1](/books/12-physics/unit2/py2.6.png )


This velocity is called drift velocity \\(\vec{v_d}\\) . The
drift velocity is the average velocity acquired
by the electrons inside the conductor when it is subjected to an electric field. The average
time between two successive collisions is
called the mean free time denoted by τ. The
acceleration  \\(\vec{a}\\)  experienced by the electron in an electric field  \\(\vec{E}\\) is given by

\\(\vec{a}=\frac{-e \vec{E}}{m}\\)   ->                Since\\(\vec{F}=-e \vec{E}\\)  (2.3)


The drift velocity \\(\vec{v}_d\\) is given by


 \\(\vec{v}_d=\vec{a}\tau\\)

 \\(\vec{v}_d=-\frac{{e}\tau}{m}\vec{E}\\)     ........(2.4)

 \\(\vec{v}_d=-\mu\vec{E}\\)  .......(2.5)


 Here \\(\mu = \frac{e\tau}{m}\\) is the mobility of the
electron and it is defined as the magnitude
of the drift velocity per unit electric field.


\\(\mu = \frac{\vert\vec{v}_d\vert}{\vert\vec{E}\vert}\\)  ...(2.6)

The SI unit of mobility is \\(m^2 {V}^{-1} {s}^{-1}\\)



{{< box title=" Note" type="objective">}}
The typical drift velocity of
electrons in the wire is \\(10{–4}m s{–1}\\).
If an electron drifts with this
speed, then the electrons
leaving the battery will take hours to reach
the light bulb. Then how electric bulbs
glow as soon as we switch on the battery?
When battery is switched on, the electrons
begin to move away from the negative
terminal of the battery and this electron
exerts force on the nearby electrons. This
process creates a propagating influence
(electric field) that travels through the
wire at the speed of light. In other words,
the energy is transported from the battery
to bulb at the speed of light through
propagating influence (electric field). Due
to this reason, the bulb glows as soon as the
battery is switched on.
{{< /box >}}


{{< box title=" EXAMPLE 2.2" type="objective">}}
If an electric field of magnitude \\(570 N C^{-1}\\)
is applied in the copper wire, find the
acceleration experienced by the electron.

**Solution:**

\\(E=570 N C^{-1},e=1.6\\) X \\(10^{-19}C\\)

m = 9.11 × 10\\(^{-31}\\) kg and a = ?

\\(F = ma = eE\\)

\\(a=\frac{eE}{m}\\)

\\(a=\frac{570 * 1.6 * 10^{-19}}{9.11 * 10^{-31}}\\)

\\( =\frac{912 * 10^{-19} * 10^{31}}{9.11}\\)

\\(a = 1.001 * {10}^{14} m s^{-1}\\)
{{< /box >}}


**Misconception**

(i) There is a common misconception that
the battery is the source of electrons. It
is not true. When a battery is connected
across the given wire, the electrons in the
closed circuit resulting the current. Battery
sets the potential difference (electrical
energy) due to which these electrons in
the conducting wire flow in a particular
direction. The resulting electrical energy
is used by electric bulb, electric fan etc.
Similarly the electricity board is supplying
the electrical energy to our home.

(ii) We often use the phrases like ‘charging
the battery in my mobile’ and ‘my
mobile phone battery has no charge’
etc. These sentences are not correct.

![lesson 1](/books/12-physics/unit2/py2.7.png )


When we say ‘battery has no charge’,
it means, that the battery has lost ability
to provide energy or provide potential
difference to the electrons in the circuit.
When we say ‘mobile is charging’, it implies
that the battery is receiving energy from AC
power supply and not electrons.

**2.1.3 Microscopic model of current**

Consider a conductor with area of cross
section A and let an electric field \\(\vec{E}\\) be applied
to it from right to left. Suppose there are n
electrons per unit volume in the conductor
and assume that all the electrons move with the
same drift velocity \\(\vec{v_d}\\) as shown in Figure 2.5.

![lesson 1](/books/12-physics/unit2/py2.8.png )

The drift velocity of the electrons \\(= v_d\\)
If the electrons move through a distance
\\(dx\\) within a small interval of \\(dt\\), then

\\(v_d = \frac{dx}{dt}\\);      \\(dx={v_d}{dt}\\)  ....(2.7)

Since A is the area of cross section of
the conductor, the electrons available in the
volume of length \\(dx\\) is

= volume × number of electrons per unit volume

= \\(Adx n\\) ..... ́(2.8)

Substituting for \\(dx\\) from equation (2.7)
in (2.8)

\\(= (A {v_d}{dt} ) n\\)

Total charge in the volume element \\(dQ\\) =
(charge) × (number of electrons in the
volume element)