// Tailwind só fornece estilos: menu, carrossel e modal são implementados aqui em JavaScript nativo.

const experiencias = {
  pacto: {
    titulo: 'Analista de QA Pleno',
    subtitulo: 'Pacto Soluções · 08/2025 – 09/2026',
    itens: [
      'Construí e mantive a suíte de testes E2E em Cypress e TypeScript, priorizando cenários críticos de negócio (testes baseados em risco).',
      'Integrei a suíte ao GitLab CI com execução paralela entre jobs, garantindo regressão automatizada em cada merge request.',
      'Padronizei a arquitetura da suíte e os dados de teste (fixtures e helpers de autenticação por perfil), reduzindo duplicação.',
      'Investiguei falhas de regressão até a causa raiz, cruzando front-end, requisições de API e dados no banco (SQL).',
      'Atuei no time Scrum definindo critérios de aceite testáveis e participando do code review em merge requests.'
    ]
  },
  braskem: {
    titulo: 'Estagiário em Engenharia de Software',
    subtitulo: 'Braskem · 01/2025 – 07/2025',
    itens: [
      'Executei testes funcionais e manuais ao longo do ciclo de desenvolvimento de aplicações internas.',
      'Desenvolvi aplicações web para a intranet da engenharia em PHP e C#, com integração às APIs do AutoCAD.',
      'Implementei rotinas de análise e tratamento de dados em Python para apoiar decisões das áreas atendidas.'
    ]
  },
  gilix: {
    titulo: 'Webmaster',
    subtitulo: 'Gilix TI · 01/2024 – 01/2025',
    itens: [
      'Mantive sites institucionais em PHP, JavaScript, HTML e CSS, respondendo pela disponibilidade e funcionamento.',
      'Validei a integridade dos dados e a consistência das entregas em operações de broadcasts em larga escala.'
    ]
  },
  infinity: {
    titulo: 'Monitor de Cursos Full Stack',
    subtitulo: 'Infinity School Salvador · 09/2023 – 01/2024',
    itens: [
      'Ministrei aulas de automação de testes com Cypress, apresentando boas práticas de QA e testes E2E.',
      'Apoiei turmas de Python, JavaScript, ReactJS, SQL e HTML/CSS em aulas de reforço e correção de avaliações.'
    ]
  },
  tcc: {
    titulo: 'TCC: Avaliação de um sistema de busca semântica com RAG',
    subtitulo: 'UCSAL · 2026 · Python, Java 21, Spring Boot, PostgreSQL + pgvector, Docker Compose',
    itens: [
      'Construí um harness de avaliação automatizada em Python que mede a qualidade das respostas de forma repetível.',
      'Defini a rubrica de avaliação e apliquei LLM as a judge na pontuação, com análise estatística (pandas, SciPy, matplotlib).',
      'Escrevi testes automatizados de API para os endpoints de busca e para o fluxo de ingestão de documentos.'
    ]
  }
};

const botaoMenu = document.getElementById('botaoMenu');
const menuPrincipal = document.getElementById('menuPrincipal');

function definirMenuAberto(aberto) {
  menuPrincipal.classList.toggle('hidden', !aberto);
  botaoMenu.setAttribute('aria-expanded', String(aberto));
  botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
  botaoMenu.querySelector('[data-icone="abrir"]').classList.toggle('hidden', aberto);
  botaoMenu.querySelector('[data-icone="fechar"]').classList.toggle('hidden', !aberto);
}

botaoMenu.addEventListener('click', () => {
  definirMenuAberto(menuPrincipal.classList.contains('hidden'));
});

menuPrincipal.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => definirMenuAberto(false));
});

const carrossel = document.getElementById('carrossel');
const trilho = carrossel.querySelector('[data-trilho]');
const slides = [...trilho.children];
const areaIndicadores = carrossel.querySelector('[data-indicadores]');
const INTERVALO_AUTOPLAY = 5000;
let slideAtual = 0;
let timerAutoplay = null;

