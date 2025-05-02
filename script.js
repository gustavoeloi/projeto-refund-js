const form = document.querySelector("form");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const expense = document.getElementById("expense");

const expenseList = document.querySelector("ul");
const expenseQuantity = document.querySelector("aside header p span");
const expenseAmount = document.querySelector("aside header h2");

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

form.onsubmit = (event) => {
  event.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    id_category: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  createExpense(newExpense);
};

const createExpense = (expense) => {
  try {
    const itemExpense = document.createElement("li");
    itemExpense.classList.add("expense");

    const expenseImg = document.createElement("img");
    expenseImg.setAttribute("src", `/img/${expense.id_category}.svg`);

    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    const nameExpense = document.createElement("strong");
    nameExpense.textContent = expense.expense;

    const categoryExpense = document.createElement("span");
    categoryExpense.textContent = expense.category_name;

    expenseInfo.append(nameExpense, categoryExpense);

    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");

    const small = document.createElement("small");
    small.textContent = "R$";

    expenseAmount.append(small, expense.amount.replace("R$", ""));

    const removeImage = document.createElement("img");
    removeImage.setAttribute("src", "img/remove.svg");
    removeImage.setAttribute("alt", "remover");
    removeImage.classList.add("remove-icon");

    //Coloca os elementos dentro do item da lisat
    itemExpense.append(expenseImg, expenseInfo, expenseAmount, removeImage);

    // Adicionando o item na lista
    expenseList.append(itemExpense);
    updateQuantity();
  } catch (error) {
    alert("Não foi possível criar uma despesa");
    console.log(error);
  }
};

const updateQuantity = () => {
  try {
    const item = expenseList.children;

    expenseQuantity.textContent = `${item.length} ${
      item.length > 1 ? "despesas" : "despesa"
    }`;

    let total = 0;

    for (let i = 0; i < item.length; i++) {
      const itemHTML = item[i].querySelector(".expense-amount");

      let value = itemHTML.textContent.replace(/[^\d,]/g, "").replace(",", ".");

      value = parseFloat(value);

      if (isNaN(value)) {
        throw new Error(
          "Não foi possível calcular o total. O valor não parece ser um número válido"
        );
      } else {
        total += value;
      }
    }

    expenseAmount.innerHTML = "";

    const symbolBRL = "R$";
    const smallH2 = document.createElement("small");

    smallH2.append(symbolBRL);

    smallH2.textContent = formatBRLCurrency(total).replace("R$", "");
    expenseAmount.append(symbolBRL, smallH2);
  } catch (error) {
    alert("Não foi possível atualizar as despesas");
    console.log(error);
  }
};

// Evento que captura o clique nos itens da lista

expenseList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-icon")) {
    const item = e.target.closest(".expense");
    item.remove();
  }
  updateQuantity();
});
