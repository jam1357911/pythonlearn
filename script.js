document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

const sections = Array.from(document.querySelectorAll('.section'));
const navLinks = Array.from(document.querySelectorAll('.site-nav a'));

const observerOptions = {
  root: null,
  rootMargin: '-100px 0px -50%',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.id;
      
      navLinks.forEach(link => {
        link.classList.remove('is-active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('is-active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => {
  if (section.id) {
    observer.observe(section);
  }
});

document.querySelectorAll('.copy-button').forEach(button => {
  button.addEventListener('click', async () => {
    const codeBlock = button.closest('.code-panel').querySelector('pre code');
    if (!codeBlock) return;

    try {
      await navigator.clipboard.writeText(codeBlock.textContent);
      button.textContent = '已複製';
      button.classList.add('copied');
      setTimeout(() => {
        button.textContent = '複製程式碼';
        button.classList.remove('copied');
      }, 1200);
    } catch (err) {
      console.error('複製失敗:', err);
    }
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('[data-reveal]').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});
