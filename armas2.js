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
      laminaGemeaAzul,
      laminaGemeaVermelha,
      lancagigante,
      manjuba,
      marteloVeterano,
      microfoneFloralIgu,
      rosaLabareda,
      sabreSinoite,
      tentaculoAfiado,
      ukuleleNovoOz,
      varaSagrada
    ] = await Promise.all([
      fetchData('Lâmina Gêmea Azul', 445000),
      fetchData('Lâmina Gêmea Vermelha', 445000),
      fetchData('Lança Gigante', 445000),
      fetchData('Manjuba', 110000),
      fetchData('Martelo Veterano', 110000),
      fetchData('Microfone Floral de Igu', 110000),
      fetchData('Rosa Labareda', 110000),
      fetchData('Sabre Sinoite', 110000),
      fetchData('Tentáculo Afiado', 110000),
      fetchData('Ukulele do Novo Oz', 110000),
      fetchData('Vara Sagrada', 110000)
    ]);

    console.log('Lâmina Gêmea Azul Results:', laminaGemeaAzul);
    console.log('Lâmina Gêmea Vermelha Results:', laminaGemeaVermelha);
    console.log('Lança Gigante Results:', lancagigante);
    console.log('Manjuba Results:', manjuba);
    console.log('Martelo Veterano Results:', marteloVeterano);
    console.log('Microfone Floral de Igu Results:', microfoneFloralIgu);
    console.log('Rosa Labareda Results:', rosaLabareda);
    console.log('Sabre Sinoite Results:', sabreSinoite);
    console.log('Tentáculo Afiado Results:', tentaculoAfiado);
    console.log('Ukulele do Novo Oz Results:', ukuleleNovoOz);
    console.log('Vara Sagrada Results:', varaSagrada);
  } catch (error) {
    console.error('Error:', error);
  }
})();
