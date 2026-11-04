// Navigation · Week 2 · Lesson 8 — learning to use a compass.
//
// The brief (§3, Week 2) asks for compass parts and terminology; direction of
// travel, bearing and azimuth; taking a bearing to a visible object; and
// holding and reading a compass accurately. The Field Guide's Chapter 8 wants
// a large labelled compass diagram, and Chapter 10 the taking-a-bearing
// procedure — so the simulation is the instrument itself, with its part names
// on a toggle, and the lesson teaches the two movements that make a reading
// mean something.
//
// MECHANICS, worked out before the copy and checked at five landmarks. The
// plan view is TRUE north up and the needle sits at the declination, −7.2°
// (Columbus, Ohio; NOAA NCEI WMM2025 at 1 Jan 2026 — Lesson 7's figure). With
// `aim` for the way the baseplate points and `dial` for the number at the
// index line, the orienting arrow points along true bearing (aim − dial), so
// boxing the needle means
//
//     dial = aim − declination,  which makes the dial read the MAGNETIC bearing
//     true = magnetic + declination
//
//   landmark        true   dial must read   converts back to
//   red barn        042        049.2            042.0
//   lone pine       115        122.2            115.0
//   radio mast      198        205.2            198.0
//   church spire    287        294.2            287.0
//   water tower     335        342.2            335.0
//
// The readout stays blank until the compass is both aimed and boxed, because a
// number produced by only one of the two movements is not a bearing to
// anything — which is the lesson.

