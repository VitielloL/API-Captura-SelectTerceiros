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
    const [   
        ervaAzulResults,
        ervaBrancaResults,
        trevoMarcaPaginasResults,
        mastela,
        tabela,
    ] = await Promise.all([
        fetchData('Erva Azul', 1200),
        fetchData('Erva Branca', 800),
        fetchData('Trevo Marca Páginas', 1860),
        fetchData('Mastela', 1450),
        fetchData('Tabela de Pesquisa Manchada', 250),
    ]);
    console.log('Erva Azul Results:', ervaAzulResults);
    console.log('Erva Branca Results:', ervaBrancaResults);
    console.log('Trevo Marca Páginas Results:', trevoMarcaPaginasResults);
    console.log('Mastela Results:', mastela);
    console.log('abela de Pesquisa Manchada:', tabela);
  } catch (error) {
    console.error('Error:', error);
  }
})();
