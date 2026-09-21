/**
 * content-data.js
 * WHS History Dashboard (AS92027) — content data only.
 *
 * This file holds everything a teacher is likely to want to edit: quiz
 * questions, flashcards, timeline events, the writing-sandbox prompts, and
 * the keyword/error lists used by the essay analyzer. It has no page logic
 * in it — edit the values below and the app in app.js will pick them up.
 *
 * Must be loaded BEFORE app.js.
 */

const timelineData = {
            'jul26': { title: 'July 26, 1945: The Potsdam Declaration', text: 'The US, UK, and China issue the Potsdam Declaration, demanding the unconditional surrender of all Japanese armed forces. It explicitly threatens "prompt and utter destruction" if Japan refuses.' },
            'aug6': { title: 'August 6, 1945: Hiroshima', text: 'The US drops the first atomic bomb ("Little Boy") on the city of Hiroshima. An estimated 70,000 to 135,000 people are killed.' },
            'aug8': { title: 'August 8, 1945: Soviet Invasion', text: 'The Soviet Union officially declares war on Japan and invades Japanese-occupied Manchuria. This shatters Japanese hopes of Soviet mediation for a negotiated peace.' },
            'aug9': { title: 'August 9, 1945: Nagasaki', text: 'The US drops the second atomic bomb ("Fat Man") on the city of Nagasaki, killing an estimated 39,000 to 80,000 people.' },
            'aug9_10': { title: 'August 9-10, 1945: The Emperor Intervenes', text: 'During a midnight meeting of the Supreme Council for the Direction of the War, Emperor Hirohito takes the unprecedented step of intervening in the 3-3 deadlocked debate, deciding to accept the Potsdam Declaration provided the imperial institution is preserved.' },
            'aug11': { title: 'August 11, 1945: The Byrnes Note', text: 'US Secretary of State James F. Byrnes drafts a response to Japan stating that the authority of the Emperor would be "subject to the Supreme Commander of the Allied powers." It provides just enough ambiguity for Japan to surrender.' },
            'aug15': { title: 'August 15, 1945: Jewel Voice Broadcast', text: 'Emperor Hirohito\'s prerecorded radio address (the Gyokuon-hōsō) is broadcast to the Japanese people, publicly announcing the surrender and citing the "cruel bomb".' },
            'sep2': { title: 'September 2, 1945: Formal Surrender', text: 'Formal surrender documents are signed by Japanese delegates and Allied forces aboard the USS Missouri in Tokyo Bay, officially ending WWII.', img: 'https://cdn2.picryl.com/photo/1945/09/02/surrender-of-japan-uss-missouri-9ff472-1024.jpg', imgAlt: 'Japanese delegates aboard USS Missouri during the surrender ceremony, Tokyo Bay, 2 September 1945', imgCaption: 'Japanese representatives on board USS Missouri during the surrender ceremonies, 2 September 1945. Public domain (US Army Signal Corps, via Wikimedia Commons).' }
        };

