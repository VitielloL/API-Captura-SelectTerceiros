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

// 2100000 = 600 moedas
// 1400000 = 400 moedas
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
    const armaduraDaNobreza = await fetchData('Armadura da Nobreza', 140000); 
    console.log('Armadura da Nobreza Results (min 140k):', armaduraDaNobreza);

    const armaduraDeGoibneIlusional = await fetchData('Armadura de Goibne Ilusional', 2100000); 
    console.log('Armadura de Goibne Ilusional Results (min 2.1M):', armaduraDeGoibneIlusional);

    const anelDeAmetista = await fetchData('Anel de Ametista', 140000);
    console.log('Anel de Ametista Results (min 140k):', anelDeAmetista);

    const anelDeBradium = await fetchData('Anel de Bradium', 70000);
    console.log('Anel de Bradium Results (min 70k):', anelDeBradium);

    const anelDeGoibneIlusional = await fetchData('Anel de Goibne Ilusional', 1050000);
    console.log('Anel de Goibne Ilusional Results (min 70k):', anelDeGoibneIlusional);

    const anelDeMorpheusIlusional = await fetchData('Anel de Morpheus Ilusional', 140000);
    console.log('Anel de Morpheus Ilusional Results (min 140k):', anelDeMorpheusIlusional);

    const anelNovoOz = await fetchData('Anel do Novo Oz', 140000);
    console.log('Anel do Novo Oz Results (min 140k):', anelNovoOz);

    const anelIlusional = await fetchData('Anel Ilusional', 200000);
    console.log('Anel Ilusional Results (min 200k):', anelIlusional);

    const anelSombrio = await fetchData('Anel Sombrio', 140000);
    console.log('Anel Sombrio Results (min 140k):', anelSombrio);

    const batinaDoClero = await fetchData('Batina do Clero', 110000);
    console.log('Batina do Clero Results (min 110k):', batinaDoClero);

    const bibliaExorcismo = await fetchData('Bíblia de Exorcismo', 70000);
    console.log('Bíblia de Exorcismo Results (min 70k):', bibliaExorcismo);

    const botasDaAberracao = await fetchData('Botas da Aberração', 365000);
    console.log('Botas da Aberração Results (min 365k):', botasDaAberracao);

    const botasDoCarrasco = await fetchData('Botas do Carrasco', 525000);
    console.log('Botas do Carrasco Results (min 525k):', botasDoCarrasco);

    const botasDoClero = await fetchData('Botas do Clero', 140000);
    console.log('Botas do Clero Results (min 140k):', botasDoClero);

    const botasGigantes = await fetchData('Botas Gigantes', 280000);
    console.log('Botas Gigantes Results (min 280k):', botasGigantes);

    const botasTemporaisAgi = await fetchData('Botas Temporais Agi', 1400000);
    console.log('Botas Temporais Agi Results (min 1.4M):', botasTemporaisAgi);

    const botasTemporaisDex = await fetchData('Botas Temporais Dex', 1400000);
    console.log('Botas Temporais Dex Results (min 1.4M):', botasTemporaisDex);

    const botasTemporaisFor = await fetchData('Botas Temporais For', 1400000);
    console.log('Botas Temporais For Results (min 1.4M):', botasTemporaisFor);
    
    const botasTemporaisInt = await fetchData('Botas Temporais Int', 1400000);
    console.log('Botas Temporais Int Results (min 1.4M):', botasTemporaisInt);

    const botasTemporaisSor = await fetchData('Botas Temporais Sor', 1400000);
    console.log('Botas Temporais Sor Results (min 1.4M):', botasTemporaisSor);

    const botasTemporaisVit = await fetchData('Botas Temporais Vit', 1400000);
    console.log('Botas Temporais Vit Results (min 1.4M):', botasTemporaisVit);

    const botasVeteranas = await fetchData('Botas Vet', 525000);
    console.log('Botas Vet Results (min 525k):', botasVeteranas);

    const braceleteFloralIgu = await fetchData('Bracelete Floral de Igu', 140000);
    console.log('Bracelete Floral de Igu Results (min 140k):', braceleteFloralIgu);

    const braceleteMorp = await fetchData('Morpheus Ilusional', 140000);
    console.log('Bracelete de Morpheus Ilusional Results (min 140k):', braceleteMorp);

    const brincoDeBradium = await fetchData('Brinco de Bradium', 70000);
    console.log('Brinco de Bradium Results (min 70k):', brincoDeBradium);

    const brocheDaGanancia = await fetchData('Broche da Ganancia', 140000);
    console.log('Broche da Ganancia Results (min 140k):', brocheDaGanancia);

    const brocheDeBradium = await fetchData('Broche de Bradium', 70000);
    console.log('Broche de Bradium Results (min 70k):', brocheDeBradium);

    const capaHeroica = await fetchData('Capa Heroica', 1050000);
    console.log('Capa Heroica Results (min 1.05M):', capaHeroica);

    const capaDoCarrasco = await fetchData('Capa do Carrasco', 560000);
    console.log('Capa do Carrasco Results (min 560k):', capaDoCarrasco);

    const capaDoSobreviventeIlusional = await fetchData('Capa do Sobrevivente Ilusional', 420000);
    console.log('Capa do Sobrevivente Ilusional Results (min 420k):', capaDoSobreviventeIlusional);

    const chapeuGuardaReal = await fetchData('Chapéu da Guarda Real', 365000);
    console.log('Chapéu da Guarda Real Results (min 365k):', chapeuGuardaReal);

    const capuzDeMorpheusIlusional = await fetchData('Capuz de Morpheus Ilusional', 1050000);
    console.log('Capuz de Morpheus Ilusional Results (min 1.05M):', capuzDeMorpheusIlusional);

    const chipQuebrado01 = await fetchData('Chip Quebrado 01', 70000);
    console.log('Chip Quebrado 01 Results (min 70k):', chipQuebrado01);

    const chipQuebrado02 = await fetchData('Chip Quebrado 02', 70000);
    console.log('Chip Quebrado 02 Results (min 70k):', chipQuebrado02);

    const chipQuebrado03 = await fetchData('Chip Quebrado 03', 70000);
    console.log('Chip Quebrado 03 Results (min 70k):', chipQuebrado03);

    const chipDeDados = await fetchData('Chip de Dados', 525000);
    console.log('Chip de Dados Results (min 525k):', chipDeDados);

    const colarDeBradium = await fetchData('Colar de Bradium', 70000);
    console.log('Colar de Bradium Results (min 70k):', colarDeBradium);

    const coleteDragao = await fetchData('Colete do Dragão', 35000);
    console.log('Colete do Dragão Results (min 35k):', coleteDragao);

    const condensadorFisico = await fetchData('Condensador Fisico Oceânica', 365000);
    console.log('Condensador Fisico Results (min 365k):', condensadorFisico);

    const condensadorMental = await fetchData('Condensador Mental Oceânica', 365000);
    console.log('Condensador Mental Results (min 365k):', condensadorMental);

    const couracaAgua = await fetchData('Couraça da Submissão Oceânica', 175000);
    console.log('Couraça da Submissão Oceânica Results (min 175k):', couracaAgua);

    const elmoDeGoibne = await fetchData('Elmo de Goibne Ilusional', 2100000);
    console.log('Elmo de Goibne Ilusional Results (min 2.1M):', elmoDeGoibne);

    const elmogigante = await fetchData('Elmo Gigante', 280000);
    console.log('Elmo Gigante Results (min 280k):', elmogigante);
    
    const egideDaNobreza = await fetchData('Égide da Nobreza', 310000);
    console.log('Égide da Nobreza Results (min 310k):', egideDaNobreza);
    
    const escudoCeruleo = await fetchData('Escudo Cerúleo', 35000);
    console.log('Escudo Cerúleo Results (min 35k):', escudoCeruleo);
    
    const escudoGigantes = await fetchData('Escudo Gigante', 280000);
    console.log('Escudo Gigante Results (min 280k):', escudoGigantes);
    
    const grevasDeGoibneIlusionais = await fetchData('Grevas de Goibne Ilusionais', 1400000);
    console.log('Grevas de Goibne Ilusionais Results (min 1.4m):', grevasDeGoibneIlusionais);

    const kandura = await fetchData('Kandura', 52500);
    console.log('Kandura Results (min 52.5k):', kandura);
    
    const lampiaoDasTrevas = await fetchData('Lampião das Trevas', 70000);
    console.log('Lampião das Trevas Results (min 70k):', lampiaoDasTrevas);
    
    const luvaDeBradium = await fetchData('Luva de Bradium', 70000);
    console.log('Luva de Bradium Results (min 70k):', luvaDeBradium);
    
    const maçaIlusional = await fetchData('Maça Ilusional', 2100000);
    console.log('Maça Ilusional Results (min 2.1M):', maçaIlusional);
    
    const manteauChamasNaghtSieger = await fetchData('Manteau de Chamas de Naght Sieger', 140000);
    console.log('Manteau de Chamas de Naght Sieger Results (min 140k):', manteauChamasNaghtSieger);
    
    const manteauDoClero = await fetchData('Manteau do Clero', 140000);
    console.log('Manteau do Clero Results (min 140k):', manteauDoClero);
    
    const manteauDragao = await fetchData('Manteau do Dragão', 35000);
    console.log('Manteau do Dragão Results (min 35k):', manteauDragao);
    
    const mantoCeruleo = await fetchData('Manto Cerúleo', 35000);
    console.log('Manto Cerúleo Results (min 35k):', mantoCeruleo);
    
    const mascaraDoMergulho = await fetchData('Mascara De Mergulho', 70000);
    console.log('Mascara De Mergulho Results (min 70k):', mascaraDoMergulho);
    
    const mushika = await fetchData('Mushika', 70000);
    console.log('Mushika Results (min 70k):', mushika);
    
    const ombreirasDeGoibneIlusionais = await fetchData('Ombreira de Goibne Ilusionais', 700000);
    console.log('Ombreira de Goibne Ilusionais Results (min 700k):', ombreirasDeGoibneIlusionais);
    
    const peixeFresco = await fetchData('Peixe Fresco', 525000);
    console.log('Peixe Fresco Results (min 525k):', peixeFresco);

    const proteçãoDoGigante = await fetchData('Proteção do Gigante', 525000);
    console.log('Proteção do Gigante Results (min 525k):', proteçãoDoGigante);
    
    const rosarioPreto = await fetchData('Rosário Preto', 70000);
    console.log('Rosário Preto Results (min 70k):', rosarioPreto);
    
    const rosarioDaGuardaReal = await fetchData('Rosário da Guarda Real', 140000);
    console.log('Rosário da Guarda Real Results (min 140k):', rosarioDaGuardaReal);
    
    const saltosRainhaScaraba = await fetchData('Saltos da Rainha Scaraba', 70000);
    console.log('Saltos da Rainha Scaraba Results (min 70k):', saltosRainhaScaraba);
    
    const sapatosCeruleos = await fetchData('Sapatos Cerúleos', 35000);
    console.log('Sapatos Cerúleos Results (min 35k):', sapatosCeruleos);
    
    const spiritusSanctiIlusional = await fetchData('Spiritus Sancti Ilusional', 700000);
    console.log('Spiritus Sancti Ilusional Results (min 700k):', spiritusSanctiIlusional);
    
    const sobretudoDoMaestro = await fetchData('Sobretudo do Maestro', 700000);
    console.log('Sobretudo do Maestro Results (min 700k):', sobretudoDoMaestro);
    
    const vestesDeGhostring = await fetchData('Vestes de Ghostring', 700000);
    console.log('Vestes de Ghostring Results (min 700k):', vestesDeGhostring);

    const vestigiosDeOdin = await fetchData('Vestígio de Odin', 420000);
    console.log('Vestígio de Odin Results (min 420k):', vestigiosDeOdin);
    
    const veuDeMorpheus = await fetchData('Véu de Morpheus Ilusional', 140000);
    console.log('Véu de Morpheus Ilusional Results (min 140k):', veuDeMorpheus);
} catch (error) {
    console.error('Error:', error);
}
})();
