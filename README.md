# API-Captura-SelectTerceiros

Este projeto utiliza o [Puppeteer](https://github.com/puppeteer/puppeteer) para automatizar a extração de dados do mercado de itens do jogo **Ragnarok Online** no site [Ragnatales](https://www.ragnatales.com.br/market). A aplicação pesquisa itens específicos e retorna os resultados que atendem a um limite de preço definido.

## Como Funciona

O script abre o navegador, navega até a página de mercado, pesquisa os itens definidos, e filtra os resultados com base no nome do item e um limite de preço especificado. O resultado inclui informações sobre o item, quantidade, preço e a localização da loja.

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Puppeteer](https://github.com/puppeteer/puppeteer)

## Requisitos

- Node.js versão 14 ou superior
- NPM (Node Package Manager)

## Instalação

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/ragnarok-market-scraper.git
```

2. Navegue até o diretório do projeto:

```bash
cd api-captura-selectterceiro
```

3. Instale as dependências necessárias:

```bash
npm install
```

## Uso
1. Edite o script para incluir os itens que deseja pesquisar e os respectivos limites de preço. Estes podem ser encontrados no bloco const [laminaGemeaAzul, laminaGemeaVermelha, ...].

2. Execute o script:
```bash
node index.js
```

3. O script irá abrir o navegador, realizar as pesquisas e exibir os resultados no console.

## Customização
**Modo Headless:** Por padrão, o navegador abre para que você possa ver as ações. Para rodar em segundo plano (modo headless), altere a linha:
```bash
const browser = await puppeteer.launch({ headless: false });
```

para:
```bash
const browser = await puppeteer.launch({ headless: true });
```

**Tempo de Espera:** Caso precise ajustar o tempo de espera entre as interações, você pode alterar os valores nos comandos setTimeout:

```bash
await new Promise(resolve => setTimeout(resolve, 3000));
```
**Itens e Limites de Preço:** Para adicionar novos itens ou modificar os existentes, basta incluir/alterar as chamadas da função fetchData:

```bash
fetchData('Nome do Item', LimiteDePreço)
```
