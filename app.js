/**
 * app.js
 * WHS History Dashboard (AS92027) — application logic.
 *
 * Handles: safe local storage, gamification (XP/level/streak), the exam
 * countdown, to-do list, exam timer, quiz chart, dark mode, tab navigation,
 * the interactive timeline, the practice hub (quiz + flashcards), and the
 * writing sandbox / essay analyzer.
 *
 * Depends on content-data.js being loaded first (it defines timelineData,
 * masterQuizData, flashcardData, sandboxPrompts, vaultKeywords, errorChecks).
 */

// --- Audio System ---
        function playBeep(type) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if(!AudioContext) return;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            if(type === 'ding') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.3);
            } else if (type === 'alarm') {
                osc.type = 'square';
                osc.frequency.setValueAtTime(400, ctx.currentTime);
                osc.frequency.setValueAtTime(600, ctx.currentTime + 0.2);
                osc.frequency.setValueAtTime(400, ctx.currentTime + 0.4);
                osc.frequency.setValueAtTime(600, ctx.currentTime + 0.6);
                gain.gain.setValueAtTime(0.2, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 1.5);
            }
        }

        // --- Safe Storage Wrapper ---
        // Wraps localStorage in try/catch with an in-memory fallback, so the app
        // still works (just without persistence) inside iframes, privacy modes,
        // or any context where localStorage throws.
        const safeStorage = (function () {
            let available = true;
            try {
                const testKey = '__whs_storage_test__';
                window.localStorage.setItem(testKey, '1');
                window.localStorage.removeItem(testKey);
            } catch (e) {
                available = false;
                console.warn('WHS Dashboard: localStorage is unavailable. Progress will not be saved between visits.');
            }
            const memoryStore = {};
            return {
                get(key) {
                    if (available) {
                        try { return window.localStorage.getItem(key); } catch (e) { /* fall through */ }
                    }
                    return Object.prototype.hasOwnProperty.call(memoryStore, key) ? memoryStore[key] : null;
                },
                set(key, value) {
                    if (available) {
                        try { window.localStorage.setItem(key, value); return; } catch (e) { /* fall through */ }
                    }
                    memoryStore[key] = String(value);
                },
                has(key) {
                    if (available) {
                        try { return key in window.localStorage; } catch (e) { /* fall through */ }
                    }
                    return Object.prototype.hasOwnProperty.call(memoryStore, key);
                },
                isPersistent() { return available; }
            };
        })();

        // --- Gamification Logic ---
        let xp = parseInt(safeStorage.get('whs_xp')) || 0;

        function getLevel(xpValue) {
            return Math.floor(Math.sqrt(xpValue / 10)) + 1;
        }

        function updateXPDisplay() {
            document.getElementById('xp-display').innerText = xp;
            document.getElementById('level-display').innerText = getLevel(xp);
        }

        function addXP(amount) {
            let oldLevel = getLevel(xp);
            xp += amount;
            safeStorage.set('whs_xp', xp);
            let newLevel = getLevel(xp);
            
            updateXPDisplay();
            playBeep('ding');

            if (newLevel > oldLevel) {
                const container = document.getElementById('xp-container');
                container.classList.add('level-up');
                setTimeout(() => container.classList.remove('level-up'), 1000);
            }
        }

        function initStreak() {
            const today = new Date().toDateString();
            let lastLogin = safeStorage.get('whs_last_login');
            let streak = parseInt(safeStorage.get('whs_streak')) || 0;

            if (lastLogin !== today) {
                const yesterday = new Date(Date.now() - 86400000).toDateString();
                if (lastLogin === yesterday) {
                    streak++; // Consecutive day: extend the streak
                } else {
                    streak = 1; // First-ever visit, or a gap of 2+ days: streak restarts
                }
                safeStorage.set('whs_last_login', today);
                safeStorage.set('whs_streak', streak);
            } else if (streak === 0) {
                // Same-day load but nothing recorded yet (e.g. very first session)
                streak = 1;
                safeStorage.set('whs_streak', streak);
            }
            const counter = document.getElementById('streak-counter');
            if (counter) counter.innerText = streak;
        }

        function initCountdown() {
            // Hardcoded Date: Wednesday 18th November 2026 9.30am
            const targetDate = new Date("November 18, 2026 09:30:00");
            const now = new Date();
            const diffTime = targetDate - now;
            
            document.getElementById('exam-date-label').innerText = "Wed 18 Nov, 9:30am";
            
            if (diffTime > 0) {
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                document.getElementById('exam-countdown').innerText = `${diffDays} Days to go`;
            } else {
                document.getElementById('exam-countdown').innerText = `Exam Today!`;
            }
        }

        // --- To-Do List Logic ---
        function initTodos() { 
            const todos = JSON.parse(safeStorage.get('whs_history_todos'));
            if (!todos || todos.length === 0) {
                const defaultTodos = [
                    { text: "Memorise 3 stats for US Perspective", done: false },
                    { text: "Memorise 2 quotes from Hirohito", done: false },
                    { text: "Score 100% on the Practice Quiz", done: false },
                    { text: "Draft one Excellence-level paragraph", done: false }
                ];
                safeStorage.set('whs_history_todos', JSON.stringify(defaultTodos));
            }
            renderTodos(); 
        }

        function renderTodos() {
            const todos = JSON.parse(safeStorage.get('whs_history_todos')) || [];
            const list = document.getElementById('todo-list');
            list.innerHTML = '';
            todos.forEach((t, i) => {
                list.innerHTML += `
                <li class="flex justify-between items-center bg-slate-50 dark:bg-slate-700/50 p-2 md:p-3 rounded-lg border border-slate-200 dark:border-slate-600 transition ${t.done ? 'opacity-50' : ''}">
                    <span class="text-sm ${t.done ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200 font-medium'}">${t.text}</span>
                    <div class="flex gap-2 shrink-0">
                        <button onclick="toggleTodo(${i})" class="text-xs font-bold px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-600 ${t.done ? 'text-slate-600 dark:text-slate-400' : 'text-emerald-600 dark:text-emerald-400'}">${t.done ? 'Undo' : 'Done ✓'}</button>
                        <button onclick="deleteTodo(${i})" class="text-xs font-bold px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400">✕</button>
                    </div>
                </li>`;
            });
        }

        function addTodo() {
            const input = document.getElementById('todo-input');
            const text = input.value.trim();
            if (text) {
                const todos = JSON.parse(safeStorage.get('whs_history_todos')) || [];
                todos.push({ text: text, done: false });
                safeStorage.set('whs_history_todos', JSON.stringify(todos));
                input.value = '';
                renderTodos();
            }
        }

        function toggleTodo(index) {
            const todos = JSON.parse(safeStorage.get('whs_history_todos'));
            todos[index].done = !todos[index].done;
            safeStorage.set('whs_history_todos', JSON.stringify(todos));
            if(todos[index].done) addXP(10);
            renderTodos();
        }

        function deleteTodo(index) {
            const todos = JSON.parse(safeStorage.get('whs_history_todos'));
            todos.splice(index, 1);
            safeStorage.set('whs_history_todos', JSON.stringify(todos));
            renderTodos();
        }

        // --- Exam Timer Logic (Sandbox) ---
        let timerInterval = null;
        let timeLeft = 3000; // 50 mins

        function updateTimerDisplay() {
            const m = Math.floor(timeLeft/60).toString().padStart(2, '0');
            const s = (timeLeft%60).toString().padStart(2, '0');
            document.getElementById('timer-display').innerText = `${m}:${s}`;
        }

        function toggleTimer() {
            const btn = document.getElementById('exam-timer-btn');
            if(timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
                btn.innerHTML = `⏱️ Paused: <span id="timer-display" class="tabular-nums font-mono text-lg">${document.getElementById('timer-display').innerText}</span>`;
                btn.classList.remove('bg-rose-600', 'border-rose-500');
                btn.classList.add('bg-amber-500', 'border-amber-400');
            } else {
                // If it's starting from zero, reset to 50
                if (timeLeft <= 0) timeLeft = 3000;
                
                btn.classList.remove('bg-slate-800', 'bg-amber-500', 'border-slate-700', 'border-amber-400');
                btn.classList.add('bg-rose-600', 'border-rose-500', 'animate-pulse');
                
                // Play starting beep
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if(AudioContext) {
                    const ctx = new AudioContext();
                    ctx.resume().then(() => playBeep('ding'));
                }
                
                timerInterval = setInterval(() => {
                    timeLeft--;
                    updateTimerDisplay();
                    if(timeLeft <= 0) {
                        clearInterval(timerInterval);
                        timerInterval = null;
                        playBeep('alarm');
                        btn.classList.remove('animate-pulse', 'bg-rose-600', 'border-rose-500');
                        btn.classList.add('bg-slate-800', 'border-slate-700');
                        btn.innerHTML = `⏱️ Time's Up!`;
                        alert("Exam time is up! Pens down.");
                    } else {
                        btn.innerHTML = `⏱️ Running: <span id="timer-display" class="tabular-nums font-mono text-lg">${Math.floor(timeLeft/60).toString().padStart(2,'0')}:${(timeLeft%60).toString().padStart(2,'0')}</span>`;
                    }
                }, 1000);
            }
        }

        // --- Chart.js Logic (Quiz Scores) ---
        let quizChartInstance = null;

        function initQuizChart() {
            const canvas = document.getElementById('quizChart');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (quizChartInstance) quizChartInstance.destroy();

            // Load last 7 scores or default
            let scores = JSON.parse(safeStorage.get('whs_quiz_scores')) || [0,0,0,0,0,0,0];
            const labels = ['1','2','3','4','5','6','Latest'];
            const isDark = document.documentElement.classList.contains('dark');
            const textColor = isDark ? '#94a3b8' : '#475569';
            const gridColor = isDark ? '#334155' : '#e2e8f0';

            quizChartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Score (out of 5)',
                        data: scores,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.2)',
                        borderWidth: 3,
                        pointBackgroundColor: '#10b981',
                        pointRadius: 4,
                        fill: true,
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { min: 0, max: 5, ticks: { stepSize: 1, color: textColor }, grid: { color: gridColor } },
                        x: { ticks: { color: textColor }, grid: { display: false } }
                    }
                }
            });
        }

        function updateQuizChart(newScore) {
            let scores = JSON.parse(safeStorage.get('whs_quiz_scores')) || [0,0,0,0,0,0,0];
            scores.shift(); // remove oldest
            scores.push(newScore); // add newest
            safeStorage.set('whs_quiz_scores', JSON.stringify(scores));
            
            if(quizChartInstance) {
                quizChartInstance.data.datasets[0].data = scores;
                quizChartInstance.update();
            } else {
                initQuizChart();
            }
        }


        // --- Dark Mode Logic ---
        function toggleDarkMode() {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            safeStorage.set('whs_theme', isDark ? 'dark' : 'light');
            setTimeout(initQuizChart, 50); // Redraw chart colors
        }
        if (safeStorage.get('whs_theme') === 'dark' || (!safeStorage.has('whs_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        }

        // --- Navigation Logic ---
        document.body.addEventListener('click', function(e) {
            var target = e.target.closest('[data-action="view"]');
            if (!target) return;
            
            var viewId = target.getAttribute('data-target');
            
            ['standard', 'sources', 'perspectives', 'vault', 'blueprint', 'practice', 'feedback', 'exemplars', 'wellbeing'].forEach(function(v) {
                var el = document.getElementById('view-' + v);
                var btn = document.querySelector('[data-target="' + v + '"]');
                if (el) { el.classList.remove('block'); el.classList.add('hidden'); }
                if (btn) { btn.classList.remove('nav-active'); btn.setAttribute('aria-selected', 'false'); }
            });
            
            var activeView = document.getElementById('view-' + viewId);
            var activeBtn = document.querySelector('[data-target="' + viewId + '"]');
            if (activeView) { activeView.classList.remove('hidden'); activeView.classList.add('block'); }
            if (activeBtn) { activeBtn.classList.add('nav-active'); activeBtn.setAttribute('aria-selected', 'true'); }

            if(viewId === 'practice') {
                setTimeout(initQuizChart, 100);
            }
        });

        // --- Interactive Timeline Logic ---

        function showTimeline(id, btnElement) {
            const display = document.getElementById('timeline-display');
            const data = timelineData[id];
            
            document.querySelectorAll('.timeline-btn').forEach(btn => btn.classList.remove('active', 'shadow-md'));
            btnElement.classList.add('active', 'shadow-md');

            display.style.opacity = 0;
            setTimeout(() => {
                const imageHtml = data.img
                    ? `<div class="shrink-0 w-full sm:w-40"><img src="${data.img}" alt="${data.imgAlt || ''}" class="w-full h-32 sm:h-full object-cover rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"><p class="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-tight">${data.imgCaption || ''}</p></div>`
                    : '';
                display.innerHTML = `<div class="flex flex-col sm:flex-row gap-4 items-start w-full">${imageHtml}<div><h4 class="text-xl font-black text-whs-dark dark:text-blue-400 mb-2">${data.title}</h4><p class="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">${data.text}</p></div></div>`;
                display.style.opacity = 1;
            }, 200);
        }


        // --- Practice Hub (Quiz & Flashcards) Logic ---

        let activeQuizPool = [];
        let currentQIndex = 0;
        let quizScore = 0;

        function setPracticeMode(mode) {
            const qBtn = document.getElementById('toggle-quiz');
            const fBtn = document.getElementById('toggle-flash');
            const qCon = document.getElementById('quiz-mode-container');
            const fCon = document.getElementById('flash-mode-container');

            if(mode === 'quiz') {
                qBtn.className = "px-6 py-2 rounded-md font-bold text-sm bg-white dark:bg-slate-900 text-whs-dark dark:text-blue-400 shadow-sm transition";
                fBtn.className = "px-6 py-2 rounded-md font-bold text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition";
                qCon.classList.remove('hidden'); qCon.classList.add('block');
                fCon.classList.add('hidden'); fCon.classList.remove('block');
            } else {
                fBtn.className = "px-6 py-2 rounded-md font-bold text-sm bg-white dark:bg-slate-900 text-whs-dark dark:text-blue-400 shadow-sm transition";
                qBtn.className = "px-6 py-2 rounded-md font-bold text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition";
                fCon.classList.remove('hidden'); fCon.classList.add('block');
                qCon.classList.add('hidden'); qCon.classList.remove('block');
                initFlashcards();
            }
        }

        function shuffle(array) {
            let currentIndex = array.length,  randomIndex;
            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }
            return array;
        }

        function initQuiz() {
            const shuffledPool = shuffle([...masterQuizData]);
            activeQuizPool = shuffledPool.slice(0, 5); 
            
            currentQIndex = 0;
            quizScore = 0;
            document.getElementById('quiz-results').classList.add('hidden');
            document.getElementById('quiz-container').classList.remove('hidden');
            loadQuestion();
        }

        function loadQuestion() {
            const q = activeQuizPool[currentQIndex];
            document.getElementById('quiz-progress').innerText = `Question ${currentQIndex + 1} of 5`;
            document.getElementById('quiz-score').innerText = `Score: ${quizScore}`;
            document.getElementById('quiz-question').innerText = q.q;
            document.getElementById('quiz-feedback-container').classList.add('hidden');
            
            const optsContainer = document.getElementById('quiz-options');
            optsContainer.innerHTML = '';
            
            q.opts.forEach((opt, index) => {
                const btn = document.createElement('div');
                btn.className = 'quiz-option bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700';
                btn.setAttribute('role', 'button');
                btn.setAttribute('tabindex', '0');

                const icon = document.createElement('span');
                icon.className = 'quiz-option-icon';
                icon.setAttribute('aria-hidden', 'true');

                const label = document.createElement('span');
                label.className = 'quiz-option-text';
                label.textContent = opt;

                btn.appendChild(icon);
                btn.appendChild(label);
                btn.onclick = () => selectAnswer(index, btn);
                btn.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        selectAnswer(index, btn);
                    }
                });
                optsContainer.appendChild(btn);
            });
        }

        function setOptionIcon(optionEl, symbol) {
            const icon = optionEl.querySelector('.quiz-option-icon');
            if (icon) icon.textContent = symbol;
        }

        function selectAnswer(selectedIndex, btnElement) {
            const q = activeQuizPool[currentQIndex];
            const allOptions = document.querySelectorAll('.quiz-option');
            allOptions.forEach(opt => opt.classList.add('disabled'));

            if (selectedIndex === q.ans) {
                btnElement.classList.add('correct');
                setOptionIcon(btnElement, '✓');
                quizScore++;
                document.getElementById('quiz-score').innerText = `Score: ${quizScore}`;
            } else {
                btnElement.classList.add('incorrect');
                setOptionIcon(btnElement, '✗');
                allOptions[q.ans].classList.add('correct');
                setOptionIcon(allOptions[q.ans], '✓');
            }

            const feedbackContainer = document.getElementById('quiz-feedback-container');
            const expText = document.getElementById('quiz-explanation');
            expText.innerText = q.exp;
            expText.className = selectedIndex === q.ans ? 'p-4 rounded-lg font-medium text-sm mb-4 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' : 'p-4 rounded-lg font-medium text-sm mb-4 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800';
            
            feedbackContainer.classList.remove('hidden');
        }

        document.getElementById('quiz-next-btn').onclick = () => {
            currentQIndex++;
            if (currentQIndex < activeQuizPool.length) {
                loadQuestion();
            } else {
                showQuizResults();
            }
        };

        function showQuizResults() {
            document.getElementById('quiz-container').classList.add('hidden');
            const resultsScreen = document.getElementById('quiz-results');
            resultsScreen.classList.remove('hidden');
            
            document.getElementById('final-score').innerText = `${quizScore}/5`;
            
            let message = "";
            if (quizScore === 5) {
                message = "Perfect! You know the Evidence Vault inside and out. You are ready for Excellence.";
                addXP(50); // Reward max score
            }
            else if (quizScore >= 3) message = "Good job! You have a solid grasp of the facts, but review the Vault one more time to lock in the details.";
            else message = "Keep practicing! Specific evidence is required to pass. Study the Evidence Vault tab and try again.";
            
            document.getElementById('results-message').innerText = message;
            
            updateQuizChart(quizScore);
        }

        // --- Flashcard Logic ---

        let currentCardIndex = 0;
        
        function initFlashcards() {
            currentCardIndex = 0;
            updateFlashcardUI();
        }

        function toggleFlip() {
            document.getElementById('flashcard-element').classList.toggle('flipped');
        }

        function updateFlashcardUI() {
            const card = document.getElementById('flashcard-element');
            card.classList.remove('flipped'); 
            
            setTimeout(() => { 
                document.getElementById('flash-front-text').innerText = flashcardData[currentCardIndex].front;
                document.getElementById('flash-back-text').innerText = flashcardData[currentCardIndex].back;
                document.getElementById('flash-progress').innerText = `Card ${currentCardIndex + 1} of ${flashcardData.length}`;
            }, 150);
        }

        function nextCard() {
            currentCardIndex = (currentCardIndex + 1) % flashcardData.length;
            updateFlashcardUI();
            if (currentCardIndex === 0) addXP(10); // Reward for cycling through all
        }

        function prevCard() {
            currentCardIndex = (currentCardIndex - 1 + flashcardData.length) % flashcardData.length;
            updateFlashcardUI();
        }

        initQuiz();


        // --- Writing Sandbox Logic ---

        function setSandboxQuestion(index, btnElement) {
            const allBtns = document.querySelectorAll('.question-btn');
            allBtns.forEach(btn => {
                btn.className = "question-btn p-3 text-left rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800";
            });
            btnElement.className = "question-btn active p-3 text-left rounded-lg text-xs font-semibold bg-[#fefce8] border-whs-gold text-[#854d0e] dark:bg-yellow-900/30 dark:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/50";
            document.getElementById('active-question-display').innerText = sandboxPrompts[index];
        }


        // Regex Error Checks for expanded NLP fact-checking

        const textArea = document.getElementById('sandbox-text');
        
        window.addEventListener('DOMContentLoaded', () => {
            initStreak();
            updateXPDisplay();
            initTodos();
            initCountdown();
            setInterval(initCountdown, 60 * 60 * 1000); // keep "days to go" accurate across long sessions
            initQuizChart();

            const savedDraft = safeStorage.get('whs_draft_essay');
            if (savedDraft) {
                textArea.value = savedDraft;
                const words = savedDraft.trim().split(/\s+/).filter(w => w.length > 0).length;
                document.getElementById('word-count').innerText = `${words} words`;
                if(words > 20) analyzeText();
            }
        });

        let typingTimer;
        textArea.addEventListener('input', () => {
            const words = textArea.value.trim().split(/\s+/).filter(w => w.length > 0).length;
            document.getElementById('word-count').innerText = `${words} words`;
            
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
                safeStorage.set('whs_draft_essay', textArea.value);
                const ind = document.getElementById('save-indicator');
                ind.style.opacity = 1;
                ind.innerText = safeStorage.isPersistent() ? 'Saved ✓' : 'Saved (this session only)';
                setTimeout(() => { ind.style.opacity = 0; }, 2000);
            }, 1500);
        });

        let hasAwardedWritingXP = false;

        function analyzeText() {
            const rawText = textArea.value;
            const text = rawText.toLowerCase();
            const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
            
            document.getElementById('analysis-placeholder').classList.add('hidden');
            document.getElementById('analysis-results').classList.remove('hidden');

            if (wordCount < 20) {
                document.getElementById('feedback-message').innerText = "Keep writing! A good paragraph needs more explanation. Aim for at least 50-80 words.";
                document.getElementById('strength-bar').style.width = "10%";
                document.getElementById('strength-text').innerText = "10%";
                resetBadges();
                document.getElementById('fact-check-module').classList.add('hidden');
                return;
            }

            const foundNames = vaultKeywords.names.filter(kw => text.includes(kw));
            const foundDates = vaultKeywords.dates.filter(kw => text.includes(kw));
            const foundConcepts = vaultKeywords.concepts.filter(kw => text.includes(kw));

            renderBadges('found-names', foundNames, 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300');
            renderBadges('found-dates', foundDates, 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300');
            renderBadges('found-concepts', foundConcepts, 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300');

            // Regex Fact Checking
            const foundErrors = errorChecks.filter(err => err.regex.test(text));
            const errorModule = document.getElementById('fact-check-module');
            const errorList = document.getElementById('found-errors');
            
            if (foundErrors.length > 0) {
                errorModule.classList.remove('hidden');
                errorList.innerHTML = foundErrors.map(err => `<li>${err.warning}</li>`).join('');
            } else {
                errorModule.classList.add('hidden');
            }

            let analysisScore = 30; 
            analysisScore += Math.min(foundNames.length * 10, 20); 
            analysisScore += Math.min(foundDates.length * 10, 20); 
            analysisScore += Math.min(foundConcepts.length * 15, 30); 
            
            if (text.includes('cold war') || text.includes('meiji') || text.includes('soviet')) analysisScore += 10;

            if (foundErrors.length > 0) analysisScore = Math.max(analysisScore - 20, 10);

            analysisScore = Math.min(analysisScore, 100);

            document.getElementById('strength-bar').style.width = `${analysisScore}%`;
            document.getElementById('strength-bar').className = `h-3 rounded-full transition-all duration-1000 ${analysisScore > 79 ? 'bg-[#10b981]' : analysisScore > 49 ? 'bg-[#c5a059]' : 'bg-red-500'}`;
            document.getElementById('strength-text').innerText = `${analysisScore}%`;

            let msg = "";
            if (foundErrors.length > 0) msg = "You have some good evidence, but double-check your facts! The AI detected a potential historical error in your writing (see above).";
            else if (analysisScore >= 90) {
                msg = "Excellent! You have woven together specific names, dates, and complex historical concepts perfectly. If you linked this to the wider context, this is an 'E' level paragraph.";
                if(!hasAwardedWritingXP) { addXP(100); hasAwardedWritingXP = true; }
            }
            else if (analysisScore >= 60) msg = "Solid Merit level! You are using good evidence. Try adding one more exact statistic (like 1 Million) or connecting it to the Wider Context (Cold War/Meiji era) for Excellence.";
            else msg = "Good start, but you need more specific evidence. Examiners want to see exact names, dates, and quotes. Check the Evidence Vault and try dropping two facts into your writing.";

            document.getElementById('feedback-message').innerText = msg;
        }

        function renderBadges(elementId, items, colorClasses) {
            const container = document.getElementById(elementId);
            if (items.length === 0) {
                container.innerHTML = '<span class="text-xs text-slate-400 italic">None found</span>';
                return;
            }
            container.innerHTML = items.map(item => `<span class="text-[10px] font-bold px-2 py-0.5 rounded uppercase ${colorClasses}">${item}</span>`).join('');
        }

        function resetBadges() {
            document.getElementById('found-names').innerHTML = '<span class="text-xs text-slate-400 italic">None yet.</span>';
            document.getElementById('found-dates').innerHTML = '<span class="text-xs text-slate-400 italic">None yet.</span>';
            document.getElementById('found-concepts').innerHTML = '<span class="text-xs text-slate-400 italic">None yet.</span>';
        }

        function copyDraft() {
            const text = textArea.value;
            if(!text) return;
            const btn = document.getElementById('copy-btn');

            const showCopied = () => {
                btn.innerText = "Copied ✓";
                btn.classList.add('bg-emerald-100', 'text-emerald-800', 'dark:bg-emerald-900', 'dark:text-emerald-300');
                setTimeout(() => {
                    btn.innerText = "Copy";
                    btn.classList.remove('bg-emerald-100', 'text-emerald-800', 'dark:bg-emerald-900', 'dark:text-emerald-300');
                }, 2000);
            };

            const legacyCopy = () => {
                const tmp = document.createElement("textarea");
                tmp.value = text;
                tmp.style.position = "fixed";
                tmp.style.opacity = "0";
                document.body.appendChild(tmp);
                tmp.select();
                try {
                    document.execCommand('copy');
                    showCopied();
                } catch (e) {
                    btn.innerText = "Copy failed";
                    setTimeout(() => { btn.innerText = "Copy"; }, 2000);
                }
                document.body.removeChild(tmp);
            };

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(showCopied).catch(legacyCopy);
            } else {
                legacyCopy();
            }
        }

        function togglePeel() {
            const guide = document.getElementById('peel-guide');
            const isHidden = guide.classList.contains('hidden');
            if(isHidden) {
                guide.classList.remove('hidden');
                guide.classList.add('grid');
            } else {
                guide.classList.add('hidden');
                guide.classList.remove('grid');
            }
        }
