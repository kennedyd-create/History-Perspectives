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
            'sep2': { title: 'September 2, 1945: Formal Surrender', text: 'Formal surrender documents are signed by Japanese delegates and Allied forces aboard the USS Missouri in Tokyo Bay, officially ending WWII.' }
        };

const masterQuizData = [
            { q: "What was the doctrine established by the Allies in January 1943?", opts: ["The Four Freedoms", "Unconditional Surrender", "The Potsdam Declaration", "Operation Ketsugo"], ans: 1, exp: "Correct! 'Unconditional Surrender' was established by FDR in 1943." },
            { q: "What event on August 8, 1945, shattered Japan's hope for a negotiated peace?", opts: ["Bombing of Hiroshima", "Bombing of Nagasaki", "Soviet Union declared war", "Military coup"], ans: 2, exp: "Correct! The Soviet invasion eliminated Japan's last diplomatic option." },
            { q: "Which concept drove Emperor Hirohito to preserve the imperial system?", opts: ["Democracy", "Unconditional Surrender", "Article 9", "Kokutai"], ans: 3, exp: "Correct! 'Kokutai' refers to the National Essence or the preservation of the imperial system." },
            { q: "What nickname was given to General MacArthur by the Japanese public?", opts: ["The Iron Commander", "The Gentle Conqueror", "The Emperor's Voice", "The Great Rebuilder"], ans: 1, exp: "Correct! Because of his focus on rebuilding, he was called the 'Gentle Conqueror'." },
            { q: "What was the upper estimate of American casualties President Truman was trying to avoid with Operation Downfall?", opts: ["50,000+", "100,000+", "132,000+", "1 Million+"], ans: 3, exp: "Correct! Military planners estimated up to 1 Million+ casualties if a land invasion occurred." },
            { q: "When did Emperor Hirohito deliver the Jewel Voice Broadcast?", opts: ["July 26, 1945", "August 6, 1945", "August 8, 1945", "August 15, 1945"], ans: 3, exp: "Correct! He announced the surrender on August 15, 1945." },
            { q: "What caused a stalemate in the Japanese leadership council?", opts: ["A 3-3 split in the 'Big Six'", "Loss of communication", "Assassination of leaders", "American blockades"], ans: 0, exp: "Correct! A 3-3 split in the 'Big Six' paralyzed the government, forcing the Emperor to intervene." },
            { q: "Who drafted the 'Byrnes Note' on August 11?", opts: ["Henry Stimson", "Harry Truman", "James F. Byrnes", "Douglas MacArthur"], ans: 2, exp: "Correct! US Secretary of State James F. Byrnes drafted the note keeping the Emperor's authority subject to the Supreme Commander." },
            { q: "Which US Secretary of War advocated for allowing Japan to keep the Emperor?", opts: ["Franklin D. Roosevelt", "Harry S. Truman", "Henry L. Stimson", "James F. Byrnes"], ans: 2, exp: "Correct! Henry L. Stimson believed it was the only way to secure a prompt and orderly surrender." },
            { q: "What wider historical context was Truman preparing for by rebuilding Japan?", opts: ["World War I", "The Vietnam War", "The Cold War", "The Korean War"], ans: 2, exp: "Correct! The US wanted Japan to be a strong capitalist shield in the upcoming Cold War against the Soviet Union." },
            { q: "What did the Potsdam Declaration (July 26) threaten if Japan refused to surrender?", opts: ["Economic sanctions", "Prompt and utter destruction", "Loss of the Emperor", "A naval blockade"], ans: 1, exp: "Correct! It explicitly threatened 'prompt and utter destruction'." },
            { q: "Who was the Prime Minister of Japan during the surrender who asked the Emperor to break the deadlock?", opts: ["Shigeru Yoshida", "Korechika Anami", "Kantaro Suzuki", "Hideki Tojo"], ans: 2, exp: "Correct! Kantaro Suzuki was the PM who asked the Emperor to intervene." }
        ];

const flashcardData = [
            { front: "July 26, 1945", back: "Potsdam Declaration issued, demanding unconditional surrender." },
            { front: "August 8-9, 1945", back: "Soviet Union declares war on Japan and invades Manchuria." },
            { front: "August 9-10, 1945", back: "Emperor Hirohito intervenes in deadlocked midnight meeting." },
            { front: "August 15, 1945", back: "Emperor Hirohito delivers the Jewel Voice Broadcast." },
            { front: "Emperor Hirohito", back: "Stepped in to break a 3-3 deadlock, prioritizing the survival of the Japanese nation." },
            { front: "Henry L. Stimson", back: "US Secretary of War. Advocated allowing Japan to keep the Emperor." },
            { front: "James F. Byrnes", back: "US Secretary of State. Drafted the 'Byrnes Note'." },
            { front: "The 'Big Six'", back: "Japan's Supreme War Council, paralyzed by a 3-3 split." },
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
            "4 - How did at least ONE action taken by the 2nd individual or group demonstrate their perspective and how does it differ from the action(s) identified in your 1st individual or group."
        ];

const vaultKeywords = {
            names: ['truman', 'macarthur', 'hirohito', 'big six', 'anami', 'yoshida', 'stimson', 'byrnes', 'suzuki'],
            dates: ['1943', '1945', 'july 26', 'august 6', 'august 8', 'august 9', 'august 15', 'september 2', '1951', '132,000', '1 million', '3-3', '6 days', '70,000', '39,000'],
            concepts: ['kokutai', 'unconditional surrender', 'potsdam', 'byrnes note', 'annihilation', 'gentle conqueror', 'boundless gratitude', 'cold war', 'meiji', 'soviet', 'downfall', 'ketsu', 'rain of ruin']
        };

const errorChecks = [
            { regex: /atomic bomb(s)? on tokyo/i, warning: "Error: The atomic bombs were dropped on Hiroshima and Nagasaki, not Tokyo (which was firebombed earlier)." },
            { regex: /hirohito dropped/i, warning: "Error: Emperor Hirohito did not drop the bomb; US President Truman authorized it." },
            { regex: /macarthur dropped/i, warning: "Error: General MacArthur was the Supreme Commander of the occupation, but Truman authorized the atomic bombs." },
            { regex: /hirohito wanted to continue|hirohito wanted to fight/i, warning: "Error: Hirohito broke the deadlock to SURRENDER. It was military hardliners like Anami who wanted to continue the war." },
            { regex: /soviet(s)? dropped|russia(ns)? dropped/i, warning: "Error: The Soviet Union declared war and invaded Manchuria, but the US dropped the atomic bombs." },
            { regex: /fdr dropped|roosevelt dropped/i, warning: "Error: FDR died in April 1945. Truman authorized the bombs." },
            { regex: /august 6(.{1,15})nagasaki/i, warning: "Error: Hiroshima was bombed on August 6; Nagasaki was bombed on August 9." },
            { regex: /august 9(.{1,15})hiroshima/i, warning: "Error: Hiroshima was bombed on August 6; Nagasaki was bombed on August 9." }
        ];

