// Physics I · Week 1 · Lesson 5 — momentum, and the choice between force and time.
// Combines Lesson 4's mass with Lesson 1's motion; closes Week 1.

export default {
  id: 'lesson-05',
  number: 5,
  week: 1,
  title: `What momentum actually measures`,
  openingQuestion: `A bicycle and a loaded truck are both rolling at walking pace. You could stop the bicycle with your hands. The truck would not even notice you. Both are barely moving — so what is different?`,
  concept: `Momentum`,

  see: {
    voice: 'professor',
    line: `Something is thrown to you and you catch it. Two sliders decide what it costs you.`,
    simulation: { id: 'catch-it' },
    observations: [
      { text: `Mass and speed both count, and they count together. A heavy slow thing and a light fast thing can be equally hard to stop — set the sliders until the top number matches.` },
      { text: `But that number is not what hurts. Leave it alone and change only how far your hands travel, and the force changes enormously.` },
      { text: `Catching is not one event. It is a negotiation about *how long you take* — and you are the one who decides.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Lesson 4 gave you mass. Lesson 1 gave you motion. Today they multiply.`,
    sentences: [
      `Two things decide how hard something is to stop: how much of it there is, and how fast it is going. Multiply those together and you have the number that matters — and neither one alone tells you anything useful.`,
      `That number is not a substance sitting inside the object. Nothing is stored in the truck. It is a piece of bookkeeping — but it is the piece that survives every collision, which is why physicists care about it so much.`,
      `Stopping something means removing all of that number, and there is no way around it. What you *can* choose is whether to remove it with a large force over a short distance, or a small force over a long one. Your hands make that choice every time you catch something.`
    ],
    comparison: {
      label: `SOFT HANDS`,
      body: `Anyone who has caught a hard ball knows the trick without being taught it: you let your hands ride backward as the ball arrives. Nobody explains it as physics; you learn it because the alternative stings. What you are actually doing is stretching the catch over a longer distance and a longer time, so the same amount of motion gets removed by a gentler force. The ball does not care. Your palms do.`
    },
    naming: `The number — mass times speed — is **momentum**. And the choice you make when catching has a name too: **impulse**, the force multiplied by how long you apply it. The momentum to be removed is fixed the moment the ball leaves their hand. The impulse is the bill, and you get to choose whether to pay it in force or in time.`,
    formalNames: {
      terms: [
        { term: `Momentum`, meaning: `Mass times velocity. How much motion a thing carries, in the way that matters when it meets something else.` },
        { term: `Impulse`, meaning: `Force times the time it acts for. Changing an object's momentum always costs the same impulse — so a longer catch is a gentler one. This is the whole of airbags, crumple zones and bent knees.` },
        { term: `Conservation of momentum`, meaning: `In any collision, add up the momentum before and add it up afterwards, and the totals match. It never goes missing; it only moves between things.` },
        { term: `Velocity`, meaning: `Speed with a direction attached. Momentum has a direction too — which is why two things can collide and leave with none at all between them.` }
      ],
      note: `Still no new law. Momentum only changes when a force acts on it, which is Lesson 1 again — and the rate it changes at is Lesson 4's *F = ma*, rearranged. Week 1 has been one idea, approached five times.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Most of these are people arranging to take longer. Which have you done?`,
    items: [
      `Bending my knees when I land off a step.`,
      `Catching a hard ball and pulling my hands back with it.`,
      `Rolling when I fall instead of landing flat.`,
      `How much longer a truck takes to stop than a car.`,
      `Airbags, and the way a car's front end crumples.`,
      `Driving a nail — the hammer stops in almost no distance at all.`
    ],
    builder: {
      body: `Two minutes and one pair of socks. Ball them up and throw them at a wall — they stop dead and drop. Now hold a bath towel loosely by two corners, with slack in it, and throw the socks into that. Same socks, same throw, same amount of motion to remove. The towel takes about a foot to do it and the socks barely rebound. You have just built a crumple zone out of laundry.`
    },
    ownPlaceholder: `Somewhere you instinctively took longer in order to be gentler…`,
    synthesis: `Notice what nearly all of those have in common: nobody is reducing the motion that has to be removed. They are all buying *time*. That is the only lever you ever really have.`
  },

  feynman: {
    line: `Explain it to someone who has just jammed their thumb catching a ball.`,
    instruction: `Explain why catching a fast ball with soft, giving hands hurts far less than stopping it dead — **without using the words "momentum" or "impulse."**`,
    banned: ['momentum', 'impulse'],
    bannedNote: `one of the two words slipped in — try it with ordinary words`,
    placeholder: `The ball has to be stopped either way. So what changed…?`,
    checks: [
      `The ball arrives with a certain amount of motion — its weight and its speed together.`,
      `Catching it means removing all of that, whichever way you do it. That part is not negotiable.`,
      `Removing it in a very short distance needs a big force; removing it over a longer distance needs a small one.`,
      `Letting your hands travel backward is how you buy that extra distance and time.`
    ],
    closing: `If your version also explains why cars are built to crumple, it is doing more work than the textbook sentence would. Try it and see.`
  },

  challenge: {
    voice: 'editor',
    line: `Two questions. The first one people usually get wrong for an interesting reason.`,
    prediction: {
      question: `Which is harder to stop: a 4,000-pound car rolling at 5 mph, or a baseball thrown at 90 mph?`,
      options: [
        {
          id: 'car',
          text: `The car — there is vastly more of it, even though it's crawling.`,
          verdict: `Correct, and not by a little: the car carries roughly seven hundred times the baseball's momentum. Walking pace sounds harmless until you multiply it by two tons. This is the answer to the question the lesson opened with — the truck and the bicycle are both "barely moving," and only one of those facts survives being multiplied by the mass.`
        },
        {
          id: 'ball',
          text: `The baseball — 90 mph is genuinely dangerous.`,
          verdict: `You are reaching for something real, and it is worth separating out carefully rather than just marking wrong. The baseball is far more dangerous, and you are right about that. But dangerous and hard-to-stop are different questions. The baseball hurts because it delivers its small momentum in a tiny area over a few thousandths of a second — enormous force, briefly. The car has hundreds of times more motion to remove; it simply does it slowly enough that you could step out of the way. Momentum answers "how much stopping is required." Force answers "how much will it hurt." You were answering the second question.`
        },
        {
          id: 'same',
          text: `About the same — the car's mass and the ball's speed roughly trade off.`,
          verdict: `A sound instinct — the trade-off is real and it is exactly what this lesson is about. The arithmetic is just much more lopsided than it feels. The car is about thirteen thousand times the baseball's mass, and the baseball is about eighteen times its speed. Thirteen thousand against eighteen is not a close contest. Speed matters, but there is a limit to how much of a mass difference it can make up.`
        }
      ]
    },
    open: {
      question: `Here is the one I actually want. A bowling ball rolls down the lane and you stop it dead with both hands. Its momentum is now zero. So where did it go?`,
      placeholder: `It does not simply stop existing. Follow it…`,
      reveal: [
        `Into you — and then straight through you. Your hands took it, your arms passed it to your body, your body pushed back through your shoes, and your shoes handed it to the floor, the building and the ground underneath. The Earth is now rotating imperceptibly differently than it would have been. Not metaphorically: actually, by an amount far too small to ever measure.`,
        `This is what "conserved" means, and it is stricter than it sounds. The momentum did not fade out or get used up — it was passed along, in full, to something big enough that the change does not show. And notice what did *not* happen: the ball's **energy** genuinely did turn into heat and sound in your palms. Momentum and energy are two separate sets of books, and a collision settles them in completely different ways. Week 3 is about the other set.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes — and that is Week 1 finished.`,
    prompt: `I used to think momentum was… Now I think it is…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Five lessons, and look how few of these are new things. Motion, inertia, force, mass, friction, momentum — Week 1 has been one idea approached from five directions.`,
    tomorrow: `That is Week 1 — the rules of motion. Week 2 turns to forces themselves, starting with a question that sounds like a trick: you are sitting perfectly still in a chair. Are there forces acting on you?`
  },

  routes: [
    { id: 'analogy', body: `Think of catching a water balloon. Everyone already knows you have to give with it — reach out, meet it, and draw your hands back as it lands. Try to catch one with stiff arms and it bursts. The balloon is a device that makes the lesson visible: the amount of water arriving is fixed, and the only thing you control is how gently you take it out of the air. A baseball is the same problem; it just does its bursting inside your palm instead.` },
    { id: 'object', body: `Take a cushion in one hand and hold your other palm flat. Have someone drop a book on your bare palm from a foot up — actually, don't. Do it onto the cushion instead, then imagine the other version. That flinch you just felt is the whole lesson. The book arrives with the same motion either way. The cushion spends four inches removing it; your palm would have spent a quarter of an inch. Sixteen times the distance, roughly a sixteenth of the force.` },
    { id: 'story', body: `A stuntman falls forty feet onto a pile of cardboard boxes and stands up. The same fall onto concrete would kill him. He is travelling at exactly the same speed when he reaches the top of the boxes as he would be at the concrete — the fall was identical. The boxes do not slow his fall; they extend his landing, from an inch to about six feet. That is the entire trick, and it is the only trick.` },
    { id: 'experiment', body: `Right now, standing up: hop a few inches off the floor and land with your knees locked straight. Feel that go up your spine. Now hop again and let your knees bend as you land. Same body, same height, same speed on arrival — and the second one you barely noticed. Your knees did not make you lighter. They made the landing last about five times longer.` },
    { id: 'smaller', body: `Smaller question. Forget catching. If a thing is moving and you want it to stop, something has to push against it — that is Lesson 1. Now: does it matter whether that push is enormous and brief, or gentle and long? Think of pushing a stalled car, versus being hit by one. Same total effect on the motion, wildly different experience. Once you see that the *same job* can be done two ways, momentum and impulse are just the names for the job and the ways.` },
    { id: 'backward', body: `Start from the airbag. A car company spends real money putting an explosive cushion in your steering wheel. It does not slow the car down — by the time it fires, the crash is already happening. It does not make you lighter. So the only thing it can possibly be changing is how far and how long your head travels while it is being stopped. Work backward from the fact that this is worth doing, and you have discovered that the force depends on the distance, not just on the crash.` }
  ],

  map: [
    { name: `Motion`, level: 5 },
    { name: `Inertia`, level: 5 },
    { name: `Momentum`, level: 4 },
    { name: `Mass`, level: 4 },
    { name: `Force`, level: 4 },
    { name: `Friction`, level: 4 },
    { name: `Balance & correction`, level: 4 },
    { name: `Velocity`, level: 3, fresh: true },
    { name: `Acceleration`, level: 3 },
    { name: `Center of mass`, level: 3 },
    { name: `Mass vs weight`, level: 3 },
    { name: `Gravity`, level: 3 },
    { name: `Energy`, level: 2 }
  ]
}
