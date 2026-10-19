// Anatomy & Physiology · Week 3 · Lesson 13 — every joint makes a bargain.
//
// The spec asks for cartilage, tendons, ligaments and synovial fluid to be
// distinguished, and for knee, shoulder, hip and spine as examples. The thread
// holding those together is the trade: range against steadiness. The shoulder
// and the hip are the same kind of joint answering opposite questions, and
// putting them side by side teaches more than either does alone.

export default {
  id: 'lesson-13',
  number: 3,
  week: 3,
  title: `Joints, cartilage, tendons and ligaments`,
  openingQuestion: `Your shoulder can put your hand almost anywhere — over your head, behind your back, across your chest. Your hip, built from the same ball-and-socket plan, can do a fraction of that. And your shoulder dislocates far more easily than any other joint you own. Those two facts about the shoulder are not a coincidence. They are the same fact.`,
  concept: `Range against steadiness`,

  see: {
    voice: 'professor',
    line: `{name}, go straight to the shoulder and the hip and flip between them. They are built on the same plan, and they made opposite decisions.`,
    simulation: { id: 'joint' },
    observations: [
      { text: `The shoulder has the **largest range** in the body — and a socket covering only about a quarter of the ball, held by muscle rather than by bone.` },
      { text: `The hip is the same kind of joint with a **deep** socket. Far less range, and dislocating one normally takes a car accident.` },
      { text: `So the shoulder's gift and its weakness are one decision. About half of all dislocations seen are shoulders, and that is the bill for being able to reach behind your own back.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and then four words worth keeping straight.`,
    sentences: [
      `No joint gets both range and steadiness. A deep socket and tight ligaments make a joint hard to displace **and** hard to move; a shallow one does the reverse. Every joint in you sits somewhere on that line, and where it sits is its whole design.`,
      `What holds a joint together varies with that decision. The hip is held by its own **shape**. The shoulder is held almost entirely by **muscle** — which is why shoulder trouble is so often treated with exercise rather than with surgery.`,
      `And the surfaces have to last eighty years of rubbing. Cartilage caps the bone ends and synovial fluid wets them, giving a joint less friction than ice on ice — slipperier than anything we have ever manufactured.`
    ],
    sequence: {
      label: `FOUR WORDS PEOPLE MIX UP`,
      note: `and they are genuinely different things`,
      steps: [
        { name: `Cartilage`, body: `A smooth, slightly springy cap on the end of each bone. No blood supply of its own, which is why it mends so poorly once damaged.` },
        { name: `Ligament`, body: `**Bone to bone.** It stops things — a check-rein limiting how far a joint can go. The knee's famous four are these.` },
        { name: `Tendon`, body: `**Muscle to bone.** It pulls things. Your Achilles is one, and so is every cord you can feel standing out on the back of your hand.` },
        { name: `Synovial fluid`, body: `A slippery liquid sealed inside the joint capsule, thinning when you move faster. It lubricates, and it feeds the cartilage, which has no other supply.` }
      ]
    },
    comparison: {
      label: `A DOOR AND A SWIVEL CHAIR`,
      body: `A door on hinges does one thing perfectly and nothing else: it cannot be pushed sideways off its frame, and it will never let you through at an angle. A swivel chair goes anywhere — turns, tilts, rolls — and a firm shove sends it across the room. Nobody would call the chair badly made, and nobody would hang a door on castors. Your knee is the door and your shoulder is the chair, and each is right for its job. *Where the analogy stops:* a door's hinge is held by screws that do nothing else. Your shoulder is held by muscles that are also the things moving it — the same tissue doing both jobs, which is why it can be trained and why it tires.`
    },
    naming: `A joint with a fluid-filled capsule is a **synovial** joint, which covers nearly every joint you can move. The gristle on a bone end is **articular cartilage**, and when it wears thin the result is **osteoarthritis** — the commonest joint problem there is, and far more a matter of wear, load, injury history and inheritance than of simple age. A joint pushed past its ligaments' limit is **sprained**; a joint whose surfaces come fully apart is **dislocated**. Which of those has happened to a particular person is a question for an examination, not for a description.`,
    formalNames: {
      terms: [
        { term: `Synovial joint`, meaning: `A joint with a sealed capsule of lubricating fluid between cartilage-capped bone ends. Knee, hip, shoulder, knuckle — almost everything that moves freely.` },
        { term: `Articular cartilage`, meaning: `The smooth cap on each bone end. No blood supply, no nerves, and very limited repair — which is why damage to it matters so much.` },
        { term: `Ligament`, meaning: `Bone to bone. Limits movement and holds a joint together. Heals slowly, because it too has a poor blood supply.` },
        { term: `Tendon`, meaning: `Muscle to bone. Transmits pull. Mostly collagen, laid in parallel — the same protein as yesterday's bone, arranged for tension alone.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've met.`,
    items: [
      `A footballer's cruciate ligament, and a season gone.`,
      `A shoulder that "goes out" and has to be put back.`,
      `Knees that complain on stairs, going down more than up.`,
      `An Achilles tendon you can feel like a cord above the heel.`,
      `Knuckles that crack, and someone insisting it causes arthritis.`,
      `A hip replacement, and how completely it changed things.`
    ],
    builder: {
      body: `Sit down and put one hand flat on your kneecap, then slowly straighten and bend the leg a few times. You can feel the kneecap riding up and down in its groove — it is a bone floating inside a tendon, acting as a pulley to change the angle the thigh muscle pulls at. Now reach up with the other hand and feel the point of your shoulder while you lift the arm out sideways. There is far less bone involved than you expect, and what you can feel moving under your fingers is mostly muscle and tendon. Two joints, two completely different sensations, and now you know why.`
    },
    ownPlaceholder: `A joint of mine I've had cause to think about…`,
    synthesis: `The knee on the stairs is worth noticing — going down hurts more because the joint is taking far more force on the way down, with the muscle lengthening under load. Same joint, same person, very different demand.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain why your shoulder moves so much further than your hip, and why it dislocates so much more easily — **without using the words "ligament" or "socket."**`,
    banned: ['ligament', 'socket'],
    bannedNote: `one of those crept in — and the idea is a trade, not a part`,
    placeholder: `The two things are connected, because…`,
    checks: [
      `A joint can be built to move a lot, or to stay put, but not both.`,
      `The shoulder's bones barely cup each other, which is what lets it move so far.`,
      `It is held together mostly by muscle rather than by its own shape.`,
      `So the thing that gives it the range is the same thing that makes it easier to displace.`
    ],
    closing: `If your version says the range and the weakness are one decision, you have the lesson — and you can now look at any joint in any animal and guess what it was built for.`
  },

  challenge: {
    voice: 'editor',
    line: `One piece of received wisdom, and one about a surface that cannot mend.`,
    prediction: {
      question: `Cracking your knuckles. Does it cause arthritis?`,
      options: [
        {
          id: 'yes',
          text: `Yes — repeatedly stressing a joint like that must wear it out.`,
          verdict: `The underlying reasoning is sound and applies well elsewhere: joints genuinely do respond to repeated loading, and occupational wear is real. But it does not apply here, because cracking a knuckle is not loading it much. The sound is a bubble forming in the fluid as the joint surfaces are pulled briefly apart — a drop in pressure, not an impact. Studies looking for a link have not found one, including a famous one by a doctor who cracked the knuckles of one hand only for sixty years and compared them.`
        },
        {
          id: 'no',
          text: `No — the sound is something happening in the fluid, not damage to the joint.`,
          verdict: `Right. Pulling the surfaces slightly apart drops the pressure in the synovial fluid and a gas bubble forms, with the pop being its formation. It takes about twenty minutes before the gas redissolves and you can do it again, which is why you cannot crack the same knuckle twice in a row. No link to arthritis has been shown. There is some evidence of reduced grip strength and swelling in habitual crackers, so it is not entirely free — but not the thing it is accused of.`
        },
        {
          id: 'unknown',
          text: `Nobody really knows — it's one of those things people argue about.`,
          verdict: `A reasonable instinct when a claim is folklore, and good scepticism in general. But this particular question has actually been looked at properly more than once, with consistent results, which is more than can be said for a lot of received wisdom about the body. Sometimes the answer really is in. Worth noticing the difference between "contested" and "settled but still repeated."`
        }
      ]
    },
    open: {
      question: `Cartilage has **no blood supply at all** — no vessels run into it. Yet it is the surface taking every step you have ever taken. How does it stay alive, and what does that tell you about what happens when it is damaged?`,
      placeholder: `If nothing is delivering to it, then…`,
      reveal: [
        `It is fed by being squashed. Every time you load the joint, fluid is pressed out of the cartilage; every time you unload it, fluid soaks back in, bringing oxygen and nutrients from the synovial fluid with it. The cartilage is a sponge, and **movement is its circulation**. A joint that is never moved starves its own cartilage, which is one reason rest is no longer the universal prescription it once was.`,
        `And the consequence for damage is severe. Everything you have met so far that repairs well — bone, muscle, skin — repairs well partly because blood reaches it with cells and materials at speed. Cartilage has none of that. It mends slowly, badly, and often with a rougher material than it started with, which is why cartilage injuries have outcomes so unlike broken bones.`,
        `This is also why osteoarthritis is not simply "old joints". It is the accumulated result of load, past injuries, body weight, the shape you inherited, and how much the joint has been moved — with age being the time over which those add up rather than the cause itself. Whether any of it applies to a particular aching knee is a question for someone who can examine it.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Then you're done for today.`,
    prompt: `One thing about my own joints I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 14: the things doing the pulling. A muscle fibre has no volume control — it is on or it is off — so where does the difference between lifting a teaspoon and lifting a suitcase come from?`
  },

  routes: [
    { id: 'analogy', body: `A tripod and a ball head on a camera. The tripod legs are locked and go nowhere, which is exactly what you want holding the weight. The ball head on top swivels anywhere and is held by nothing but friction — and if you loosen it while the camera is on, the whole thing flops over. Two joints in one object, each built for an opposite requirement, and nobody thinks either is a mistake.` },
    { id: 'object', body: `Hold your hand out flat and waggle your fingers while looking at the back of your hand and your forearm. The cords standing up on the back of your hand are tendons — and the muscles pulling them are not in your hand at all, they are in your forearm. Squeeze your forearm with the other hand while you move your fingers and you can feel them working, six inches away from what they are moving. That is what a tendon is for.` },
    { id: 'story', body: `The rotator cuff — four smallish muscles wrapping the shoulder — was long treated as a minor detail of anatomy. Then throwing sports and an ageing population made shoulder pain one of the commonest complaints in any clinic, and it became clear that in a joint held together by muscle rather than bone, those four muscles are not a detail at all. They are the socket the shoulder does not have. Much of modern shoulder treatment is simply taking that seriously.` },
    { id: 'experiment', body: `Stand up and try to touch your toes, noting where you get to. Now do it again, and this time pay attention to where the bending is happening. Almost none of it is at any single joint — it is ten degrees here, ten degrees there, down twenty-four small joints in your back, plus a good deal from the hips. Nothing in you bends double. A great many small permissions add up to one large movement, and that is the spine's answer to the same trade everything else makes.` },
    { id: 'smaller', body: `Forget joints. One question: if you wanted something to move freely in all directions, how deep would you make the cup it sits in? Shallow — a deep one gets in the way. Now ask what holds a ball in a shallow cup. Nothing, unless something pulls it in from outside. You have just designed a shoulder, and you have designed its weakness at the same moment, because there was no other way to get the movement.` },
    { id: 'backward', body: `Start with the fact that a dislocated shoulder is often put back in by hand in a few minutes, while a dislocated hip is a surgical emergency. Why such different events? Because of what had to happen for each to occur at all. A shoulder can come out of a shallow cup with a bad fall; a hip can only leave a deep one if something enormous has happened to the leg. Work backwards from how hard each was to displace and you arrive at the depth of the cup, and from there at the whole trade.` }
  ],

  map: [
    { name: `Joints and connective tissue`, level: 4, fresh: true },
    { name: `Bone and the skeleton`, level: 5 },
    { name: `DNA and proteins`, level: 5 },
    { name: `Homeostasis`, level: 5 },
    { name: `Circulation`, level: 5 },
    { name: `Blood and vessels`, level: 5 },
    { name: `Nerves and signalling`, level: 4 },
    { name: `The cell`, level: 5 },
    { name: `Molecules`, level: 5 },
    { name: `Cellular energy`, level: 5 }
  ]
}
