document.addEventListener('DOMContentLoaded', function() {
    // Получаем все блоки с учеными
    const scientistContainers = document.querySelectorAll('.scientist-container');
    
    // Функция для проверки видимости элемента
    function checkVisibility() {
        scientistContainers.forEach(container => {
            const rect = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Если верхняя граница элемента выше нижней границы окна
            // и нижняя граница элемента ниже верхней границы окна
            if (rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
                container.classList.add('visible');
            }
        });
    }
    
    // Проверяем видимость при загрузке
    checkVisibility();
    
    // Проверяем видимость при скролле
    window.addEventListener('scroll', checkVisibility);
    
    // Проверяем видимость при изменении размера окна
    window.addEventListener('resize', checkVisibility);
});

      // Плавное появление элементов
      document.addEventListener('DOMContentLoaded', () => {
        const rubu = document.querySelector('.Rubu');
        rubu.style.opacity = 0;
        setTimeout(() => {
          rubu.style.opacity = 1;
        }, 300);
      });