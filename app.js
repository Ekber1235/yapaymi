const messages = document.getElementById('messages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// Kullanıcı mesajını ekleme
function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = "Kullanıcı: " + text;
    messages.appendChild(messageDiv);
}

// Yapay zeka cevabını ekleme
function addAIMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = "ChatGPT: " + text;
    messages.appendChild(messageDiv);
}

// Cevap oluşturma
function generateResponse(userMessage) {
    // Çeviri sözlüğü
    const translations = {
        "selam": {
            "ingilizce": "hello",
            "fransızca": "salut",
            "almanca": "hallo"
        },
        "nasılsın": {
            "ingilizce": "how are you",
            "fransızca": "comment ça va",
            "almanca": "wie geht's"
        },
        "teşekkür ederim": {
            "ingilizce": "thank you",
            "fransızca": "merci",
            "almanca": "danke"
        },
        "güle güle": {
            "ingilizce": "goodbye",
            "fransızca": "au revoir",
            "almanca": "auf Wiedersehen"
        }
    };

    const lowerCaseMessage = userMessage.toLowerCase();

    // Sohbet yanıtları
    if (lowerCaseMessage === "selam") {
        return "Selam! Nasılsın?";
    } else if (lowerCaseMessage === "nasılsın") {
        return "Ben bir yapay zeka, ama seninle sohbet etmeyi seviyorum!";
    } else if (lowerCaseMessage === "teşekkür ederim") {
        return "Rica ederim! Başka bir şey ister misin?";
    } else if (lowerCaseMessage === "güle güle") {
        return "Görüşürüz! Kendine iyi bak!";
    }

    // "ekber gaydır" kontrolü
    if (lowerCaseMessage.includes("ekber gaydır") || 
        lowerCaseMessage.includes("əkbər gaydır") || 
        lowerCaseMessage.includes("ekber geydir") || 
        lowerCaseMessage.includes("ekber gaydir")) {
        return "Adındı gay bıdımı yala!";
    }

    // Muxteser vurma düsturları
    if (lowerCaseMessage === "müxtəsər vurma düsturları") {
        return `
        1. Toplama ve Çarpma Dağıtım Kuralı: a(b + c) = ab + ac
        2. Çarpma ve Toplama Dağıtım Kuralı: (a + b)c = ac + bc
        3. (a + b)²: (a + b)² = a² + 2ab + b²
        4. (a - b)²: (a - b)² = a² - 2ab + b²
        5. (a + b)(a - b): (a + b)(a - b) = a² - b²
        6. Çarpma ve Bölme ile Toplama ve Çıkarma: a(b + c) - d = ab + ac - d
        `;
    }

    // Hesaplama kontrolü
    if (lowerCaseMessage.includes("hesapla")) {
        const expression = lowerCaseMessage.replace("hesapla", "").trim();
        try {
            const result = eval(expression);
            return `Sonuç: ${result}`;
        } catch (error) {
            return "Geçersiz bir ifade girdiniz. Lütfen doğru bir matematiksel ifade girin.";
        }
    }

    // Çeviri kontrolü
    if (lowerCaseMessage.startsWith("çevir ")) {
        const wordToTranslate = lowerCaseMessage.replace("çevir ", "").trim();
        if (translations[wordToTranslate]) {
            const translation = translations[wordToTranslate];
            return `İngilizce: ${translation.ingilizce}, Fransızca: ${translation.fransızca}, Almanca: ${translation.almanca}`;
        } else {
            return "Bu kelimenin çevirisini bulamadım.";
        }
    } else {
        return "Lütfen 'çevir' ile bir kelime girin veya selam verin.";
    }
}

// Mesaj gönderme işlemi
sendButton.addEventListener('click', () => {
    const userMessage = userInput.value;
    if (userMessage.trim() !== "") {
        addUserMessage(userMessage);
        const response = generateResponse(userMessage);
        addAIMessage(response);
        userInput.value = ""; // Giriş kutusunu temizle
        messages.scrollTop = messages.scrollHeight; // Son mesaja kaydır
    }
});

// Enter tuşuyla mesaj gönderme
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});
