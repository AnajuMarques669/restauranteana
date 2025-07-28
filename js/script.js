// ------------------ TEMA CLARO/ESCURO ------------------
(function themeToggle(){
  const root = document.documentElement;
  const btn = document.getElementById('btn-theme');
  if (!btn) return;

  const current = localStorage.getItem('theme') || 'light';
  root.setAttribute('data-theme', current);
 btn.textContent = 'Tema';


  btn.addEventListener('click', () => {
    const now = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', now);
    localStorage.setItem('theme', now);
   btn.textContent = 'Tema';
 });
})();

// ------------------ MENU MOBILE ------------------
(function mobileMenu(){
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
})();

// ------------------ DADOS DO CARDÁPIO (Italiano) ------------------
const CARDAPIO = [
  // PROMOÇÕES
  {
    id: 1,
    nome: "Espaguete de Espinafre",
    desc: "Uma deliciosa massa que acompanha queijo e molho de tomate.",
    preco: 29.90,
    categoria: "promocoes",
    img: "IMG/print2.jpg"
  },
  {
    id: 2,
    nome: "Macarrão ao Molho Branco (Promo)",
    desc: "Macarrão cremoso que acompanha parmesão e brocólis.",
    preco: 39.90,
    categoria: "promocoes",
    img: "IMG/print1.jpg"
  },
   {
    id: 3,
    nome: "Espaguete Clássico (Promo)",
    desc: "Espaguete à moda da casa.",
    preco: 39.90,
    categoria: "promocoes",
    img: "IMG/print3.jpg"
  },
  {
    id: 4,
    nome: "Parmegiana de frango (Promo)",
    desc: "Frango à parmegiana com queijo mussarrela e molho de tomate.",
    preco: 39.90,
    categoria: "promocoes",
    img: "IMG/print4.jpg"
  },
  // CLÁSSICOS
  {
    id: 10,
    nome: "Lasanha Bolonhesa",
    desc: "Massa artesanal com molho bolonhesa e parmesão gratinado.",
    preco: 45.90,
    categoria: "classicos",
    img: "IMG/class1.jpg"
  },
  {
    id: 11,
    nome: "Spaghetti Carbonara",
    desc: "Guanciale, ovos, pecorino romano e pimenta-do-reino.",
    preco: 42.00,
    categoria: "classicos",
    img: "IMG/class2.jpg"
  },
  {
    id: 12,
    nome: "Gnocchi ao Sugo",
    desc: "Nhoque artesanal ao molho de tomate pelati e manjericão.",
    preco: 39.90,
    categoria: "classicos",
    img: "IMG/class5.jpg"
  },
  {
    id: 13,
    nome: "Ravioli de Ricotta e Espinafre",
    desc: "Ravioli artesanal com manteiga e sálvia.",
    preco: 47.00,
    categoria: "classicos",
    img: "IMG/class6.jpg"
  },
  {
    id: 14,
    nome: "Pizza Margherita",
    desc: "Molho de tomate, mussarela de búfala e manjericão.",
    preco: 39.90,
    categoria: "classicos",
    img: "IMG/class7.jpg"
  },
  {
    id: 15,
    nome: "Pizza Quattro Formaggi",
    desc: "Mussarela, gorgonzola, parmesão e provolone.",
    preco: 49.90,
    categoria: "classicos",
    img: "IMG/class8.jpg"
  },

  // SOBREMESAS
  {
    id: 20,
    nome: "Tiramisù",
    desc: "Clássico com café, cacau e mascarpone.",
    preco: 22.00,
    categoria: "sobremesas",
    img: "IMG/sobre9.jpg"
  },
  {
    id: 21,
    nome: "Panna Cotta",
    desc: "Com calda de frutas vermelhas.",
    preco: 19.00,
    categoria: "sobremesas",
    img: "IMG/sobre7.jpg"
  },
  {
    id: 22,
    nome: "Cannoli Siciliani",
    desc: "Crosta crocante recheada de ricotta doce.",
    preco: 24.00,
    categoria: "sobremesas",
    img: "IMG/sobre1.jpg"
  },
   {
    id: 23,
    nome: "Bolo de Frutas Vermelhas",
    desc: "Massa leve com recheio de frutas vermelhas.",
    preco: 26.00,
    categoria: "sobremesas",
    img: "IMG/sobre2.jpg"
  },

  // BEBIDAS
  {
    id: 30,
    nome: "Vinho Chianti (750ml)",
    desc: "Tinto italiano clássico da Toscana.",
    preco: 120.00,
    categoria: "bebidas",
    img: "IMG/bebida1.jpg"
  },
  {
    id: 31,
    nome: "Prosecco",
    desc: "Espumante italiano, leve e refrescante.",
    preco: 95.00,
    categoria: "bebidas",
    img: "IMG/bebida2.jpg"
  },
  {
    id: 32,
    nome: "Aperol Spritz",
    desc: "Clássico drink italiano com Aperol, espumante e laranja.",
    preco: 32.00,
    categoria: "bebidas",
    img: "IMG/bebida3.jpg"
  },
  {
    id: 33,
    nome: "Água com gás San Pellegrino",
    desc: "500ml.",
    preco: 12.00,
    categoria: "bebidas",
    img: "IMG/bebida4.jpg"
  },
  {
    id: 34,
    nome: "Espresso Italiano",
    desc: "Curto, intenso, perfeito após a refeição.",
    preco: 8.00,
    categoria: "bebidas",
    img: "IMG/bebida5.jpg"
  }
];

