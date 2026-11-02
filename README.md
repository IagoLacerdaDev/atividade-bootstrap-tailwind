# Atividade Bootstrap e Tailwind CSS

Página de portfólio responsiva baseada no currículo de **Iago César Lacerda Santos** (Analista de QA),
feita duas vezes: uma com **Bootstrap 5** (solução principal) e outra com **Tailwind CSS** (desafio extra).

Engenharia de Software · UCSAL · Prof. Elton Figueiredo da Silva

## Estrutura

```
Atividade Bootstrap/
├── index.html            # página inicial com links para as duas versões
├── bootstrap/            # solução principal (Bootstrap 5.3.3 via CDN)
│   ├── index.html
│   ├── style.css         # só a cor da marca e o fundo dos slides
│   └── script.js         # preenche o modal e valida o formulário
└── tailwind/             # desafio extra (Tailwind CSS 4.1 via CDN), independente da outra
    ├── index.html
    └── script.js         # menu, carrossel, modal e formulário em JS nativo
```

## Como rodar

Não há build. No GitHub Codespaces (ou localmente), suba um servidor estático na pasta:

```bash
python3 -m http.server 8000
```

O Codespaces abre a porta 8000 automaticamente. Também funciona com a extensão **Live Server** do VS Code
ou abrindo o `index.html` direto no navegador.

## Requisitos atendidos

| Requisito | Onde está |
|---|---|
| HTML5 semântico | `header` (navbar + apresentação), `main` com 6 `section`, `footer` |
| Responsividade | Mobile, tablet e desktop (breakpoints `md`/`lg` nas duas versões) |
| Acessibilidade | Link "pular para o conteúdo", `aria-label`/`aria-expanded`/`aria-current`, `caption` e `scope` na tabela, labels em todos os campos |
| 1. Navbar | Logo "IL", 5 itens, menu hambúrguer no mobile |
| 2. Carrossel | 3 slides (destaques da carreira), anterior/próximo, dots, transição e autoplay |
| 3. Cards | 6 cards de competências, grid de 1 → 2 → 3 colunas |
| 4. Tabela | 5 linhas de experiência, cabeçalho, zebrada, scroll horizontal no mobile |
| 5. Formulário | 6 campos (texto, e-mail, select, textarea, checkbox), labels, validação HTML5 |
| 6. Modal | Abre pelo botão "Detalhes" da tabela ou "Ver projeto do TCC", overlay, fechar/confirmar, fecha clicando fora |

## Tailwind para quem já sabe Bootstrap

A diferença principal está no **tipo de classe**:

- **Bootstrap** te dá **componentes prontos**: `.card`, `.btn`, `.navbar`. Você escreve `class="btn btn-primary"` e o
  visual já vem decidido pelo framework, junto com o JavaScript (collapse, carousel, modal).
- **Tailwind** te dá **utilitários**: cada classe faz uma coisa só (`px-4` = padding horizontal, `rounded-xl` = borda
  arredondada, `bg-brand-700` = cor de fundo). Você monta o componente juntando classes, direto no HTML. É o que se chama
  **utility-first**. Ele **não traz JavaScript**: menu, carrossel e modal precisam ser programados.

### Como ler uma classe do Tailwind

```
md:hover:bg-brand-800
│  │     │  └─ valor (cor brand, tom 800)
│  │     └──── propriedade (background)
│  └────────── estado (só no hover)
└───────────── breakpoint (só a partir de 768px)
```

O Tailwind é **mobile-first**: classe sem prefixo vale para todas as telas; `md:` vale a partir de 768px,
`lg:` a partir de 1024px. Exemplo do projeto: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`.

### Tabela de equivalências usadas no projeto

| O que faz | Bootstrap | Tailwind |
|---|---|---|
| Container centralizado | `container` | `mx-auto max-w-6xl px-4` |
| Grid de 3 colunas responsivo | `row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4` | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` |
| Esconder no mobile | `d-none d-md-block` | `hidden md:block` |
| Espaçamento | `py-5`, `mb-3` | `py-16`, `mb-3` (escala própria: 1 = 0,25rem) |
| Texto secundário | `text-secondary` | `text-slate-500` |
| Botão | `btn btn-brand` | `rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white hover:bg-brand-800` |
| Tabela zebrada | `table table-striped` | `[&>tr:nth-child(odd)]:bg-slate-50` no `tbody` |
| Scroll da tabela no mobile | `table-responsive` | `overflow-x-auto` |
| Só para leitor de tela | `visually-hidden` | `sr-only` |
| Cor personalizada | variáveis CSS `--bs-btn-bg` em `style.css` | `@theme { --color-brand-700: ... }` gera `bg-brand-700`, `text-brand-700`... |

### Componentes: o que muda em cada versão

| Componente | Bootstrap | Tailwind |
|---|---|---|
| Navbar | `navbar-expand-lg` + `data-bs-toggle="collapse"` (JS do Bootstrap) | `hidden md:block` + JS próprio que alterna `hidden` e `aria-expanded` |
| Carrossel | `carousel slide` + `data-bs-ride` | trilho `flex` com `transition-transform duration-700`; JS move com `translateX` e cria os dots |
| Cards | `.card`, `.card-body` | `rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200` |
| Tabela | `table table-striped table-hover` | utilitários em `th`/`td` + variantes arbitrárias para zebrar |
| Formulário | `needs-validation` + `was-validated` (JS adiciona a classe) | validação nativa + variante `user-invalid:` e `peer-user-invalid:` (estilo de erro **sem JS**) |
| Modal | `.modal` + `data-bs-toggle="modal"` | elemento nativo `<dialog>` com `showModal()`; overlay com `backdrop:bg-slate-900/60` |

### Prós e contras (para o vídeo)

- **Bootstrap**: mais rápido para começar, componentes interativos prontos, HTML mais curto. Em troca, os sites ficam
  com "cara de Bootstrap" e personalizar exige sobrescrever CSS.
- **Tailwind**: controle total do visual sem sair do HTML, sem CSS próprio, e no build de produção só as classes usadas
  vão para o arquivo final. Em troca, o HTML fica com muitas classes e todo comportamento precisa de JS.

> Observação: o CDN do Tailwind (`@tailwindcss/browser`) gera o CSS no navegador e é indicado para estudo/protótipos.
> Em produção o recomendado é o build com a CLI do Tailwind ou PostCSS/Vite, que gera um CSS pequeno só com as classes usadas.
