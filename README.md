# Marcelo Viagens

Site institucional para divulgação dos serviços de fretamento, turismo regional e viagens em grupo com saída de Palmas - TO.

---

## Objetivo

Apresentar os serviços da Marcelo Viagens ao público, exibir fotos da van e dos destinos, contar a história da empresa e facilitar o contato dos clientes pelo WhatsApp — tudo em um site moderno, responsivo e fácil de manter.

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica das páginas |
| CSS3 | Estilização, variáveis, responsividade |
| JavaScript puro | Interações, menu mobile, utilidades |
| Google Fonts | Tipografia (Manrope + DM Sans) |

Sem frameworks, bibliotecas externas, backend ou banco de dados.

---

## Estrutura de pastas

```
marcelo-viagens/
│
├── index.html              → Página principal (todas as seções)
│
├── pages/
│   └── formulario.html     → Formulário de contato administrativo
│
├── css/
│   ├── variables.css       → Variáveis globais (cores, fontes, espaçamentos)
│   └── style.css           → Estilos de todas as seções
│
├── js/
│   └── script.js           → Interações e funcionalidades
│
├── assets/
│   ├── images/             → Imagens do site (van, destinos, equipe)
│   └── icons/              → Ícones e favicon
│
└── README.md               → Este arquivo
```

---

## Identidade visual

### Paleta de cores

| Variável | Hex | Uso |
|---|---|---|
| `--navy` | `#101a27` | Fundo escuro, textos em destaque |
| `--navy-deep` | `#0a111b` | Fundo do header e footer |
| `--blue` | `#1b3045` | Elementos secundários escuros |
| `--ink` | `#17222d` | Cor principal do texto |
| `--muted` | `#687581` | Textos secundários e legendas |
| `--cream` | `#f6f2eb` | Fundo de seções alternadas |
| `--paper` | `#fbfaf7` | Fundo principal da página |
| `--line` | `#e5e8e7` | Bordas e divisores |
| `--amber` | `#e6b75f` | Botões primários e destaques |
| `--amber-deep` | `#a97928` | Hover dos botões e números |
| `--white` | `#ffffff` | Fundo de cards e textos claros |

### Tipografia

| Família | Uso | Pesos |
|---|---|---|
| **Manrope** | Títulos e logotipo | 400, 500, 600, 700, 800 |
| **DM Sans** | Textos, descrições e botões | 400, 500, 600 |

Carregadas via Google Fonts com `preconnect` para melhor performance.

---

## Como executar localmente

Não há dependências ou build steps. Basta abrir o arquivo:

```
index.html → clique duplo ou arraste para o navegador
```

Para uma experiência completa (links, caminhos relativos, scripts), recomenda-se usar um servidor local:

**Com VS Code + extensão Live Server:**
1. Instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Clique com o botão direito em `index.html`
3. Selecione **"Open with Live Server"**

**Com Python (alternativa):**
```bash
python -m http.server 5500
```
Acesse `http://localhost:5500` no navegador.

---

## Como adicionar ou substituir imagens

Salve as imagens na pasta `assets/images/` e referencie no HTML assim:

```html
<!-- Hero -->
<img src="assets/images/van-principal.jpg" alt="Van da Marcelo Viagens" />

<!-- Galeria -->
<img src="assets/images/destino-jalapao.jpg" alt="Jalapão, TO" />

<!-- Sobre -->
<img src="assets/images/sobre.jpg" alt="Marcelo, proprietário" />
```

**Formatos recomendados:** `.jpg` ou `.webp`  
**Tamanho sugerido:** até 1200px de largura, comprimidas para web

---

## Como manter os estilos e scripts

### CSS

- Edite **somente** `css/variables.css` para ajustar cores, fontes ou espaçamentos globais.
- Edite `css/style.css` para modificar estilos de seções específicas.
- Cada seção está separada por um comentário, por exemplo:

```css
/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
```

- Use sempre variáveis CSS (`var(--navy)`, `var(--space-md)`) em vez de valores fixos.

### JavaScript

- Todo o código JavaScript fica em `js/script.js`.
- O arquivo está organizado com comentários por funcionalidade.
- Evite adicionar scripts inline no HTML.

---

## Funcionalidades previstas

- [x] Estrutura base e identidade visual
- [x] Header fixo com navegação e botão WhatsApp
- [x] Seção Hero com chamada e imagem
- [x] Seção de Serviços com cards
- [x] Galeria de fotos
- [x] Seção Sobre a empresa
- [x] Seção de Contato com link para WhatsApp
- [x] Footer com logotipo e copyright dinâmico
- [x] Menu mobile responsivo
- [x] Formulário administrativo (`pages/formulario.html`)
- [ ] Animações de entrada nas seções (scroll reveal)
- [ ] Lightbox para galeria de fotos
- [ ] Seção de depoimentos de clientes
- [ ] Integração do link WhatsApp com número real

---

## Observações

> O número de WhatsApp no `index.html` e no `formulario.html` deve ser substituído pelo número real do Marcelo antes da publicação do site.

> Os placeholders de imagens na galeria e no hero devem ser substituídos por fotos reais da van e dos destinos.

---

*Desenvolvido com HTML5, CSS3 e JavaScript puro.*

