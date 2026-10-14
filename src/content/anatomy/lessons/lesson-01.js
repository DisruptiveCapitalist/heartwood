// Anatomy & Physiology · Week 1 · Lesson 1 — arrangement, not ingredients.
//
// This copy is the design handoff's, approved by the learner, transcribed
// rather than rewritten. Two things about it are load-bearing:
//
//   The See It visual is guess-first. The grid stays grey until the learner
//   commits, because "which jar is heaviest?" only teaches if you have taken a
//   side. All four guesses get a real reply; iron and calcium are the
//   interesting wrong ones and neither is treated as a mistake.
//
//   FEYNMAN IT bans nothing. The other classes ban the word that lets you dodge
//   the explanation; here plain words are the whole point, so `unrestricted`
//   says so rather than carrying a token banned word.
//
// The weight slider in the visual is arithmetic only and is never stored. The
// course spec forbids keeping anything about the learner's own body.

export default {
  id: 'lesson-01',
  number: 1,
  week: 1,
  title: `What are we made of?`,
  openingQuestion: `Every part of you — your heart, your bones, the thought you are having right now — is built from atoms. Not special ones: the same kinds that make up air, seawater and garden soil. So which ones, and how much of each?`,
  concept: `Arrangement, not ingredients`,

  see: {
    voice: 'professor',
    line: `{name}, imagine sorting every atom in your body into jars, one jar for each kind. Before you look — which jar is heaviest?`,
    simulation: { id: 'element-grid' },
    observations: [
      { text: `Nearly two-thirds of your weight is oxygen — most of it locked inside **water**.` },
      { text: `Count atoms instead of weighing them and hydrogen wins: roughly **six of every ten** atoms in you are hydrogen.` },
      { text: `Six ordinary elements make up about 99% of you. None is rare. So whatever makes you alive, it isn't the ingredients.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences. That's the whole idea.`,
    sentences: [
      `You are built from a couple of dozen kinds of atom, and just six — oxygen, carbon, hydrogen, nitrogen, calcium and phosphorus — make up about 99% of your weight.`,
      `Oxygen leads by weight because you are mostly **water**, and almost all of a water molecule's weight is its oxygen. Hydrogen leads by count because it is the smallest atom and it is in nearly every molecule you have.`,
      `What makes you alive is not special atoms but **arrangement**: atoms join into molecules, molecules build cells, and cells build everything else — in layers, each one doing something the layer below it can't.`
    ],
    sequence: {
      label: `THE LADDER — SMALLEST TO LARGEST`,
      note: `each rung is built from the one before`,
      steps: [
        { name: `Atom`, plate: 'atom', body: `The smallest piece of an element. One oxygen atom.` },
        { name: `Molecule`, plate: 'water', body: `Atoms joined together. Water: two hydrogen atoms and one oxygen.` },
        { name: `Cell`, plate: 'cellWhole', body: `The smallest thing that is alive. You have roughly 30 trillion; most are red blood cells.` },
        { name: `Tissue`, plate: 'tissue', body: `Cells of a kind working together — muscle tissue, nerve tissue.` },
        { name: `Organ`, plate: 'organ', body: `Several tissues combined to do a job. The heart is muscle, nerve, connective tissue and a smooth lining.` },
        { name: `Organ system`, plate: 'system', body: `Organs that cooperate. Heart + blood vessels + blood = the circulatory system.` },
        { name: `Organism`, plate: 'organism', body: `All the systems together, keeping each other going. You.` }
      ]
    },
    comparison: {
      label: `THE ALPHABET`,
      body: `Twenty-six letters write every book in the library. The letters in a cookbook and a love letter are the same; what differs is the order. Atoms are like that. Hydrogen and oxygen in one arrangement are water, which you drink. Add a single extra oxygen atom and you have hydrogen peroxide, which bleaches hair. *Where the analogy stops:* letters sit quietly on the page. Atoms don't — they pull on each other, swap partners, and release or absorb energy when they do. That restlessness is what Lesson 3 is about.`
    },
    naming: `Living things follow exactly the same chemistry as everything else in nature. That is well established. What is remarkable is the **organization** — and keeping it organized, every second, is most of what your body is doing. The rest of this course climbs the ladder one rung at a time.`,
    formalNames: {
      terms: [
        { term: `Element`, meaning: `One pure kind of matter — oxygen, carbon, iron. There are about ninety that occur naturally; your body uses roughly two dozen of them.` },
        { term: `Atom`, meaning: `The smallest piece of an element that is still that element. Far too small to see — a single cell contains trillions.` },
        { term: `Molecule`, meaning: `Two or more atoms held together. Water is a small one, three atoms. A protein can contain many thousands.` },
        { term: `Organic molecule`, meaning: `A molecule built on carbon — sugars, fats, proteins, DNA. "Organic" here is a chemistry word, not a farming one.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `You've met these elements before, out in the world. Tap any that ring a bell.`,
    items: [
      `Milk advertised "for strong bones" — that's calcium, the fifth jar.`,
      `A blood-test report listing sodium, potassium and calcium.`,
      `A sports drink promising to replace "electrolytes."`,
      `Rust on an old gate — iron joined to oxygen, the same pair your blood relies on.`,
      `Breathing out — the carbon dioxide leaving you carries carbon from food you ate.`,
      `Salt on the table: sodium and chlorine, joined.`
    ],
    builder: {
      body: `Fill a two-litre bottle with water and lift it. That's about four and a half pounds. An adult who weighs around 150 pounds carries roughly twenty of those bottles inside — in the blood, in the muscles, and inside every single cell. That water is where most of your oxygen lives.`
    },
    ownPlaceholder: `Somewhere I've met one of these elements…`,
    synthesis: `Good. Notice that every one of those is an element doing a job because of what it's joined to — iron in blood or in rust, sodium in salt or in a nerve. Same atoms, different arrangements.`
  },

  feynman: {
    line: `Your turn to teach it.`,
    instruction: `Explain to a friend who has never studied biology: if you are built from the same atoms as air, water and soil, **what makes you different from a pile of them?** Use any words you like — plain ones are better here.`,
    unrestricted: true,
    banned: [],
    bannedNote: ``,
    placeholder: `The atoms are the same, but…`,
    checks: [
      `We're made of ordinary elements — mostly oxygen, carbon, hydrogen and nitrogen — the same ones found everywhere else.`,
      `What matters is how the atoms are joined and arranged, not which atoms they are.`,
      `Atoms build molecules, molecules build cells, and cells build tissues, organs and whole systems.`,
      `Being alive is that organization, kept running all the time — not a special ingredient.`
    ],
    closing: `If yours has those ideas in any words at all, you've got it. Missing one? Add a sentence and read it again.`
  },

  challenge: {
    voice: 'editor',
    line: `Two questions. I'm not trying to catch you — I'm testing whether the idea holds.`,
    prediction: {
      question: `An adult weighs 150 pounds. Roughly how much of that is calcium?`,
      options: [
        {
          id: 'twenty',
          text: `About 20 pounds — bones are heavy.`,
          verdict: `That's the most natural guess, because bones feel like the heavy part of us. But a skeleton is only about 15% of body weight, and bone is roughly a quarter water and a quarter protein, collagen above all. The calcium itself comes to about 1.5% of the body — closer to two and a quarter pounds.`
        },
        {
          id: 'two',
          text: `About 2 pounds.`,
          verdict: `Right — about 1.5% of the body, so roughly two and a quarter pounds in a 150-pound adult, nearly all of it in bones and teeth. Small, but it is doing a lot: holding you up, and, in the tiny amount outside bone, helping every muscle contract. Lessons 11 and 12 open up the bones.`
        },
        {
          id: 'ounce',
          text: `Less than an ounce.`,
          verdict: `That's the right size for iron — about 4 grams — so it's a reasonable instinct for any mineral. Calcium is different: there's much more of it, around two and a quarter pounds, because it is the main mineral in your skeleton.`
        }
      ]
    },
    open: {
      question: `Diamond, pencil lead and table sugar all contain carbon — and you carry about 27 pounds of it. So why aren't you hard like a diamond, or sweet like sugar?`,
      placeholder: `Carbon must behave differently depending on…`,
      reveal: [
        `Because what carbon does depends on what it's joined to and how. In a diamond, every carbon is locked to four other carbons in a rigid crystal — hence the hardness. In pencil lead, carbon lies in flat sheets that slide off onto paper. In sugar, a few carbons are bound with hydrogen and oxygen into a small ring your tongue reads as sweet. In you, carbon forms the backbone of long, flexible chains — proteins, fats, DNA — with hydrogen, oxygen and nitrogen hanging off them.`,
        `Same element; four different arrangements; four completely different materials. Lesson 4 comes back to those chains.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Then you're done for today.`,
    prompt: `One thing about what I'm made of that I didn't know this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 2: the cell — the smallest thing that is alive, and everything it has to get done every second to stay that way.`
  },

  routes: [
    { id: 'analogy', body: `Think of a box of building bricks with only six shapes in it. With those six you can build a house, a ship, a giraffe. Nobody would say the giraffe is made of special giraffe bricks — it is the way the bricks are put together. Your body is built from six main kinds of atom. Where the analogy stops: bricks don't stick themselves together. Atoms do, and that's what makes chemistry possible.` },
    { id: 'object', body: `Pick up the salt shaker. Sodium, on its own, is a soft metal that bursts into flame in water. Chlorine, on its own, is a poisonous green gas. Join one of each and you get the white crystals you sprinkle on supper. Nothing was added or taken away — only the arrangement changed. That is the whole lesson in a shaker.` },
    { id: 'story', body: `An old house is taken down and every brick, beam and pipe is stacked neatly in the yard. Nothing is missing. Every piece is still there. But nobody can live in the pile. What was lost wasn't material — it was the arrangement, and the work of keeping it standing. A living body is that house, and its atoms are the bricks.` },
    { id: 'experiment', body: `Stir a pinch of salt into a glass of water. It vanishes — but taste the water and it's salty. The salt is still there, split into sodium and chloride and carried around by the water. Your blood does exactly this, all day, with sodium, potassium and calcium. Those dissolved pieces are what the word "electrolytes" means.` },
    { id: 'smaller', body: `Forget the whole body. Just this: is there any kind of atom in you that you couldn't also find in air, water or soil? No — not one. So the difference between you and a pile of dirt can't be the ingredients. It has to be something else. Hold onto that question; the answer is arrangement.` },
    { id: 'backward', body: `Start with you. You are made of systems — circulation, breathing, digestion. Each system is made of organs, like the heart. The heart is made of tissues, mostly muscle. Muscle is made of cells. Cells are made of molecules, mostly water and proteins. Molecules are made of atoms. Walk back down and you arrive at the jars.` }
  ],

  map: [
    { name: `Levels of organization`, level: 3, fresh: true },
    { name: `Atoms and elements`, level: 3, fresh: true },
    { name: `Molecules`, level: 2, fresh: true },
    { name: `Water in the body`, level: 2, fresh: true },
    { name: `The cell`, level: 1, fresh: true },
    { name: `Cellular energy`, level: 0 },
    { name: `DNA and proteins`, level: 0 },
    { name: `Receptors and signals`, level: 0 },
    { name: `Homeostasis`, level: 0 },
    { name: `Circulation`, level: 0 }
  ]
}