const indicadores = slides.map((_, indice) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.className = 'h-2.5 rounded-full bg-white/50 transition-all duration-300 hover:bg-white/80';
  dot.setAttribute('aria-label', `Ir para o slide ${indice + 1}`);
  dot.addEventListener('click', () => irParaSlide(indice));
  areaIndicadores.append(dot);
  return dot;
});

function irParaSlide(indice) {
  slideAtual = (indice + slides.length) % slides.length;
  trilho.style.transform = `translateX(-${slideAtual * 100}%)`;

  slides.forEach((slide, i) => {
    const ativo = i === slideAtual;
    slide.setAttribute('aria-hidden', String(!ativo));
    slide.inert = !ativo;
  });

  indicadores.forEach((dot, i) => {
    const ativo = i === slideAtual;
    dot.classList.toggle('w-8', ativo);
    dot.classList.toggle('bg-white', ativo);
    dot.classList.toggle('w-2.5', !ativo);
    dot.classList.toggle('bg-white/50', !ativo);
    if (ativo) dot.setAttribute('aria-current', 'true');
    else dot.removeAttribute('aria-current');
  });
}

function iniciarAutoplay() {
  pararAutoplay();
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  timerAutoplay = setInterval(() => irParaSlide(slideAtual + 1), INTERVALO_AUTOPLAY);
}

function pararAutoplay() {
  clearInterval(timerAutoplay);
}

carrossel.querySelector('[data-anterior]').addEventListener('click', () => irParaSlide(slideAtual - 1));
carrossel.querySelector('[data-proximo]').addEventListener('click', () => irParaSlide(slideAtual + 1));

carrossel.addEventListener('mouseenter', pararAutoplay);
carrossel.addEventListener('mouseleave', iniciarAutoplay);
carrossel.addEventListener('focusin', pararAutoplay);
carrossel.addEventListener('focusout', iniciarAutoplay);

carrossel.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') irParaSlide(slideAtual - 1);
  if (event.key === 'ArrowRight') irParaSlide(slideAtual + 1);
});

let toqueInicialX = null;
carrossel.addEventListener('touchstart', (event) => {
  toqueInicialX = event.touches[0].clientX;
  pararAutoplay();
}, { passive: true });
carrossel.addEventListener('touchend', (event) => {
  if (toqueInicialX === null) return;
  const distancia = event.changedTouches[0].clientX - toqueInicialX;
  if (Math.abs(distancia) > 50) irParaSlide(slideAtual + (distancia < 0 ? 1 : -1));
  toqueInicialX = null;
  iniciarAutoplay();
});

irParaSlide(0);
iniciarAutoplay();

const modal = document.getElementById('modalDetalhes');

function abrirModal(chave) {
  const dados = experiencias[chave];
  if (!dados) return;

  document.getElementById('modalTitulo').textContent = dados.titulo;
  document.getElementById('modalSubtitulo').textContent = dados.subtitulo;
  document.getElementById('modalItens').replaceChildren(...dados.itens.map((texto) => {
    const item = document.createElement('li');
    item.textContent = texto;
    return item;
  }));

  modal.showModal();
}

document.querySelectorAll('[data-experiencia]').forEach((botao) => {
  botao.addEventListener('click', () => abrirModal(botao.dataset.experiencia));
});

modal.querySelectorAll('[data-fechar]').forEach((botao) => {
  botao.addEventListener('click', () => modal.close());
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});

document.getElementById('modalContato').addEventListener('click', () => {
  modal.close();
  document.getElementById('contato').scrollIntoView({ behavior: 'smooth' });
  document.getElementById('nome').focus({ preventScroll: true });
});

const formContato = document.getElementById('formContato');
const alertaSucesso = document.getElementById('alertaSucesso');

formContato.addEventListener('submit', (event) => {
  event.preventDefault();

  formContato.reset();
  alertaSucesso.classList.remove('hidden');
  alertaSucesso.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

formContato.addEventListener('input', () => alertaSucesso.classList.add('hidden'));
