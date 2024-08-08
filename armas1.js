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
    // Executa as buscas de forma paralela
    const [
      bandagensLimpasResults,
      acoIgneoResults,
      arcoDemoniacoResults,
      arcoMisticoResults,
      bastaoAberracaoResults,
      espadaCromadaResults,
      espadaVeterana,
      gladioDaNobreza,
      guardaChuvaAntiquado,
      katarPetaPurpura,
    ] = await Promise.all([
      fetchData('Bandagens Limpas', 110000),
      fetchData('Aço Ígneo', 110000),
      fetchData('Arco Demoniaco', 220000),
      fetchData('Arco Místico', 110000),
      fetchData('Bastão da Aberração', 445000),
      fetchData('Espada Cromada de duas mãos', 110000),
      fetchData('Espada Veterana', 55000),
      fetchData('Gládio da Nobreza', 445000),
      fetchData('Guarda-Chuva Antiquado', 110000),
      fetchData('Katar da Pétala Purpura', 110000),
    ]);

    console.log('Bandagens Limpas Results:', bandagensLimpasResults);
    console.log('Aço Ígneo Results:', acoIgneoResults);
    console.log('Arco Demoniaco Results:', arcoDemoniacoResults);
    console.log('Arco Místico Results:', arcoMisticoResults);
    console.log('Bastão da Aberração Results:', bastaoAberracaoResults);
    console.log('Espada Cromada de duas mãos Results:', espadaCromadaResults);
    console.log('Espada Veterana Results:', espadaVeterana);
    console.log('Gládio da Nobreza Results:', gladioDaNobreza);
    console.log('Guarda-Chuva Antiquado Results:', guardaChuvaAntiquado);
    console.log('Katar da Pétala Purpura Results:', katarPetaPurpura);
  } catch (error) {
    console.error('Error:', error);
  }
})();
