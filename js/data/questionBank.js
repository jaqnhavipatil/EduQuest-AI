/**
 * EduQuest AI - Comprehensive Question Bank & Adventure World Metadata
 * Verified content for Grades 3, 5, and 8 across Mathematics, English, and Science.
 * Enhanced with Living World Objects, Misconception Detective Insights, and Worked Examples.
 */

window.EduQuestData = window.EduQuestData || {};

window.EduQuestData.GRADE_TOPICS = {
  // ==================== GRADE 3 ====================
  3: {
    status: "active",
    subjects: {
      math: [
        {
          id: "g3_math_mult",
          title: "Multiplication & Shape Magic",
          icon: "✖️",
          islandName: "Number Haven Island",
          worldObject: "Crystal Bridge of Multiplication",
          brokenDescription: "The crystal bridge beams have cracked from tricky equal-group calculations! Repair the bridge by proving your multiplication power.",
          repairedDescription: "The crystal bridge shines with pure golden energy, connecting the islands across the chasm!",
          description: "Master equal groups, times tables (2, 5, 10), and 2D shape sides!",
          conceptSummary: "Multiplication is just fast addition of equal groups! For example, 3 groups of 4 apples is 3 × 4 = 12. For shapes, remember: triangles always have 3 sides, quadrilaterals have 4 sides, and pentagons have 5 sides.",
          questions: [
            {
              id: "g3_m_1",
              text: "There are 4 baskets. Each basket has 5 juicy red apples. How many apples are there in total?",
              options: ["9 apples", "15 apples", "20 apples", "25 apples"],
              correctIndex: 2,
              explanation: "4 baskets × 5 apples = 20 apples altogether. That's 5 + 5 + 5 + 5 = 20!",
              hint: "Think of 4 groups with 5 in each group: count by 5s four times (5, 10, 15...)",
              detectiveAnalysis: "Common Trap: Adding 4 + 5 = 9 instead of multiplying equal groups (4 × 5). Remember that each basket contains 5 apples!",
              workedExample: "Step 1: Count groups (4 baskets).\nStep 2: Count items in each group (5 apples).\nStep 3: Multiply groups × items: 4 × 5 = 20 apples.",
              concept: "Multiplication as equal groups"
            },
            {
              id: "g3_m_2",
              text: "Which of these shapes has exactly 3 straight sides and 3 corners (vertices)?",
              options: ["Square", "Triangle", "Pentagon", "Circle"],
              correctIndex: 1,
              explanation: "A triangle always has 3 straight sides and 3 corners. The prefix 'tri-' means three!",
              hint: "Think of a slice of pizza or a musical triangle.",
              detectiveAnalysis: "A square has 4 sides and a pentagon has 5. Notice the prefix 'tri' which always means three, like a tricycle with 3 wheels!",
              workedExample: "Shape clue: 'Tri' = 3 (Triangle: 3 sides).\n'Quad' = 4 (Quadrilateral / Square).\n'Penta' = 5 (Pentagon).",
              concept: "2D Polygon properties"
            },
            {
              id: "g3_m_3",
              text: "What is 6 × 2?",
              options: ["8", "12", "14", "16"],
              correctIndex: 1,
              explanation: "6 × 2 means doubling 6. 6 + 6 = 12!",
              hint: "Double the number 6.",
              detectiveAnalysis: "Be careful not to add 6 + 2 = 8! Multiplying by 2 means adding the number to itself (6 + 6 = 12).",
              workedExample: "6 × 2 = 6 + 6 = 12. Multiplying by 2 is always doubling!",
              concept: "Twos times table"
            },
            {
              id: "g3_m_4",
              text: "Leo has 3 packs of stickers. Each pack has 10 stickers. How many stickers does Leo have?",
              options: ["13", "20", "30", "300"],
              correctIndex: 2,
              explanation: "3 packs × 10 stickers = 30 stickers. Count by tens: 10, 20, 30!",
              hint: "Count by 10s three times.",
              detectiveAnalysis: "Adding 3 + 10 gives 13, but each of the 3 packs has 10 stickers! Count by tens: 10, 20, 30.",
              workedExample: "Pack 1: 10 stickers\nPack 2: 10 stickers\nPack 3: 10 stickers\nTotal: 10 + 10 + 10 = 3 × 10 = 30 stickers.",
              concept: "Tens times table"
            },
            {
              id: "g3_m_5",
              text: "How many sides does a regular Pentagon have?",
              options: ["4 sides", "5 sides", "6 sides", "8 sides"],
              correctIndex: 1,
              explanation: "A pentagon has 5 sides! 'Penta' comes from the Greek word for five.",
              hint: "Think of the famous Pentagon building or count one more than a rectangle.",
              detectiveAnalysis: "Don't confuse a pentagon (5 sides) with a hexagon (6 sides) or an octagon (8 sides). 'Penta' = 5!",
              workedExample: "Remember: Triangle = 3, Rectangle = 4, Pentagon = 5, Hexagon = 6, Octagon = 8.",
              concept: "Recognizing polygons"
            }
          ],
          revisionQuestions: [
            {
              id: "g3_m_rev_1",
              text: "If there are 5 bird nests and each nest has 3 eggs, how many eggs are there in total?",
              options: ["8 eggs", "12 eggs", "15 eggs", "18 eggs"],
              correctIndex: 2,
              explanation: "5 groups of 3 = 5 × 3 = 15 eggs! Count by fives three times: 5, 10, 15.",
              hint: "Add 3 five times, or count 5, 10, 15.",
              detectiveAnalysis: "Equal groups: 5 nests × 3 eggs per nest = 15 eggs.",
              workedExample: "5 × 3 = 15. Count by 5s three times: 5, 10, 15!",
              concept: "Equal grouping revision"
            },
            {
              id: "g3_m_rev_2",
              text: "A stop sign has 8 sides. What is an 8-sided 2D shape called?",
              options: ["Hexagon", "Octagon", "Pentagon", "Decagon"],
              correctIndex: 1,
              explanation: "An Octagon has 8 sides! Think of an octopus with 8 arms.",
              hint: "Octo means 8, like an octopus!",
              detectiveAnalysis: "'Octo' = 8 (like an octopus with 8 arms). Hexa = 6, Penta = 5.",
              workedExample: "Octagon has 8 sides. Stop signs are octagons!",
              concept: "Polygon names revision"
            },
            {
              id: "g3_m_rev_3",
              text: "What is 7 × 2?",
              options: ["9", "12", "14", "21"],
              correctIndex: 2,
              explanation: "7 × 2 means two groups of 7. 7 + 7 = 14!",
              hint: "Double 7.",
              detectiveAnalysis: "Multiplying by 2 means adding 7 + 7 = 14, not 7 + 2 = 9.",
              workedExample: "7 × 2 = 7 + 7 = 14.",
              concept: "Doubling revision"
            }
          ]
        }
      ],
      english: [
        {
          id: "g3_eng_grammar",
          title: "Nouns, Verbs & Super Sentences",
          icon: "📝",
          islandName: "Alphabet Isle",
          worldObject: "Lexicon Clockwork Tower",
          brokenDescription: "The clockwork gears of the Lexicon Tower are jammed with scrambled parts of speech! Restore the tower to restart the flow of words.",
          repairedDescription: "The Lexicon Tower's golden gears spin smoothly, radiating brilliant language power across the isle!",
          description: "Discover naming words, action words, and how to punctuate like a pro!",
          conceptSummary: "Nouns are naming words for a person, place, animal, or thing (like 'teacher', 'park', 'tiger', 'book'). Verbs are action words showing what someone or something is doing (like 'runs', 'jumps', 'whispers'). Every sentence must start with a capital letter and end with a punctuation mark!",
          questions: [
            {
              id: "g3_e_1",
              text: "Which word in this sentence is a NOUN? 'The playful kitten drank cold milk.'",
              options: ["playful", "kitten", "drank", "cold"],
              correctIndex: 1,
              explanation: "'Kitten' is a noun because it names an animal! 'Playful' and 'cold' are adjectives, and 'drank' is a verb.",
              hint: "Find the animal doing the action.",
              detectiveAnalysis: "'Playful' describes the kitten (adjective), 'drank' is the action (verb). 'Kitten' names the animal, which makes it a noun!",
              workedExample: "Nouns name things: person (girl), place (park), animal (kitten), thing (cup).",
              concept: "Identifying Nouns"
            },
            {
              id: "g3_e_2",
              text: "Which word is a VERB (action word)?",
              options: ["Shiny", "Elephant", "Dance", "Quietly"],
              correctIndex: 2,
              explanation: "'Dance' is a verb because it is an action you can do! 'Elephant' is a noun, 'Shiny' is an adjective, and 'Quietly' is an adverb.",
              hint: "Which word is something your body can actively do?",
              detectiveAnalysis: "Ask yourself: 'Can I DO this?' You can dance, jump, run. You cannot 'elephant' or 'shiny'.",
              workedExample: "Action test: 'I can _____.' (I can dance ✅ = Verb; I can elephant ❌ = Noun).",
              concept: "Identifying Verbs"
            },
            {
              id: "g3_e_3",
              text: "Choose the sentence with the CORRECT capitalization and punctuation:",
              options: [
                "where is my blue backpack.",
                "Where is my blue backpack?",
                "where is my blue backpack?",
                "Where is my blue backpack!"
              ],
              correctIndex: 1,
              explanation: "It starts with a capital 'Where' and ends with a question mark '?' because it asks something.",
              hint: "Look for a capital letter at the start and a question mark at the end.",
              detectiveAnalysis: "Since the sentence is asking an inquiring question ('Where...'), it must end with '?' and start with a capital 'W'.",
              workedExample: "Rule 1: Always capitalize first letter ('Where'). Rule 2: Questions end with '?' ('Where is it?').",
              concept: "Sentence Punctuation"
            },
            {
              id: "g3_e_4",
              text: "What is the plural of 'child' (more than one child)?",
              options: ["Childs", "Childrens", "Children", "Childes"],
              correctIndex: 2,
              explanation: "'Children' is the correct irregular plural form. We don't say childs or childrens!",
              hint: "This is an irregular plural that ends with '-ren'.",
              detectiveAnalysis: "'Child' does not take a standard '-s'. It changes completely to 'children'. Never add 's' to children!",
              workedExample: "Singular: 1 child.\nPlural: 2 or more children (irregular plural).",
              concept: "Irregular Plurals"
            },
            {
              id: "g3_e_5",
              text: "Which word describes how someone is doing an action? 'Maya sang _____ on the stage.'",
              options: ["sweetly", "sweet", "sweetness", "sweeter"],
              correctIndex: 0,
              explanation: "'Sweetly' is an adverb describing the action verb 'sang'. Most adverbs end in '-ly'.",
              hint: "Look for the word ending in '-ly' that describes how she sang.",
              detectiveAnalysis: "Adverbs tell us HOW an action was done (e.g., sang sweetly, walked slowly, ran quickly). Look for '-ly'!",
              workedExample: "Adverb formula: Adjective + ly = Adverb. 'Sweet' + 'ly' = 'sweetly'.",
              concept: "Adverbs"
            }
          ],
          revisionQuestions: [
            {
              id: "g3_e_rev_1",
              text: "Which word in this sentence is a VERB? 'The brave knight climbed the tall mountain.'",
              options: ["brave", "knight", "climbed", "tall"],
              correctIndex: 2,
              explanation: "'Climbed' is the verb because it shows the physical action the knight did!",
              hint: "What action did the knight perform?",
              detectiveAnalysis: "'Climbed' tells what the knight was doing. That is an action verb!",
              workedExample: "Action test: Knight is the person (noun), climbed is the action (verb).",
              concept: "Action Verbs Revision"
            },
            {
              id: "g3_e_rev_2",
              text: "Which of the following is a PROPER NOUN and needs a capital letter?",
              options: ["city", "london", "river", "country"],
              correctIndex: 1,
              explanation: "'London' is a proper noun because it is the specific name of a city, so it should be capitalized!",
              hint: "Which word is the specific name of a real capital city?",
              detectiveAnalysis: "Common nouns are general ('city', 'river'). Proper nouns are special names ('London', 'Thames') and start with capital letters.",
              workedExample: "Common noun: city. Proper noun: London (capital L).",
              concept: "Proper Nouns Revision"
            },
            {
              id: "g3_e_rev_3",
              text: "What is the correct plural form of 'foot'?",
              options: ["Foots", "Feet", "Feets", "Footies"],
              correctIndex: 1,
              explanation: "The plural of 'foot' is 'feet' (irregular plural change from 'oo' to 'ee').",
              hint: "You have one foot, but two...",
              detectiveAnalysis: "Just like goose -> geese and tooth -> teeth, foot becomes feet without an 's'.",
              workedExample: "1 foot -> 2 feet.",
              concept: "Irregular Plural Revision"
            }
          ]
        }
      ],
      science: [
        {
          id: "g3_sci_living",
          title: "Animals, Plants & Our Senses",
          icon: "🌿",
          islandName: "Emerald Canopy Realm",
          worldObject: "Sunstone Bio-Dome",
          brokenDescription: "The Bio-Dome's photosynthetic power crystal is uncharged and dark! Answer the science questions correctly to restore sunlight to the flora.",
          repairedDescription: "The Sunstone Bio-Dome blazes with green photosynthetic energy, bringing the forest canopy to full life!",
          description: "Explore living things, habitats, plant growth, and human body senses!",
          conceptSummary: "Living things need food, water, air, and shelter to survive and grow. Green plants make their own food through sunlight, water, and air. Humans use five primary senses: sight (eyes), hearing (ears), smell (nose), taste (tongue), and touch (skin).",
          questions: [
            {
              id: "g3_s_1",
              text: "Which part of a plant absorbs water and minerals from deep under the soil?",
              options: ["Leaves", "Flowers", "Stem", "Roots"],
              correctIndex: 3,
              explanation: "Roots anchor the plant into the soil and absorb water and essential minerals!",
              hint: "Think about the part of the plant that grows hidden underground.",
              detectiveAnalysis: "Leaves absorb sunlight, the stem carries water upward, but the ROOTS are underground drinking water from the soil.",
              workedExample: "Plant Anatomy: Roots = Drink water from soil; Stem = Highway elevator; Leaves = Solar panels.",
              concept: "Plant Anatomy"
            },
            {
              id: "g3_s_2",
              text: "Which of the following animals is a HERBIVORE (eats only plants)?",
              options: ["Lion", "Rabbit", "Wolf", "Hawk"],
              correctIndex: 1,
              explanation: "A rabbit eats only grass, leaves, and vegetables, making it a herbivore! Lions and wolves are carnivores.",
              hint: "Which animal munches on grass, carrots, and leafy greens?",
              detectiveAnalysis: "Herb = plants. Carn = meat. Omni = both. Rabbits eat grass and greens, so they are herbivores!",
              workedExample: "Herbivore = Herb (plants) + vore (eater). Example: Rabbit, Deer, Cow.",
              concept: "Animal Diets"
            },
            {
              id: "g3_s_3",
              text: "Which human sense organ detects vibrations in the air so we can hear music?",
              options: ["Eyes", "Ears", "Nose", "Skin"],
              correctIndex: 1,
              explanation: "Our ears capture sound vibrations and send auditory signals to the brain!",
              hint: "Which organ do you wear headphones on?",
              detectiveAnalysis: "Sound travels in vibrating waves through the air. The eardrum inside our ear vibrates to detect them.",
              workedExample: "Senses: Eyes = Light/Sight, Ears = Sound vibrations/Hearing, Nose = Smell.",
              concept: "Human Senses"
            },
            {
              id: "g3_s_4",
              text: "What do green leaves need from the sun to help make food for the plant?",
              options: ["Sunlight", "Soil", "Rain", "Wind"],
              correctIndex: 0,
              explanation: "Leaves absorb sunlight energy to power photosynthesis, which creates food for the plant.",
              hint: "Think about what shines brightly in the sky during the day.",
              detectiveAnalysis: "Leaves have green chlorophyll that acts like solar panels catching sunlight rays.",
              workedExample: "Photosynthesis ingredients: Sunlight + Water + Carbon Dioxide = Glucose (food) + Oxygen.",
              concept: "Photosynthesis Basics"
            },
            {
              id: "g3_s_5",
              text: "Which of these is a NON-LIVING thing?",
              options: ["Oak tree", "Earthworm", "River pebble", "Mushroom"],
              correctIndex: 2,
              explanation: "A river pebble does not grow, breathe, eat, or reproduce, so it is non-living.",
              hint: "Which one does not need food or water and never grows?",
              detectiveAnalysis: "Living things grow, breathe, and reproduce (trees, worms, mushrooms). A pebble cannot grow or breathe.",
              workedExample: "Living Test: Does it grow? Does it need nutrients? If NO to all -> Non-living (like a pebble or rock).",
              concept: "Living vs Non-living"
            }
          ],
          revisionQuestions: [
            {
              id: "g3_s_rev_1",
              text: "What gas do plants release into the air that animals and humans need to breathe?",
              options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Methane"],
              correctIndex: 1,
              explanation: "Plants produce and release oxygen into the atmosphere during photosynthesis!",
              hint: "It starts with an 'O' and is essential for our lungs.",
              detectiveAnalysis: "Plants take in Carbon Dioxide and breathe OUT clean Oxygen for humans and animals.",
              workedExample: "Oxygen Cycle: Animals breathe in Oxygen -> exhale Carbon Dioxide -> Plants take Carbon Dioxide -> produce Oxygen!",
              concept: "Plant Respiration Revision"
            },
            {
              id: "g3_s_rev_2",
              text: "Animals that eat BOTH plants and other animals are called:",
              options: ["Carnivores", "Herbivores", "Omnivores", "Insectivores"],
              correctIndex: 2,
              explanation: "Omnivores eat both plants and meat (like bears and most humans!). 'Omni' means all.",
              hint: "Bears eat berries AND fish. The word starts with 'Omni-'.",
              detectiveAnalysis: "'Omni' means all or everything. Omnivores eat both plants and meat.",
              workedExample: "Herbivore = Plants only; Carnivore = Meat only; Omnivore = Both plants and meat.",
              concept: "Diet Classifications Revision"
            },
            {
              id: "g3_s_rev_3",
              text: "Which part of the plant holds it upright and transports water up to the leaves?",
              options: ["Roots", "Flower petal", "Stem", "Seed"],
              correctIndex: 2,
              explanation: "The stem acts like an elevator straw, carrying water and nutrients up from roots to leaves.",
              hint: "It acts like a sturdy highway straw connecting roots to leaves.",
              detectiveAnalysis: "The roots collect water underground; the stem acts like a drinking straw to lift water up to the leaves.",
              workedExample: "Stem = Support trunk and vascular highway for water transport.",
              concept: "Plant Stem Function Revision"
            }
          ]
        }
      ]
    }
  },

  // ==================== GRADE 5 ====================
  5: {
    status: "active",
    subjects: {
      math: [
        {
          id: "g5_math_fractions",
          title: "Fractions & Decimals Explorer",
          icon: "🍕",
          islandName: "Fraction Archipelago",
          worldObject: "Bridge of Common Denominators",
          brokenDescription: "The Bridge of Common Denominators has crumbled into mismatched fractional sections! Solve the revision quest to align the denominators and rebuild the bridge.",
          repairedDescription: "The Bridge of Common Denominators is fully reconstructed with glowing proportional keystones!",
          description: "Simplify fractions, find common denominators, and convert to decimals!",
          conceptSummary: "To add or subtract fractions, they must share a common denominator (e.g. 1/4 + 2/4 = 3/4). To simplify a fraction, divide both the numerator (top) and denominator (bottom) by their Greatest Common Factor (e.g. 4/8 divided by 4/4 is 1/2). Remember: 1/2 = 0.5, 1/4 = 0.25, and 3/4 = 0.75.",
          questions: [
            {
              id: "g5_m_1",
              text: "What is 2/5 + 1/5 in simplest form?",
              options: ["3/10", "3/5", "2/25", "1/5"],
              correctIndex: 1,
              explanation: "When denominators match, add only numerators: 2 + 1 = 3, so 3/5. The denominator stays 5!",
              hint: "Since denominators are both 5, just add the top numbers.",
              detectiveAnalysis: "Crucial Fraction Rule: Never add denominators! 2/5 + 1/5 is not 3/10. Denominators stay the same (fifths).",
              workedExample: "Formula: a/c + b/c = (a + b)/c. Here: 2/5 + 1/5 = (2 + 1)/5 = 3/5.",
              concept: "Adding like fractions"
            },
            {
              id: "g5_m_2",
              text: "Which fraction is equivalent to 1/2?",
              options: ["2/5", "3/6", "4/10", "5/8"],
              correctIndex: 1,
              explanation: "3/6 simplified by dividing top and bottom by 3 gives 1/2! Also, 3 is half of 6.",
              hint: "In which fraction is the top number exactly half of the bottom number?",
              detectiveAnalysis: "To test for 1/2, check if the numerator is half of the denominator. Half of 6 is 3, so 3/6 = 1/2.",
              workedExample: "Test: 3 / 6 ÷ 3/3 = 1/2. Thus 3/6 is equivalent to 1/2.",
              concept: "Equivalent fractions"
            },
            {
              id: "g5_m_3",
              text: "Convert the fraction 3/4 into a decimal.",
              options: ["0.34", "0.43", "0.75", "0.80"],
              correctIndex: 2,
              explanation: "3 divided by 4 equals 0.75 (think of 3 quarters being 75 cents!).",
              hint: "Think about money: 3 quarters out of 4 equal how many cents?",
              detectiveAnalysis: "Don't just write digits like 0.34! 3/4 means dividing 3 by 4. 1/4 = 0.25, 2/4 = 0.50, 3/4 = 0.75.",
              workedExample: "Division: 3 ÷ 4 = 0.75. Or multiply top and bottom by 25: (3 × 25)/(4 × 25) = 75/100 = 0.75.",
              concept: "Fraction to decimal conversion"
            },
            {
              id: "g5_m_4",
              text: "What is 6/8 reduced to its lowest terms?",
              options: ["3/4", "2/3", "1/2", "3/8"],
              correctIndex: 0,
              explanation: "Divide both 6 and 8 by their greatest common factor (2): 6 ÷ 2 = 3, 8 ÷ 2 = 4, giving 3/4.",
              hint: "Divide both numerator and denominator by 2.",
              detectiveAnalysis: "Find the greatest number that divides both 6 and 8 evenly. Both are even, so divide by 2: 6÷2=3, 8÷2=4.",
              workedExample: "Simplifying: 6/8 ÷ 2/2 = 3/4.",
              concept: "Simplifying fractions"
            },
            {
              id: "g5_m_5",
              text: "Order these decimals from SMALLEST to LARGEST: 0.45, 0.05, 0.50",
              options: [
                "0.50, 0.45, 0.05",
                "0.05, 0.45, 0.50",
                "0.45, 0.05, 0.50",
                "0.05, 0.50, 0.45"
              ],
              correctIndex: 1,
              explanation: "0.05 (5 hundredths) < 0.45 (45 hundredths) < 0.50 (50 hundredths).",
              hint: "Compare the tenths place first: 0 tenths vs 4 tenths vs 5 tenths.",
              detectiveAnalysis: "Look at place values: 0.05 has 0 tenths (smallest). 0.45 has 4 tenths. 0.50 has 5 tenths (largest).",
              workedExample: "Place value compare: 0.05 (5 cents) < 0.45 (45 cents) < 0.50 (50 cents).",
              concept: "Comparing decimals"
            }
          ],
          revisionQuestions: [
            {
              id: "g5_m_rev_1",
              text: "What is 7/10 - 3/10 in simplest form?",
              options: ["4/10", "2/5", "4/0", "1/2"],
              correctIndex: 1,
              explanation: "7/10 - 3/10 = 4/10. Then divide numerator and denominator by 2 to get the simplest form: 2/5!",
              hint: "Subtract the top numbers, then reduce the fraction by dividing by 2.",
              detectiveAnalysis: "7 - 3 = 4, so 4/10. But always check if it can be simplified! Both 4 and 10 divide by 2 to give 2/5.",
              workedExample: "Step 1: 7/10 - 3/10 = 4/10.\nStep 2: Simplify 4/10 ÷ 2/2 = 2/5.",
              concept: "Subtracting and reducing fractions"
            },
            {
              id: "g5_m_rev_2",
              text: "What decimal is equal to 1/10?",
              options: ["0.01", "0.1", "1.0", "0.11"],
              correctIndex: 1,
              explanation: "1/10 is one tenth, written in decimal notation as 0.1.",
              hint: "Place a 1 in the tenths position immediately after the decimal point.",
              detectiveAnalysis: "0.01 is one hundredth (1/100). 0.1 is one tenth (1/10).",
              workedExample: "Decimal position: 0. [tenths] [hundredths] -> 1/10 = 0.1.",
              concept: "Tenths decimals"
            },
            {
              id: "g5_m_rev_3",
              text: "Which of these fractions is greater than 1/2?",
              options: ["2/5", "3/8", "5/8", "4/9"],
              correctIndex: 2,
              explanation: "Half of 8 is 4. Since 5 is greater than 4, 5/8 is greater than 1/2!",
              hint: "Half of 8 is 4. Which fraction has a numerator bigger than 4?",
              detectiveAnalysis: "Benchmark fraction: Half of 8 is 4/8. Since 5/8 has a top number bigger than 4, 5/8 > 1/2.",
              workedExample: "Benchmark: 1/2 = 4/8. Compare: 5/8 > 4/8, so 5/8 is greater than 1/2.",
              concept: "Benchmark fraction comparison"
            }
          ]
        }
      ],
      english: [
        {
          id: "g5_eng_reading",
          title: "Reading Detective & Parts of Speech",
          icon: "🔍",
          islandName: "Metaphor Highlands",
          worldObject: "Beacon of Figurative Light",
          brokenDescription: "The Beacon of Figurative Light has gone dark under dense fog! Solve the reading detective missions to illuminate the truth.",
          repairedDescription: "The Beacon of Figurative Light blazes like a lighthouse, cutting through all ambiguities!",
          description: "Analyze context clues, metaphors, conjunctions, and main ideas!",
          conceptSummary: "Context clues are hints found in surrounding sentences that help figure out unknown words. Metaphors compare two things directly without using 'like' or 'as' (e.g., 'Her smile was sunshine'). Conjunctions (FANBOYS: For, And, Nor, But, Or, Yet, So) connect phrases and clauses.",
          questions: [
            {
              id: "g5_e_1",
              text: "Read the sentence: 'The desert was arid; not a single drop of rain had fallen for two long years.' What does ARID mean?",
              options: ["Extremely cold", "Very dry", "Crowded", "Tropical"],
              correctIndex: 1,
              explanation: "The context clue 'not a single drop of rain had fallen' reveals that arid means very dry.",
              hint: "Look at the clue after the semicolon: what happens when no rain falls?",
              detectiveAnalysis: "Always inspect the surrounding sentence context. 'No rain for two years' describes dry conditions, not cold or crowded.",
              workedExample: "Context Clue Detective: 'not a single drop of rain' -> directly points to lack of moisture -> Arid = Very dry.",
              concept: "Context clues"
            },
            {
              id: "g5_e_2",
              text: "Which sentence contains a METAPHOR (direct comparison without 'like' or 'as')?",
              options: [
                "He was as brave as a lion.",
                "The classroom was a bustling beehive of activity.",
                "The wind howled loudly through the trees.",
                "She danced gracefully across the floor."
              ],
              correctIndex: 1,
              explanation: "'The classroom was a bustling beehive' directly equates the classroom to a beehive without using 'like' or 'as'.",
              hint: "A simile uses 'like' or 'as'. A metaphor states that one thing IS another.",
              detectiveAnalysis: "'As brave as a lion' is a simile because it uses 'as'. A metaphor states directly that X IS Y ('classroom was a beehive').",
              workedExample: "Simile vs Metaphor: 'He is like a rock' (Simile) vs 'He is a rock' (Metaphor).",
              concept: "Figurative language: Metaphors"
            },
            {
              id: "g5_e_3",
              text: "Choose the coordinating conjunction that best connects these sentences: 'Sanjay wanted to play outside, _____ it began pouring with heavy rain.'",
              options: ["so", "but", "or", "and"],
              correctIndex: 1,
              explanation: "'But' shows contrast between wanting to go outside and the rain stopping him.",
              hint: "Which conjunction introduces a contrast or unexpected obstacle?",
              detectiveAnalysis: "The desire to play outside clashes with the downpour. 'But' signals a contrast or conflict.",
              workedExample: "Conjunctions: 'And' adds info, 'But' shows contrast/obstacle, 'So' shows result.",
              concept: "Coordinating Conjunctions"
            },
            {
              id: "g5_e_4",
              text: "Identify the PREPOSITION in this sentence: 'The playful squirrel scurried up the oak tree.'",
              options: ["scurried", "squirrel", "up", "oak"],
              correctIndex: 2,
              explanation: "'Up' is the preposition showing direction and relationship to the tree.",
              hint: "Find the word showing where or in what direction the squirrel moved.",
              detectiveAnalysis: "Prepositions show relationship in space or time (in, on, under, up, through). 'Up' shows the spatial movement toward the tree.",
              workedExample: "Preposition test: Anything a squirrel can do to a tree: run UP it, climb OVER it, hide UNDER it.",
              concept: "Prepositions"
            },
            {
              id: "g5_e_5",
              text: "What is the MAIN IDEA of a paragraph?",
              options: [
                "The very last sentence",
                "A small detail mentioned once",
                "The central point or message the author wants to convey",
                "The author's full name"
              ],
              correctIndex: 2,
              explanation: "The main idea is the primary argument or umbrella point supported by all other sentences.",
              hint: "What is the primary message the whole paragraph is built around?",
              detectiveAnalysis: "Do not mistake supporting details for the main umbrella theme. The main idea is the core thesis statement.",
              workedExample: "Umbrella analogy: The Main Idea is the umbrella; all supporting facts are raindrops caught beneath it.",
              concept: "Reading comprehension"
            }
          ],
          revisionQuestions: [
            {
              id: "g5_e_rev_1",
              text: "Which sentence is a SIMILE (comparison using 'like' or 'as')?",
              options: [
                "Time is a thief.",
                "Her eyes sparkled like diamonds in the moonlight.",
                "The sun smiled down on our picnic.",
                "The snow was a white blanket."
              ],
              correctIndex: 1,
              explanation: "'Sparkled like diamonds' uses the word 'like' to compare eyes to diamonds, making it a simile!",
              hint: "Look for the sentence using the word 'like' or 'as' for comparison.",
              detectiveAnalysis: "Spot the magic words: 'LIKE' or 'AS'. 'Sparkled LIKE diamonds' = Simile.",
              workedExample: "Formula: A is like B (Simile). A is B (Metaphor).",
              concept: "Similes vs Metaphors revision"
            },
            {
              id: "g5_e_rev_2",
              text: "In the sentence 'She is smart, and she is diligent', what part of speech is 'and'?",
              options: ["Conjunction", "Preposition", "Adjective", "Pronoun"],
              correctIndex: 0,
              explanation: "'And' connects two independent clauses, making it a coordinating conjunction.",
              hint: "It joins two clauses together like a bridge.",
              detectiveAnalysis: "FANBOYS: For, And, Nor, But, Or, Yet, So. These are coordinating conjunctions.",
              workedExample: "'And' acts as a connector bridge joining two clauses.",
              concept: "Conjunctions revision"
            },
            {
              id: "g5_e_rev_3",
              text: "'The athlete was exhausted; her legs trembled and her breath was shallow.' What does EXHAUSTED mean?",
              options: ["Energetic and cheerful", "Extremely tired", "Injured and crying", "Hungry for dinner"],
              correctIndex: 1,
              explanation: "Context clues 'legs trembled' and 'shallow breath' prove she was extremely tired.",
              hint: "What do trembling legs and running out of breath show?",
              detectiveAnalysis: "Trembling legs and shallow gasping breath are clinical signs of extreme fatigue.",
              workedExample: "Trembling legs + shallow breathing -> Extreme physical fatigue = Exhausted.",
              concept: "Context clues revision"
            }
          ]
        }
      ],
      science: [
        {
          id: "g5_sci_forces",
          title: "Forces, Energy & Ecosystems",
          icon: "⚡",
          islandName: "Dynamo Peninsula",
          worldObject: "Kinetic Power Conduit",
          brokenDescription: "The kinetic power conduits are short-circuited and sparking uncontrollably! Answer the physics and ecology quests to stabilize the power grid.",
          repairedDescription: "The Kinetic Power Conduit hums with clean, renewable energy, powering the entire peninsula!",
          description: "Discover gravity, friction, food webs, and renewable energy sources!",
          conceptSummary: "Friction is a contact force that opposes motion between two surfaces sliding past each other. Gravity pulls objects toward the center of Earth. In an ecosystem, producers (plants) create food from sunlight, consumers eat other organisms, and decomposers recycle dead matter.",
          questions: [
            {
              id: "g5_s_1",
              text: "Why do bicycle brakes make a bike slow down when squeezed?",
              options: [
                "They increase magnetic attraction to the road",
                "Friction between rubber brake pads and wheel rims opposes motion",
                "They turn off the bike's internal gravity",
                "They blow air backward against the bike"
              ],
              correctIndex: 1,
              explanation: "Brake pads squeeze the wheel rim, producing friction that resists rotation and converts kinetic energy into thermal energy.",
              hint: "Think about the resistance created when two rough surfaces rub against each other.",
              detectiveAnalysis: "When rubber presses against metal rims, microscopic ridges collide. This frictional resistance turns motion into heat.",
              workedExample: "Kinetic energy (rolling wheel) -> Friction contact -> Thermal energy (heat) + stopping force.",
              concept: "Frictional force"
            },
            {
              id: "g5_s_2",
              text: "Which of the following is an example of a RENEWABLE energy source?",
              options: ["Coal", "Petroleum oil", "Solar energy", "Natural gas"],
              correctIndex: 2,
              explanation: "Solar energy comes from the sun and naturally replenishes without running out, unlike fossil fuels.",
              hint: "Which source will never run out as long as the sun shines?",
              detectiveAnalysis: "Coal, petroleum, and natural gas take millions of years to form (non-renewable fossil fuels). Solar energy is naturally replenished constantly.",
              workedExample: "Renewable = Sun, Wind, Water. Non-Renewable = Coal, Oil, Gas.",
              concept: "Renewable energy"
            },
            {
              id: "g5_s_3",
              text: "In a forest ecosystem, what role do mushrooms and bacteria play?",
              options: ["Apex predators", "Primary producers", "Decomposers", "Herbivores"],
              correctIndex: 2,
              explanation: "Decomposers break down dead organic matter and return valuable nutrients to the soil.",
              hint: "They break down dead leaves and fallen trees to enrich the soil.",
              detectiveAnalysis: "Mushrooms cannot produce food from sunlight (they are fungi, not plants). They decompose decaying matter to recycle nutrients.",
              workedExample: "Ecosystem cycle: Producer (Tree) -> Consumer (Deer) -> Decomposer (Mushroom decomposes leaves into soil).",
              concept: "Ecosystem roles"
            },
            {
              id: "g5_s_4",
              text: "What happens to the gravitational force between two objects as the distance between them increases?",
              options: [
                "It stays exactly the same",
                "The gravitational force decreases (gets weaker)",
                "The gravitational force increases (gets stronger)",
                "Gravity reverses into repulsion"
              ],
              correctIndex: 1,
              explanation: "As distance increases, gravitational attraction weakens following the inverse-square law.",
              hint: "Think about magnets moving farther apart: does the pull get weaker or stronger?",
              detectiveAnalysis: "Gravity is like magnetic pull: the further away two bodies are, the weaker their mutual gravitational pull becomes.",
              workedExample: "Inverse-Square Law: Double distance = 1/4 the gravitational attraction.",
              concept: "Gravity and distance"
            },
            {
              id: "g5_s_5",
              text: "What primary form of energy does a toaster convert electrical energy into?",
              options: ["Thermal (heat) energy", "Chemical energy", "Nuclear energy", "Sound energy"],
              correctIndex: 0,
              explanation: "Electric current passes through high-resistance nichrome wires, generating thermal (heat) energy to toast bread.",
              hint: "What makes the bread turn warm, brown, and crispy?",
              detectiveAnalysis: "Toasters use electric resistance to glow red-hot and toast bread with thermal (heat) radiation.",
              workedExample: "Energy Transformation: Electrical energy -> Thermal energy (heat).",
              concept: "Energy transformations"
            }
          ],
          revisionQuestions: [
            {
              id: "g5_s_rev_1",
              text: "Which surface would generate the LEAST friction for a toy car rolling across it?",
              options: ["Thick wool carpet", "Rough sandpaper", "Smooth polished ice", "Coarse gravel driveway"],
              correctIndex: 2,
              explanation: "Smooth ice provides the least resistance and lowest coefficient of friction, allowing the car to slide easily.",
              hint: "Which surface is the slipperiest?",
              detectiveAnalysis: "Smooth ice has very few microscopic bumps, producing minimal frictional resistance.",
              workedExample: "Friction ranking: Ice (Lowest friction) < Carpet < Sandpaper (High friction).",
              concept: "Friction comparison revision"
            },
            {
              id: "g5_s_rev_2",
              text: "What organism is at the very beginning of almost every food chain?",
              options: ["Carnivores", "Decomposers", "Producers (plants and algae)", "Herbivores"],
              correctIndex: 2,
              explanation: "Producers convert solar energy into chemical energy via photosynthesis, forming the base of food chains.",
              hint: "Who makes their own food using sunlight?",
              detectiveAnalysis: "All energy enters ecosystems via solar capture by autotrophic producers (green plants and phytoplankton).",
              workedExample: "Base of chain: Sun -> Green Plant (Producer) -> Herbivore -> Carnivore.",
              concept: "Food chain base revision"
            },
            {
              id: "g5_s_rev_3",
              text: "Potential energy is best described as:",
              options: [
                "Energy of moving matter",
                "Stored energy based on position or condition",
                "Energy that cannot be transferred",
                "Sound produced by impact"
              ],
              correctIndex: 1,
              explanation: "Potential energy is stored energy waiting to be released, like a compressed spring or a ball at the top of a hill.",
              hint: "Think of an archer holding back an arrow before release.",
              detectiveAnalysis: "Kinetic energy is energy of motion. Potential energy is energy stored waiting to be released.",
              workedExample: "Ball on top of cliff = Potential energy. Ball falling = Kinetic energy.",
              concept: "Potential vs Kinetic energy revision"
            }
          ]
        }
      ]
    }
  },

  // ==================== GRADE 8 ====================
  8: {
    status: "active",
    subjects: {
      math: [
        {
          id: "g8_math_algebra",
          title: "Algebraic Adventures & Equations",
          icon: "📐",
          islandName: "Coordinate Valley",
          worldObject: "Balancing Scales of Linear Equations",
          brokenDescription: "The ancient balancing scales are tipped precariously, destabilizing the algebraic magnetic field! Restore the equilibrium by solving two-step equations.",
          repairedDescription: "The Balancing Scales are perfectly level, emitting a harmonious algebraic resonance field!",
          description: "Solve linear equations, master slope-intercept form, and balance variables!",
          conceptSummary: "An algebraic equation is like a balanced scale: whatever operation you do to one side, you must do to the other! In the slope-intercept equation y = mx + b, 'm' is the slope (rate of change: rise over run), and 'b' is the y-intercept (where the line crosses the y-axis). When isolating variables, use inverse operations (addition undoes subtraction, multiplication undoes division).",
          questions: [
            {
              id: "g8_m_1",
              text: "Solve for x: 3x + 7 = 22",
              options: ["x = 3", "x = 5", "x = 7", "x = 15"],
              correctIndex: 1,
              explanation: "Subtract 7 from both sides: 3x = 15. Then divide both sides by 3: x = 5. Check: 3(5) + 7 = 15 + 7 = 22!",
              hint: "First isolate the 3x by subtracting 7 from both sides.",
              detectiveAnalysis: "Inverse operation order: Undo addition/subtraction FIRST, then undo multiplication/division.",
              workedExample: "Equation: 3x + 7 = 22\nSubtract 7: 3x = 15\nDivide by 3: x = 5\nVerification: 3(5) + 7 = 22 ✅",
              concept: "Two-step linear equations"
            },
            {
              id: "g8_m_2",
              text: "In the linear equation y = -4x + 9, what is the slope (m) of the line?",
              options: ["9", "4", "-4", "-4/9"],
              correctIndex: 2,
              explanation: "In y = mx + b, m is the coefficient of x. Here m = -4, meaning the line falls 4 units for every 1 unit right.",
              hint: "Look at the coefficient directly attached to x in y = mx + b.",
              detectiveAnalysis: "Don't confuse slope (m) with y-intercept (b). In y = mx + b, m is the multiplier attached to x, including its sign (-4).",
              workedExample: "Match with template: y = [m]x + [b]\ny = [-4]x + [9]\nSlope m = -4.",
              concept: "Slope-intercept form"
            },
            {
              id: "g8_m_3",
              text: "Simplify the algebraic expression: 4(2x - 3) + 5x",
              options: ["13x - 12", "13x - 3", "8x - 12", "9x - 7"],
              correctIndex: 0,
              explanation: "Distribute 4: 4(2x) - 4(3) = 8x - 12. Combine like terms: 8x + 5x - 12 = 13x - 12.",
              hint: "First expand 4(2x - 3) using distributive property, then combine the x terms.",
              detectiveAnalysis: "Distributive property trap: Remember to multiply the outside factor 4 by BOTH terms inside the parentheses: 4×2x = 8x and 4×(-3) = -12.",
              workedExample: "Step 1: Distribute 4 -> 8x - 12\nStep 2: Add 5x -> 8x + 5x - 12 = 13x - 12.",
              concept: "Distributive property & combining like terms"
            },
            {
              id: "g8_m_4",
              text: "What is the value of 2^4 - 3^2?",
              options: ["7", "5", "10", "23"],
              correctIndex: 0,
              explanation: "2^4 = 2 × 2 × 2 × 2 = 16. 3^2 = 3 × 3 = 9. Therefore 16 - 9 = 7.",
              hint: "Calculate 2 to the power of 4 (16) and 3 squared (9), then subtract.",
              detectiveAnalysis: "2^4 is NOT 2 × 4 = 8! It is 2 multiplied by itself 4 times: 2 × 2 × 2 × 2 = 16. 3^2 is 3 × 3 = 9. 16 - 9 = 7.",
              workedExample: "2^4 = 2 × 2 × 2 × 2 = 16.\n3^2 = 3 × 3 = 9.\n16 - 9 = 7.",
              concept: "Exponents and powers"
            },
            {
              id: "g8_m_5",
              text: "Find the hypotenuse 'c' of a right triangle with legs a = 6 and b = 8 using the Pythagorean theorem (a² + b² = c²):",
              options: ["10", "12", "14", "100"],
              correctIndex: 0,
              explanation: "6² + 8² = 36 + 64 = 100. c = √100 = 10. This is the classic 3-4-5 Pythagorean triple scaled by 2!",
              hint: "Square 6 (36) and square 8 (64). Add them together (100) and take the square root.",
              detectiveAnalysis: "Don't stop at c² = 100! Remember to take the square root to find the actual hypotenuse length c = √100 = 10.",
              workedExample: "a² + b² = c²\n6² + 8² = 36 + 64 = 100\nc = √100 = 10.",
              concept: "Pythagorean Theorem"
            }
          ],
          revisionQuestions: [
            {
              id: "g8_m_rev_1",
              text: "Solve for y: 5y - 8 = 32",
              options: ["y = 6", "y = 8", "y = 4", "y = 24"],
              correctIndex: 1,
              explanation: "Add 8 to both sides: 5y = 40. Divide by 5: y = 8. Check: 5(8) - 8 = 40 - 8 = 32!",
              hint: "Add 8 to 32, then divide by 5.",
              detectiveAnalysis: "To isolate 5y, add 8 to undo the subtraction: 5y = 40. Then divide by 5: y = 8.",
              workedExample: "5y - 8 = 32 -> 5y = 40 -> y = 40 / 5 = 8.",
              concept: "Linear equations revision"
            },
            {
              id: "g8_m_rev_2",
              text: "What is the y-intercept of the line given by y = 7x - 11?",
              options: ["7", "-11", "11", "-7"],
              correctIndex: 1,
              explanation: "In y = mx + b, b represents the y-intercept. Here b = -11, so the line intersects the y-axis at (0, -11).",
              hint: "The constant term at the end gives the y-intercept b.",
              detectiveAnalysis: "Keep the negative sign with the constant term: b = -11.",
              workedExample: "In y = mx + b, b is the constant intercept: y = 7x + (-11), so y-intercept is -11.",
              concept: "Y-intercept identification revision"
            },
            {
              id: "g8_m_rev_3",
              text: "Simplify: -3x + 10x - 4x",
              options: ["3x", "7x", "11x", "-3x"],
              correctIndex: 0,
              explanation: "(-3 + 10 - 4)x = (7 - 4)x = 3x.",
              hint: "Add and subtract the coefficients: -3 + 10 - 4.",
              detectiveAnalysis: "Combine coefficients in sequence: -3 + 10 = 7. 7 - 4 = 3, so 3x.",
              workedExample: "(-3 + 10 - 4)x = (7 - 4)x = 3x.",
              concept: "Combining like terms revision"
            }
          ]
        }
      ],
      english: [
        {
          id: "g8_eng_literary",
          title: "Literary Devices & Analysis",
          icon: "🎭",
          islandName: "Allegory Ridge",
          worldObject: "Mirror of Dramatic Irony",
          brokenDescription: "The Mirror of Dramatic Irony is clouded with perceptual distortions! Solve the literary analysis quests to cleanse the glass and restore perspective.",
          repairedDescription: "The Mirror of Dramatic Irony gleams with crystal clarity, revealing hidden allegorical truths!",
          description: "Analyze symbolism, irony, tone, author's perspective, and themes!",
          conceptSummary: "Tone is the author's attitude toward the subject (e.g. sarcastic, solemn, celebratory), while Mood is the emotional feeling created in the reader. Dramatic irony happens when the audience knows a critical fact that characters do not. Symbolism uses an object or action to represent a deeper abstract meaning (like a wilting rose representing lost hope).",
          questions: [
            {
              id: "g8_e_1",
              text: "Which literary device is shown here: 'The ancient grandfather clock ticked mournfully in the corner of the abandoned nursery.'",
              options: ["Onomatopoeia", "Personification", "Hyperbole", "Alliteration"],
              correctIndex: 1,
              explanation: "Giving human emotions ('mournfully') to an inanimate clock is Personification.",
              hint: "Can an inanimate wooden clock genuinely feel grief or mourning?",
              detectiveAnalysis: "Inanimate objects cannot feel human sorrow. Attributing human feelings to non-human objects is personification.",
              workedExample: "Personification = Inanimate object + Human behavior or feeling ('clock ticked mournfully').",
              concept: "Personification"
            },
            {
              id: "g8_e_2",
              text: "A fire station unexpectedly catches fire and burns down. What type of IRONY is this?",
              options: ["Dramatic irony", "Situational irony", "Verbal irony", "Cosmic tragedy"],
              correctIndex: 1,
              explanation: "Situational irony occurs when the actual outcome is the exact opposite of what is logically expected.",
              hint: "It is an ironic situation where the exact place meant to extinguish fires burns down.",
              detectiveAnalysis: "Situational irony is when reality opposes expected logic (a fire station burns down, a pilot is afraid of heights).",
              workedExample: "Irony Types: Situational = Opposite outcome occurs; Dramatic = Audience knows secrets; Verbal = Sarcastic speech.",
              concept: "Situational Irony"
            },
            {
              id: "g8_e_3",
              text: "What is the difference between TONE and MOOD in literary analysis?",
              options: [
                "Tone is the setting; mood is the plot.",
                "Tone is the author's attitude; mood is the atmosphere/emotion evoked in the reader.",
                "Tone applies only to poetry; mood applies only to novels.",
                "Tone and mood are identical synonyms."
              ],
              correctIndex: 1,
              explanation: "Tone originates from the author's word choice and attitude; mood is the emotional atmosphere experienced by the reader.",
              hint: "Think: Tone belongs to the speaker/writer; Mood belongs to the audience/reader.",
              detectiveAnalysis: "Mnemonic rule: TONE = The author's voice/attitude. MOOD = My feelings as the reader.",
              workedExample: "Tone: Author writes with eerie suspense. Mood: Reader feels chills and tension.",
              concept: "Tone vs Mood"
            },
            {
              id: "g8_e_4",
              text: "Identify the OXYMORON among these phrases:",
              options: [
                "Roaring tiger",
                "Deafening silence",
                "Bright sunshine",
                "Swift river"
              ],
              correctIndex: 1,
              explanation: "An oxymoron pairs two contradictory contradictory terms side-by-side: 'deafening' (extremely loud) and 'silence' (no sound).",
              hint: "Look for two words together that have opposite meanings.",
              detectiveAnalysis: "An oxymoron juxtaposes mutually exclusive words: 'deafening' (overwhelming sound) + 'silence' (absence of sound).",
              workedExample: "Oxymoron examples: 'Deafening silence', 'Living dead', 'Cruel kindness'.",
              concept: "Oxymoron"
            },
            {
              id: "g8_e_5",
              text: "Read the excerpt: 'I have told you a million times not to leave your shoes in the hallway!' This sentence is an example of:",
              options: ["Understatement", "Hyperbole", "Metaphor", "Allegory"],
              correctIndex: 1,
              explanation: "Hyperbole is deliberate, extreme exaggeration not meant to be taken literally.",
              hint: "Has the speaker literally counted one million verbal warnings?",
              detectiveAnalysis: "Hyperbole uses intentional overstatement for rhetorical emphasis, not literal truth.",
              workedExample: "Hyperbole test: Did the speaker literally count 1,000,000 instances? No -> Exaggeration = Hyperbole.",
              concept: "Hyperbole"
            }
          ],
          revisionQuestions: [
            {
              id: "g8_e_rev_1",
              text: "In Shakespeare's Romeo and Juliet, the audience knows Juliet is only asleep from a potion, but Romeo believes she is dead. This is:",
              options: ["Dramatic irony", "Situational irony", "Verbal irony", "Sarcasm"],
              correctIndex: 0,
              explanation: "Dramatic irony occurs when the audience knows a crucial fact that a character does not know.",
              hint: "The viewers in the audience know what the character on stage does not.",
              detectiveAnalysis: "Audience has omniscient information that the characters onstage lack -> Dramatic irony.",
              workedExample: "Audience knows the killer is in the closet; protagonist enters unaware -> Dramatic Irony.",
              concept: "Dramatic Irony revision"
            },
            {
              id: "g8_e_rev_2",
              text: "Which of the following is an example of ONOMATOPOEIA?",
              options: [
                "The buzzing bee zoomed past",
                "The sky wept tears",
                "He ran like a cheetah",
                "Life is a highway"
              ],
              correctIndex: 0,
              explanation: "'Buzzing' and 'zoomed' are sound words that imitate the physical sound they describe.",
              hint: "Look for words that imitate real audio sounds.",
              detectiveAnalysis: "Onomatopoeia words phonetically mimic actual sonic sounds: 'buzz', 'zoom', 'crash', 'bang'.",
              workedExample: "Sound words: 'buzz', 'hiss', 'clack' = Onomatopoeia.",
              concept: "Onomatopoeia revision"
            },
            {
              id: "g8_e_rev_3",
              text: "A white dove in literature frequently serves as a SYMBOL for:",
              options: ["Greed and jealousy", "Peace and purity", "War and wrath", "Ignorance"],
              correctIndex: 1,
              explanation: "A white dove is universally recognized in literature and culture as a symbol for peace and hope.",
              hint: "What universal message does an olive branch and white dove represent?",
              detectiveAnalysis: "A symbol is a concrete object bearing universal abstract meaning. Dove with olive branch = Peace.",
              workedExample: "Symbolism: White Dove = Peace; Raven = Mortality; Lion = Courage.",
              concept: "Symbolism revision"
            }
          ]
        }
      ],
      science: [
        {
          id: "g8_sci_biology_chemistry",
          title: "Cell Biology & Chemical Reactions",
          icon: "🔬",
          islandName: "Molecular Sanctum",
          worldObject: "Mitochondrial Energy Core",
          brokenDescription: "The Mitochondrial Energy Core is drained of ATP, paralyzing the molecular reactions in the sanctum! Solve the cellular and chemical quests to restart cellular synthesis.",
          repairedDescription: "The Mitochondrial Core pulses with pure ATP cellular energy, illuminating all biochemical pathways!",
          description: "Explore organelles, cell division, chemical bonds, and the periodic table!",
          conceptSummary: "Cells are the fundamental units of life. Plant cells have cell walls and chloroplasts; animal cells do not. The nucleus houses genetic DNA, while mitochondria generate cellular energy (ATP). In chemistry, the Law of Conservation of Mass states that atoms are neither created nor destroyed in a chemical reaction—equations must balance!",
          questions: [
            {
              id: "g8_s_1",
              text: "Which organelle is often referred to as the 'powerhouse of the cell' because it generates ATP energy?",
              options: ["Ribosome", "Endoplasmic Reticulum", "Mitochondria", "Golgi apparatus"],
              correctIndex: 2,
              explanation: "Mitochondria carry out cellular respiration, converting glucose and oxygen into usable ATP energy for cell functions.",
              hint: "This organelle produces ATP through cellular respiration.",
              detectiveAnalysis: "Ribosomes synthesize proteins; Golgi packages molecules; Mitochondria generate ATP energy currency via respiration.",
              workedExample: "Organelle functions: Mitochondria = ATP Powerhouse; Nucleus = Genetic command; Ribosome = Protein factory.",
              concept: "Cell Organelles"
            },
            {
              id: "g8_s_2",
              text: "Which organelle is present in PLANT cells but ABSENT in animal cells?",
              options: ["Cell Membrane", "Mitochondria", "Chloroplast", "Nucleus"],
              correctIndex: 2,
              explanation: "Chloroplasts contain chlorophyll to perform photosynthesis; animal cells do not perform photosynthesis and lack chloroplasts and cell walls.",
              hint: "Which organelle contains chlorophyll for photosynthesis?",
              detectiveAnalysis: "Both plant and animal cells have membranes, nuclei, and mitochondria. Only plant cells have chloroplasts and cellulose cell walls.",
              workedExample: "Plant exclusives: Chloroplasts (photosynthesis), Cellulose Cell Wall, Large central vacuole.",
              concept: "Plant vs Animal Cells"
            },
            {
              id: "g8_s_3",
              text: "According to the Law of Conservation of Mass, in any closed chemical reaction:",
              options: [
                "Total mass of reactants equals the total mass of products",
                "Mass is destroyed as heat is given off",
                "New atoms are spontaneously generated",
                "Products always weigh twice as much as reactants"
              ],
              correctIndex: 0,
              explanation: "Matter cannot be created or destroyed in chemical reactions; atoms are simply rearranged into new molecular combinations.",
              hint: "Matter cannot be created from nothing or vanished into nothing.",
              detectiveAnalysis: "Atoms are neither created nor destroyed. The total mass entering a reaction must exactly equal the total mass exiting.",
              workedExample: "Reactant Mass = Product Mass. If 10g A + 20g B react fully -> Exactly 30g of product is formed.",
              concept: "Conservation of Mass"
            },
            {
              id: "g8_s_4",
              text: "What is the pH value of pure, neutral water at 25°C?",
              options: ["pH 1", "pH 7", "pH 14", "pH 0"],
              correctIndex: 1,
              explanation: "Pure water is neutral with a pH of 7. Values below 7 are acidic, and values above 7 are alkaline/basic.",
              hint: "The midpoint on the standard 0 to 14 pH scale.",
              detectiveAnalysis: "The pH scale ranges from 0 to 14. 7 is the exact neutral center where [H+] = [OH-].",
              workedExample: "pH < 7 = Acidic (lemon juice, vinegar); pH = 7 = Neutral (pure water); pH > 7 = Basic/Alkaline (bleach, soap).",
              concept: "pH Scale"
            },
            {
              id: "g8_s_5",
              text: "What subatomic particles are shared between atoms in a COVALENT chemical bond?",
              options: ["Protons", "Neutrons", "Electrons", "Positrons"],
              correctIndex: 2,
              explanation: "Covalent bonds form when two nonmetal atoms share pairs of valence electrons to achieve stable octet outer shells.",
              hint: "These negatively charged particles orbit the atomic nucleus.",
              detectiveAnalysis: "Protons and neutrons are bound inside the nucleus. Valence electrons in outer shells are shared in covalent bonds.",
              workedExample: "Covalent = Co (shared) + Valent (valence electrons). Example: H2O shares electron pairs between H and O.",
              concept: "Chemical Bonding"
            }
          ],
          revisionQuestions: [
            {
              id: "g8_s_rev_1",
              text: "Which organelle controls cellular activities and contains the genetic blueprint (DNA)?",
              options: ["Vacuole", "Nucleus", "Lysosome", "Centrosome"],
              correctIndex: 1,
              explanation: "The nucleus is the command center of eukaryotic cells, storing genomic DNA chromosomes.",
              hint: "The central command center of the cell.",
              detectiveAnalysis: "The nucleus holds genomic DNA and coordinates transcription and cell division.",
              workedExample: "Nucleus = Central control archive containing genetic chromosomes.",
              concept: "Cell Nucleus revision"
            },
            {
              id: "g8_s_rev_2",
              text: "A substance with a pH of 2 is classified as a:",
              options: ["Strong acid", "Strong base", "Neutral solution", "Weak base"],
              correctIndex: 0,
              explanation: "pH values from 0 to 3 are strong acids (e.g. stomach hydrochloric acid, lemon juice).",
              hint: "Very low numbers below 7 indicate acidity.",
              detectiveAnalysis: "Lower pH numbers mean higher hydrogen ion concentrations. pH 2 is a strong acid.",
              workedExample: "pH 1-3 = Strong acid; pH 4-6 = Weak acid; pH 7 = Neutral; pH 8-10 = Weak base; pH 11-14 = Strong base.",
              concept: "Acids and Bases revision"
            },
            {
              id: "g8_s_rev_3",
              text: "In the chemical reaction 2H₂ + O₂ → 2H₂O, how many total hydrogen atoms are in the reactants?",
              options: ["2", "4", "6", "8"],
              correctIndex: 1,
              explanation: "2 molecules of H₂ = 2 × 2 = 4 hydrogen atoms. In the product 2H₂O, there are also 2 × 2 = 4 hydrogen atoms!",
              hint: "Multiply coefficient 2 by subscript 2.",
              detectiveAnalysis: "Coefficient 2 × Subscript 2 = 4 Hydrogen atoms.",
              workedExample: "Reactant side: 2 × H2 = 2 × 2 = 4 H atoms. Product side: 2 × H2O = 2 × 2 = 4 H atoms. Balanced!",
              concept: "Balancing chemical equations revision"
            }
          ]
        }
      ]
    }
  },

  // ==================== PREVIEW GRADES (1, 2, 4, 6, 7, 9, 10) ====================
  1: { status: "preview", note: "Grades 1 & 2 Early Explorer modules are being illustrated with audio narration." },
  2: { status: "preview", note: "Grades 1 & 2 Early Explorer modules are being illustrated with audio narration." },
  4: { status: "preview", note: "Grade 4 Intermediate Quests are arriving in the next content drop." },
  6: { status: "preview", note: "Grade 6 Middle School Quests are undergoing pedagogical review." },
  7: { status: "preview", note: "Grade 7 Advanced Foundations are undergoing pedagogical review." },
  9: { status: "preview", note: "Grade 9 High School Prep Quests are arriving soon." },
  10: { status: "preview", note: "Grade 10 Board Exam Mastery Quests are arriving soon." }
};
