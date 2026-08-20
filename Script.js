// script.js

document.addEventListener('DOMContentLoaded', () => {
    // DOM Element Node Selectors
    const fileInput = document.getElementById('chartUpload');
    const dropzone = document.getElementById('dropzone');
    const uploadPrompt = document.getElementById('uploadPrompt');
    const previewContainer = document.getElementById('previewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const removeImageBtn = document.getElementById('removeImageBtn');
    
    const brokerSelect = document.getElementById('brokerSelect');
    const riskButtons = document.querySelectorAll('.risk-btn');
    
    const terminalPulse = document.getElementById('terminalPulse');
    const terminalDot = document.getElementById('terminalDot');
    const detectedPair = document.getElementById('detectedPair');
    const detectedTimeframe = document.getElementById('detectedTimeframe');
    
    const directionCard = document.getElementById('directionCard');
    const outputDirection = document.getElementById('outputDirection');
    const entryCard = document.getElementById('entryCard');
    const outputEntry = document.getElementById('outputEntry');
    const tpCard = document.getElementById('tpCard');
    const outputTp = document.getElementById('outputTp');
    
    const terminalLog = document.getElementById('terminalLog');
    const confidenceWrapper = document.getElementById('confidenceWrapper');
    const confidenceBar = document.getElementById('confidenceBar');
    const confidenceText = document.getElementById('confidenceText');
    
    const analyzeBtn = document.getElementById('analyzeBtn');
    const executeBtn = document.getElementById('executeBtn');

    let uploadedImageBase64 = null;
    let selectedRiskMode = "moderate";

    // --- Interactive Component 1: File Uploader UI Updates ---
    function handleImageFile(file) {
        if (!file || !file.type.startsWith('image/')) {
            updateTerminalLog("// ERROR: System only accepts valid image payloads (PNG/JPG).", "text-rose-400");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImageBase64 = e.target.result;
            imagePreview.src = uploadedImageBase64;
            
            // Toggle dynamic visibility states
            uploadPrompt.classList.add('opacity-0', 'scale-95');
            setTimeout(() => {
                uploadPrompt.classList.add('hidden');
                previewContainer.classList.remove('hidden');
                previewContainer.classList.add('opacity-100');
            }, 200);

            // Fresh state logging
            clearAnalysisMatrix();
            updateTerminalLog(`// Asset received: "${file.name}" ready inside optical buffer cache. Click "Scan Image".`, "text-violet-400");
        };
        reader.readAsDataURL(file);
    }

    // Drag-and-drop structural triggers
    dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('border-violet-500', 'bg-violet-950/10'); });
    dropzone.addEventListener('dragleave', () => { dropzone.classList.remove('border-violet-500', 'bg-violet-950/10'); });
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('border-violet-500', 'bg-violet-950/10');
        if (e.dataTransfer.files.length) handleImageFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', (e) => { if (e.target.files.length) handleImageFile(e.target.files[0]); });

    removeImageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        resetUploader();
    });

    function resetUploader() {
        fileInput.value = "";
        uploadedImageBase64 = null;
        previewContainer.classList.add('hidden');
        uploadPrompt.classList.remove('hidden', 'opacity-0', 'scale-95');
        clearAnalysisMatrix();
        updateTerminalLog("// Buffer cleared. System idle.", "text-slate-500");
    }

    // --- Interactive Component 2: Parameter Selections ---
    riskButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            riskButtons.forEach(b => {
                b.classList.remove('border-2', 'border-violet-500', 'bg-violet-600/10', 'text-violet-400', 'glow-active');
                b.classList.add('border-slate-800', 'bg-slate-950/60', 'text-slate-400');
            });
            btn.classList.remove('border-slate-800', 'bg-slate-950/60', 'text-slate-400');
            btn.classList.add('border-2', 'border-violet-500', 'bg-violet-600/10', 'text-violet-400', 'glow-active');
            selectedRiskMode = btn.getAttribute('data-risk');
            updateTerminalLog(`// Profile recalculation set to [${selectedRiskMode.toUpperCase()}] matrix parameters.`);
        });
    });

    // --- Interactive Component 3: Terminal Simulation Pipeline ---
    function updateTerminalLog(message, colorClass = "text-slate-400") {
        const p = document.createElement('p');
        p.className = `log-entry ${colorClass}`;
        p.innerText = message;
        terminalLog.appendChild(p);
        terminalLog.scrollTop = terminalLog.scrollHeight;
    }

    function clearAnalysisMatrix() {
        detectedPair.innerText = "PAIR: UNDEFINED";
        detectedTimeframe.innerText = "TF: --";
        outputDirection.innerText = "AWAITING SCAN";
        outputDirection.className = "text-xl font-black text-slate-400 tracking-wide uppercase transition-all duration-300";
        outputEntry.innerText = "—";
        outputTp.innerText = "—";
        
        directionCard.className = "bg-slate-950 border border-slate-800 p-4 rounded-xl transition-all duration-300";
        entryCard.className = "bg-slate-950 border border-slate-800 p-4 rounded-xl transition-all duration-300";
        tpCard.className = "bg-slate-950 border border-slate-800 p-4 rounded-xl transition-all duration-300";

        confidenceWrapper.classList.add('opacity-0');
        confidenceBar.style.width = "0%";
        confidenceText.innerText = "0%";

        terminalPulse.className = "animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-500 opacity-75";
        terminalDot.className = "relative inline-flex rounded-full h-2 w-2 bg-slate-500";

        executeBtn.disabled = true;
        executeBtn.className = "sm:col-span-3 bg-gradient-to-r from-slate-800 to-slate-700 text-slate-500 font-bold py-4 px-6 rounded-xl text-center tracking-wide text-sm transition-all duration-300 opacity-60 cursor-not-allowed";
    }

    // --- Simulation Processing Action ---
    analyzeBtn.addEventListener('click', () => {
        if (!uploadedImageBase64) {
            updateTerminalLog("// CRITICAL: Visual chart analysis failed. Please insert a valid image file first.", "text-rose-400");
            return;
        }

        // Lock interface state for simulation run
        analyzeBtn.disabled = true;
        analyzeBtn.innerText = "Processing...";
        clearAnalysisMatrix();

        terminalPulse.className = "animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-75";
        terminalDot.className = "relative inline-flex rounded-full h-2 w-2 bg-violet-500";

        // Mock automated steps to simulate an API request timeline
        const sequence = [
            { t: 400, m: "// Parsing image data matrix strings... Scanning structural pixel geometry.", c: "text-slate-400" },
            { t: 900, m: "// Optical analysis hit: Currency identified as EUR/USD. Detected timeframe: H4 chart structure.", c: "text-cyan-400" },
            { t: 1500, m: "// AI pattern logic checking. Order Block detected near lower zone. RSI indicator structural value: 31.4 (Oversold bounds).", c: "text-slate-400" },
            { t: 2200, m: "// Formulating algorithmic targets relative to active risk profile...", c: "text-violet-400" },
            { t: 2800, m: "// Parsing execution environment... Complete.", c: "text-emerald-400" }
        ];

        sequence.forEach(step => {
            setTimeout(() => updateTerminalLog(step.m, step.c), step.t);
        });

        // Deliver quantitative parameters at terminal end-state
        setTimeout(() => {
            // Meta values generated dynamically
            const activePair = "EURUSD";
            const activeTimeframe = "H4";
            const actionType = "BUY"; 
            const entryValue = "1.08420";
            const tpValue = "1.09250";
            const calculatedConfidence = 91;

            detectedPair.innerText = `PAIR: ${activePair}`;
            detectedTimeframe.innerText = `TF: ${activeTimeframe}`;
            
            // Adjust matrix cards color and state according to trade direction
            outputDirection.innerText = actionType;
            outputDirection.className = "text-xl font-black text-emerald-400 tracking-wide uppercase transition-all duration-300";
            directionCard.className = "bg-emerald-950/20 border-2 border-emerald-500/30 p-4 rounded-xl transition-all duration-300 glow-emerald";

            outputEntry.innerText = entryValue;
            entryCard.className = "bg-slate-900 border border-slate-700/60 p-4 rounded-xl transition-all duration-300";

            outputTp.innerText = tpValue;
            tpCard.className = "bg-emerald-950/10 border border-emerald-600/40 p-4 rounded-xl transition-all duration-300";

            // Unfurl confidence bars
            confidenceWrapper.classList.remove('opacity-0');
            confidenceBar.style.width = `${calculatedConfidence}%`;
            confidenceText.innerText = `${calculatedConfidence}%`;

            // Enable broker sync mechanism
            const activeBroker = brokerSelect.options[brokerSelect.selectedIndex].text.split(' — ')[0];
            executeBtn.disabled = false;
