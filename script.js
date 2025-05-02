const amount = document.getElementById("amount");

amount.oninput = () => {
  let value = amount.value.replace(/\D/g, "");

  value = Number(value) / 100;

  amount.value = formatBRLCurrency(value);
};

const formatBRLCurrency = (amount) => {
  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