// ------------------ RENDERIZAÇÃO POR PÁGINA ------------------
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('grid-cardapio');
  const searchInput = document.getElementById('search');
  const body = document.body;
  const pageCategory = body.dataset.category; // home, promocoes, classicos, sobremesas, bebidas, sobre

  if (!grid) return; // páginas sem grid (ex.: sobre) não precisam do restante

  // Seleciona itens por categoria da página
  let itemsBase = [];
  if (pageCategory === 'home') {
    // Mostra alguns destaques (pegando os 6 primeiros)
    itemsBase = CARDAPIO.slice(0, 6);
  } else if (['promocoes', 'classicos', 'sobremesas', 'bebidas'].includes(pageCategory)) {
    itemsBase = CARDAPIO.filter(i => i.categoria === pageCategory);
  } else {
    itemsBase = CARDAPIO; // fallback
  }

  // Render inicial
  render(itemsBase);

  // Busca
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      const term = e.target.value.toLowerCase();
      const result = itemsBase.filter(i =>
        i.nome.toLowerCase().includes(term) ||
        i.desc.toLowerCase().includes(term)
      );
      render(result);
    });
  }

  // ------- Funções de Render & Modal -------
  function render(list){
    grid.innerHTML = '';
    if (list.length === 0) {
      grid.innerHTML = '<p>Nenhum item encontrado.</p>';
      return;
    }

    list.forEach(item => {
      const card = document.createElement('article');
      card.className = 'card';
      card.setAttribute('tabindex', '0');

      card.innerHTML = `
        <img class="card-img" src="${item.img}" alt="${item.nome}" />
        <div class="card-body">
          <h3 class="card-title">${item.nome}</h3>
          <p class="card-desc">${item.desc}</p>
          <span class="price">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
        </div>
      `;

      card.addEventListener('click', () => openModal(item));
      card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') openModal(item);
      });

      grid.appendChild(card);
    });
  }

  // Modal
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalPrice = document.getElementById('modal-price');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalBackdrop = document.getElementById('modal-backdrop');

  function openModal(item){
    modalImg.src = item.img;
    modalImg.alt = item.nome;
    modalTitle.textContent = item.nome;
    modalDesc.textContent = item.desc;
    modalPrice.textContent = `R$ ${item.preco.toFixed(2).replace('.', ',')}`;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn && modalBackdrop) {
    modalCloseBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  }
});
// SLIDER
(function slider(){
  const slides = document.querySelectorAll('.slide');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  let index = 0;

  function showSlide(n) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === n);
    });
    document.querySelector('.slides').style.transform = `translateX(-${n * 100}%)`;
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }
  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  }

  if (next && prev) {
    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);
  }

  setInterval(nextSlide, 5000); // troca a cada 5s
})();