const masterQuizData = [
            { cat: 'factual', q: "What was the doctrine established by the Allies in January 1943?", opts: ["The Four Freedoms", "Unconditional Surrender", "The Potsdam Declaration", "Operation Ketsugo"], ans: 1, exp: "Correct! 'Unconditional Surrender' was established by FDR in 1943." },
            { cat: 'factual', q: "What event on August 8, 1945, shattered Japan's hope for a negotiated peace?", opts: ["Bombing of Hiroshima", "Bombing of Nagasaki", "Soviet Union declared war", "Military coup"], ans: 2, exp: "Correct! The Soviet invasion eliminated Japan's last diplomatic option." },
            { cat: 'factual', q: "Which concept drove Emperor Hirohito to preserve the imperial system?", opts: ["Democracy", "Unconditional Surrender", "Article 9", "Kokutai"], ans: 3, exp: "Correct! 'Kokutai' refers to the National Essence or the preservation of the imperial system." },
            { cat: 'factual', q: "What nickname was given to General MacArthur by the Japanese public?", opts: ["The Iron Commander", "The Gentle Conqueror", "The Emperor's Voice", "The Great Rebuilder"], ans: 1, exp: "Correct! Because of his focus on rebuilding, he was called the 'Gentle Conqueror'." },
            { cat: 'factual', q: "What was the upper estimate of American casualties President Truman was trying to avoid with Operation Downfall?", opts: ["50,000+", "100,000+", "132,000+", "1 Million+"], ans: 3, exp: "Correct! Military planners estimated up to 1 Million+ casualties if a land invasion occurred." },
            { cat: 'factual', q: "When did Emperor Hirohito deliver the Jewel Voice Broadcast?", opts: ["July 26, 1945", "August 6, 1945", "August 8, 1945", "August 15, 1945"], ans: 3, exp: "Correct! He announced the surrender on August 15, 1945." },
            { cat: 'factual', q: "What caused a stalemate in the Japanese leadership council?", opts: ["A 3-3 split in the 'Big Six'", "Loss of communication", "Assassination of leaders", "American blockades"], ans: 0, exp: "Correct! A 3-3 split in the 'Big Six' paralysed the government, forcing the Emperor to intervene." },
            { cat: 'factual', q: "Who drafted the 'Byrnes Note' on August 11?", opts: ["Henry Stimson", "Harry Truman", "James F. Byrnes", "Douglas MacArthur"], ans: 2, exp: "Correct! US Secretary of State James F. Byrnes drafted the note keeping the Emperor's authority subject to the Supreme Commander." },
            { cat: 'factual', q: "Which US Secretary of War advocated for allowing Japan to keep the Emperor?", opts: ["Franklin D. Roosevelt", "Harry S. Truman", "Henry L. Stimson", "James F. Byrnes"], ans: 2, exp: "Correct! Henry L. Stimson believed it was the only way to secure a prompt and orderly surrender." },
            { cat: 'factual', q: "What wider historical context was Truman preparing for by rebuilding Japan?", opts: ["World War I", "The Vietnam War", "The Cold War", "The Korean War"], ans: 2, exp: "Correct! The US wanted Japan to be a strong capitalist shield in the upcoming Cold War against the Soviet Union." },
            { cat: 'factual', q: "What did the Potsdam Declaration (July 26) threaten if Japan refused to surrender?", opts: ["Economic sanctions", "Prompt and utter destruction", "Loss of the Emperor", "A naval blockade"], ans: 1, exp: "Correct! It explicitly threatened 'prompt and utter destruction'." },
            { cat: 'factual', q: "Who was the Prime Minister of Japan during the surrender who asked the Emperor to break the deadlock?", opts: ["Shigeru Yoshida", "Korechika Anami", "Kantaro Suzuki", "Hideki Tojo"], ans: 2, exp: "Correct! Kantaro Suzuki was the PM who asked the Emperor to intervene." },

            // --- Perspective reasoning ---
            { cat: 'perspective', q: "Which statement best explains why Hirohito's perspective differed from Truman's?", opts: ["Hirohito wanted democracy while Truman wanted military rule", "Hirohito prioritised preserving the Imperial system, while Truman prioritised eliminating Japanese militarism", "Both leaders had identical goals", "Hirohito wanted the war to continue, Truman wanted peace"], ans: 1, exp: "Correct! Their perspectives differed because they valued different things: Kokutai vs. the total defeat of militarism." },
            { cat: 'perspective', q: "Which action best demonstrates the US belief that Japanese militarism needed to be permanently removed?", opts: ["The Jewel Voice Broadcast", "The Byrnes Note and demand for unconditional surrender", "Suzuki's request to the Emperor", "The 3-3 Big Six deadlock"], ans: 1, exp: "Correct! The Byrnes Note and the insistence on unconditional surrender show the US wanted militarism eliminated, not just the fighting stopped." },
            { cat: 'perspective', q: "Why did Hirohito choose to intervene directly in the government's decision, breaking centuries of tradition?", opts: ["He wanted to personally lead troops", "The threat to Japan's survival was so severe it justified breaking Imperial non-intervention", "MacArthur ordered him to", "He had lost his religious authority"], ans: 1, exp: "Correct! The scale of the crisis - atomic bombs and Soviet invasion - justified an action Emperors traditionally never took." },
            { cat: 'perspective', q: "What best explains Truman's motivation for wanting a swift end to the war?", opts: ["Personal ambition for a Nobel Prize", "Avoiding the massive projected casualties of Operation Downfall", "A promise made to Stalin", "Pressure from the United Nations"], ans: 1, exp: "Correct! The 1 Million+ projected casualties of a land invasion was Truman's central concern." },
            { cat: 'perspective', q: "Which belief most shaped Hirohito's decision-making in August 1945?", opts: ["Democracy and free elections", "Preservation of the Kokutai", "Alliance with Germany", "Expansion of the empire"], ans: 1, exp: "Correct! Kokutai — the preservation of the Imperial system — was Hirohito's central value." },
            { cat: 'perspective', q: "Why was the Byrnes Note deliberately ambiguous about the Emperor's future role?", opts: ["The US hadn't decided Japan's fate yet", "It was used as leverage to secure surrender while leaving the Emperor's status unresolved", "Byrnes forgot to specify", "It was a translation error"], ans: 1, exp: "Correct! The ambiguity was strategic — it kept pressure on Japan to surrender without fully committing to the Emperor's future." },
            { cat: 'perspective', q: "What motivated Stimson to argue for keeping the Emperor in some capacity?", opts: ["He believed it would secure a faster, more orderly surrender", "He was personally sympathetic to Hirohito", "He wanted to weaken Truman's position", "He opposed using the atomic bomb"], ans: 0, exp: "Correct! Stimson believed retaining the Emperor's symbolic role would make the surrender and occupation go more smoothly." },
            { cat: 'perspective', q: "Which idea best explains why the 'Big Six' council was deadlocked 3-3?", opts: ["Some wanted peace with conditions, others wanted to continue fighting", "Half of the council were secretly pro-American", "It was a religious dispute", "It was a disagreement about relocating the capital"], ans: 0, exp: "Correct! The council was split between those who accepted surrender with conditions and hardliners who wanted to keep fighting." },
            { cat: 'perspective', q: "What does Hirohito's phrase 'enduring the unendurable' reveal about his perspective?", opts: ["He didn't believe surrender was necessary", "He saw surrender as a painful but necessary sacrifice to preserve Japan", "He blamed the military entirely for the war", "He was indifferent to the outcome"], ans: 1, exp: "Correct! It shows surrender was framed as a difficult sacrifice made to save the nation, not a simple decision." },
            { cat: 'perspective', q: "Why did the US see rebuilding Japan as a democracy as important to their perspective?", opts: ["It aligned with their belief that militarism, not the Japanese people, caused the war", "It was required by the Geneva Convention", "MacArthur personally wanted it", "It had no connection to their perspective"], ans: 0, exp: "Correct! Rebuilding Japan as a democracy followed directly from the US belief that militarism was the real enemy." },

            // --- Comparison & wider context reasoning ---
            { cat: 'comparison', q: "Which comparison would most likely lift an answer from Achieved to Merit?", opts: ["Describing the US perspective in more detail", "Explicitly comparing the US and Hirohito's motivations and explaining why they differed", "Listing more dates", "Repeating the same paragraph twice"], ans: 1, exp: "Correct! Merit requires an explicit comparison between perspectives, not just a longer description of one." },
            { cat: 'comparison', q: "How did Soviet entry into the war affect the perspectives of the US and Japanese leadership differently?", opts: ["It reassured both sides equally", "For the US it added pressure to end the war quickly; for Japan it removed the last hope of a negotiated peace via Soviet mediation", "It had no real impact on either side", "It only affected the US"], ans: 1, exp: "Correct! The same event (Soviet invasion) shaped each side's perspective very differently." },
            { cat: 'comparison', q: "What is a key similarity between the US and Japanese perspectives in August 1945?", opts: ["Both wanted the war to end, even though they wanted different outcomes from it", "Both wanted the war to continue indefinitely", "Both supported total Japanese military defeat", "Both rejected the idea of surrender"], ans: 0, exp: "Correct! Despite their differences, both sides ultimately wanted the war to end." },
            { cat: 'comparison', q: "Which best explains why the US and Hirohito took very different kinds of action in August 1945?", opts: ["It was random chance", "The US acted externally through military and diplomatic force, while Hirohito acted internally within his own government, because they valued different things", "They were following the same plan", "Neither side took meaningful action"], ans: 1, exp: "Correct! Their differing values (military elimination of a threat vs. institutional survival) explain the very different types of action each took." },
            { cat: 'comparison', q: "How does connecting to the 'Wider Context' (e.g. the Cold War) typically affect an answer's grade?", opts: ["It has no effect on grading", "It can help lift a well-compared answer from Merit to Excellence by showing deeper understanding", "It automatically guarantees Excellence regardless of comparison", "It replaces the need for evidence"], ans: 1, exp: "Correct! Wider context adds depth on top of a strong comparison — it can't substitute for one." },
            { cat: 'comparison', q: "Which of these is the best example of an explicit comparison sentence?", opts: ["\"Truman dropped the bomb in August 1945.\"", "\"Whereas Truman prioritised military victory, Hirohito prioritised preserving the Kokutai.\"", "\"The war ended in September 1945.\"", "\"Hirohito made a broadcast.\""], ans: 1, exp: "Correct! It directly contrasts both perspectives using a comparison word ('whereas')." },
            { cat: 'comparison', q: "What role did Meiji-era tradition play in shaping Hirohito's perspective?", opts: ["It required Emperors to command the military directly", "It meant Emperors traditionally stayed out of politics, making Hirohito's intervention historically significant", "It had no bearing on his choices", "It demanded immediate surrender"], ans: 1, exp: "Correct! Hirohito breaking a ~70-year tradition of non-intervention shows just how serious the crisis was." },
            { cat: 'comparison', q: "Why might an answer that only describes two perspectives, without comparing them, be capped at Achieved?", opts: ["Because the standard requires explicit comparison and explanation of why perspectives differed, not just description", "Because two perspectives is too many to include", "Because Achieved-level answers must be short", "Because comparison is optional for this standard"], ans: 0, exp: "Correct! Describing two perspectives shows knowledge, but the standard rewards comparing them and explaining the difference." }
        ];

