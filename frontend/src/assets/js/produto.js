document.addEventListener('DOMContentLoaded', function () {
    const btnFecharFormulario = document.getElementById('btnFecharFormulario');
    const buttonAparecerFormularioDeCadastro = document.getElementById('btnMudarEstiloFormCadastro');
    const formulario = document.getElementById('cadastroProdutoF');
    const btncadastrarProduto = document.getElementById('cadastrarProduto');

    carregarProduto();

    //pesquisar produto
    const btnPesquisarProduto = document.getElementById('pesquisarProduto');
    if (btnPesquisarProduto) {
        btnPesquisarProduto.addEventListener('click', function (event) {
            event.preventDefault(); // Evita o comportamento padrão do botão]
            const idPesquisaProduto = document.getElementById('inputIdProduto').value
            console.log(idPesquisaProduto)
            pesquisarProduto(idPesquisaProduto);
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
        
            const tabelaResultadoPesquisa = document.getElementById('resultPesquisa');
            if (!tabelaResultadoPesquisa) {
                console.error("Tabela 'resultPesquisa' não encontrada.");
                return;
            }

            const novaLinhaPesquisa = document.createElement('tr');
            novaLinhaPesquisa.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.tipo}</td>
                <td>${produto.modelo}</td>
                <td>${produto.NumSerie}</td>
                <td><button class="btn btn-danger btn-sm remover-item">Remover</button></td>
            `;
            tabelaResultadoPesquisa.appendChild(novaLinhaPesquisa);
        
            const botaoRemover = novaLinhaPesquisa.querySelector('.remover-item');
            botaoRemover.addEventListener('click', function () {
                removerItem(botaoRemover);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao carregar os dados do produto.');
        });
    }

    //botao para fazer aparecer o formulario de cadastro do produto
    if (buttonAparecerFormularioDeCadastro && formulario) {
        buttonAparecerFormularioDeCadastro.addEventListener('click', function () {
            // Exibir o formulário
            formulario.style.display = 'block';
        });
    }

    // Evento para fechar o formulário
    if (btnFecharFormulario && formulario) {
        btnFecharFormulario.addEventListener('click', function (event) {
            event.stopPropagation(); 
            formulario.style.display = 'none'; 
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
                document.getElementById('cadastroProdutoF').reset();
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
                    <td>${produto.id}</td>
                    <td>${produto.tipo}</td>
                    <td>${produto.modelo}</td>
                    <td>${produto.NumSerie}</td>
                    <td><button class="btn btn-info" onclick="preencherFormulario(${produto.id})">Selecionar</button></td>
                `;
                tabelaprodutos.appendChild(novaLinha);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao carregar a lista de produtos.');
        });
    }

});