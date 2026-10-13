// Physics I · Week 6 · Lesson 28 — a boat and an aeroplane.
// The package warns specifically against letting "air goes faster over the top"
// stand in for the whole of lift, so the reveal takes it apart.

export default {
  id: 'lesson-28',
  number: 3,
  week: 6,
  title: `A boat and an airplane`,
  openingQuestion: `Both of them move through a fluid, and both of them are held up by it. A boat weighing fifty thousand tons and a plane weighing four hundred. The fluids are not that different. Are they doing the same thing?`,
  concept: `Forces in a fluid`,

  see: {
    voice: 'professor',
    line: `Two objects, same question as Monday. Say what is holding each one up before you ask me.`,
    simulation: {
      id: 'object-inspector',
      props: {
        prompt: 'What is holding it up, and what is it fighting?',
        objects: [
          {
            id: 'boat', label: 'A boat', shape: 'boat',
            physics: [
              { concept: 'Buoyancy', lesson: 18, note: 'It has pushed aside its own weight in water, and the water pushes back by exactly that. It settles and stays.' },
              { concept: 'Average density', lesson: 18, note: 'Mostly air inside a thin steel skin, so the whole object is lighter per cubic foot than water.' },
              { concept: 'Drag', lesson: 7, note: 'Water resisting it, which is why a hull is shaped and why speed costs fuel so steeply.' },
              { concept: 'Center of mass', lesson: 2, note: 'Low, deliberately. Ballast in the bottom is what makes it right itself rather than roll over.' }
            ]
          },
          {
            id: 'plane', label: 'An airplane', shape: 'airplane',
            physics: [
              { concept: 'Lift', lesson: 28, note: 'The wing throws air downward; the air pushes the wing up by exactly as much. It must keep doing it or stop flying.' },
              { concept: "Newton's third pairing", lesson: 6, note: 'Air down, wing up. The same deal as the floor pushing back on your feet in Lesson 6.' },
              { concept: 'Momentum', lesson: 5, note: 'Lift is momentum given to air, every second. Stop giving it and the lift stops with it.' },
              { concept: 'Drag and thrust', lesson: 7, note: 'The engines are not holding it up. They are holding it *forward*, against the air, so the wings keep working.' },
              { concept: 'Buoyancy', lesson: 17, note: 'Present and almost irrelevant — a plane displaces its own volume of air, worth a few hundred pounds against hundreds of tons.' }
            ]
          }
        ]
      }
    },
    observations: [
      { text: `The boat is doing nothing. Switch its engines off and it floats indefinitely — the water holds it whether or not anyone is paying.` },
      { text: `The plane is working continuously. Stop the air moving past the wings and it is no longer held up by anything.` },
      { text: `One is a *state*. The other is an *activity* — which is Lesson 2's bicycle, at forty thousand feet.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `The same question, two completely different answers.`,
    sentences: [
      `A boat floats by displacement: it has pushed aside its own weight in water, and water pushes back on it with that weight. It costs nothing to maintain and continues whether or not anything is running.`,
      `A wing does not displace anything worth counting. It works by taking a great deal of air and throwing it downward — and the air, obeying Lesson 6, pushes the wing up by exactly as much.`,
      `So a plane buys its lift continuously, with fuel, and must keep moving to keep buying it. Its engines point forward, not down; they exist to drag the wing through air fast enough for the wing to keep doing its job.`
    ],
    comparison: {
      label: `THE RAFT AND THE SWIMMER`,
      body: `A raft sits on a lake all summer with nobody aboard. A swimmer treading water is also staying at the surface, and stops the moment they stop working — they are pushing water downward, continuously, and the water is pushing them up in return. Both are at the surface and only one of them is floating. A boat is the raft. A plane is the swimmer, and a very fast one.`
    },
    naming: `The boat's upward push is **buoyancy**, and you met it in Lesson 18. The wing's is **lift**, and the honest one-line account of it is the one above: air thrown down, wing pushed up. The resistance both of them fight is **drag**, and what the engines supply against it is **thrust**.`,
    formalNames: {
      terms: [
        { term: `Lift`, meaning: `The upward force on a wing, equal to the rate at which it throws air downward. Costs energy continuously and stops the moment the airflow does.` },
        { term: `Angle of attack`, meaning: `How much the wing is tilted into the oncoming air. Tilt it more and it throws more air down, up to the point where the flow breaks away and the lift collapses — a *stall*.` },
        { term: `Thrust`, meaning: `What the engines provide, forward. They never hold the plane up; they hold it fast, and the wing does the rest.` },
        { term: `Drag`, meaning: `The fluid resisting motion through it. Grows roughly with the square of speed, which is why doubling an aircraft's speed costs far more than twice the fuel.` }
      ],
      note: `And notice what lift actually is: Lesson 5's momentum, handed to air at a steady rate. A wing is a machine for giving several tons of air a downward shove every second, forever.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Every one of these is a fluid pushing back. Which have you felt?`,
    items: [
      `A hand out of a car window, tilting it in the airflow.`,
      `A kite pulling against the string.`,
      `Treading water, and how quickly it tires you.`,
      `A boat sitting at anchor for a week, doing nothing.`,
      `Birds gliding without a single wingbeat.`,
      `A parachute, and how much air it has to catch.`
    ],
    builder: {
      body: `Thirty seconds, in a moving car with a passenger driving. Put your hand out of the window, flat and level, and feel it mostly pushed backward. Now tilt the leading edge up very slightly. Your hand lifts hard — you can feel it trying to climb. You have not added power and your hand has not changed shape. You tilted it, and it began throwing air downward. That is a wing, and your arm is the spar.`
    },
    ownPlaceholder: `Somewhere a fluid pushed back on you…`,
    synthesis: `The bird gliding is the one worth sitting with. It is still throwing air down continuously — it has simply arranged to pay for it by descending very slowly, trading height for the energy instead of using muscle.`
  },

  feynman: {
    line: `The package asked me to be strict about this one.`,
    instruction: `Explain how an aeroplane stays up — **without saying "because the wings hold it up," and without claiming the air simply goes faster over the top.** Say what happens to the air.`,
    banned: ['wings hold', 'faster over the top'],
    bannedNote: `that is the stock answer, and it is not an explanation — what happens to the air?`,
    placeholder: `The wing meets a great deal of air every second, and what it does to that air is…`,
    checks: [
      `The wing is tilted into oncoming air and deflects it downward.`,
      `Pushing air down means the air pushes the wing up by the same amount.`,
      `It has to keep doing this continuously — stop the airflow and the lift stops.`,
      `The engines provide forward motion, not upward force.`
    ],
    closing: `If your explanation also covers why a plane stalls when it climbs too steeply, you have the mechanism rather than the slogan.`
  },

  challenge: {
    voice: 'editor',
    line: `This is the one the build package told me not to let you off lightly.`,
    prediction: {
      question: `Is lift caused by air moving faster over the curved top of the wing, lowering the pressure there?`,
      options: [
        {
          id: 'yes',
          text: `Yes — that is the standard explanation, and the curve is why the wing is that shape.`,
          verdict: `It is in a great many textbooks and it is not wrong so much as badly incomplete, so this answer deserves a careful reply rather than a buzz. The air genuinely does go faster over the top, and the pressure there genuinely is lower — both are measurable. What the account fails to explain is *why* it goes faster, and it is usually propped up by a claim that two parcels of air split at the front must meet again at the back, which is simply false and has been measured as false. The killer objection is simpler still: aerobatic aircraft fly inverted for minutes at a time, with the curve on the bottom.`
        },
        {
          id: 'down',
          text: `No — the wing deflects air downward, and the air pushes back up.`,
          verdict: `That is the account that survives every test. A wing in flight leaves a measurable downwash behind it; you can see it in the vortices off a crop-duster and feel it standing under a low helicopter. The numbers work out too: an airliner's wings push roughly a ton of air downward every second, and the reaction is what holds several hundred tons up. Pressure difference and downward deflection are not rival explanations — they are the same event described from two sides — but only one of them tells you what is actually happening, and only one of them explains inverted flight.`
        },
        {
          id: 'both',
          text: `A bit of both — some lift from the curve and some from the angle.`,
          verdict: `I like this because it is reaching for completeness, and it is nearly right in a way worth making precise. These are not two separate sources adding together; they are one phenomenon seen two ways. Air turned downward *is* air whose pressure above the wing has dropped — you cannot have one without the other. The reason to prefer the deflection account is not that the pressure account is false, but that it is the one you can reason with: it tells you what happens if you tilt more, fly inverted, or lose airspeed.`
        }
      ]
    },
    open: {
      question: `Now the transfer question for the week. What would change about each of these if gravity disappeared for a moment — the boat and the plane?`,
      placeholder: `Work out what gravity is currently doing in each one…`,
      reveal: [
        `The boat would rise out of the water entirely. Floating is a balance between weight pulling down and the displaced water pushing up — and the push does not go away. With nothing pulling down, the buoyant force is unopposed and the hull lifts clear of the surface. A floating object is not resting on the water; it is being held in a tie.`,
        `The plane would need to stop lifting. Its wings are producing a very large upward force to balance a weight that no longer exists, so unless the pilot pushed the nose down and unloaded them, the aircraft would accelerate upward hard. Everything a pilot does with a wing is bookkeeping against weight.`,
        `Which is a neat way of seeing the difference one last time. Take gravity away and the boat's situation is immediately resolved, with nothing to maintain. The plane's has to be actively corrected, because it was never a balance that held itself — it was a continuous payment, and the bill does not stop just because the reason for it did.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes.`,
    prompt: `The biggest difference between the boat and the airplane is…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Lift and drag arrived at the end, as applications rather than as new laws — which is what Week 6 is for.`,
    tomorrow: `Tomorrow, Lesson 29: a flashlight and a microwave oven. They seem to have nothing in common. They are the same thing.`
  },

  routes: [
    { id: 'analogy', body: `Think of a man standing on a trampoline and a man juggling. The first is held up by the trampoline whether he does anything or not — he could fall asleep there. The second is keeping three balls in the air and stops the instant he stops working. Both are "keeping things up". Only one of them is free, and the difference between a boat and a plane is exactly the difference between those two men.` },
    { id: 'object', body: `Put your hand out of a moving car window, flat. Mostly it is pushed backward. Now tilt the front edge up a few degrees. It climbs hard, and you can feel the effort in your wrist. Nothing about your hand changed. You angled it so that it started throwing air downward, and the air answered immediately. That is a wing, demonstrated at thirty miles an hour.` },
    { id: 'story', body: `A crop-duster passes low over a field and the wheat beneath it is pressed flat in two rolling lines behind the wingtips, long after the aircraft has gone. The farmer can see the air that held the aeroplane up, because it is still moving downward and sideways through his crop. Lift is not a subtle effect in a textbook. It is several tons of air being thrown at the ground every second, and sometimes you can watch it land.` },
    { id: 'experiment', body: `Hold a sheet of paper by one edge, just below your bottom lip, so it droops. Blow hard across the top of it. It rises — and this is usually offered as proof of the curved-wing story. Now hold it flat and blow *under* it at a slight upward angle. It rises too. The paper does not care which surface you used; it cares that air was deflected. Two experiments, one minute, and the stock explanation has a problem.` },
    { id: 'smaller', body: `Smaller question. If you stand on a frozen pond and throw a heavy bag north, which way do you slide? South. Now: a wing throws air downward, continuously. Which way does it go? That is all lift is. The only difference from the bag is that the wing never stops throwing, which is why it never stops being held up — and why it has to keep moving to find new air to throw.` },
    { id: 'backward', body: `Start from aerobatic aircraft flying inverted for minutes at a time — upside down, wing curve pointing at the ground, straight and level. If the curve on the top were what held them up, that would be impossible rather than routine. So whatever lift is, it must be something the pilot can produce with the wing either way up. The only candidate left is the angle at which the wing meets the air, and from there the explanation builds itself.` }
  ],

  map: [
    { name: `Lift`, level: 4, fresh: true },
    { name: `Drag`, level: 4, fresh: true },
    { name: `Thrust`, level: 3, fresh: true },
    { name: `Buoyancy`, level: 5 },
    { name: `Momentum`, level: 5 },
    { name: `Density`, level: 5 },
    { name: `Transfer`, level: 4 },
    { name: `Force`, level: 5 },
    { name: `Support force`, level: 5 },
    { name: `Pressure`, level: 5 },
    { name: `Center of mass`, level: 5 },
    { name: `Energy`, level: 5 },
    { name: `Motion`, level: 5 }
  ]
}