const flashcardData = [
            { front: "July 26, 1945", back: "Potsdam Declaration issued, demanding unconditional surrender." },
            { front: "August 8-9, 1945", back: "Soviet Union declares war on Japan and invades Manchuria." },
            { front: "August 9-10, 1945", back: "Emperor Hirohito intervenes in deadlocked midnight meeting." },
            { front: "August 15, 1945", back: "Emperor Hirohito delivers the Jewel Voice Broadcast." },
            { front: "Emperor Hirohito", back: "Stepped in to break a 3-3 deadlock, prioritising the survival of the Japanese nation." },
            { front: "Henry L. Stimson", back: "US Secretary of War. Advocated allowing Japan to keep the Emperor." },
            { front: "James F. Byrnes", back: "US Secretary of State. Drafted the 'Byrnes Note'." },
            { front: "The 'Big Six'", back: "Japan's Supreme War Council, paralysed by a 3-3 split." },
            { front: "Gen. Korechika Anami", back: "Japanese Minister of War. Hardliner pushing for Ketsu-Gō (mainland battle)." },
            { front: "Kantaro Suzuki", back: "Japanese PM who asked Emperor to break the 3-3 deadlock." },
            { front: "1 Million+", back: "Upper estimate of US casualties for land invasion (Operation Downfall)." },
            { front: "Kokutai", back: "National Essence and Imperial preservation." },
            { front: "Wider Context (US)", back: "Preparing for the Cold War by building a democratic, capitalist ally." }
        ];