export default {
  id: 'lesson-08',
  number: 3,
  week: 2,
  title: `Learning to use a compass`,
  openingQuestion: `You can see the water tower from here. A compass is in your hand. Between those two facts there is a number — and getting it out takes two separate movements, in order. Most people only ever do one of them.`,
  concept: `Aim it, box the needle, read it`,

  fieldGuide: {
    chapter: 10,
    title: `Taking and Following a Bearing`,
    exercise: `Taking bearings to three named landmarks from one spot in a familiar open place, writing each as three digits with an M, then moving fifty paces and taking them again — the five landmarks, outdoors and with a real instrument.`
  },

  see: {
    voice: 'professor',
    line: `Pick a landmark. Then two sliders: turn your body until the arrow is on it, turn the dial until the needle parks. Only then does a number appear.`,
    simulation: { id: 'compass', props: { mode: 'take' } },
    observations: [
      { text: `Turning your whole body swings the arrow around, and the needle **does not move**. It is reporting the room, not the instrument.` },
      { text: `Turning the dial moves the little green shed around the needle. That movement alone changes the number — and means nothing until the arrow is also on the thing.` },
      { text: `Both done, and the barn reads **049° magnetic**, which is **042° true** once you add Columbus's 7.2° west. Two movements, one number, and a direction you can hand to somebody else.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the parts have names worth knowing.`,
    sentences: [
      `A baseplate compass is two things screwed together. The **baseplate** is a protractor with a **direction-of-travel arrow** on it, and it does what you do — it points where you point it. The **housing** is a dial that turns independently, with the degrees printed round its rim and an **orienting arrow** fixed inside, and it does what your fingers do.`,
      `Taking a bearing is therefore two movements that must both happen. **Aim**: turn your whole body until the direction-of-travel arrow is on the thing you can see. **Box the needle**: turn the housing, without moving your feet, until the orienting arrow sits exactly underneath the red end of the needle — "put the dog in the kennel," as Scouts have said for a century. Now read the number where the index line meets the rim.`,
      `That number is a **bearing**: an angle clockwise from north, written with three digits — 005, 049, 342 — so nobody can read fifty for five. It is measured from *magnetic* north, because that is what the needle gave you, so it needs Lesson 7's arithmetic before it goes anywhere near a map.`
    ],
    comparison: {
      label: `LINING UP A PHOTOGRAPH`,
      body: `Think about taking a photograph of somebody across a room. There are two separate things to get right and they have nothing to do with each other: you point the camera at the person, and you turn the focus ring until the image is sharp. Pointing without focusing gives you a blurred picture of the right thing; focusing without pointing gives you a sharp picture of the wall. Neither one alone is a photograph. Aiming the baseplate and boxing the needle are exactly that pair — and a bearing taken with only one of them done is the blurred wall.`
    },
    naming: `Three habits separate a reading you can trust from one you cannot. **Hold it level**, at about waist height, flat in your open palm — tilt it and the needle drags on the glass or the dip pulls it against the pivot, and a few degrees go missing without any sign that they have. **Stand clear of metal**: a belt buckle, a phone, a watch, a car, a wire fence, the steel toecap of a boot. A degree or two of error costs about 31 yards for every mile you then walk, so a careless reading taken leaning on a gate can put you a couple of hundred yards wrong by lunchtime. And **say which north you mean** every time you write a bearing down — *049 M* or *042 T*. A bearing without its letter is a number that will be wrong half the times it is used.`,
    formalNames: {
      terms: [
        { term: `Baseplate`, meaning: `The clear plastic protractor the whole thing is mounted on. Its straight edge is a ruler for drawing lines on a map.` },
        { term: `Direction-of-travel arrow`, meaning: `The arrow printed on the baseplate, pointing away from you. The thing you aim.` },
        { term: `Housing, or bezel`, meaning: `The rotating dial with the degrees around its rim.` },
        { term: `Index line`, meaning: `The mark at the top of the housing where you read the bearing off. Sometimes called the read-here line.` },
        { term: `Orienting arrow`, meaning: `The outlined arrow fixed inside the housing, turning with it. The kennel the needle has to sit in.` },
        { term: `Orienting lines`, meaning: `The parallel lines printed in the housing floor, used to line the compass up with a map's grid in Lesson 10.` },
        { term: `Magnetic needle`, meaning: `The only part that answers to the Earth. Red end north, by near-universal convention — but check yours.` },
        { term: `Bearing`, meaning: `A direction as an angle clockwise from north, 000 to 359, always three digits.` },
        { term: `Azimuth`, meaning: `The same thing. Surveyors and the military tend to say azimuth, hikers tend to say bearing; some traditions reserve azimuth for angles measured from true north.` },
        { term: `Back bearing`, meaning: `The reverse direction: add 180 if the bearing is under 180, subtract 180 if it is over. The way you came, and the way to check you are still on the line.` },
        { term: `Cardinal and intercardinal points`, meaning: `N, E, S, W at 000, 090, 180, 270, and NE, SE, SW, NW at 045, 135, 225, 315. Useful for talking, too coarse for walking.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Aiming at one thing while adjusting another is a familiar pair of hands. Which of these have you done?`,
    items: [
      `Pointing a camera at somebody and then turning the focus until they are sharp.`,
      `Aiming a hose at a flower bed and then twisting the nozzle to get the spray right.`,
      `Holding a level against a shelf and then shimming it until the bubble centres.`,
      `Lining up a drill on a pencil mark and then checking it is square before pressing.`,
      `Pointing a TV remote at the set and still having to press the right button.`,
      `Setting a protractor's edge on a line and then reading the angle off the scale.`
    ],
    builder: {
      body: `Twenty minutes in the open, somewhere familiar — your own yard or a park you know. Take a real compass, stand well clear of cars and fences, and pick three things you can see and name: a chimney, a particular tree, a mast. Take a bearing to each one, properly: aim, box, read. Write all three down as three-digit numbers with an **M** after them. Now walk fifty paces to one side and take the three bearings again. Two of them will have changed a little and one — whichever is furthest away — will barely have moved at all. That is worth noticing, and Week 5 will make use of it.`
    },
    acrossCultures: {
      place: `THE INDIAN OCEAN, 15TH CENTURY`,
      label: `WELL DOCUMENTED`,
      paragraphs: [
        `Ahmad ibn Mājid, an Arab navigator born in Julfar on the Gulf coast around 1432, wrote extensively on navigation in the Indian Ocean. His *Kitāb al-Fawāʾid fī Uṣūl ʿIlm al-Baḥr wa-l-Qawāʿid* — the Book of Useful Information on the Principles and Rules of Navigation, completed in 1490 — is a systematic manual: routes, seasons, coastal landmarks, instruments and the magnetic compass, which by his time was in ordinary use aboard ship.`,
        `What is striking is the rose he worked with. Rather than a circle cut into equal degrees, his directions were named after where fifteen stars rise and where the same fifteen set — thirty points around the horizon — with due north and due south added to make thirty-two. The compass needle was fitted into that existing framework rather than replacing it, so a bearing was both an instrument reading and the name of a star you could go out and look at. It is the same job as a three-digit number, done in a language built out of the sky.`
      ],
      uncertain: `Ibn Mājid's own texts survive and are well studied, but the popular story that he personally piloted Vasco da Gama from Malindi to India in 1498 is doubtful — it rests on a sixteenth-century account written long after the fact, the named pilot is described inconsistently, and most specialists now reject the identification. How far his manuals describe ordinary practice across the whole Indian Ocean, rather than the practice he knew and argued for, is also hard to judge.`,
      sources: `Tibbetts, *Arab Navigation in the Indian Ocean before the Coming of the Portuguese* (1971), a translation and study of the *Kitāb al-Fawāʾid*; Ibn Mājid, *Kitāb al-Fawāʾid* (1490).`
    },
    ownPlaceholder: `Something I use that takes two separate adjustments…`,
    synthesis: `All six are the same shape: one movement that chooses the target and a second that makes the instrument honest about it. Doing only the first is the mistake a compass makes easy.`
  },

  feynman: {
    line: `This is the stage that counts. Write it and the lesson is yours.`,
    instruction: `Teach somebody to take a bearing to a tree they can see. Give the steps in order — **without using the words "rotate," "align," or "north-seeking."** Plain hands-and-feet words only.`,
    banned: ['rotate', 'align', 'north-seeking'],
    bannedNote: `one of those came back — and the instructions are clearer without it`,
    placeholder: `Hold it flat in your open hand, at about waist height. Now turn your whole body until…`,
    checks: [
      `Hold it flat and level, clear of metal.`,
      `Turn your whole body until the arrow on the baseplate is on the tree.`,
      `Keeping your feet still, turn the dial until the needle sits inside the outlined arrow.`,
      `Read the number at the index line, and write it with three digits and an M.`
    ],
    closing: `If your version keeps the two movements separate and in that order, you have it. If they run together, the number will come out wrong and look exactly as convincing.`
  },

  challenge: {
    voice: 'editor',
    line: `One about what the needle is doing, and one about the number itself.`,
    prediction: {
      question: `You have boxed the needle perfectly and the dial reads 049. Keeping your feet planted, you now turn your whole body ninety degrees to the right, without touching the dial. What does the compass show?`,
      options: [
        {
          id: 'same',
          text: `Still 049 — but the needle has swung out of its kennel.`,
          verdict: `Exactly right, and it is the clearest demonstration of what each part does. The dial has not moved, so the number has not moved — the 049 is still sitting at the index line, now meaning nothing at all. Meanwhile the needle stayed exactly where it was pointing, because it answers to the Earth and not to you, so from its point of view *you* rotated and it is now sticking out of the kennel at ninety degrees. The reading is stale the instant you turn.`
        },
        {
          id: 'onethirtynine',
          text: `139 — the reading follows your body round.`,
          verdict: `That is what a digital compass does, and it is a reasonable thing to expect from one. But a baseplate compass has no mechanism to do it: the number is painted on the housing, and the housing only turns when your fingers turn it. Nothing updated. What *did* change is the needle's position relative to the kennel — it is now ninety degrees out, which is the instrument's way of telling you the 049 is no longer about anything you are looking at.`
        },
        {
          id: 'needle',
          text: `The needle swings round to follow you and the reading holds.`,
          verdict: `The needle is the one part that never follows you. It points the same way whatever you do with the rest of the instrument — that was Lesson 6, and it is why the thing works at all. Turn your body and the baseplate, housing, numbers and arrows all swing round while the red end stays stubbornly put. Watching that happen is the quickest way to understand which part of a compass is an instrument and which part is just a protractor.`
        }
      ]
    },
    open: {
      question: `Why three digits? A bearing of five degrees is written 005, and everyone in navigation and aviation does it that way. What is wrong with just writing 5?`,
      placeholder: `Because a single digit could be confused with…`,
      reveal: [
        `Because bearings get written in a hurry, read aloud over bad radios, and copied by somebody who was not there. "Five" and "fifty" sound alike in wind; a handwritten 5 can be read as 50 if the pen slipped; and 50 degrees is not a small error — walk a mile on it and you are three-quarters of a mile from where you should be. Fixing the width at three digits removes the whole class of mistake: 005 cannot be read as 050, and 050 cannot be read as 500 because there is no such bearing.`,
        `It is the same reasoning behind saying "niner" for nine on the radio, and behind writing dates as 2026-11-04. The convention costs nothing and closes an error that is otherwise invisible, because a wrong bearing looks exactly as authoritative as a right one. Write all three digits every time, add M or T, and your notebook will still make sense to you next spring.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then you're done.`,
    prompt: `One thing I understand now that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 9: you have the number. Now walk it, across ground where you cannot see the far end — and find out why staring at the needle is the worst way to do it.`
  },

  routes: [
    { id: 'compass', label: `Explain it with a compass`, body: `Hold your compass flat and find the three things that move independently. The needle: it will not obey you at all, and it is the only part that is measuring anything. The housing: it turns when your fingers turn it, and it carries the numbers. The baseplate: it turns when your body turns, and it carries the arrow you aim. Three parts, three different masters — you, your fingers, and the Earth. Every mistake with a compass is a confusion about which of those three you just moved.` },
    { id: 'map', label: `Explain it with a map`, body: `A bearing is doing on the ground what a protractor does on paper. Put a protractor on a map with its zero along a north line, and read off the angle to anything you like — that is a bearing, measured with a plastic half-circle. A compass is the same protractor with one addition: a needle that finds north for you, so you can use it standing in a field with no printed lines anywhere. That is the entire difference between the instrument and the toy.` },
    { id: 'object', label: `Use an everyday object`, body: `Think of a kitchen timer with a ring you twist. The ring turns freely and carries the numbers; the pointer stays put. Twisting the ring to put "20 minutes" against the pointer is exactly what you do when you turn the housing to box the needle: you are bringing a printed scale round to meet a fixed reference. The difference is that a compass's fixed reference is not a painted mark — it is the planet.` },
    { id: 'diagram', label: `Show me a diagram`, body: `Go back to SEE IT and press **Name the parts**, then move only the first slider. Watch the labels swing round with the baseplate while the red needle stays exactly where it is. Now move only the second slider and watch the green outlined arrow travel round the inside of the housing. Those are the two movements, separated, one at a time. Then do them in order on the barn and watch the readout fill in only when the second one lands.` },
    { id: 'example', label: `Walk me through an example`, body: `Take the water tower in SEE IT, step by step. It sits at 335 true. Turn your body until the direction-of-travel arrow is on it — the aim readout stops counting down and says you are on it. Now turn the dial. The needle is sitting at 7.2° west of up, so the kennel has to come round to meet it there, and the number that ends up at the index line is 342. Write it as **342 M**. Convert for the map: 342.2 plus the declination of −7.2 gives **335 T**, which is where the tower actually is. Both numbers are correct, and they are seven degrees apart.` },
    { id: 'smaller', label: `Break it into smaller steps`, body: `Three small questions. One: can the compass tell which thing you are interested in? No — only your body can, by pointing the arrow at it. Two: can your body tell where north is? No — only the needle can. Three: so how many separate pieces of information does the instrument need before it can give you a number? Two, and you supply one of them. That is why there are two movements and why neither is optional.` },
    { id: 'backward', label: `Work backward from the answer`, body: `Start from a bearing somebody handed you: 049 M. Work backward and ask what somebody must have done to produce it. They stood somewhere. They pointed the arrow at something. They brought the kennel round to the needle. The number came off the rim. Notice what the bearing does *not* contain: where they stood, or how far away the thing was. Three people standing in three different places, all looking at the same barn, will hand you three different numbers — and a bearing with no position attached is Lesson 1's lost friend all over again.` }
  ],

  map: [
    { name: `Taking a bearing`, level: 4 },
    { name: `Compass parts`, level: 4 },
    { name: `Bearing & distance`, level: 4 },
    { name: `Converting a bearing`, level: 4 },
    { name: `Declination`, level: 4 },
    { name: `Back bearing`, level: 2 },
    { name: `Magnetic interference`, level: 3 },
    { name: `Magnetic field`, level: 4 },
    { name: `True, magnetic & grid north`, level: 4 },
    { name: `Direction vs. position`, level: 5 },
    { name: `Latitude & longitude`, level: 5 },
    { name: `Map scale`, level: 4 },
    { name: `Following a bearing`, level: 1 }
  ]
}
