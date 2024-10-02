// Função para salvar as compras no armazenamento local
function savePurchases(purchases) {
    // Converte o array de compras em uma string JSON e armazena no localStorage
    localStorage.setItem('purchases', JSON.stringify(purchases));
}

// Função para carregar as compras do armazenamento local
function loadPurchases() {
    // Obtém a string JSON armazenada e a converte de volta para um array
    // Se não houver compras salvas, retorna um array vazio
    return JSON.parse(localStorage.getItem('purchases')) || [];
}
