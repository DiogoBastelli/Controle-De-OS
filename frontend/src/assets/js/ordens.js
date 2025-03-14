document.addEventListener('DOMContentLoaded', function () {

    const formularioOs = document.getElementById('FormCadastroOS');
    const tabelaOs = document.getElementById('os-list');
    const TodasOs = document.getElementById('TodasOs')
    const status = 'AguardandoAprovacao';
    const telaPesquisaOs = document.getElementById('divPesquisaOs')
    const telaFiltroOs = document.getElementById('FiltroStatusOs')
    const campoInputOrcamento = document.getElementById('campoDoOrcamento')
    

    // clicando em cima da os ja cadastrada
    document.addEventListener('click', function (event) {
        let elemento = event.target.closest('.ordemServico'); 
        if (elemento) {
            const clienteOsId = elemento.querySelector('.os-Cpf').innerText.trim();
            const produtoOsId = elemento.querySelector('.os-numSerie').innerText.trim();
            const OsId = elemento.querySelector('.os-id').innerText.trim();
            alert('ID do cliente: ' + clienteOsId + ' ID Do Produto: ' + produtoOsId + 'ID da Os: ' + OsId);
            
            window.location.href = `detalhes.html?idCliente=${clienteOsId}&idProduto=${produtoOsId}&OsId=${OsId}`;

        }
    });

    // Botão para cadastrar uma nova OS
    const btnCadastrarOs = document.getElementById('cadastrarOs')
    if (btnCadastrarOs) {
        btnCadastrarOs.addEventListener('click', function (event) {
        event.preventDefault();

        const clienteCpf = document.getElementById('inputIdCliente').value;
        const ProdNumSerie = document.getElementById('inputIdProd').value;
        const defeito = document.getElementById('inputDefeitoProd').value;
        const dataHora = new Date();
        const dataFormatada = dataHora.toLocaleDateString(); 
        const horaFormatada = dataHora.toLocaleTimeString(); 

        console.log(`Data: ${dataFormatada}`);
        console.log(`Hora: ${horaFormatada}`);


        if (!clienteCpf || !ProdNumSerie || !defeito) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Chamada à API para cadastrar a OS
        fetch('http://localhost:3000/api/os', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ clienteCpf, ProdNumSerie, defeito  , dataFormatada , horaFormatada})
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw err; });
            }
            
        })
        .then(data => {
            console.log('Sucesso:', data);
            alert('OS cadastrada com sucesso!');

            // Limpa o formulário e atualiza a lista de OSs
            formularioOs.reset();
            formularioOs.style.display = 'none';
            TodasOs.style.display = 'block';

            carregarOs();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao cadastrar a OS.');
        });
    });
    }

    // Função para carregar todas as OSs ao carregar a página
    function carregarOs() {
        fetch('http://localhost:3000/api/os')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar OSs');
            }
            return response.json();
        })
        .then(oss => {
            tabelaOs.innerHTML = '';
            oss.forEach(os => {
                const novaLinha = document.createElement('tr');
                novaLinha.innerHTML = `
                    <td colspan="4">
                        <div class="shadow rounded-4 mb-2 mt-2 border border-black letras d-flex align-items-center">
                            <div class="ordemServico me-5 p-4">
                                <span class="ms-3 os-id">${os.id}</span>
                                <span class="ms-5">${os.clienteNome}</span>
                                <span class="ms-5">${os.clienteEndereco}</span>
                                <span class="ms-5">${os.produtoModelo}</span>
                                <span class="ms-5">${os.defeito}</span>
                                <span class="ms-5 status-text">${os.status}</span>
                                <span class="ms-5">${os.dataFormatada}</span>
                                <span class="ms-5 status-text">${os.horaFormatada}</span>
                                <span class="ms-5 status-text">${os.orcamento}</span>
                                <span style="display:none" class="ms-5 os-numSerie">${os.ProdutoNumSerie}</span>
                                <span style="display:none" class="ms-5 os-Cpf">${os.clienteCpf}</span>
                                
                            </div>

                            <div class="form-group col-3 ms-auto ms-3 p-4">
                                <select style="background-color: #0dcaf0;" class="form-select status-select" data-os-id="${os.id}">
                                    <option value="aguardando-orcamento" ${os.status === 'aguardando-orcamento' ? 'selected' : ''}>Aguardando Orçamento</option>
                                    <option value="aprovado" ${os.status === 'aprovado' ? 'selected' : ''}>Aprovado</option>
                                    <option value="nao-aprovado" ${os.status === 'nao-aprovado' ? 'selected' : ''}>Não Aprovado</option>
                                    <option value="aguardando-aprovacao" ${os.status === 'aguardando-aprovacao' ? 'selected' : ''}>Aguardando Aprovação</option>
                                    <option value="passado-orcamento" ${os.status === 'passado-orcamento' ? 'selected' : ''}>Passado Orcamento</option>
                                </select>
                            </div>
                        </div>
                    </td>
                `;
                tabelaOs.appendChild(novaLinha);

                const selectElement = novaLinha.querySelector('.status-select');

                // Função para aplicar a cor com base no status
                function aplicarCor(select, status) {
                    select.classList.remove('bg-success', 'bg-danger', 'bg-info', 'bg-warning');

                    if (status === 'aprovado') {
                        select.classList.add('bg-success');
                    } else if (status === 'nao-aprovado') {
                        select.classList.add('bg-danger');
                    } else if (status === 'aguardando-orcamento') {
                        select.classList.add('bg-info');
                    } else if (status === 'aguardando-aprovacao') {
                        select.classList.add('bg-warning');
                    }
                }

                aplicarCor(selectElement, os.status);

                // Evento para mudar o status
                selectElement.addEventListener('change', function() {
                    aplicarCor(this, this.value);
                    mudarStatus(this);
                });
            });
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao carregar a lista de OSs.');
        });
    }

    //funcao para mudar status da os
    function mudarStatus(select) {
        const osId = select.getAttribute("data-os-id");
        const status = select.value;
        
        console.log("Alterando OS ID:", osId, "para status:", status);
    
        const btnEnviarOrcamento = document.getElementById('btnEnviarOrcamento');
        if (btnEnviarOrcamento) {
            btnEnviarOrcamento.setAttribute('data-os-id', osId);  
        }
    
        fetch(`http://localhost:3000/api/os/${osId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar status da OS');
            }
            return response.json();
        })
        .then(data => {
            console.log("Status atualizado com sucesso:", data);
    
            const statusElement = select.closest('.shadow').querySelector('.ms-5:last-child');
            if (statusElement) {
                statusElement.textContent = status;
            }
            select.classList.remove('bg-success', 'bg-danger', 'bg-info', 'bg-warning');
            if (status === 'aprovado') {
                select.classList.add('bg-success');
            } else if (status === 'nao-aprovado') {
                select.classList.add('bg-danger');
            } else if (status === 'aguardando-orcamento') {
                select.classList.add('bg-info');
            } else if (status === 'aguardando-aprovacao') {
                select.classList.add('bg-warning');
            } else if (status === 'passado-orcamento') {
                campoInputOrcamento.style.display = 'block';
                select.classList.add('bg-warning');
            }
            carregarOs();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao atualizar o status da OS.');
        });
    }
    
    function pesquisarOs(idPesquisaOs) {
    fetch(`http://localhost:3000/api/os/${idPesquisaOs}`) 
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar OS');
        }
        return response.json();
    })
    .then(os => {
        console.log("OS retornada da API:", os); 
        const tabelaResultadoPesquisa = document.getElementById('resultPesquisa');
        if (!tabelaResultadoPesquisa) {
            console.error("Tabela 'resultPesquisa' não encontrada.");
            return;
        }

        const novaLinhaPesquisa = document.createElement('tr');
        novaLinhaPesquisa.innerHTML = `
         <td colspan="4">
            <div class="shadow rounded-4 mb-2 mt-2 border border-black p-4 letras d-flex align-items-center">
                <div class="me-5"> 
                    <span class="ms-3">${os.id}</span>
                        <span class="ms-5">${os.clienteNome}</span>
                        <span class="ms-5">${os.produtoModelo}</span>
                        <span class="ms-5">${os.ProdutoNumSerie}</span>
                        <span class="ms-5">${os.defeito}</span>
                        <span class="ms-5 status-text">${os.status}</span>
                        <span class="ms-5">${os.dataFormatada}</span>
                        <span class="ms-5 status-text">${os.horaFormatada}</span>
                </div>
            </div>
         </td>
        `;
        tabelaResultadoPesquisa.appendChild(novaLinhaPesquisa);

    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao carregar os dados da OS.');
    });
    }
  
    //icone de pesquisa
    const iconePesquisa = document.getElementById('iconePesquisarOs')
    if (iconePesquisa) {
        iconePesquisa.addEventListener('click', function(event) {
        const idPesquisaOs = document.getElementById('inputIdOs').value;
        console.log(idPesquisaOs);

        if(idPesquisaOs === ''){
            alert('Insira o ID da Ordem ')
            return
        }

        pesquisarOs(idPesquisaOs); 
        const osEncontrado = true; 

        if (osEncontrado) {
            telaPesquisaOs.style.display = 'block';
            TodasOs.style.display = 'none';
            formularioOs.style.display = 'none'
        } else {
            alert("os não encontrado!");
        }
    });
    }

    // icone para aparecer formulario
    const iconeAparecerForm = document.getElementById('aparecerFormCadastro')
    if (iconeAparecerForm){
    iconeAparecerForm.addEventListener('click' , function(event){
        TodasOs.style.display = 'none'
        formularioOs.style.display = 'block'
    })
    }
  
    //botao para fechar formulario de cadastro da OS
    const btnFecharForm = document.getElementById('btnFecharFormulario')
    if(btnFecharForm){
    btnFecharForm.addEventListener('click' , function(event){
    formularioOs.style.display = 'none'
    TodasOs.style.display = 'block'
    telaPesquisaOs.style.display = 'none'
    })
    }

    //Select Filtra OS por status
    document.getElementById('selectStatus').addEventListener('change', function () {
        const statusSelecionado = this.value;

        if (statusSelecionado === "todos") {
            TodasOs.style.display = 'block'
            formularioOs.style.display = 'none'
            telaFiltroOs.style.display = 'none'
            telaPesquisaOs.style.display = 'none'
            carregarOs();
            return;
        }

        console.log(statusSelecionado)
        pesquisarOsStatus(statusSelecionado);
        TodasOs.style.display = 'none'
        formularioOs.style.display = 'none'
        telaFiltroOs.style.display = 'block'
        telaPesquisaOs.style.display = 'none'
    });
    
    //funcao para pesquisar os pelo status
    function pesquisarOsStatus(status) {
        fetch(`http://localhost:3000/api/os/status/${status}`) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar OS');
            }
            return response.json();
        })
        .then(osArray => {  // Agora recebe um array de OS
            console.log("OS retornadas da API:", osArray);
            const tabelaResultadoFiltro = document.getElementById('os-filtroStatus');
    
            if (!tabelaResultadoFiltro) {
                console.error("Tabela 'os-filtroStatus' não encontrada.");
                return;
            }
    
            // Limpa resultados anteriores
            tabelaResultadoFiltro.innerHTML = '';
    
            osArray.forEach(os => {
                const novaLinhaPesquisa = document.createElement('tr');
                novaLinhaPesquisa.innerHTML = `
                 <td colspan="4">
                   <div class="shadow rounded-4 mb-2 mt-2 border border-black letras d-flex align-items-center">
                        <div class="ordemServico me-5 p-4"> 
                            <span class="ms-3 os-id">${os.id}</span>
                                <span class="ms-5">${os.clienteNome}</span>
                                <span class="ms-5">${os.clienteEndereco}</span>
                                <span class="ms-5">${os.produtoModelo}</span>
                                <span class="ms-5">${os.defeito}</span>
                                <span class="ms-5 status-text">${os.status}</span>
                                <span class="ms-5">${os.dataFormatada}</span>
                                <span class="ms-5 status-text">${os.horaFormatada}</span>
                                <span style="display:none" class="ms-5 os-numSerie">${os.ProdutoNumSerie}</span>
                                <span style="display:none" class="ms-5 os-Cpf">${os.clienteCpf}</span>
                        </div>
                    </div>
                 </td>
                `;
                tabelaResultadoFiltro.appendChild(novaLinhaPesquisa);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao carregar os dados da OS.');
        });
    }
    
    //botao para fechar o formualrio de Orcamento
    const btnFecharFormOrcamento = document.getElementById('btnFecharFormOrcamento')
    if(btnFecharFormOrcamento){
        btnFecharFormOrcamento.addEventListener('click' , function(event){
            campoInputOrcamento.style.display = 'none';
        })
    }

    //Botao para enviar o orcamento do produto
    const btnEnviarOrcamento = document.getElementById('btnEnviarOrcamento');
    if (btnEnviarOrcamento) {
        btnEnviarOrcamento.addEventListener('click', async function (event) {
            const orcamento = document.getElementById('inputOrcamento').value;
            const osId = btnEnviarOrcamento.getAttribute('data-os-id');  // Obtendo o ID da OS

            if (!orcamento) {
                alert("Por favor, preencha o orçamento antes de enviar.");
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/api/os/orcamento/${osId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ orcamento }),
                });

                if (!response.ok) {
                    throw new Error('Erro ao atualizar orçamento da OS');
                }

                const data = await response.json();
                console.log("Orçamento atualizado com sucesso:", data);
                alert('Orçamento atualizado com sucesso!');

                campoInputOrcamento.style.display = 'none';
                carregarOs()
                
            } catch (error) {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao atualizar o orçamento.');
            }
        });
    }

    
    carregarOs()
});
