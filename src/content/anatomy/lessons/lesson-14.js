// Anatomy & Physiology · Week 3 · Lesson 14 — where force comes from.
//
// The idea the simulation is built around, and the one most teaching skips: a
// muscle fibre has no volume control. It contracts fully or not at all, so a
// muscle cannot make each fibre pull harder — it switches more of them on.
// The learner can watch "each one is pulling 100%" refuse to move while the
// force climbs, which is the whole lesson in one readout.

export default {
  id: 'lesson-14',
  number: 4,
  week: 3,
  title: `The major muscles and how they work`,
  openingQuestion: `Pick up a teaspoon, then pick up a full suitcase. It is the same arm and the same muscle, and it obviously did something different the second time. But here is the awkward part: a single muscle fibre has no volume control at all. Told to contract, it contracts completely; told nothing, it does nothing. So what actually changed?`,
  concept: `More fibres, not harder ones`,

  see: {
    voice: 'professor',
    line: `{name}, slide the effort up and keep your eye on the middle number. It is the one that refuses to move, and that is the lesson.`,
    simulation: { id: 'muscle-unit' },
    observations: [
      { text: `At light effort only a few bundles were switched on — the smallest ones, which is why delicate work is possible at all.` },
      { text: `As the load grew, **more bundles joined**. The ones already working did not pull any harder, because they could not.` },
      { text: `"Each one is pulling 100%" never changed. Force came from how much of the muscle was recruited — not from how hard any part of it tried.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first is a mechanism you can almost see.`,
    sentences: [
      `Inside a fibre, two sets of filaments **slide past each other**. Little heads on the thick filament reach out, grab the thin one, pull, let go and reset — thousands of them, out of step, so the pull is smooth. Each grab-and-pull costs one ATP, which is where Lesson 3's currency is actually spent.`,
      `A fibre is **all or nothing**. One nerve cell controls a batch of fibres and they all fire together, so the only way to get more force is to switch on more batches. Smallest first, which is why you can thread a needle and also carry a bag.`,
      `And muscles always work in **groups**. One pulls, another lets go in a controlled way, several more hold the joint steady so the pull goes where it was meant to. Nothing you do uses one muscle.`
    ],
    sequence: {
      label: `THREE KINDS OF MUSCLE`,
      note: `and only one takes orders from you`,
      steps: [
        { name: `Skeletal`, body: `Attached to bone, striped, and under your command. The only kind you can decide to move — and the kind this whole lesson is about.` },
        { name: `Cardiac`, body: `Only in the heart. Striped like skeletal muscle, but it contracts on its own schedule and never tires. Lesson 6's pump.` },
        { name: `Smooth`, body: `In blood vessels, gut, airways, bladder. Not striped, not under your control, and slow — but it can hold a contraction for hours without fatigue. It narrowed your skin vessels in Lesson 9.` },
        { name: `All three`, body: `Built from the same sliding-filament trick, arranged differently and switched differently. The mechanism is one invention used three ways.` }
      ]
    },
    comparison: {
      label: `A ROOM FULL OF LIGHT SWITCHES`,
      body: `Imagine a hall lit by two hundred bulbs, each with its own switch and no dimmers anywhere. You cannot make a bulb glow at half brightness — but you can have any number of them on, so the room can be at any level you like. From outside, it looks exactly like a dimmer. That is a muscle: no fibre has a dimmer, and yet your grip is infinitely adjustable. *Where the analogy stops:* the bulbs would all be identical. Your fibres are not — the small ones switch on first and tire slowly, the big ones come in last and tire fast, which is why a delicate job you can do all day becomes impossible the moment you are also straining.`
    },
    naming: `A nerve cell plus the fibres it commands is a **motor unit**, and bringing more of them in is **recruitment**. The sliding filaments are **actin** (thin) and **myosin** (thick), and the heads doing the grabbing are **cross-bridges**. The stripes you can see in skeletal muscle under a microscope are those filaments lined up in register — a muscle looks striped because it is built out of repeating units of exactly the same length. How many fibres one nerve cell commands tells you what the muscle is for: around ten in the muscles moving your eye, and a thousand or more in your thigh.`,
    formalNames: {
      terms: [
        { term: `Motor unit`, meaning: `One nerve cell and every fibre it controls. The smallest amount of muscle you can switch on — you cannot have half of one.` },
        { term: `Recruitment`, meaning: `Bringing in more motor units for more force, smallest first. The whole of how force is graded.` },
        { term: `Actin and myosin`, meaning: `The thin and thick filaments that slide past each other. Myosin's heads grab actin, pull, release and reset, one ATP per cycle.` },
        { term: `Antagonist`, meaning: `The muscle on the other side of a joint. Your biceps bends the elbow and your triceps straightens it; neither can push, so joints need both.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've felt.`,
    items: [
      `A hand shaking while holding something heavy at arm's length.`,
      `Being much stronger with both hands than with one.`,
      `Threading a needle, and finding it harder when tired.`,
      `Aching two days after unaccustomed work, not the day of it.`,
      `Being told to use your legs rather than your back when lifting.`,
      `Someone wiry turning out to be much stronger than they look.`
    ],
    builder: {
      body: `Hold your arm straight out in front of you, palm down, and stay there. For the first twenty seconds nothing much happens. Then it begins to shake — not smoothly tiring, but trembling — and the trembling gets worse until you have to drop it. That tremor is recruitment in action: the units that started are failing, new ones are being brought in to replace them, and the handovers are not perfectly smooth. What you are feeling is a muscle running out of fresh bundles to call on, one batch at a time.`
    },
    ownPlaceholder: `Something I've noticed my muscles doing…`,
    synthesis: `The needle one is the giveaway. Fine control depends on having small units available to switch on — and when the small ones are tired, the next ones in are far bigger and far cruder, so your hand stops being precise before it stops being strong.`
  },

  feynman: {
    line: `Teach it, and the forbidden words are the easy ones.`,
    instruction: `Explain how the same muscle can lift a teaspoon and a suitcase — **without using the words "recruit" or "motor unit."**`,
    banned: ['recruit', 'motor unit'],
    bannedNote: `one of those came back — and the idea is about how many, not about terminology`,
    placeholder: `Each little bundle is either on or off, so…`,
    checks: [
      `Each fibre is either fully on or fully off — there is no in-between.`,
      `So more force means switching on more of them, not pulling harder with the ones already going.`,
      `The small ones come on first, which is why light work can be precise.`,
      `Inside each fibre, two sets of filaments slide past each other to shorten it.`
    ],
    closing: `If your version has "more of them" rather than "harder", you have it — and you now know why your hand shakes before it fails.`
  },

  challenge: {
    voice: 'editor',
    line: `One about soreness, and one about strength that is not size.`,
    prediction: {
      question: `You ache badly two days after unaccustomed work. Is that lactate left over from the effort?`,
      options: [
        {
          id: 'lactate',
          text: `Yes — lactate built up during the work and is still sitting there.`,
          verdict: `This is one of the most widely repeated things about exercise and it is simply not so, which is worth saying plainly. Lactate clears within about an hour of stopping — long before the ache arrives. The timing alone rules it out: something that peaks at 24 to 48 hours cannot be caused by a substance that was gone the same evening. Lesson 3 flagged this, and it is worth un-learning properly.`
        },
        {
          id: 'damage',
          text: `No — it's small-scale damage and the repair response to it.`,
          verdict: `Right, and the delay is the clue that cracks it. Unaccustomed work, especially the lengthening-under-load kind like walking downhill, causes microscopic disruption in the fibres. The soreness is the inflammatory repair response arriving, which takes a day or so to build — which is also why it is called delayed-onset muscle soreness. And it is the beginning of the adaptation: repair is how the muscle ends up able to do it next time.`
        },
        {
          id: 'tear',
          text: `No — you've torn something, and it needs rest until it stops.`,
          verdict: `Worth taking seriously because the distinction genuinely matters. A strain or tear is usually sudden, often felt at the moment it happens, frequently one-sided, and tends to hurt in a specific spot rather than through a whole muscle group. Ordinary soreness comes on the next day, is diffuse, affects both sides if you worked both, and eases with gentle movement. Pain that is sharp, sudden, one-sided or not settling is worth having looked at rather than worked through.`
        }
      ]
    },
    open: {
      question: `Someone starts training and is noticeably stronger within **two or three weeks** — but no bigger at all. Nothing about the muscle has visibly changed. So where did the strength come from?`,
      placeholder: `If the muscle is the same size, then something else must have…`,
      reveal: [
        `From the nervous system, not the muscle. Most of the first few weeks of any strength gain is **learning**: switching on more units at once, switching them on in better time with each other, and relaxing the muscles that were opposing the movement without being asked. You were never using all of your muscle, and now you are using more of it.`,
        `There is a safety reason you were not. Your nervous system holds something back — a margin that keeps you from generating forces your own tendons and bones might not survive. Training nudges that margin, which is why early gains are fast and then slow sharply once the easy part is spent and actual tissue has to be built.`,
        `It is also a caution worth carrying into tomorrow's lesson. If strength can climb for weeks while nothing structural has changed, then a person can become able to generate forces their tendons and bones have not yet adapted to. The muscle gets permission before the rest of the body has earned it — which is exactly the mismatch Lesson 15 is about.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about my own muscles I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 15 — the last of the week, and it ties bone, joint, muscle, nerve and blood together. Your muscles recover in days. Your tendons take months. Only one of them tells you how it is getting on.`
  },

  routes: [
    { id: 'analogy', body: `A rowing eight. Every rower pulls as hard as they can or sits the stroke out — there is no half-effort in a racing boat. To move the boat faster you do not ask for more from each rower, you put more rowers in. And the crew only works because they are in time with each other; eight strong rowers out of time are slower than six in time. Both halves of that are true of a muscle.` },
    { id: 'object', body: `Hold a full mug out in front of you with your arm straight and your other hand wrapped around your upper arm. Now slowly lower the mug to the table without letting it drop. You can feel the muscle working the whole way down — while getting longer. That is a muscle resisting rather than pulling, it is the hardest thing you ask of one, and it is where most next-day soreness comes from.` },
    { id: 'story', body: `The sliding-filament explanation was published in 1954 by two separate teams, in back-to-back papers in the same issue of Nature, having reached it independently by completely different methods. Before that, the leading idea was that the filaments themselves coiled up and shortened like a spring — which turned out to be wrong, and had held the field for decades. The two papers settled it almost overnight, and one of the authors, Hugh Huxley, spent the next forty years filling in how.` },
    { id: 'experiment', body: `Grip something and squeeze as hard as you can for five seconds, then let go and immediately try to thread a needle or write your name neatly. It is noticeably harder, and for a few seconds your hand feels coarse. You have just tired the units you would normally use for fine work and left yourself with the big crude ones. Wait a minute and the precision comes back as the small units recover.` },
    { id: 'smaller', body: `Forget muscles. One question: if you had a hundred identical motors that each only ran at full speed, how would you build a machine with a smoothly adjustable output? Run some of them. Now ask how you would make it smooth rather than jumping in big steps — use small motors for the small jobs and save the big ones for later. You have just invented recruitment, in the order your own body uses.` },
    { id: 'backward', body: `Start with the shaking. Why would a muscle tremble when it is tired rather than just fading quietly away? Because it is not one thing getting weaker — it is a set of separate batches, some failing and others being brought in to cover, and the handovers show. Work backwards from a tremor and you arrive at the discrete, all-or-nothing nature of the whole arrangement.` }
  ],

  map: [
    { name: `Muscles and movement`, level: 4, fresh: true },
    { name: `Joints and connective tissue`, level: 4 },
    { name: `Bone and the skeleton`, level: 5 },
    { name: `Nerves and signalling`, level: 5 },
    { name: `Cellular energy`, level: 5 },
    { name: `DNA and proteins`, level: 5 },
    { name: `Homeostasis`, level: 5 },
    { name: `Circulation`, level: 5 },
    { name: `The cell`, level: 5 },
    { name: `Receptors and signals`, level: 5 }
  ]
}
