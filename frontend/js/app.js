document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // =============================================
    // --- i18n Translation System ---
    // =============================================
    const translations = {
        ru: {
            pageTitle: "FruitAI",
            apiChecking: "Проверка API...",
            apiConnected: "AI API подключен",
            apiDemo: "Режим Демо",
            scanTitle: "Сканировать продукт",
            scanSubtitle: "Загрузите фото или сделайте снимок с камеры для мгновенного анализа",
            dropText: "Перетащите фото сюда или",
            browseLink: "выберите файл",
            fileInfo: "Поддерживаются форматы PNG, JPG, JPEG",
            capture: "Сделать снимок",
            cancel: "Отмена",
            analyzeBtn: "Анализировать продукт",
            cameraBtn: "Использовать камеру",
            demoBtn: "Запустить Демо",
            demoModeTitle: "Режим тестирования:",
            demoModeText: 'API-ключ не настроен. Вы можете нажать "Запустить Демо" для симуляции реального анализа продукта.',
            waitingTitle: "Ожидание сканирования...",
            waitingText: 'Загрузите фотографию продукта и нажмите "Анализировать", чтобы получить результаты от искусственного интеллекта.',
            scanningTitle: "Сканирование продукта...",
            scanningText: "Искусственный интеллект изучает изображение, определяет свежесть и рассчитывает калорийность...",
            scanningDemo: "Сканирование продукта (Демо)...",
            errorTitle: "Ошибка анализа",
            errorText: "Не удалось связаться с сервером AI. Убедитесь, что backend запущен и API-ключ настроен корректно.",
            errorAlert: (msg) => `Ошибка анализа: ${msg}\n\nВы можете использовать "Запустить Демо" для ознакомления с возможностями интерфейса.`,
            invalidFile: "Пожалуйста, загрузите файл изображения (PNG, JPG или JPEG).",
            cameraError: "Не удалось получить доступ к веб-камере. Пожалуйста, загрузите файл с устройства или предоставьте разрешения.",
            kcal: "ккал",
            perServing: "Всего в порции",
            per100g: "На 100 грамм:",
            estWeight: "Примерный вес:",
            disclaimer: "Расчет веса и калорийности является ориентировочным.",
            protein: "Белки",
            fat: "Жиры",
            carbs: "Углеводы",
            freshnessTitle: "Оценка свежести",
            scaleSpoiled: "Испорчен",
            scaleAvg: "Средняя",
            scaleFresh: "Свежий / Спелый",
            qualityIndex: "Индекс качества:",
            visualCues: "Визуальные признаки:",
            storageTitle: "Рекомендации по хранению",
            fresh: "Свежий",
            ripe: "Спелый",
            average: "Средняя свежесть",
            spoiled: "Испорчен",
            unknown: "Неопределенно",
            weightUnit: "г",
            mockAppleProduct: "Красное яблоко Фуджи",
            mockAppleCues: "Кожура плотная и глянцевая, естественный глубокий красный окрас с легкими желтыми штрихами. Вмятины, признаки увядания и плесени полностью отсутствуют. Плодоножка упругая, зеленовато-коричневая, что свидетельствует о недавнем сборе.",
            mockAppleStorage1: "Хранить в холодильнике в специальном ящике для фруктов и овощей при температуре +2...+4°C. Так яблоки могут оставаться хрустящими до 1-2 месяцев.",
            mockAppleStorage2: "Размещайте отдельно от сильнопахнущих продуктов, так как пористая структура яблок легко впитывает посторонние запахи.",
            mockAppleStorage3: "Яблоки выделяют этилен (природный газ созревания). Храните их отдельно от бананов, персиков и зеленых листовых овощей, чтобы не спровоцировать их преждевременную порчу.",
        },
        en: {
            pageTitle: "FruitAI - Calorie & Freshness Analysis",
            apiChecking: "Checking API...",
            apiConnected: "AI API Connected",
            apiDemo: "Demo Mode",
            scanTitle: "Scan Product",
            scanSubtitle: "Upload a photo or take a shot with the camera for instant analysis",
            dropText: "Drag & drop a photo here or",
            browseLink: "browse file",
            fileInfo: "Supports PNG, JPG, JPEG formats",
            capture: "Take Photo",
            cancel: "Cancel",
            analyzeBtn: "Analyze Product",
            cameraBtn: "Use Camera",
            demoBtn: "Run Demo",
            demoModeTitle: "Test Mode:",
            demoModeText: 'API key is not configured. You can click "Run Demo" to simulate a real product analysis.',
            waitingTitle: "Waiting for scan...",
            waitingText: 'Upload a product photo and click "Analyze" to get AI-powered results.',
            scanningTitle: "Scanning product...",
            scanningText: "The AI is analyzing the image, assessing freshness and calculating calories...",
            scanningDemo: "Scanning product (Demo)...",
            errorTitle: "Analysis Error",
            errorText: "Could not reach the AI server. Make sure the backend is running and the API key is configured.",
            errorAlert: (msg) => `Analysis error: ${msg}\n\nYou can use "Run Demo" to explore the interface.`,
            invalidFile: "Please upload an image file (PNG, JPG or JPEG).",
            cameraError: "Could not access the webcam. Please upload a file or grant camera permissions.",
            kcal: "kcal",
            perServing: "Per serving",
            per100g: "Per 100g:",
            estWeight: "Est. weight:",
            disclaimer: "Weight and calorie calculations are approximate.",
            protein: "Protein",
            fat: "Fat",
            carbs: "Carbs",
            freshnessTitle: "Freshness Assessment",
            scaleSpoiled: "Spoiled",
            scaleAvg: "Average",
            scaleFresh: "Fresh / Ripe",
            qualityIndex: "Quality index:",
            visualCues: "Visual cues:",
            storageTitle: "Storage Recommendations",
            fresh: "Fresh",
            ripe: "Ripe",
            average: "Average freshness",
            spoiled: "Spoiled",
            unknown: "Unknown",
            weightUnit: "g",
            mockAppleProduct: "Red Fuji Apple",
            mockAppleCues: "The skin is firm and glossy with a natural deep red color and light yellow streaks. No dents, signs of wilting, or mold. The stem is firm and greenish-brown, indicating a recent harvest.",
            mockAppleStorage1: "Store in the refrigerator crisper drawer at +2...+4°C. Apples can stay crispy this way for up to 1-2 months.",
            mockAppleStorage2: "Keep away from strong-smelling foods, as apples easily absorb foreign odors due to their porous structure.",
            mockAppleStorage3: "Apples release ethylene (a natural ripening gas). Store them separately from bananas, peaches, and leafy greens to prevent premature spoilage.",
        },
        tr: {
            pageTitle: "FruitAI - Kalori ve Tazelik Analizi",
            apiChecking: "API kontrol ediliyor...",
            apiConnected: "AI API Bağlandı",
            apiDemo: "Demo Modu",
            scanTitle: "Ürün Tara",
            scanSubtitle: "Anlık analiz için fotoğraf yükleyin veya kamerayla çekin",
            dropText: "Fotoğrafı buraya sürükleyin veya",
            browseLink: "dosya seçin",
            fileInfo: "PNG, JPG, JPEG formatları desteklenir",
            capture: "Fotoğraf Çek",
            cancel: "İptal",
            analyzeBtn: "Ürünü Analiz Et",
            cameraBtn: "Kamera Kullan",
            demoBtn: "Demo Başlat",
            demoModeTitle: "Test Modu:",
            demoModeText: 'API anahtarı yapılandırılmadı. Gerçek bir ürün analizini simüle etmek için "Demo Başlat"a tıklayabilirsiniz.',
            waitingTitle: "Tarama bekleniyor...",
            waitingText: 'Bir ürün fotoğrafı yükleyin ve yapay zeka sonuçlarını almak için "Analiz Et"e tıklayın.',
            scanningTitle: "Ürün taranıyor...",
            scanningText: "Yapay zeka görüntüyü analiz ediyor, tazeliği değerlendiriyor ve kalorileri hesaplıyor...",
            scanningDemo: "Ürün taranıyor (Demo)...",
            errorTitle: "Analiz Hatası",
            errorText: "AI sunucusuna ulaşılamadı. Backend'in çalıştığından ve API anahtarının doğru yapılandırıldığından emin olun.",
            errorAlert: (msg) => `Analiz hatası: ${msg}\n\nArayüzü keşfetmek için "Demo Başlat" seçeneğini kullanabilirsiniz.`,
            invalidFile: "Lütfen bir resim dosyası (PNG, JPG veya JPEG) yükleyin.",
            cameraError: "Web kamerasına erişilemedi. Lütfen bir dosya yükleyin veya kamera izni verin.",
            kcal: "kkal",
            perServing: "Porsiyon başına",
            per100g: "100g başına:",
            estWeight: "Tahmini ağırlık:",
            disclaimer: "Ağırlık ve kalori hesaplamaları yaklaşıktır.",
            protein: "Protein",
            fat: "Yağ",
            carbs: "Karbonhidrat",
            freshnessTitle: "Tazelik Değerlendirmesi",
            scaleSpoiled: "Bozulmuş",
            scaleAvg: "Ortalama",
            scaleFresh: "Taze / Olgun",
            qualityIndex: "Kalite endeksi:",
            visualCues: "Görsel ipuçları:",
            storageTitle: "Saklama Önerileri",
            fresh: "Taze",
            ripe: "Olgun",
            average: "Ortalama tazelik",
            spoiled: "Bozulmuş",
            unknown: "Bilinmiyor",
            weightUnit: "g",
            mockAppleProduct: "Kırmızı Fuji Elması",
            mockAppleCues: "Kabuğu sıkı ve parlak, hafif sarı çizgili doğal derin kırmızı renkte. Darbe izi, solma veya küf belirtisi yok. Sapı sıkı ve yeşilimsi kahverengi, bu da yakın zamanda toplandığını gösteriyor.",
            mockAppleStorage1: "Buzdolabının sebzelik çekmecesinde +2...+4°C sıcaklıkta saklayın. Elmalar bu şekilde 1-2 aya kadar taze ve çıtır kalabilir.",
            mockAppleStorage2: "Gözenekli yapıları nedeniyle yabancı kokuları kolayca emdiklerinden, keskin kokulu gıdalardan uzak tutun.",
            mockAppleStorage3: "Elmalar etilen (doğal olgunlaşma gazı) salgılar. Erken bozulmalarını önlemek için muz, şeftali ve yapraklı yeşilliklerden ayrı saklayın.",
        }
    };

    const LANG_LABELS = { ru: "RU", en: "EN", tr: "TR" };

    // Current language state
    let currentLang = localStorage.getItem("lang") || "en";

    function t(key) {
        return (translations[currentLang] && translations[currentLang][key]) ||
            (translations["en"][key]) || key;
    }

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem("lang", lang);

        // Update <html lang> attribute
        document.documentElement.lang = lang;

        // Update page title
        document.title = t("pageTitle");

        // Update all data-i18n elements
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (translations[lang] && translations[lang][key] !== undefined) {
                // Skip function-type translations (used only from JS)
                if (typeof translations[lang][key] !== "function") {
                    el.textContent = translations[lang][key];
                }
            }
        });

        // Update language label in the button
        document.getElementById("langLabel").textContent = LANG_LABELS[lang];

        // Mark active option and hide it so only the other two languages are visible in the dropdown
        document.querySelectorAll(".lang-option").forEach(btn => {
            const isActive = btn.dataset.lang === lang;
            btn.classList.toggle("active", isActive);
            btn.style.display = isActive ? "none" : "";
        });

        // Re-apply dynamic API badge if already set
        updateApiBadge(apiConfigured);
    }

    // =============================================
    // --- State Management ---
    // =============================================
    let currentFile = null;
    let cameraStream = null;
    let apiConfigured = false;

    // --- DOM Elements ---
    const themeToggle = document.getElementById("themeToggle");
    const apiBadge = document.getElementById("apiBadge");
    const langToggle = document.getElementById("langToggle");
    const langDropdown = document.getElementById("langDropdown");

    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("fileInput");
    const uploadState = document.getElementById("uploadState");
    const cameraState = document.getElementById("cameraState");
    const cameraVideo = document.getElementById("cameraVideo");
    const previewState = document.getElementById("previewState");
    const imagePreview = document.getElementById("imagePreview");
    const scanLaser = document.getElementById("scanLaser");

    const useCameraBtn = document.getElementById("useCameraBtn");
    const captureBtn = document.getElementById("captureBtn");
    const cancelCameraBtn = document.getElementById("cancelCameraBtn");
    const cameraActions = document.getElementById("cameraActions");
    const analyzeBtn = document.getElementById("analyzeBtn");
    const demoBtn = document.getElementById("demoBtn");
    const demoNotice = document.getElementById("demoNotice");

    const waitingState = document.getElementById("waitingState");
    const resultsContent = document.getElementById("resultsContent");
    const resProductName = document.getElementById("resProductName");
    const resFreshnessBadge = document.getElementById("resFreshnessBadge");
    const resTotalCalories = document.getElementById("resTotalCalories");
    const resCalories100g = document.getElementById("resCalories100g");
    const resWeight = document.getElementById("resWeight");
    const resProtein = document.getElementById("resProtein");
    const resFat = document.getElementById("resFat");
    const resCarbs = document.getElementById("resCarbs");
    const barProtein = document.getElementById("barProtein");
    const barFat = document.getElementById("barFat");
    const barCarbs = document.getElementById("barCarbs");
    const resFreshnessFill = document.getElementById("resFreshnessFill");
    const resFreshnessPin = document.getElementById("resFreshnessPin");
    const resFreshnessPercentage = document.getElementById("resFreshnessPercentage");
    const resFreshnessCues = document.getElementById("resFreshnessCues");
    const resStorageList = document.getElementById("resStorageList");

    // =============================================
    // --- Theme System ---
    // =============================================
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);

    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });

    // =============================================
    // --- Language Toggle ---
    // =============================================
    langToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        langToggle.classList.toggle("open");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!langToggle.contains(e.target)) {
            langToggle.classList.remove("open");
        }
    });

    // Language option selection
    document.querySelectorAll(".lang-option").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const lang = btn.dataset.lang;
            applyLanguage(lang);
            langToggle.classList.remove("open");
        });
    });

    // Initialize language on page load
    applyLanguage(currentLang);

    // =============================================
    // --- API Configuration Status ---
    // =============================================
    async function checkApiHealth() {
        try {
            const response = await fetch("/api/health");
            if (response.ok) {
                const data = await response.json();
                apiConfigured = data.gemini_configured;
                updateApiBadge(apiConfigured);
            } else {
                updateApiBadge(false);
            }
        } catch (error) {
            console.error("API health check error:", error);
            updateApiBadge(false);
        }
    }

    function updateApiBadge(configured) {
        const indicator = apiBadge.querySelector(".status-indicator");
        const statusText = apiBadge.querySelector(".status-text");

        if (configured) {
            indicator.className = "status-indicator active";
            statusText.textContent = t("apiConnected");
            demoNotice.classList.remove("active");
        } else {
            indicator.className = "status-indicator warning";
            statusText.textContent = t("apiDemo");
            demoNotice.classList.add("active");
        }
    }

    checkApiHealth();

    // =============================================
    // --- File Drag & Drop / Selection ---
    // =============================================
    dropZone.addEventListener("click", (e) => {
        if (e.target.closest("#cameraActions") || cameraStream) return;
        fileInput.click();
    });

    fileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
            handleSelectedFile(e.target.files[0]);
        }
    });

    ["dragenter", "dragover"].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            if (!cameraStream) dropZone.classList.add("dragover");
        }, false);
    });

    ["dragleave", "drop"].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropZone.classList.remove("dragover");
        }, false);
    });

    dropZone.addEventListener("drop", (e) => {
        if (cameraStream) return;
        const files = e.dataTransfer.files;
        if (files.length > 0) handleSelectedFile(files[0]);
    });

    function handleSelectedFile(file) {
        if (!file.type.startsWith("image/")) {
            alert(t("invalidFile"));
            return;
        }
        currentFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            showState("preview");
            analyzeBtn.disabled = false;
        };
        reader.readAsDataURL(file);
    }

    // =============================================
    // --- Camera Handling ---
    // =============================================
    useCameraBtn.addEventListener("click", async () => {
        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" },
                audio: false
            });
            cameraVideo.srcObject = cameraStream;
            showState("camera");
            analyzeBtn.disabled = true;
        } catch (err) {
            console.error("Camera access error:", err);
            alert(t("cameraError"));
        }
    });

    captureBtn.addEventListener("click", () => {
        if (!cameraStream) return;
        const canvas = document.createElement("canvas");
        canvas.width = cameraVideo.videoWidth;
        canvas.height = cameraVideo.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(cameraVideo, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        imagePreview.src = dataUrl;
        stopCamera();
        canvas.toBlob((blob) => {
            currentFile = new File([blob], "camera_capture.jpg", { type: "image/jpeg" });
            showState("preview");
            analyzeBtn.disabled = false;
        }, "image/jpeg", 0.9);
    });

    cancelCameraBtn.addEventListener("click", () => {
        stopCamera();
        if (currentFile) {
            showState("preview");
            analyzeBtn.disabled = false;
        } else {
            showState("upload");
            analyzeBtn.disabled = true;
        }
    });

    function stopCamera() {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            cameraStream = null;
        }
        cameraVideo.srcObject = null;
    }

    // =============================================
    // --- UI State Switcher ---
    // =============================================
    function showState(state) {
        uploadState.classList.remove("active");
        cameraState.classList.remove("active");
        previewState.classList.remove("active");
        cameraActions.classList.remove("active");

        if (state === "upload") {
            uploadState.classList.add("active");
        } else if (state === "camera") {
            cameraState.classList.add("active");
            cameraActions.classList.add("active");
        } else if (state === "preview") {
            previewState.classList.add("active");
        }
    }

    // =============================================
    // --- Product Analysis API ---
    // =============================================
    analyzeBtn.addEventListener("click", async () => {
        if (!currentFile) return;

        previewState.classList.add("scanning");
        analyzeBtn.disabled = true;
        useCameraBtn.disabled = true;
        demoBtn.disabled = true;

        waitingState.style.display = "flex";
        resultsContent.style.display = "none";
        waitingState.querySelector("h3").textContent = t("scanningTitle");
        waitingState.querySelector("p").textContent = t("scanningText");

        const formData = new FormData();
        formData.append("file", currentFile);

        try {
            const response = await fetch(`/api/analyze?lang=${currentLang}`, {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Analysis failed.");
            }

            const result = await response.json();
            displayResults(result);

        } catch (err) {
            console.error("Analysis error:", err);
            alert(t("errorAlert")(err.message));
            waitingState.style.display = "flex";
            waitingState.querySelector("h3").textContent = t("errorTitle");
            waitingState.querySelector("p").textContent = t("errorText");
        } finally {
            previewState.classList.remove("scanning");
            analyzeBtn.disabled = false;
            useCameraBtn.disabled = false;
            demoBtn.disabled = false;
        }
    });

    // =============================================
    // --- Demo Mode Handler ---
    // =============================================
    demoBtn.addEventListener("click", () => {
        stopCamera();
        imagePreview.src = "assets/demo_apple.png";
        showState("preview");

        previewState.classList.add("scanning");
        analyzeBtn.disabled = true;
        useCameraBtn.disabled = true;
        demoBtn.disabled = true;

        waitingState.style.display = "flex";
        resultsContent.style.display = "none";
        waitingState.querySelector("h3").textContent = t("scanningDemo");

        setTimeout(() => {
            const mockAppleData = {
                "product_name": t("mockAppleProduct"),
                "calories_per_100g": 52,
                "estimated_weight_g": 180,
                "total_calories": 94,
                "macronutrients": {
                    "protein_g": 0.4,
                    "fat_g": 0.2,
                    "carbs_g": 24.5
                },
                "freshness": {
                    "level": "fresh",
                    "percentage": 94,
                    "visual_cues": t("mockAppleCues")
                },
                "storage_recommendations": [
                    t("mockAppleStorage1"),
                    t("mockAppleStorage2"),
                    t("mockAppleStorage3")
                ]
            };

            previewState.classList.remove("scanning");
            analyzeBtn.disabled = false;
            useCameraBtn.disabled = false;
            demoBtn.disabled = false;
            displayResults(mockAppleData);
        }, 2000);
    });

    // =============================================
    // --- Render Results UI ---
    // =============================================
    function displayResults(data) {
        waitingState.style.display = "none";
        resultsContent.style.display = "block";

        // 1. Text Info
        resProductName.textContent = data.product_name;
        resTotalCalories.textContent = data.total_calories;
        resCalories100g.textContent = `${data.calories_per_100g} ${t("kcal")}`;
        resWeight.textContent = `~${data.estimated_weight_g} ${t("weightUnit")}`;

        // 2. Calorie Ring
        const maxCalorieScale = 500;
        const degrees = Math.min(360, (data.total_calories / maxCalorieScale) * 360);
        const circularProgress = document.querySelector(".circular-progress");
        circularProgress.style.background = `conic-gradient(var(--calories-color) ${degrees}deg, var(--border-color) ${degrees}deg)`;

        // 3. Macros
        resProtein.textContent = `${data.macronutrients.protein_g} ${t("weightUnit")}`;
        resFat.textContent = `${data.macronutrients.fat_g} ${t("weightUnit")}`;
        resCarbs.textContent = `${data.macronutrients.carbs_g} ${t("weightUnit")}`;

        const maxProtein = 30, maxFat = 30, maxCarbs = 60;
        barProtein.style.width = `${Math.min(100, (data.macronutrients.protein_g / maxProtein) * 100)}%`;
        barFat.style.width = `${Math.min(100, (data.macronutrients.fat_g / maxFat) * 100)}%`;
        barCarbs.style.width = `${Math.min(100, (data.macronutrients.carbs_g / maxCarbs) * 100)}%`;

        // 4. Freshness
        const freshLvl = data.freshness.level;
        const freshPct = data.freshness.percentage;

        resFreshnessPercentage.textContent = `${freshPct}%`;
        resFreshnessPin.style.left = `${freshPct}%`;
        resFreshnessCues.textContent = data.freshness.visual_cues;

        let badgeText = t("unknown");
        let statusClass = "green-text";
        let badgeBg = "rgba(16, 185, 129, 0.15)";
        let badgeBorder = "var(--success)";

        if (freshLvl === "fresh") {
            badgeText = t("fresh");
        } else if (freshLvl === "ripe") {
            badgeText = t("ripe");
        } else if (freshLvl === "average") {
            badgeText = t("average");
            statusClass = "orange-text";
            badgeBg = "rgba(245, 158, 11, 0.15)";
            badgeBorder = "var(--warning)";
        } else if (freshLvl === "spoiled") {
            badgeText = t("spoiled");
            statusClass = "red-text";
            badgeBg = "rgba(239, 68, 68, 0.15)";
            badgeBorder = "var(--danger)";
        }

        resFreshnessBadge.textContent = badgeText;
        resFreshnessBadge.style.backgroundColor = badgeBg;
        resFreshnessBadge.style.borderColor = badgeBorder;
        resFreshnessBadge.style.color = badgeBorder;
        resFreshnessPercentage.className = statusClass;

        const freshnessCard = document.querySelector(".freshness-card");
        freshnessCard.style.borderLeft = `4px solid ${badgeBorder}`;

        // 5. Storage Advice
        resStorageList.innerHTML = "";
        data.storage_recommendations.forEach(tip => {
            const li = document.createElement("li");
            li.textContent = tip;
            resStorageList.appendChild(li);
        });

        if (window.innerWidth <= 968) {
            resultsContent.scrollIntoView({ behavior: "smooth" });
        }
    }
});
