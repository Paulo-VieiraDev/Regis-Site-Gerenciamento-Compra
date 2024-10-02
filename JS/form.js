// Seleciona o formulário de compra pelo ID
const purchaseForm = document.getElementById('purchaseForm');

// Adiciona um evento de envio ao formulário
purchaseForm.addEventListener('submit', function(e) {
    // Prevê o comportamento padrão de envio do formulário
    e.preventDefault();

    // Obtém os valores dos campos do formulário
    const item = this[0].value; // Nome do item (primeiro campo)
    const value = parseFloat(this[1].value); // Valor do item (segundo campo), converte para número
    const location = this[2].value; // Localização (terceiro campo)
    const date = this[3].value; // Data da compra (quarto campo)
    const paymentMethod = this[4].value; // Método de pagamento (quinto campo)

    // Cria um objeto de data a partir da data informada
    const purchaseDate = new Date(date);
    // Obtém a data atual
    const currentDate = new Date();

    // Verifica se a data da compra é futura
    if (purchaseDate > currentDate) {
        // Exibe um alerta se a data for futura
        alert("A data não pode ser futura. Por favor, insira uma data válida.");
        return; // Interrompe a execução se a data não for válida
    }

    // Cria um objeto de compra com os valores informados
    const purchase = { item, value, location, date, paymentMethod };
    // Adiciona a nova compra à lista de compras
    purchases.push(purchase);
    // Salva a lista de compras atualizada em algum armazenamento
    savePurchases(purchases);
    // Atualiza a exibição da lista de compras na interface
    updatePurchaseList();
    // Atualiza o resumo financeiro com as compras atuais
    updateSummary();
    // Atualiza o filtro de localização com as novas compras
    updateLocationFilter();
    // Reseta o formulário para limpar os campos após a submissão
    this.reset();
});
