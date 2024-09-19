const puppeteer = require('puppeteer');

const fetchData = async (itemName, priceLimit) => {
  const browser = await puppeteer.launch({ headless: false }); // Mude para true se não precisar ver o navegador
  const page = await browser.newPage();

  await page.goto('https://www.ragnatales.com.br/market');

  await page.waitForSelector('input[type="text"]');
  await page.type('input[type="text"]', itemName);

  // Aguardar 3 segundos após digitar o nome do item
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Clicar no botão de busca
  await page.click('.flex.items-center.justify-center.gap-2');

  // Aguardar 3 segundos para que os resultados carreguem
  await new Promise(resolve => setTimeout(resolve, 3000));

  const results = await page.evaluate((itemName, priceLimit) => {
    const rows = document.querySelectorAll('tbody > tr');
    console.log(`Encontrado ${rows.length} resultados na busca para: ${itemName}`); // Verificar quantas linhas foram encontradas

    return Array.from(rows).map(row => {
      const columns = row.querySelectorAll('td');

      if (columns.length === 0) {
        console.warn('Nenhuma coluna encontrada nesta linha. Pulando para a próxima.');
        return null;
      }

      const priceText = columns[2]?.innerText.trim(); // Verificar se o elemento existe antes de acessar
      if (!priceText) {
        console.warn('Preço não encontrado para uma linha. Pulando para a próxima.');
        return null;
      }

      // Remover pontos e substituir vírgulas por pontos para conversão
      const price = parseFloat(priceText.replace(/\./g, '').replace(',', '.'));

      return {
        item: columns[0]?.innerText.trim() || 'N/A', // Verificar se o elemento existe antes de acessar
        quantity: columns[1]?.innerText.trim() || 'N/A', // Verificar se o elemento existe antes de acessar
        price: priceText,
        store: columns[3]?.innerText.trim() || 'N/A' // Verificar se o elemento existe antes de acessar
      };
    }).filter(result => result && result.item.includes(itemName))
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
    const armaduraDaNobreza = await fetchData('Armadura da Nobreza', 220000);
    console.log('Armadura da Nobreza:', armaduraDaNobreza);
    
    const anelDeBradium = await fetchData('Anel de Bradium', 110000);
    console.log('Anel de Bradium Results:', anelDeBradium);

    const anelNovoOz = await fetchData('Anel do Novo Oz', 220000);
    console.log('Anel do Novo Oz Results:', anelNovoOz);

    const anelSombrio = await fetchData('Anel Sombrio', 220000);
    console.log('Anel Sombrio Results:', anelSombrio);

    const batinaDoClero = await fetchData('Batina do Clero', 165000);
    console.log('Batina do Clero Results:', batinaDoClero);

    const bibliaExorcismo = await fetchData('Bíblia de Exorcismo', 110000);
    console.log('Bíblia de Exorcismo Results:', bibliaExorcismo);

    const botasDoClero = await fetchData('Botas do Clero', 55000);
    console.log('Botas do Clero Results:', botasDoClero);

    const botasGigantes = await fetchData('Botas Gigantes', 445000);
    console.log('Botas Gigantes Results:', botasGigantes);

    const braceleteFloralIgu = await fetchData('Bracelete Floral de Igu', 220000);
    console.log('Bracelete Floral de Igu Results:', braceleteFloralIgu);

    const braceleteMorp = await fetchData('Bracelete de Morpheus Ilusional', 220000);
    console.log('Bracelete de Morpheus Ilusional Results:', braceleteMorp);

    const brincoDeBradium = await fetchData('Brinco de Bradium', 110000);
    console.log('Brinco de Bradium Results:', brincoDeBradium);

    const chapeuGuardaReal = await fetchData('Chapéu da Guarda Real', 500000);
    console.log('Chapéu da Guarda Real Results:', chapeuGuardaReal);

    const chipQuebrado02 = await fetchData('Chip Quebrado 02', 110000);
    console.log('Chip Quebrado 02 Results:', chipQuebrado02);

    const colarDeBradium = await fetchData('Colar de Bradium', 110000);
    console.log('Colar de Bradium Results:', colarDeBradium);

    const coleteDragao = await fetchData('Colete do Dragão', 55000);
    console.log('Colete do Dragão Results:', coleteDragao);

    const egideDaNobreza = await fetchData('Égide da Nobreza', 430000);
    console.log('Égide da Nobreza Results:', egideDaNobreza);

    const escudoCeruleo = await fetchData('Escudo Cerúleo', 55000);
    console.log('Escudo Cerúleo Results:', escudoCeruleo);

    const escudoGigantes = await fetchData('Escudo Gigante', 445000);
    console.log('Escudo Gigante Results:', escudoGigantes);

    const lampiaoDasTrevas = await fetchData('Lampião das Trevas', 110000);
    console.log('Lampião das Trevas Results:', lampiaoDasTrevas);

    const luvaDeBradium = await fetchData('Luva de Bradium', 110000);
    console.log('Luva de Bradium Results:', luvaDeBradium);

    const manteauChamasNaghtSieger = await fetchData('Manteau de Chamas de Naght Sieger', 220000);
    console.log('Manteau de Chamas de Naght Sieger Results:', manteauChamasNaghtSieger);

    const manteauDoClero = await fetchData('Manteau do Clero', 220000);
    console.log('Manteau do Clero Results:', manteauDoClero);

    const manteauDragao = await fetchData('Manteau do Dragão', 55000);
    console.log('Manteau do Dragão Results:', manteauDragao);

    const mantoCeruleo = await fetchData('Manto Cerúleo', 55000);
    console.log('Manto Cerúleo Results:', mantoCeruleo);

    const mushika = await fetchData('Mushika', 110000);
    console.log('Mushika Results:', mushika);

    const rosarioPreto = await fetchData('Rosário Preto', 110000);
    console.log('Rosário Preto Results:', rosarioPreto);

    const saltosRainhaScaraba = await fetchData('Saltos da Rainha Scaraba', 110000);
    console.log('Saltos da Rainha Scaraba Results:', saltosRainhaScaraba);

    const sapatosCeruleos = await fetchData('Sapatos Cerúleos', 55000);
    console.log('Sapatos Cerúleos Results:', sapatosCeruleos);
  } catch (error) {
    console.error('Error:', error);
  }
})();