const sandboxPrompts = [
            "1 - Identify an individual or group from your chosen historical context. What was their perspective?",
            "2 - How did at least ONE action taken by the individual or group in (a) demonstrate their perspective?",
            "3 - Identify a different individual or group from your chosen historical context. What was their perspective and how does it differ from the first perspective you identified?",
            "4 - How did at least ONE action taken by the 2nd individual or group demonstrate their perspective and how does it differ from the action(s) identified in your 1st individual or group.",
            "5 - Why did the two perspectives differ?",
            "6 - How did wider historical circumstances help shape these different perspectives?"
        ];

const vaultKeywords = {
            names: ['truman', 'macarthur', 'hirohito', 'big six', 'anami', 'yoshida', 'stimson', 'byrnes', 'suzuki'],
            dates: ['1943', '1945', 'july 26', 'august 6', 'august 8', 'august 9', 'august 15', 'september 2', '1951', '132,000', '1 million', '3-3', '6 days', '70,000', '39,000'],
            concepts: ['kokutai', 'unconditional surrender', 'potsdam', 'byrnes note', 'annihilation', 'gentle conqueror', 'boundless gratitude', 'cold war', 'meiji', 'soviet', 'downfall', 'ketsu', 'rain of ruin']
        };

const errorChecks = [
            { regex: /atomic bomb(s)? on tokyo/i, warning: "Error: The atomic bombs were dropped on Hiroshima and Nagasaki, not Tokyo (which was firebombed earlier)." },
            { regex: /hirohito dropped/i, warning: "Error: Emperor Hirohito did not drop the bomb; US President Truman authorised it." },
            { regex: /macarthur dropped/i, warning: "Error: General MacArthur was the Supreme Commander of the occupation, but Truman authorised the atomic bombs." },
            { regex: /hirohito wanted to continue|hirohito wanted to fight/i, warning: "Error: Hirohito broke the deadlock to SURRENDER. It was military hardliners like Anami who wanted to continue the war." },
            { regex: /soviet(s)? dropped|russia(ns)? dropped/i, warning: "Error: The Soviet Union declared war and invaded Manchuria, but the US dropped the atomic bombs." },
            { regex: /fdr dropped|roosevelt dropped/i, warning: "Error: FDR died in April 1945. Truman authorised the bombs." },
            { regex: /august 6(.{1,15})nagasaki/i, warning: "Error: Hiroshima was bombed on August 6; Nagasaki was bombed on August 9." },
            { regex: /august 9(.{1,15})hiroshima/i, warning: "Error: Hiroshima was bombed on August 6; Nagasaki was bombed on August 9." }
        ];

