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
    const acoIgneoResults = await fetchData('Aço Ígneo', 70000, 35000);
    console.log('Aço Ígneo Results:', acoIgneoResults);
    
    const adagaDoPerseguidor = await fetchData('Adaga do Perseguidor', 140000, 70000);
    console.log('Adaga do Perseguidor:', adagaDoPerseguidor);
    
    const arcoDeCaça = await fetchData('Arco de Caça Ilusional', 700000, 350000);
    console.log('Arco de Caça Ilusional Results:', arcoDeCaça);
    
    const arcoDemoniacoResults = await fetchData('Arco Demoniaco', 140000, 70000);
    console.log('Arco Demoniaco Results:', arcoDemoniacoResults);
    
    const arcoGigante = await fetchData('Arco Gigante', 280000, 140000);
    console.log('Arco Gigante Results:', arcoGigante);
    
    const arcoMisticoResults = await fetchData('Arco Mistico', 70000, 35000);
    console.log('Arco Místico Results:', arcoMisticoResults);
    
    const balistaIlusional = await fetchData('Balista Ilusional', 700000, 350000);
    console.log('Balista Ilusional Results:', balistaIlusional);
    
    const bandagensLimpasResults = await fetchData('Bandagens Limpas', 70000, 35000);
    console.log('Bandagens Limpas Results:', bandagensLimpasResults);
    
    const bandagensLimpasIluResults = await fetchData('Bandagens Limpas Ilu', 700000, 350000);
    console.log('Bandagens Limpas Ilu Results:', bandagensLimpasIluResults);
    
    const bastaoAberracaoResults = await fetchData('Bastão da Aberração', 280000, 140000);
    console.log('Bastão da Aberração Results:', bastaoAberracaoResults);
    
    const bazerald = await fetchData('Bazerald Ilu', 700000, 350000);
    console.log('Bazerald Ilu Results:', bazerald);
    
    const brilhoDouradoIlusional = await fetchData('Brilho Dourado Ilusional', 2100000, 1050000);
    console.log('Brilho Dourado Ilusional Results:', brilhoDouradoIlusional);
    
    const espadaCromadaResults = await fetchData('Espada Cromada de duas mãos', 70000, 35000);
    console.log('Espada Cromada de duas mãos Results:', espadaCromadaResults);
    
    const espadaVeteranaResults = await fetchData('Espada Veterana', 35000, 17500);
    console.log('Espada Veterana Results:', espadaVeteranaResults);
    
    const gladioDaNobrezaResults = await fetchData('Gládio da Nobreza', 280000, 140000);
    console.log('Gládio da Nobreza Results:', gladioDaNobrezaResults);
    
    const guardaChuvaAntiquadoResults = await fetchData('Guarda-Chuva Antiquado', 70000, 35000);
    console.log('Guarda-Chuva Antiquado Results:', guardaChuvaAntiquadoResults);
    
    const katarPetaPurpuraResults = await fetchData('Katar da Pétala Purpura', 70000, 35000);
    console.log('Katar da Pétala Purpura Results:', katarPetaPurpuraResults);
    
    const laminaDosCeus = await fetchData('Lâmina dos Céus', 525000, 262500);
    console.log('Lâmina dos Céus Results:', laminaDosCeus);
    
    const laminaGemeaAzulResults = await fetchData('Lâmina Gêmea Azul', 280000, 140000);
    console.log('Lâmina Gêmea Azul Results:', laminaGemeaAzulResults);
    
    const laminaGemeaVermelhaResults = await fetchData('Lâmina Gêmea Vermelha', 280000, 140000);
    console.log('Lâmina Gêmea Vermelha Results:', laminaGemeaVermelhaResults);
    
    const lancagiganteResults = await fetchData('Lança Gigante', 280000, 140000);
    console.log('Lança Gigante Results:', lancagiganteResults);
    
    const luvaDeComboIlusional = await fetchData('Luva de Combo Ilusional', 700000, 350000);
    console.log('Luva de Combo Ilusional Results:', luvaDeComboIlusional);
    
    const manjubaResults = await fetchData('Manjuba', 70000, 35000);
    console.log('Manjuba Results:', manjubaResults);
    
    const marteloVeteranoResults = await fetchData('Martelo Veterano', 70000, 35000);
    console.log('Martelo Veterano Results:', marteloVeteranoResults);
    
    const microfoneFloralIguResults = await fetchData('Microfone Floral de Igu', 70000, 35000);
    console.log('Microfone Floral de Igu Results:', microfoneFloralIguResults);
    
    const pilares = await fetchData('Pilares', 140000, 70000);
    console.log('Pilares:', pilares);
    
    const rosaLabaredaResults = await fetchData('Rosa Labareda', 70000, 35000);
    console.log('Rosa Labareda Results:', rosaLabaredaResults);
    
    const sabreSinoiteResults = await fetchData('Sabre Sinoite', 70000, 35000);
    console.log('Sabre Sinoite Results:', sabreSinoiteResults);
    
    const shurikenDaNevasca = await fetchData('Shuriken da Nevasca', 700000, 350000);
    console.log('Shuriken da Nevasca Results:', shurikenDaNevasca);
    
    const tabulaIlusional = await fetchData('Tábula Ilusional Ilusional', 700000, 350000);
    console.log('Tábula Ilusional Results:', tabulaIlusional);
    
    const taeGooLyeonIlusional = await fetchData('Tae Goo Lyeon Ilusional', 700000, 350000);
    console.log('Tae Goo Lyeon Ilusional Results:', taeGooLyeonIlusional);
    
    const tentaculoAfiadoResults = await fetchData('Tentáculo Afiado', 35000, 17500);
    console.log('Tentáculo Afiado Results:', tentaculoAfiadoResults);
    
    const ukuleleNovoOzResults = await fetchData('Ukulele do Novo Oz', 70000, 35000);
    console.log('Ukulele do Novo Oz Results:', ukuleleNovoOzResults);
    
    const varaSagradaResults = await fetchData('Vara Sagrada', 70000, 35000);
    console.log('Vara Sagrada Results:', varaSagradaResults);
  } catch (error) {
    console.error('Error:', error);
  }
})();
