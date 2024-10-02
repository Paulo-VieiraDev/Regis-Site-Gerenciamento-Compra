// script-test.js

// Função para adicionar compras de teste
function addTestPurchases() {
    // Array de compras de teste, cada objeto representa uma compra
    const testPurchases = [
        { item: "Camiseta", value: 49.90, location: "Loja A", date: "2024-09-10", paymentMethod: "Cartão de Crédito" },
        { item: "Calça", value: 89.90, location: "Loja B", date: "2024-09-15", paymentMethod: "Dinheiro" },
        { item: "Tênis", value: 150.00, location: "Loja C", date: "2024-09-20", paymentMethod: "Transferência" },
        { item: "Boné", value: 25.00, location: "Loja A", date: "2024-09-12", paymentMethod: "Cartão de Débito" },
        { item: "Relógio", value: 300.00, location: "Loja D", date: "2024-09-25", paymentMethod: "Pix" }
    ];

    // Seleciona o formulário de compras pelo ID
    const purchaseForm = document.getElementById('purchaseForm');

    // Itera sobre cada compra no array de compras de teste
    testPurchases.forEach(purchase => {
        // Preenche o formulário com os dados da compra
        purchaseForm[0].value = purchase.item; // Campo do item
        purchaseForm[1].value = purchase.value; // Campo do valor
        purchaseForm[2].value = purchase.location; // Campo da localização
        purchaseForm[3].value = purchase.date; // Campo da data
        purchaseForm[4].value = purchase.paymentMethod; // Campo do método de pagamento

        // Envia o formulário, disparando o evento 'submit'
        purchaseForm.dispatchEvent(new Event('submit'));
    });
}

// Função para aplicar filtros de teste
function applyTestFilters() {
    // Seleciona os filtros pelo ID
    const monthFilter = document.getElementById('monthFilter');
    const locationFilter = document.getElementById('locationFilter');
    const paymentFilter = document.getElementById('paymentFilter');
    const minValueInput = document.getElementById('minValue');
    const maxValueInput = document.getElementById('maxValue');
    const applyFiltersButton = document.getElementById('applyFilters');

    // Define os valores dos filtros para aplicar
    monthFilter.value = "9"; // Filtra pelo mês de setembro (mês 9)
    locationFilter.value = ""; // Filtra por todos os locais
    paymentFilter.value = "Dinheiro"; // Filtra por pagamentos em "Dinheiro"
    minValueInput.value = ""; // Sem valor mínimo
    maxValueInput.value = ""; // Sem valor máximo

    // Clica no botão para aplicar os filtros
    applyFiltersButton.click();
}

// Função principal para testar o sistema
function testSystem() {
    addTestPurchases(); // Chama a função para adicionar compras de teste
    applyTestFilters(); // Chama a função para aplicar os filtros de teste
}

// Adiciona um listener que chama a função de teste quando a página é carregada
document.addEventListener('DOMContentLoaded', testSystem);
