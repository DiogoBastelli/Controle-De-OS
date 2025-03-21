document.addEventListener('DOMContentLoaded', function () {
    carregarProduto();

    const btnFecharFormulario = document.getElementById('btnFecharFormulario');
  
    const formulario = document.getElementById('cadastroProduto');
    const btncadastrarProduto = document.getElementById('cadastrarProduto');
    const inputTipo = document.getElementById('inputTipo');
    const inputModelo = document.getElementById('inputModelo');
    const TodosProduto = document.getElementById('TodosProdutos');
    const telaPesquisaProduto = document.getElementById('TelaPesquisaProduto')
    
    const modelosPorTipo = {
        microondas: ['MDA30', 'MDA40', 'MDA50'],
        geladeira: ['BRM50', 'BRM60', 'BRM80'],
        purificador: ['PFL100', 'PFL200'],
        bebedouro: ['CPB30', 'CPB40', 'CPB50']
    };

    //Icone pesquisar produto
    const iconePesquisarProduto = document.getElementById('pesquisarProduto');
    if (iconePesquisarProduto) {
        iconePesquisarProduto.addEventListener('click', function (event) {
           
            const idPesquisaProduto = document.getElementById('inputIdProduto').value
            pesquisarProduto(idPesquisaProduto);

            if(idPesquisaProduto === ''){
                alert('Insira o nº de serie do Produto ')
                return
            }

            const produtoEncontrado = true; 
            if (produtoEncontrado) {
                telaPesquisaProduto.style.display = 'block';
                TodosProduto.style.display = 'none';
            } else {
                alert("Produto não encontrado!");
            }
        });
    } 

    function pesquisarProduto(idPesquisaProduto) {
    fetch(`http://localhost:3000/api/produto/${idPesquisaProduto}`) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao adicionar produto');
            }
            return response.json();
        })
        .then(produtos => {
            console.log("Produto retornado da API:", produtos); 
            const produto = produtos[0];
        
            const tabelaResultadoPesquisa = document.getElementById('resultPesquisaProduto');
            if (!tabelaResultadoPesquisa) {
                console.error("Tabela 'resultPesquisa' não encontrada.");
                return;
            }

            const novaLinhaPesquisa = document.createElement('tr');
            novaLinhaPesquisa.innerHTML = `
                <td colspan="4">
                    <div class="shadow rounded-4 mb-2 mt-2 border border-black p-4 letras d-flex align-items-center">
                        <div class="me-5"> 
                            <span class="ms-3">${produto.id}</span>
                            <span class="ms-5">${produto.tipo}</span>
                            <span class="ms-5">${produto.modelo}</span>
                            <span class="ms-5">${produto.NumSerie}</span>
                        </div>
                    </div>
                </td>
            `;
            tabelaResultadoPesquisa.appendChild(novaLinhaPesquisa);
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao carregar os dados do produto.');
        });
    }

    //funcao para mudar o combo box do modelo conforme o tipo selecionado
    atualizarModelos(inputTipo.value);  
    
    function atualizarModelos(tipoSelecionado) {
        // Limpar modelos anteriores
        inputModelo.innerHTML = '<option value="" disabled selected>Selecione o modelo</option>';

        // Preencher os modelos com base no tipo selecionado
        if (modelosPorTipo[tipoSelecionado]) {
            modelosPorTipo[tipoSelecionado].forEach(modelo => {
                const option = document.createElement('option');
                option.value = modelo;
                option.textContent = modelo;
                inputModelo.appendChild(option);
            });
        }
    }

    // Atualizar o combo box de modelo ao mudar o tipo
    inputTipo.addEventListener('change', function () {
        atualizarModelos(inputTipo.value);
    });

    //botao para fazer aparecer o formulario de cadastro do produto
    const buttonAparecerFormularioDeCadastro = document.getElementById('iconeAparecerFormCadastro');
    if (buttonAparecerFormularioDeCadastro && formulario) {
        buttonAparecerFormularioDeCadastro.addEventListener('click', function () {
            // Exibir o formulário
            formulario.style.display = 'block';
            TodosProduto.style.display = 'none'
            telaPesquisaProduto.style.display = 'none'

        });
    }

    // Evento para fechar o formulário
    if (btnFecharFormulario && formulario) {
        btnFecharFormulario.addEventListener('click', function (event) {
            event.stopPropagation(); 
            formulario.style.display = 'none'; 
            TodosProduto.style.display = 'block'
        });
    }

    // Botão 'cadastrarProduto'
    if (btncadastrarProduto) {
        btncadastrarProduto.addEventListener('click', function (event) {
            event.preventDefault(); // Evita o comportamento padrão do botão]

            const tipo = document.getElementById('inputTipo').value;
            const modelo = document.getElementById('inputModelo').value;
            const NumSerie = document.getElementById('inputNumSerie').value;

            fetch('http://localhost:3000/api/produto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tipo, modelo, NumSerie })
            })
            .then(response => {
                console.log('Status da resposta:', response.status);
                if (!response.ok) throw new Error('Erro na resposta da rede');
                return response.json();
            })
            .then(data => { 
                console.log('Sucesso:', data);
                alert('Produto cadastrado com sucesso!');
                document.getElementById('cadastroProduto').reset();
                TodosProduto.style.display = 'block'
                formulario.style.display = 'none';
                carregarProduto();
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao cadastrar o produto.');
            });            
        });
    }

    function carregarProduto() {
        fetch('http://localhost:3000/api/produto')
        .then(response => {
            if (!response.ok) throw new Error('Erro ao buscar produtos');
            return response.json();
        })
        .then(produtos => {
            const tabelaprodutos = document.getElementById('produto-list');
            if (!tabelaprodutos) {
                console.error("Tabela 'produto-list' não encontrada.");
                return;
            }
            tabelaprodutos.innerHTML = '';

            produtos.forEach(produto => {
                const novaLinha = document.createElement('tr');
                novaLinha.innerHTML = `
                    <td colspan="4">
                    <div class="shadow rounded-4 mb-2 mt-2 border border-black p-4 letras d-flex align-items-center">
                        <div class="me-5"> 
                            <span class="ms-3">${produto.id}</span>
                            <span class="ms-5">${produto.tipo}</span>
                            <span class="ms-5">${produto.modelo}</span>
                            <span class="ms-5">${produto.NumSerie}</span>
                        </div>
                    </div>
                </td>
                `;
                tabelaprodutos.appendChild(novaLinha);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao carregar a lista de produtos.');
        });
    }

    //botao para aparecer a tela de pesquisa de produto
    const btnAparecerTelaPesquisaProduto = document.getElementById('btnAparecerTelaPesquisa')
    if(btnAparecerTelaPesquisaProduto){
        btnAparecerTelaPesquisaProduto.addEventListener('click' , function(event){
            TodosProduto.style.display = 'none'
            telaPesquisaProduto.style.display = 'block'
            formulario.style.display = 'none';
        })
    }
});