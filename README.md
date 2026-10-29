# Site modelo para hamburguerias

Site completo (React + Vite) com abertura em vídeo, cardápio dinâmico, carrinho e **pedido finalizado pelo WhatsApp**.
Cada hamburgueria é um projeto independente: você troca os dados, as imagens e o vídeo e publica.

> Os produtos, preços e textos que vêm no projeto são **exemplos**. Substitua tudo antes de publicar.
> O site não processa pagamentos e não recebe pedidos sozinho: o cliente final envia a mensagem pronta dentro do WhatsApp.

## Requisitos

- [Node.js](https://nodejs.org) 20 ou mais novo (versão LTS). Para conferir, no PowerShell: `node -v`
- [Git](https://git-scm.com/download/win) (para enviar ao GitHub)

## Rodar no Windows (PowerShell)

```powershell
cd caminho\da\pasta\site-hamburgueria
npm install          # instala as dependências (só na primeira vez)
npm run dev          # abre em http://localhost:5173
```

Testar a versão de produção:

```powershell
npm run build        # gera a pasta dist
npm run preview      # serve o build em http://localhost:4173
```

## Onde editar

| O que | Arquivo |
|---|---|
| Nome, slogan, descrição, logo, cores, WhatsApp, Instagram, endereço, horários, entrega, textos | `src/config/store.js` |
| Categorias (criar, apagar, renomear, reordenar) | `src/data/categories.js` |
| Produtos (nome, descrição, preço, foto, categoria, disponibilidade, tamanhos, destaque) | `src/data/products.js` |
| Grupos de adicionais (queijo extra, bacon, etc.) | `src/data/addons.js` |
| **Vídeo de abertura** | `public/assets/video/hero-burger.mp4` (substitua mantendo o nome) |
| Capa do vídeo (aparece se o vídeo não tocar) | `public/assets/images/hero-poster.jpg` |
| Imagem principal | `public/assets/images/hero-burger.jpg` |
| Logo | `public/assets/images/logo.png` e `logo: "/assets/images/logo.png"` no `store.js` |
| Fotos dos produtos | `public/assets/images/products/` e `image: "/assets/images/products/nome.jpg"` no `products.js` |
| Ícone da aba do navegador | `public/favicon.svg` |

Regras:

- Campo vazio desliga o recurso. Sem WhatsApp, o botão de finalizar fica desabilitado com aviso. Sem Instagram ou endereço, os botões e seções somem. Nenhum link falso é criado.
- WhatsApp: somente números, com país e DDD. Exemplo: `5575999999999`.
- Instagram: só o usuário, sem `@` (ex.: `minhahamburgueria`).
- Produto `available: false` aparece desabilitado e não vai ao carrinho.
- Produto com `sizes` usa o preço do tamanho escolhido. Sem `sizes`, usa `price`.
- Um produto sem `image` usa a imagem "Foto em breve".

## Como testar o WhatsApp

1. Em `src/config/store.js`, coloque um número que você controla em `whatsapp`.
2. `npm run dev`, escolha produtos, abra o carrinho, **Continuar**, preencha e toque em **Enviar pedido pelo WhatsApp**.
3. O WhatsApp abre com a mensagem pronta. Confira itens, adicionais, observações, endereço, taxa e total.
4. Lembre: o pedido só chega à loja quando a mensagem é enviada dentro do WhatsApp.

## Enviar ao GitHub

1. Crie uma conta e um repositório vazio em <https://github.com/new> (um repositório por cliente; pode ser privado). Não marque README nem .gitignore.
2. No PowerShell, dentro da pasta do projeto:

```powershell
git init
git add .
git commit -m "Primeira versão"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
git push -u origin main
```

O `.gitignore` já exclui `node_modules` e `dist`.

## Publicar na Vercel

1. Entre em <https://vercel.com> e conecte sua conta do GitHub.
2. **Add New > Project**, escolha o repositório e clique em **Import**.
3. A Vercel reconhece Vite. Confirme: Build Command `npm run build`, Output Directory `dist`. Clique em **Deploy**.
4. A cada `git push` na branch `main`, o site é atualizado sozinho.
5. Domínio próprio: **Settings > Domains** do projeto.

Observações:

- Nenhum serviço pago ou chave de API é necessário para o site funcionar. Serviços externos usados: Google Fonts (opcional, veja `index.html`) e Google Maps (links e mapa incorporado opcional).
- Confira os termos do plano da Vercel antes de usar em um cliente comercial. O plano gratuito (Hobby) é voltado a uso pessoal e não comercial; para cobrar de clientes, verifique qual plano se aplica.
- Para sites de clientes, uma alternativa é cada cliente criar a própria conta e importar o repositório.

## Checklist para cada nova hamburgueria

- Nome comercial, slogan e descrição (e texto "Sobre" com os diferenciais reais)
- Logotipo (PNG com fundo transparente) e cor da marca
- WhatsApp comercial com DDD
- Instagram
- Endereço completo (rua, número, bairro, cidade, UF) e se deseja mapa incorporado
- Dias e horários de funcionamento
- Entrega, retirada ou ambos; taxa, entrega grátis a partir de quanto, prazo estimado, área atendida, pedido mínimo
- Formas de pagamento aceitas na entrega/retirada
- Cardápio completo: categorias, produtos, descrições, preços, tamanhos, adicionais, itens indisponíveis, quais ficam em destaque
- Fotos dos produtos (4:3, boa luz) e foto principal
- Vídeo de abertura (MP4) ou autorização para usar o de exemplo
- E-mail de contato (opcional)

## Estrutura

```
public/assets/video/        vídeo de abertura
public/assets/images/       logo, imagem principal, capa do vídeo, products/
src/config/store.js         dados da loja
src/data/                   categorias, produtos, adicionais
src/components/             interface (um componente por responsabilidade)
src/hooks/                  carrinho, diálogos, movimento reduzido
src/utils/                  moeda, preços, mensagem do WhatsApp, Google Maps, links
src/styles/                 variáveis, base e componentes
vite.config.js              preenche título e descrição do index.html com o store.js
vercel.json                 cache e cabeçalhos de segurança
```

## Acessibilidade e desempenho

- Navegação por teclado, foco visível, rótulos nos campos, diálogos com foco preso e fechamento com Esc.
- Com "reduzir movimento" ativado no sistema, a abertura não toca sozinha (mostra a capa com botão de play) e as animações são desligadas.
- O vídeo é carregado com `preload="metadata"`, sem som, e as imagens do cardápio usam carregamento sob demanda.
