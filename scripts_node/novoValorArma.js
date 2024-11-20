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

// 2100000 = 600 moedas
// 1050000 = 300 moedas
// 700000 = 200 moedas
// 560000 = 160 moedas
// 525000 = 150 moedas
// 420000 = 120 moedas
// 365000 = 100 moedas
// 310000 = 84 moedas
// 280000 = 80 moedas
// 175000 = 50 moedas
// 140000 = 40 moedas
// 70000 = 20 moedas
// 52500 = 15 moedas
// 35000 = 10 moedas

(async () => {
  try {
    const acoIgneoResults = await fetchData('Aço Ígneo', 70000);
    console.log('Aço Ígneo Results (min 70k):', acoIgneoResults);
    
    const adagaDoPerseguidor = await fetchData('Adaga do Perseguidor', 140000);
    console.log('Adaga do Perseguidor Results (min 140k):', adagaDoPerseguidor);
    
    const arcoDeCaça = await fetchData('Arco de Caça Ilusional', 700000);
    console.log('Arco de Caça Ilusional Results (min 700k):', arcoDeCaça);
    
    const arcoDemoniacoResults = await fetchData('Arco Demoniaco', 140000);
    console.log('Arco Demoniaco Results (min 140k):', arcoDemoniacoResults);
    
    const arcoGigante = await fetchData('Arco Gigante', 280000);
    console.log('Arco Gigante Results (min 280k):', arcoGigante);
    
    const arcoMisticoResults = await fetchData('Arco Mistico', 70000);
    console.log('Arco Místico Results (min 70k):', arcoMisticoResults);
    
    const balistaIlusional = await fetchData('Balista Ilusional', 700000);
    console.log('Balista Ilusional Results (min 700k):', balistaIlusional);
    
    const bandagensLimpasResults = await fetchData('Bandagens Limpas', 70000);
    console.log('Bandagens Limpas Results (min 70k):', bandagensLimpasResults);
    
    const bandagensLimpasIluResults = await fetchData('Bandagens Limpas Ilu', 700000);
    console.log('Bandagens Limpas Ilu Results (min 700k):', bandagensLimpasIluResults);
    
    const bastaoAberracaoResults = await fetchData('Bastão da Aberração', 280000);
    console.log('Bastão da Aberração Results (min 280k):', bastaoAberracaoResults);
    
    const bazerald = await fetchData('Bazerald Ilu', 700000);
    console.log('Bazerald Ilu Results (min 700k):', bazerald);
    
    const brilhoDouradoIlusional = await fetchData('Brilho Dourado Ilusional', 2100000);
    console.log('Brilho Dourado Ilusional Results (min 2.1M):', brilhoDouradoIlusional);
    
    const espadaCromadaResults = await fetchData('Espada Cromada de duas mãos', 70000);
    console.log('Espada Cromada de duas mãos Results (min 70k):', espadaCromadaResults);
    
    const espadaVeteranaResults = await fetchData('Espada Veterana', 35000);
    console.log('Espada Veterana Results (min 35k):', espadaVeteranaResults);
    
    const gladioDaNobrezaResults = await fetchData('Gládio da Nobreza', 280000);
    console.log('Gládio da Nobreza Results (min 280k):', gladioDaNobrezaResults);
    
    const guardaChuvaAntiquadoResults = await fetchData('Guarda-Chuva Antiquado', 70000);
    console.log('Guarda-Chuva Antiquado Results (min 70k):', guardaChuvaAntiquadoResults);
    
    const katarPetaPurpuraResults = await fetchData('Katar da Pétala Purpura', 70000);
    console.log('Katar da Pétala Purpura Results (min 70k):', katarPetaPurpuraResults);
    
    const laminaDosCeus = await fetchData('Lâmina dos Céus', 525000);
    console.log('Lâmina dos Céus Results (min 525k):', laminaDosCeus);
    
    const laminaGemeaAzulResults = await fetchData('Lâmina Gêmea Azul', 280000);
    console.log('Lâmina Gêmea Azul Results (min 280k):', laminaGemeaAzulResults);
    
    const laminaGemeaVermelhaResults = await fetchData('Lâmina Gêmea Vermelha', 280000);
    console.log('Lâmina Gêmea Vermelha Results (min 280k):', laminaGemeaVermelhaResults);
    
    const lancagiganteResults = await fetchData('Lança Gigante', 280000);
    console.log('Lança Gigante Results (min 280k):', lancagiganteResults);
    
    const luvaDeComboIlusional = await fetchData('Luva de Combo Ilusional', 700000);
    console.log('Luva de Combo Ilusional Results (min 700k):', luvaDeComboIlusional);
    
    const manjubaResults = await fetchData('Manjuba', 70000);
    console.log('Manjuba Results (min 70k):', manjubaResults);
    
    const marteloVeteranoResults = await fetchData('Martelo Veterano', 70000);
    console.log('Martelo Veterano Results (min 70k):', marteloVeteranoResults);
    
    const microfoneFloralIguResults = await fetchData('Microfone Floral de Igu', 70000);
    console.log('Microfone Floral de Igu Results (min 70k):', microfoneFloralIguResults);
    
    const pilares = await fetchData('Pilares', 140000);
    console.log('Pilares Results (min 140k):', pilares);
    
    const rosaLabaredaResults = await fetchData('Rosa Labareda', 70000);
    console.log('Rosa Labareda Results (min 70k):', rosaLabaredaResults);
    
    const sabreSinoiteResults = await fetchData('Sabre Sinoite', 70000);
    console.log('Sabre Sinoite Results (min 70k):', sabreSinoiteResults);
    
    const shurikenDaNevasca = await fetchData('Shuriken da Nevasca', 700000);
    console.log('Shuriken da Nevasca Results (min 700k):', shurikenDaNevasca);
    
    const tabulaIlusional = await fetchData('Tábula Ilusional Ilusional', 700000);
    console.log('Tábula Ilusional Results (min 700k):', tabulaIlusional);
    
    const taeGooLyeonIlusional = await fetchData('Tae Goo Lyeon Ilusional', 700000);
    console.log('Tae Goo Lyeon Ilusional Results (min 700k):', taeGooLyeonIlusional);
    
    const tentaculoAfiadoResults = await fetchData('Tentáculo Afiado', 35000);
    console.log('Tentáculo Afiado Results (min 35k):', tentaculoAfiadoResults);
    
    const ukuleleNovoOzResults = await fetchData('Ukulele do Novo Oz', 70000);
    console.log('Ukulele do Novo Oz Results (min 70k):', ukuleleNovoOzResults);
    
    const varaSagradaResults = await fetchData('Vara Sagrada', 70000);
    console.log('Vara Sagrada Results (min 70k):', varaSagradaResults);
  } catch (error) {
    console.error('Error:', error);
  }
})();