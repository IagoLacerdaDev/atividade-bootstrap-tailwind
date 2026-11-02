// Conteúdo do modal de detalhes, indexado pelo atributo data-experiencia dos botões
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

// ---------- Modal: preenche o conteúdo de acordo com o botão que o abriu ----------
const modalDetalhes = document.getElementById('modalDetalhes');
let irParaContato = false;

modalDetalhes.addEventListener('show.bs.modal', (event) => {
  const chave = event.relatedTarget?.dataset.experiencia;
  const dados = experiencias[chave];
  if (!dados) return;

  document.getElementById('modalTitulo').textContent = dados.titulo;
  document.getElementById('modalSubtitulo').textContent = dados.subtitulo;

  const lista = document.getElementById('modalItens');
  lista.replaceChildren(...dados.itens.map((texto) => {
    const item = document.createElement('li');
    item.className = 'mb-2';
    item.textContent = texto;
    return item;
  }));
});

document.getElementById('modalContato').addEventListener('click', () => {
  irParaContato = true;
  bootstrap.Modal.getInstance(modalDetalhes).hide();
});

// Só rola até o formulário depois que o modal terminou de fechar
modalDetalhes.addEventListener('hidden.bs.modal', () => {
  if (!irParaContato) return;
  irParaContato = false;
  document.getElementById('contato').scrollIntoView({ behavior: 'smooth' });
  // setTimeout: o Bootstrap devolve o foco ao botão que abriu o modal logo após este evento
  setTimeout(() => document.getElementById('nome').focus({ preventScroll: true }));
});

// ---------- Navbar: fecha o menu mobile ao clicar em um link ----------
const menuPrincipal = document.getElementById('menuPrincipal');
menuPrincipal.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (menuPrincipal.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(menuPrincipal).hide();
    }
  });
});

// ---------- Formulário: validação HTML5 com os estilos do Bootstrap ----------
const formContato = document.getElementById('formContato');
const alertaSucesso = document.getElementById('alertaSucesso');

formContato.addEventListener('submit', (event) => {
  event.preventDefault();
  alertaSucesso.classList.add('d-none');

  if (!formContato.checkValidity()) {
    formContato.classList.add('was-validated');
    formContato.querySelector(':invalid')?.focus();
    return;
  }

  // Sem back-end: apenas simula o envio
  formContato.reset();
  formContato.classList.remove('was-validated');
  alertaSucesso.classList.remove('d-none');
  alertaSucesso.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
