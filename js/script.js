document.addEventListener('DOMContentLoaded', () => {
  const packagingOptions = document.querySelectorAll('.packaging-option');
  const currentPriceEl = document.getElementById('currentPrice');
  const oldPriceEl = document.getElementById('oldPrice');
  const skuEl = document.getElementById('sku');
  const addToCartBtn = document.getElementById('addToCartBtn');

  // Форматирование цены: добавляем пробелы и запятую (например, 1 432,00)
  const formatPrice = (price) => {
    return (
      parseFloat(price).toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) + ' ₽'
    );
  };

  // Функция для запуска анимации
  const animateElement = (element, newValue) => {
    element.classList.remove('animate-change');
    void element.offsetWidth;
    element.classList.add('animate-change');
    setTimeout(() => {
      element.textContent = newValue;
    }, 160);
  };

  // Обработка клика по фасовке
  packagingOptions.forEach((option) => {
    option.addEventListener('click', () => {
      packagingOptions.forEach((opt) => {
        opt.classList.remove('packaging-option--active');
        opt.setAttribute('aria-pressed', 'false');
      });

      option.classList.add('packaging-option--active');
      option.setAttribute('aria-pressed', 'true');

      const price = option.dataset.price;
      const oldPrice = option.dataset.oldPrice;
      const sku = option.dataset.sku;

      animateElement(currentPriceEl, formatPrice(price));
      animateElement(oldPriceEl, formatPrice(oldPrice));
      animateElement(skuEl, sku);
    });
  });

  // Визуальный фидбек для кнопки "В корзину"
  addToCartBtn.addEventListener('click', () => {
    const originalText = addToCartBtn.textContent;
    const originalBg = addToCartBtn.style.backgroundColor;

    addToCartBtn.textContent = 'Добавлено ✓';
    addToCartBtn.style.backgroundColor = 'var(--color-accent)';
    addToCartBtn.style.color = '#1a1a1a';

    setTimeout(() => {
      addToCartBtn.textContent = originalText;
      addToCartBtn.style.backgroundColor = originalBg;
      addToCartBtn.style.color = '';
    }, 1500);
  });
});
