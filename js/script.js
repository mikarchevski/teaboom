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
    // Удаляем класс, если он уже есть (чтобы перезапустить анимацию)
    element.classList.remove('animate-change');

    // Форсируем reflow для перезапуска анимации
    void element.offsetWidth;

    // Добавляем класс анимации
    element.classList.add('animate-change');

    // Меняем значение в середине анимации (когда элемент невидим)
    setTimeout(() => {
      element.textContent = newValue;
    }, 160); // 40% от 400мс = 160мс
  };

  // Обработка клика по фасовке
  packagingOptions.forEach((option) => {
    option.addEventListener('click', () => {
      // Снимаем активный класс и aria-pressed со всех кнопок
      packagingOptions.forEach((opt) => {
        opt.classList.remove('packaging-option--active');
        opt.setAttribute('aria-pressed', 'false');
      });

      // Добавляем активный класс и aria-pressed нажатой кнопке
      option.classList.add('packaging-option--active');
      option.setAttribute('aria-pressed', 'true');

      // Получаем данные из data-атрибутов
      const price = option.dataset.price;
      const oldPrice = option.dataset.oldPrice;
      const sku = option.dataset.sku;

      // Запускаем анимацию для всех элементов
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
