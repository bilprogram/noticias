// Função para fazer uma solicitação GET à API de notícias do IBGE
function getNoticiasIBGE() {
    const apiUrl = 'http://servicodados.ibge.gov.br/api/v3/noticias/?qtd=10&page=1';
  
    // Configurar headers CORS
    const headers = new Headers({
      'Access-Control-Allow-Origin': '*',
      // Outros cabeçalhos CORS, se necessário
    });
  
    // Opções da solicitação
    const requestOptions = {
      method: 'GET',
      headers: headers,
    };
  
    // Use a função fetch para fazer a solicitação GET
    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Não foi possível obter as notícias.');
        }
        return response.json();
      })
      .then((data) => {
        // Chame a função para listar as notícias após obter a resposta da API
        listarNoticiasIBGE(data);
      })
      .catch((error) => {
        console.error('Erro ao obter notícias:', error);
      });
  }
  
  // Função para listar as notícias com base na resposta da API do IBGE
  function listarNoticiasIBGE(noticias) {
    const items = noticias.items;
  
    // Limpar qualquer conteúdo anterior
    const noticiasContainer = document.getElementById('news');
    noticiasContainer.innerHTML = '';
  
    // Iterar sobre as notícias e criar elementos para exibição
    items.forEach((item) => {
      const titulo = item.titulo;
      const introducao = item.introducao;
      const dataPublicacao = item.data_publicacao;
      const link = item.link;
      const imagemIntro = JSON.parse(item.imagens).image_intro;
  
      // Criar elementos HTML para exibição
      const divCard = document.createElement('div');
      divCard.classList.add('card', 'my-3');
  
      const divRow = document.createElement('div');
      divRow.classList.add('row', 'g-0');
  
      const divColImg = document.createElement('div');
      divColImg.classList.add('col-md-4');
  
      const img = document.createElement('img');
      img.src = "https://agenciadenoticias.ibge.gov.br/"+imagemIntro;
      img.classList.add('img-fluid', 'rounded-start');
      img.alt = titulo;
  
      const divColContent = document.createElement('div');
      divColContent.classList.add('col-md-8');
  
      const divCardBody = document.createElement('div');
      divCardBody.classList.add('card-body');
  
      const h5CardTitle = document.createElement('h5');
      h5CardTitle.classList.add('card-title');
      h5CardTitle.textContent = titulo;
  
      const pCardText = document.createElement('p');
      pCardText.classList.add('card-text');
      pCardText.textContent = introducao;
  
      // Anexar elementos ao contêiner de notícias
      divCardBody.appendChild(h5CardTitle);
      divCardBody.appendChild(pCardText);
      divColContent.appendChild(divCardBody);
      divColImg.appendChild(img);
      divRow.appendChild(divColImg);
      divRow.appendChild(divColContent);
      divCard.appendChild(divRow);
      noticiasContainer.appendChild(divCard);
    });
  }
  
  // Chame a função para obter as notícias do IBGE
  getNoticiasIBGE();
  