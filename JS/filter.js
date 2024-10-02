// Seleciona os botões de aplicar e resetar filtros pelo ID
const applyFilters = document.getElementById('applyFilters');
const resetFilters = document.getElementById('resetFilters');

// Adiciona um evento de clique ao botão "Aplicar Filtros"
applyFilters.addEventListener('click', function() {
    // Obtém os valores dos filtros selecionados pelo usuário
    const filterLocation = document.getElementById('locationFilter').value; // Filtro de localização
    const filterMonth = document.getElementById('monthFilter').value; // Filtro de mês
    const filterPayment = document.getElementById('paymentFilter').value; // Filtro de método de pagamento
    const minValue = parseFloat(document.getElementById('minValue').value) || 0; // Valor mínimo, padrão 0 se não for um número
    const maxValue = parseFloat(document.getElementById('maxValue').value) || Infinity; // Valor máximo, padrão Infinity se não for um número

    // Filtra a lista de compras com base nos critérios especificados
    const filteredPurchases = purchases.filter(purchase => {
        const purchaseDate = new Date(purchase.date); // Cria um objeto de data a partir da data da compra
        const purchaseMonth = purchaseDate.getMonth() + 1; // Obtém o mês da compra (0-11, então adicionamos 1)

        // Retorna verdadeiro se a compra atender a todos os critérios de filtro
        return (
            (filterLocation === '' || purchase.location === filterLocation) && // Filtro de localização
            (filterMonth === '' || purchaseMonth === parseInt(filterMonth)) && // Filtro de mês
            (filterPayment === '' || purchase.paymentMethod === filterPayment) && // Filtro de método de pagamento
            (purchase.value >= minValue && purchase.value <= maxValue) // Filtro de valor
        );
    });

    // Atualiza a lista de compras exibida com as compras filtradas
    updatePurchaseList(filteredPurchases);
    // Atualiza o resumo com as compras filtradas
    updateSummary(filteredPurchases);
});

// Adiciona um evento de clique ao botão "Resetar Filtros"
resetFilters.addEventListener('click', function() {
    // Reseta todos os campos de filtro para suas opções padrão
    document.getElementById('monthFilter').value = ''; // Limpa o filtro de mês
    document.getElementById('locationFilter').value = ''; // Limpa o filtro de localização
    document.getElementById('paymentFilter').value = ''; // Limpa o filtro de método de pagamento
    document.getElementById('minValue').value = ''; // Limpa o campo de valor mínimo
    document.getElementById('maxValue').value = ''; // Limpa o campo de valor máximo

    // Atualiza a lista de compras exibida para mostrar todas as compras
    updatePurchaseList();
    // Atualiza o resumo para mostrar todas as compras
    updateSummary();
});
