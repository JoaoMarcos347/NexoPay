function toggleDiscount() {
  const discountBody = document.getElementById('apply-discount-body');
  const toggleIcon = document.getElementById('toggle-icon');
  if (discountBody.style.display === 'none') {
    discountBody.style.display = 'block';
    toggleIcon.classList.remove('fa-chevron-down');
    toggleIcon.classList.add('fa-chevron-up');
  } else {
    discountBody.style.display = 'none';
    toggleIcon.classList.remove('fa-chevron-up');
    toggleIcon.classList.add('fa-chevron-down');
  }
}

const discountCupons = {
  NEXOPAY10: 0.1,
  NEXOPAY20: 0.2,
  NEXOPAY30: 0.3,
  NEXOPAY40: 0.4,
  NEXOPAY50: 0.5,
  NEXOPAY60: 0.6,
  NEXOPAY70: 0.7,
  NEXOPAY80: 0.8,
  NEXOPAY90: 0.9,
  NEXOPAY100: 1,
};
function aplicarDesconto() {
  const discountCode = document
    .getElementById('discount-code')
    .value.trim()
    .toUpperCase();
  const discoutMessage = document.getElementById('discount-message');
  const totalPrice = document.getElementById('total-price');

  const price = 100;
  let total = price;
  if (discountCupons[discountCode]) {
    const discount = discountCupons[discountCode];
    total = price - price * discount;

    totalPrice.innerHTML = `Preço Total: R$ ${total.toFixed(2)}`;
    localStorage.setItem('discountS', discountCode);
    discoutMessage.innerHTML = `desconto de ${discountCode} aplicado!`;
    document.getElementById('discount-code').value = '';
    discoutMessage.style.color = 'green';
  } else {
    discoutMessage.innerHTML = 'Cupom de desconto inválido!';
    discoutMessage.style.color = 'red';
  }
}

function ChecarDesconto() {
  const discountCode = localStorage.getItem('discountS');
  const menssagem = document.getElementById('discount-message');
  if (discountCode) {
    localStorage.removeItem('discountS');
  }
  menssagem.innerHTML = '';
}

window.onload = ChecarDesconto;
