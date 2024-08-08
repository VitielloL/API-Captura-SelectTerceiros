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
    const bandagensLimpasResults = await fetchData('Bandagens Limpas', 110000);
    console.log('Bandagens Limpas Results:', bandagensLimpasResults);

    const acoIgneoResults = await fetchData('Aço Ígneo', 110000);
    console.log('Aço Ígneo Results:', acoIgneoResults);

    const arcoDemoniacoResults = await fetchData('Arco Demoniaco', 220000);
    console.log('Arco Demoniaco Results:', arcoDemoniacoResults);

    const arcoMisticoResults = await fetchData('Arco Místico', 110000);
    console.log('Arco Místico Results:', arcoMisticoResults);

    const bastaoAberracaoResults = await fetchData('Bastão da Aberração', 445000);
    console.log('Bastão da Aberração Results:', bastaoAberracaoResults);

    const espadaCromadaResults = await fetchData('Espada Cromada de duas mãos', 110000);
    console.log('Espada Cromada de duas mãos Results:', espadaCromadaResults);

    const espadaVeteranaResults = await fetchData('Espada Veterana', 55000);
    console.log('Espada Veterana Results:', espadaVeteranaResults);

    const gladioDaNobrezaResults = await fetchData('Gládio da Nobreza', 445000);
    console.log('Gládio da Nobreza Results:', gladioDaNobrezaResults);

    const guardaChuvaAntiquadoResults = await fetchData('Guarda-Chuva Antiquado', 110000);
    console.log('Guarda-Chuva Antiquado Results:', guardaChuvaAntiquadoResults);

    const katarPetaPurpuraResults = await fetchData('Katar da Pétala Purpura', 110000);
    console.log('Katar da Pétala Purpura Results:', katarPetaPurpuraResults);

    const laminaGemeaAzulResults = await fetchData('Lâmina Gêmea Azul', 445000);
    console.log('Lâmina Gêmea Azul Results:', laminaGemeaAzulResults);

    const laminaGemeaVermelhaResults = await fetchData('Lâmina Gêmea Vermelha', 445000);
    console.log('Lâmina Gêmea Vermelha Results:', laminaGemeaVermelhaResults);

    const lancagiganteResults = await fetchData('Lança Gigante', 445000);
    console.log('Lança Gigante Results:', lancagiganteResults);

    const manjubaResults = await fetchData('Manjuba', 110000);
    console.log('Manjuba Results:', manjubaResults);

    const marteloVeteranoResults = await fetchData('Martelo Veterano', 110000);
    console.log('Martelo Veterano Results:', marteloVeteranoResults);

    const microfoneFloralIguResults = await fetchData('Microfone Floral de Igu', 110000);
    console.log('Microfone Floral de Igu Results:', microfoneFloralIguResults);

    const rosaLabaredaResults = await fetchData('Rosa Labareda', 110000);
    console.log('Rosa Labareda Results:', rosaLabaredaResults);

    const sabreSinoiteResults = await fetchData('Sabre Sinoite', 110000);
    console.log('Sabre Sinoite Results:', sabreSinoiteResults);

    const tentaculoAfiadoResults = await fetchData('Tentáculo Afiado', 55000);
    console.log('Tentáculo Afiado Results:', tentaculoAfiadoResults);

    const ukuleleNovoOzResults = await fetchData('Ukulele do Novo Oz', 110000);
    console.log('Ukulele do Novo Oz Results:', ukuleleNovoOzResults);

    const varaSagradaResults = await fetchData('Vara Sagrada', 110000);
    console.log('Vara Sagrada Results:', varaSagradaResults);
  } catch (error) {
    console.error('Error:', error);
  }
})();
