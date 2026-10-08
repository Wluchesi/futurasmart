/**
 * Futura Avalia Smart — Scripts da Landing Page
 * Foco: Alta Performance, Usabilidade Fluida e Montador de Pedido Integrado ao WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  const PHONE_NUMBER = '5519991623500';

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
      faqItems.forEach(other => other.classList.remove('active'));
      if (!isAlreadyActive) {
        item.classList.add('active');
      }
    });
  });

  // 3. MONTADOR DE PEDIDO INTERATIVO (ORDER BUILDER DINÂMICO)
  let qtyBlack = 1;
  let qtyWhite = 0;
  let customLogoSelected = false;

  const btnMinusBlack = document.getElementById('btnMinusBlack');
  const btnPlusBlack = document.getElementById('btnPlusBlack');
  const displayQtyBlack = document.getElementById('displayQtyBlack');
  const itemModelBlack = document.getElementById('itemModelBlack');

  const btnMinusWhite = document.getElementById('btnMinusWhite');
  const btnPlusWhite = document.getElementById('btnPlusWhite');
  const displayQtyWhite = document.getElementById('displayQtyWhite');
  const itemModelWhite = document.getElementById('itemModelWhite');

  const checkCustomLogo = document.getElementById('checkCustomLogo');
  const inputClientName = document.getElementById('inputClientName');
  const inputClientPhone = document.getElementById('inputClientPhone');

  const presetKit1 = document.getElementById('presetKit1');
  const presetKit2 = document.getElementById('presetKit2');
  const presetKit3 = document.getElementById('presetKit3');

  const summaryQtyText = document.getElementById('summaryQtyText');
  const summaryComboDiscountRow = document.getElementById('summaryComboDiscountRow');
  const summaryDiscountBadge = document.getElementById('summaryDiscountBadge');
  const summaryLogoRow = document.getElementById('summaryLogoRow');
  const summaryTotalVal = document.getElementById('summaryTotalVal');
  const btnSubmitBuilderOrder = document.getElementById('btnSubmitBuilderOrder');

  function calculateOrderSummary() {
    const totalQty = qtyBlack + qtyWhite;

    if (displayQtyBlack) displayQtyBlack.textContent = qtyBlack;
    if (displayQtyWhite) displayQtyWhite.textContent = qtyWhite;

    if (itemModelBlack) itemModelBlack.classList.toggle('selected', qtyBlack > 0);
    if (itemModelWhite) itemModelWhite.classList.toggle('selected', qtyWhite > 0);

    // Texto de quantidade
    if (summaryQtyText) {
      if (totalQty === 0) {
        summaryQtyText.textContent = 'Nenhuma plaquinha selecionada';
      } else if (totalQty === 1) {
        summaryQtyText.textContent = `1 unidade (${qtyBlack > 0 ? 'Edição Black' : 'Edição White'})`;
      } else {
        const parts = [];
        if (qtyBlack > 0) parts.push(`${qtyBlack}x Black`);
        if (qtyWhite > 0) parts.push(`${qtyWhite}x White`);
        summaryQtyText.textContent = `${totalQty} unidades (${parts.join(', ')})`;
      }
    }

    // Cálculo do valor base
    let basePrice = 0;
    let discount = 0;

    if (totalQty === 0) {
      basePrice = 0;
    } else if (totalQty === 1) {
      basePrice = 79.90;
    } else if (totalQty === 2) {
      basePrice = 139.00;
      discount = (79.90 * 2) - 139.00; // Economia de R$ 20,80
    } else if (totalQty === 3) {
      basePrice = 189.00;
      discount = (79.90 * 3) - 189.00; // Economia de R$ 50,70
    } else {
      // 4 ou mais unidades
      basePrice = 189.00 + (totalQty - 3) * 55.00;
      discount = (79.90 * totalQty) - basePrice;
    }

    // Logo adicional
    const logoPrice = customLogoSelected ? 30.00 : 0.00;
    const finalPrice = basePrice + logoPrice;

    // Exibe ou oculta linhas de desconto e logo
    if (summaryComboDiscountRow && summaryDiscountBadge) {
      if (totalQty >= 2 && discount > 0) {
        summaryComboDiscountRow.style.display = 'flex';
        summaryDiscountBadge.textContent = `- R$ ${discount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      } else {
        summaryComboDiscountRow.style.display = 'none';
      }
    }

    if (summaryLogoRow) {
      summaryLogoRow.style.display = customLogoSelected ? 'flex' : 'none';
    }

    if (summaryTotalVal) {
      summaryTotalVal.textContent = `R$ ${finalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    // Atualiza botões de atalho dos combos
    if (presetKit1) presetKit1.classList.toggle('active', totalQty === 1);
    if (presetKit2) presetKit2.classList.toggle('active', totalQty === 2);
    if (presetKit3) presetKit3.classList.toggle('active', totalQty === 3);
  }

  // Controles de quantidade
  if (btnMinusBlack) {
    btnMinusBlack.addEventListener('click', () => {
      if (qtyBlack > 0) {
        qtyBlack--;
        calculateOrderSummary();
      }
    });
  }
  if (btnPlusBlack) {
    btnPlusBlack.addEventListener('click', () => {
      qtyBlack++;
      calculateOrderSummary();
    });
  }

  if (btnMinusWhite) {
    btnMinusWhite.addEventListener('click', () => {
      if (qtyWhite > 0) {
        qtyWhite--;
        calculateOrderSummary();
      }
    });
  }
  if (btnPlusWhite) {
    btnPlusWhite.addEventListener('click', () => {
      qtyWhite++;
      calculateOrderSummary();
    });
  }

  if (checkCustomLogo) {
    checkCustomLogo.addEventListener('change', (e) => {
      customLogoSelected = e.target.checked;
      calculateOrderSummary();
    });
  }

  // Máscara de entrada do telefone: (XX)XXXXXXXXX
  if (inputClientPhone) {
    inputClientPhone.addEventListener('input', (e) => {
      let digits = e.target.value.replace(/\D/g, '');
      if (digits.length > 11 && digits.startsWith('55')) {
        digits = digits.slice(2);
      }
      digits = digits.slice(0, 11);

      if (digits.length === 0) {
        e.target.value = '';
      } else if (digits.length <= 2) {
        e.target.value = `(${digits}`;
      } else {
        e.target.value = `(${digits.slice(0, 2)})${digits.slice(2)}`;
      }
    });
  }

  // Envio do pedido montado para WhatsApp
  if (btnSubmitBuilderOrder) {
    btnSubmitBuilderOrder.addEventListener('click', () => {
      const totalQty = qtyBlack + qtyWhite;

      if (totalQty === 0) {
        alert('Por favor, adicione pelo menos 1 plaquinha ao seu pedido.');
        return;
      }

      const clientName = inputClientName && inputClientName.value.trim() 
        ? inputClientName.value.trim() 
        : '';

      const clientPhone = inputClientPhone && inputClientPhone.value.trim() 
        ? inputClientPhone.value.trim() 
        : '';

      if (!clientName) {
        alert('Por favor, preencha o seu nome ou o nome da sua empresa para personalizarmos seu atendimento.');
        if (inputClientName) inputClientName.focus();
        return;
      }

      // Detalhes dos modelos escolhidos
      const itemsList = [];
      if (qtyBlack > 0) itemsList.push(`➡️ *${qtyBlack}x Edição Black*`);
      if (qtyWhite > 0) itemsList.push(`➡️ *${qtyWhite}x Edição White*`);

      const designType = customLogoSelected 
        ? 'Personalizada com Meu Logotipo (+R$ 30,00)' 
        : 'Arte Padrão Oficial do Google';

      const totalValueFormatted = summaryTotalVal ? summaryTotalVal.textContent : 'R$ 79,90';

      let zapMsg = `Olá! Meu nome é *${clientName}*`;
      if (clientPhone) {
        zapMsg += ` (WhatsApp: ${clientPhone})`;
      }
      zapMsg += `.\n\n`;
      zapMsg += `Vim pelo site da Futura Avalia Smart e montei meu pedido:\n\n`;
      zapMsg += `➡️ *Plaquinhas Selecionadas (${totalQty} un):*\n`;
      zapMsg += `${itemsList.join('\n')}\n\n`;
      zapMsg += `➡️ *Acabamento:* ${designType}\n\n`;
      zapMsg += `➡️ *Valor Total Calculado:* ${totalValueFormatted}\n\n`;
      zapMsg += `Gostaria de fechar o pedido!`;

      const encodedZapMsg = encodeURIComponent(zapMsg);
      const finalZapUrl = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedZapMsg}`;

      window.open(finalZapUrl, '_blank');
    });
  }

  // Atalhos de kits/combos
  if (presetKit1) {
    presetKit1.addEventListener('click', () => {
      qtyBlack = 1;
      qtyWhite = 0;
      calculateOrderSummary();
    });
  }

  if (presetKit2) {
    presetKit2.addEventListener('click', () => {
      qtyBlack = 1;
      qtyWhite = 1;
      calculateOrderSummary();
    });
  }

  if (presetKit3) {
    presetKit3.addEventListener('click', () => {
      qtyBlack = 2;
      qtyWhite = 1;
      calculateOrderSummary();
    });
  }

  // 4. Galeria de Fotos Reais com Lightbox Expansível
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

  // Inicializa montador de pedidos
  calculateOrderSummary();
});
