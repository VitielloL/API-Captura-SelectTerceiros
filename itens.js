const puppeteer = require('puppeteer');

const fetchData = async (itemName, priceLimit) => {
  const browser = await puppeteer.launch({ headless: false }); // Mude para true se não precisar ver o navegador
  const page = await browser.newPage();

  await page.goto('https://www.ragnatales.com.br/market');

  await page.waitForSelector('input[type="text"]');
  await page.type('input[type="text"]', itemName);

  await new Promise(resolve => setTimeout(resolve, 3000));

  await page.click('.flex.items-center.justify-center.gap-2');

  await new Promise(resolve => setTimeout(resolve, 3000));

  const results = await page.evaluate((itemName, priceLimit) => {
    const rows = document.querySelectorAll('tbody > tr');
    return Array.from(rows).map(row => {
      const columns = row.querySelectorAll('td');
      const priceText = columns[2].innerText.trim();
      
      // Remover pontos e substituir vírgulas por pontos para conversão
      const price = parseFloat(priceText.replace(/\./g, '').replace(',', '.'));

      return {
        item: columns[0].innerText.trim(),
        quantity: columns[1].innerText.trim(),
        price: priceText,
        store: columns[3].innerText.trim()
      };
    }).filter(result => result.item.includes(itemName))
      .filter(result => {
        const priceNumber = parseFloat(result.price.replace(/\./g, '').replace(',', '.'));
        return priceNumber < priceLimit;
      })
      .map(result => ({
        ...result,
        store: result.store.match(/@market \d+\/\d+/)[0] // Extrai apenas @market e a coordenada
      }));
  }, itemName, priceLimit);

  await browser.close();

  return results;
};

(async () => {
  try {
    const areiaResults = await fetchData('Areia Estrelar de Bruxa', 1100);
    console.log('Areia Estrelar de Bruxa Results:', areiaResults);

    const elunium = await fetchData('Elunium', 658);
    console.log('Elunium:', elunium);

    const ervaAzulResults = await fetchData('Erva Azul', 1000);
    console.log('Erva Azul Results:', ervaAzulResults);

    const ervaBrancaResults = await fetchData('Erva Branca', 900);
    console.log('Erva Branca Results:', ervaBrancaResults);

    const mastelaResults = await fetchData('Mastela', 1450);
    console.log('Mastela Results:', mastelaResults);

    const mithrilResults = await fetchData('Minério de Mythril', 50000);
    console.log('Minério de Mythril Results:', mithrilResults);

    const tabelaResults = await fetchData('Tabela de Pesquisa Manchada', 250);
    console.log('Tabela de Pesquisa Manchada Results:', tabelaResults);

    const trevoMarcaPaginasResults = await fetchData('Trevo Marca Páginas', 1860);
    console.log('Trevo Marca Páginas Results:', trevoMarcaPaginasResults);

  } catch (error) {
    console.error('Error:', error);
  }
})();
