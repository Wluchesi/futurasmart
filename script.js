/**
 * Futura Avalia Smart — Scripts da Landing Page
 * Foco: Alta Performance, Usabilidade Fluida e Experiência Mobile Limpa
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Interação com a Área de Vídeo Explicativo
  const videoPlayOverlay = document.getElementById('videoPlayOverlay');
  const heroVideoPlayer = document.getElementById('heroVideoPlayer');

  if (videoPlayOverlay && heroVideoPlayer) {
    videoPlayOverlay.addEventListener('click', () => {
      videoPlayOverlay.style.display = 'none';
      heroVideoPlayer.play();
    });

    heroVideoPlayer.addEventListener('play', () => {
      videoPlayOverlay.style.display = 'none';
    });

    heroVideoPlayer.addEventListener('ended', () => {
      videoPlayOverlay.style.display = 'flex';
    });
  }

  // 2. FAQ Accordion Fluido
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isAlreadyActive = item.classList.contains('active');
      // Fecha outros itens para foco limpo
      faqItems.forEach(other => other.classList.remove('active'));
      // Alterna item atual
      if (!isAlreadyActive) {
        item.classList.add('active');
      }
    });
  });

  // 3. Galeria de Fotos Reais com Modal Lightbox
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item-card'));
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentGalleryIndex = 0;

  function openLightbox(index) {
    if (!lightbox || !lightboxImg || galleryItems.length === 0) return;
    currentGalleryIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentGalleryIndex];
    const imgSrc = item.getAttribute('data-full');
    const caption = item.getAttribute('data-caption');

    lightboxImg.src = imgSrc;
    lightboxImg.alt = caption || 'Foto da Plaquinha Futura Avalia Smart';
    if (lightboxCaption) {
      lightboxCaption.textContent = caption || '';
      lightboxCaption.style.display = caption ? 'block' : 'none';
    }

    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function prevLightbox() {
    openLightbox(currentGalleryIndex - 1);
  }

  function nextLightbox() {
    openLightbox(currentGalleryIndex + 1);
  }

  galleryItems.forEach((card, idx) => {
    card.addEventListener('click', () => openLightbox(idx));
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextLightbox);

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
  });
});
