// Değişkenler
let tura = 0;
let yazi = 0;
let isFlipping = false;

// DOM elementleri
const coin = document.getElementById("coin");
const flipBtn = document.getElementById("flip-button");
const resetBtn = document.getElementById("reset-button");
const turaEl = document.getElementById("tura-adedi");
const yaziEl = document.getElementById("yazi-adedi");
const resultMessage = document.getElementById("result-message");
const backgroundSections = document.querySelectorAll('.background-section');

// Döndür butonu event listener
flipBtn.addEventListener("click", flipCoin);

// Sıfırla butonu event listener
resetBtn.addEventListener("click", resetGame);

// Madeni paraya tıklayarak döndürme
coin.addEventListener("click", () => {
  if (!isFlipping) {
    flipCoin();
  }
});

// Arka plan renklerini değiştir
function changeBackgroundColors() {
  backgroundSections.forEach(section => {
    const hue = Math.floor(Math.random() * 360);
    section.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 50%), hsl(${hue + 30}, 70%, 50%)`;
  });
}

// Madeni parayı döndürme fonksiyonu
function flipCoin() {
  if (isFlipping) return;
  
  isFlipping = true;
  
  // Rastgele sonuç oluştur (0: yazı, 1: tura)
  const random = Math.floor(Math.random() * 2);
  
  // Önceki animasyonları temizle
  coin.classList.remove("heads", "tails");
  resultMessage.style.opacity = "0";
  
  // Butonu devre dışı bırak
  flipBtn.disabled = true;
  
  // Arka plan renklerini değiştir
  changeBackgroundColors();
  
  // Animasyonu başlat
  if (random === 0) {
    coin.classList.add("heads");
    setTimeout(() => {
      yazi++;
      yaziEl.textContent = yazi;
      showResult("Yazı Çıktı!");
      flipBtn.disabled = false;
      isFlipping = false;
    }, 2500);
  } else {
    coin.classList.add("tails");
    setTimeout(() => {
      tura++;
      turaEl.textContent = tura;
      showResult("Tura Çıktı!");
      flipBtn.disabled = false;
      isFlipping = false;
    }, 2500);
  }
}

// Sonuç mesajını göster
function showResult(message) {
  resultMessage.textContent = message;
  resultMessage.style.opacity = "1";
  
  setTimeout(() => {
    resultMessage.style.opacity = "0";
  }, 2000);
}

// Oyunu sıfırla
function resetGame() {
  tura = 0;
  yazi = 0;
  turaEl.textContent = "0";
  yaziEl.textContent = "0";
  coin.classList.remove("heads", "tails");
  flipBtn.disabled = false;
  resultMessage.style.opacity = "0";
  isFlipping = false;
  
  // Orijinal arka plan renklerini geri yükle
  document.querySelector('.top-left').style.background = 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)';
  document.querySelector('.top-right').style.background = 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)';
  document.querySelector('.bottom-left').style.background = 'linear-gradient(135deg, #00cdac 0%, #02aab0 100%)';
  document.querySelector('.bottom-right').style.background = 'linear-gradient(135deg, #ffd26f 0%, #ffb347 100%)';
}

// İlk yüklemede butonlara odaklanmayı engelle
document.addEventListener('DOMContentLoaded', function() {
  flipBtn.blur();
  resetBtn.blur();
});