const form = document.getElementById("expenseForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const transactionList = document.getElementById("transactionList");

const incomeDisplay = document.getElementById("income");
const expenseDisplay = document.getElementById("expense");
const balanceDisplay = document.getElementById("balance");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);
  const type = typeInput.value;

  if (!title || amount <= 0) {
    alert("Please enter valid title and amount");
    return;
  }

  const transaction = {
    id: Date.now(),
    title: title,
    amount: amount,
    type: type,
    date: new Date().toLocaleDateString()
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  renderTransactions();
  form.reset();
});

function renderTransactions() {
  transactionList.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach((item) => {
    if (item.type === "income") {
      income += item.amount;
    } else {
      expense += item.amount;
    }

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.title}</td>
      <td>₹${item.amount}</td>
      <td>
        <span class="${item.type === "income" ? "badge-income" : "badge-expense"}">
          ${item.type}
        </span>
      </td>
      <td>${item.date}</td>
      <td>
        <button type="button" class="btn btn-sm btn-danger" onclick="deleteTransaction(${item.id})">
          Delete
        </button>
      </td>
    `;

    transactionList.appendChild(row);
  });

  incomeDisplay.textContent = `₹${income}`;
  expenseDisplay.textContent = `₹${expense}`;
  balanceDisplay.textContent = `₹${income - expense}`;
}

function deleteTransaction(id) {
  transactions = transactions.filter((item) => item.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderTransactions();
}

function clearAll() {
  const confirmDelete = confirm("Are you sure you want to delete all transactions?");

  if (confirmDelete) {
    transactions = [];
    localStorage.setItem("transactions", JSON.stringify(transactions));
    renderTransactions();
  }
}

renderTransactions();