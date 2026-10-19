// Electricity & Energy · Week 3 · Lesson 12 — electricity into spin.
//
// Measured off the simulation. A 12 V motor, 2 ohms, k = 0.05:
//
//   load   current  back-EMF   speed      useful    heat
//     0%    0.00 A    12.0 V   2,292 rpm    0.0 W    0.0 W
//    20%    1.20 A     9.6 V   1,833 rpm   11.5 W    2.9 W
//    40%    2.40 A     7.2 V   1,375 rpm   17.3 W   11.5 W
//    50%    3.00 A     6.0 V   1,146 rpm   18.0 W   18.0 W   ← most work
//    80%    4.80 A     2.4 V     458 rpm   11.5 W   46.1 W
//   100%    6.00 A     0.0 V       0 rpm    0.0 W   72.0 W   ← jammed
//
// The stalled row is the lesson. Maximum current, maximum torque, and not one
// watt of work — all 72 W becoming heat in a motor that is not moving and
// therefore not cooling itself either. That is the whole explanation of why a
// jammed power tool smells of hot varnish within seconds.
//
// The load slider steps by 5, so every figure quoted above is reachable.

export default {
  id: 'lesson-12',
  number: 2,
  week: 3,
  title: `How a motor turns electricity into spin`,
  openingQuestion: `There are probably forty motors in your house — in the fridge, the fans, the pumps, the drill, the washing machine, every hard drive and every window in the car. All of them do the same trick, and none of them have any idea how hard they are about to be asked to work. So how does a motor know how much electricity to draw?`,
  concept: `The load sets the current`,

  see: {
    voice: 'professor',
    line: `{name}, before anything else: switch the commutator off and watch. Then on. Then take the load to 100% and read the two numbers at the bottom.`,
    simulation: { id: 'machine', props: { mode: 'motor' } },
    observations: [
      { text: `**Without the commutator** the loop swings until it lines up with the field and stops. One push and nothing more — a motor must have its current reversed twice per turn to keep going.` },
      { text: `Free-running at **no load** it draws essentially nothing and spins at 2,292 rpm. Load it to 40% and the current rises to 2.4 A while the speed drops to 1,375. **The load chose the current.**` },
      { text: `**Jammed solid: 6 amps, zero rpm, 72 watts — and no work at all.** Every watt is heat, in a motor too stationary to fan itself. That is how a stalled motor destroys itself in seconds.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences. The second one explains every motor you have ever heard struggle.`,
    sentences: [
      `A **magnetic field pushes sideways on a current-carrying wire** — the other half of yesterday's discovery. Put a loop of wire in a field, run current through it, and one side is pushed up while the other is pushed down. Mount it on a shaft and it turns. That is a motor, and there is nothing else in it.`,
      `As it turns, the loop is moving through a magnetic field, which **generates a voltage back against its own supply**. The faster it spins the more it generates, and the more it generates the less net push remains to drive current through it. So a motor at speed draws little current, and a motor being held still draws all it possibly can.`,
      `Which means **the load sets the current**. Nothing decides in advance how many amps a motor will take; the work being demanded of it does. Ask for nothing and it draws nothing. Ask for the impossible and it draws its absolute maximum and turns every watt into heat.`
    ],
    sequence: {
      label: `WHAT HAPPENS WHEN YOU LEAN ON A DRILL`,
      note: `follow the chain — each step causes the next`,
      steps: [
        { name: `You press harder`, body: `More torque is being demanded of the shaft than it is currently producing, so the motor cannot maintain its speed.` },
        { name: `It slows down`, body: `And because the voltage it generates depends on its speed, that generated voltage falls. At 1,375 rpm it was making 7.2 V against its 12; at 458 rpm, only 2.4 V.` },
        { name: `So the current rises`, body: `The supply is still 12 V, and there is now less being generated against it. The difference drives more current — 2.4 A becomes 4.8 A.` },
        { name: `Which raises the torque`, body: `Torque follows current directly, so the motor automatically pushes back harder. This is a genuine self-regulating loop and nothing is controlling it.` },
        { name: `The pitch drops and it gets hot`, body: `You can hear the speed fall, and the heat is rising on the square of the current: 11.5 W at 40% load, 46 W at 80%. The sound and the smell are the same event.` },
        { name: `Jam it and it is all heat`, body: `At a standstill: 6 A, 72 W, no work, no cooling airflow. A motor is protected by moving, and a stalled one has lost its only defence.` }
      ]
    },
    comparison: {
      label: `A CYCLIST ON A FIXED GEAR`,
      body: `Riding on the flat, your legs go round quickly and you are barely pushing — high speed, almost no effort. Hit a steep hill and the pedals slow right down while the force through them becomes enormous. You did not decide to push harder; the hill decided for you, and your legs simply supplied what the gradient demanded. Now imagine a wall: you stop entirely, you are straining with everything you have, the bicycle goes nowhere, and all that effort becomes heat and ache. That is a stalled motor exactly — maximum effort, zero output. *Where the analogy stops:* you will give up long before you hurt yourself, and a motor has no such instinct. It will draw its full stalled current until the insulation chars or something upstream interrupts it, which is precisely why thermal cut-outs and circuit breakers exist.`
    },
    naming: `The voltage a spinning motor generates against its own supply is **back-EMF** — electromotive force, an old name for voltage. The rotating coil is the **rotor** or **armature**; the stationary magnets are the **stator**. The sliding contacts that reverse the current twice per revolution are the **commutator** and **brushes**, and they are the part that wears out — which is why so much modern equipment is **brushless** and reverses the current electronically instead. A motor held still is **stalled**, and its current is the **stall current** or locked-rotor current. One honest note: the no-load speed of 2,292 rpm here is an idealisation. A real motor has friction and air drag, so it draws a little current even with nothing attached, and settles somewhat below its theoretical free speed.`,
    formalNames: {
      terms: [
        { term: `Back-EMF`, meaning: `The voltage a spinning motor generates against its own supply. It rises with speed, which is why current falls as a motor speeds up.` },
        { term: `Rotor and stator`, meaning: `The part that turns and the part that does not. In a simple motor, a coil inside fixed magnets.` },
        { term: `Commutator and brushes`, meaning: `Sliding contacts that reverse the coil current twice per turn. Without them the motor lines up and stops after a single push.` },
        { term: `Stall current`, meaning: `The current drawn when held still — the maximum it can take, producing maximum torque and zero work. Almost all of it becomes heat.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've heard or felt.`,
    items: [
      `A drill's pitch dropping as you lean into it.`,
      `House lights dimming for a moment when the fridge starts.`,
      `A vacuum cleaner changing note when the hose blocks.`,
      `A power tool that smells hot after a hard job.`,
      `A blender straining on something too thick.`,
      `A car window that stops when it reaches the top.`
    ],
    builder: {
      body: `The dimming lights are the best demonstration in your house, and it costs nothing to watch for. Stand where you can see a lamp when the fridge or the air conditioning starts up. At the instant it starts, the motor is stationary — so it is drawing something close to its stall current, several times its running current, for a fraction of a second. That surge pulls the voltage down slightly across the whole house, and the lamp dips. A second later the motor is at speed, it is generating back-EMF, its current has collapsed to a fraction of the starting figure, and the light is steady again. The dip is the stall current, and it lasts exactly as long as the motor takes to get going.`
    },
    ownPlaceholder: `Something I've heard change pitch under load…`,
    synthesis: `Every one of those is the same chain. A motor under more load turns slower, generates less back-EMF, draws more current and runs hotter — and every one of those changes is audible, visible or detectable by hand. You have been monitoring back-EMF by ear your whole life.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend why a drill draws more electricity when you push harder — **without using the words "back-EMF" or "voltage."**`,
    banned: ['back-emf', 'voltage'],
    bannedNote: `one of those came back — and the argument works on speed and push alone`,
    placeholder: `When the motor is spinning fast, it fights its own supply…`,
    checks: [
      `A spinning motor opposes its own supply, and the faster it spins the more it opposes it.`,
      `Pushing harder slows it, so it opposes less, so more current gets through.`,
      `More current means more turning force, which is how it pushes back automatically.`,
      `Held completely still it opposes nothing, draws the most it can, and all of it becomes heat.`
    ],
    closing: `If your version has "the faster it spins, the less it draws," you have the sentence that explains both the dimming lights and the burnt-out motor.`
  },

  challenge: {
    voice: 'editor',
    line: `One about when a motor works hardest, and one about a motor you have definitely used without noticing.`,
    prediction: {
      question: `At which load does the motor deliver the **most useful work** — the most watts out of the shaft?`,
      options: [
        {
          id: 'full',
          text: `At 100% load. That is the maximum torque, so it must be the maximum work.`,
          verdict: `It is genuinely the maximum torque — 0.3 N·m, and the most the motor can produce. But work is torque **times speed**, and at 100% load the speed is zero. Anything multiplied by zero is zero, so a fully stalled motor delivers no work at all while consuming its full 72 watts. The whole lot becomes heat. This is the most useful wrong answer in the lesson, because it is exactly the mistake that burns motors out: torque feels like the thing being bought, and it is only half of it.`
        },
        {
          id: 'half',
          text: `Somewhere in the middle — around half load.`,
          verdict: `Correct, and the simulation puts it exactly at 50%: 3 amps, 1,146 rpm, 18 watts out. Either side is worse — 17.3 W at 40% and 11.5 W at 80%. The reason is that torque rises with load while speed falls with it, and their product peaks where the two are balanced. Notice the uncomfortable detail: at that peak the motor is also making 18 watts of heat, so it is exactly 50% efficient. Maximum power and maximum efficiency are not the same operating point, and real machines are usually run well below the power peak to stay efficient.`
        },
        {
          id: 'none',
          text: `At no load. It spins fastest there, so it must be doing the most.`,
          verdict: `It is certainly the fastest — 2,292 rpm — and if work came from speed alone this would be right. But work is torque times speed, and at no load there is no torque, because nothing is being asked of the shaft. A motor spinning freely with nothing attached is doing no work in the physics sense, however busy it sounds. It is also drawing almost no current, which is the giveaway: nothing is going in, so nothing can be coming out.`
        }
      ]
    },
    open: {
      question: `A motor and a generator are built from the same parts — a coil, some magnets, a shaft. Lesson 13 is about generators. What do you suppose happens if you take this motor, disconnect the battery, and spin the shaft by hand?`,
      placeholder: `If spinning it generates a voltage against the supply, then without a supply…`,
      reveal: [
        `It generates. You have already been told so — today's second sentence said that a spinning motor makes a voltage against its own supply. Take the supply away and the voltage is still made; there is simply nothing for it to oppose. Connect a small lamp instead of the battery, spin the shaft, and the lamp lights. A motor and a generator are not similar devices. They are the same device, and which one it is depends only on whether you are supplying the electricity or the spin.`,
        `You can feel this, too. Spin a motor with nothing connected and it turns easily. Short its two terminals together and spin it again — it suddenly resists, and resists harder the faster you turn it. That resistance is the current you are now generating, being pushed on by the field. You are doing physical work against the magnetism, and it is coming out as heat in the coil. This is regenerative braking, and it is how an electric car slows down while putting charge back.`,
        `Which makes tomorrow's lesson less a new topic than the same machine viewed from the other end. And it answers something from Week 2: Lesson 9 said a transformer needs a changing magnetic field, and never said where a changing field comes from in the first place. The answer is a machine like this one, turned by steam or falling water, somewhere a few hundred miles away.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about motors that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 13 — the same machine, run backwards. Spin it instead of feeding it, and it makes electricity. One number falls out of it that explains why every power station turbine in America turns at exactly 3,600 revolutions a minute.`
  },

  routes: [
    { id: 'analogy', body: `A revolving door with someone pushing from the other side. If they are walking at your speed, you feel almost nothing and the door goes round easily. If they stop dead, you have to shove with everything you have and the door barely moves. The faster the door turns, the less effort it takes — because the resistance comes from the difference between your push and the door's motion. A motor's current works the same way, and the resistance it offers to its own supply disappears as it speeds up.` },
    { id: 'object', body: `Find a cordless drill. Squeeze the trigger with nothing in the chuck: a high whine, barely any current, the battery lasts for ages. Now drill something hard: the pitch drops, you can feel the heat in the body within a minute, and the battery is noticeably down. Nothing about the drill changed. The wood told it how much current to take, and the drill had no say in it.` },
    { id: 'story', body: `Faraday built the first electric motor in 1821, a year after Ørsted's compass — a wire that rotated continuously in a bowl of mercury. It did no useful work and was dismissed as a parlour trick for years. The commutator came later, and with it the ability to keep the push going round rather than stopping at alignment. Every motor in your house is that one addition applied to Faraday's toy.` },
    { id: 'experiment', body: `Take a small DC motor from an old toy and connect its two wires to a lamp or an LED, nothing else. Spin the shaft between your fingers: the LED flickers. Now connect the two wires directly to each other and spin it again — it is suddenly much harder to turn, and the harder you spin the more it fights. You are generating current and feeling the magnetism push back on it. That is this lesson and tomorrow's in one object.` },
    { id: 'smaller', body: `Forget back-EMF entirely. One sentence: a motor spinning fast takes very little electricity, and a motor that cannot move takes the most it possibly can. Everything else today is an explanation of why those two things are true, and the practical consequence is that the dangerous moment for a motor is the moment it is not turning.` },
    { id: 'backward', body: `Start from a fact you have already accepted: a circuit breaker trips when too much current flows. Why would a motor ever draw too much? It is the same motor, on the same 120 volts, as it was a second ago. The answer has to be that a motor's current is not a property of the motor — it is a property of the job. Work backwards from the breaker and you arrive at the load setting the current.` }
  ],

  map: [
    { name: `Motors`, level: 4 },
    { name: `Magnetic field`, level: 4 },
    { name: `Magnetism`, level: 4 },
    { name: `Induction`, level: 3 },
    { name: `AC and DC`, level: 5 },
    { name: `Power`, level: 5 },
    { name: `Resistance`, level: 5 },
    { name: `Current — the flow`, level: 5 },
    { name: `Voltage — the push`, level: 5 },
    { name: `Energy (from Physics I)`, level: 5 }
  ]
}
