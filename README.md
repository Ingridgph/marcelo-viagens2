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
│   ├── main.css            → Reset, base, estrutura, botões e responsividade global
│   ├── nav.css             → Header e navegação
│   ├── hero.css            → Hero / seção inicial
│   ├── servicos.css        → Serviços e carrossel de cards
│   ├── galeria.css         → Galeria / carrossel de fotos
│   ├── informacoes.css     → Seção "Informações" (fundo creme e cards)
│   ├── contato.css         → Seção de contato e formulário de orçamento
│   └── footer.css          → Rodapé (contatos, WhatsApp e Instagram)
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
| `--ink` | `#17222d` | Cor principal do texto |
| `--muted` | `#687581` | Textos secundários e legendas |
| `--cream` | `#f6f2eb` | Fundo de seções alternadas |
| `--paper` | `#fbfaf7` | Fundo principal da página |
| `--line` | `#e5e8e7` | Bordas e divisores |
| `--amber` | `#fdbf01` | Botões primários e destaques (amarelo da logo) |
| `--amber-deep` | `#946e00` | Hover dos botões e números |
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

Salve as imagens na pasta `assets/images/` e referencie no HTML. O site usa **AVIF + WebP** com fallback e `srcset` para servir a versão mais leve:

```html
<picture>
  <source
    type="image/avif"
    srcset="assets/images/foto-800.avif 800w, assets/images/foto-1280.avif 1280w"
    sizes="(max-width: 767px) 92vw, 640px"
  />
  <img
    src="assets/images/foto-1280.webp"
    srcset="assets/images/foto-800.webp 800w, assets/images/foto-1280.webp 1280w"
    sizes="(max-width: 767px) 92vw, 640px"
    alt="Descrição da foto"
    width="1280"
    height="960"
    loading="lazy"
    decoding="async"
  />
</picture>
```

**Formatos recomendados:** `.avif` (principal) e `.webp` (fallback)
**Tamanhos sugeridos:** 800px para o celular e 1280px para o desktop, comprimidos para web

---

## Como manter os estilos e scripts

### CSS

- Edite `css/variables.css` para ajustar cores, fontes ou espaçamentos globais.
- Edite o arquivo da seção correspondente (ex.: `css/hero.css`, `css/galeria.css`).
- `css/main.css` concentra reset, estrutura, botões e responsividade global.
- A ordem dos `<link>` no HTML importa: mantenha `variables.css` e `main.css` primeiro e os componentes na ordem das seções.
- Cada arquivo tem um comentário indicando a seção, por exemplo:

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
- [x] Seção de Contato com formulário de orçamento que abre o WhatsApp
- [x] Footer com contatos (telefone, WhatsApp e Instagram) e copyright dinâmico
- [x] Menu mobile responsivo
- [x] Formulário administrativo (`pages/formulario.html`)
- [ ] Animações de entrada nas seções (scroll reveal)
- [ ] Lightbox para galeria de fotos
- [ ] Seção de depoimentos de clientes
- [x] Integração do link WhatsApp com número real

---

## Observações

> Contatos já publicados: WhatsApp/telefone (63) 98499-4859 (constante `WHATSAPP_NUMBER` em `js/script.js`) e Instagram [@norteclassturismo](https://www.instagram.com/norteclassturismo/).

> As imagens do site usam AVIF/WebP otimizados. Originais fora do site ficam em `_source/` (ignorada pelo Git).

> **Imagens em `assets/images/`:** cada foto do hero e da galeria tem variantes `-400`, `-640` e `-960` (AVIF + WebP) usadas em `srcset`. Ao trocar uma foto, gere novamente as variantes nos mesmos tamanhos e atualize os nomes no `index.html`; não aponte o HTML para o arquivo original (ele é grande e não é responsivo).

---

*Desenvolvido com HTML5, CSS3 e JavaScript puro.*

