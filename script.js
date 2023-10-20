const tbody = document.querySelector('tbody');
const descItem = document.querySelector('#desc');
const amount = document.querySelector('#amount');
const type = document.querySelector('#type');
const btnNew = document.querySelector('#btnNew');

const incomes = document.querySelector('.incomes');
const expenses = document.querySelector('.expenses');
const total = document.querySelector('.total');

let items = [];

const getItemsDB = () => {
	const items = localStorage.getItem('db_items');
	return items ? JSON.parse(items) : [];
};

const setItemsDB = (items) => {
	localStorage.setItem('db_items', JSON.stringify(items));
};

const loadItems = () => {
	items = getItemsDB();
	tbody.innerHTML = '';
	items.forEach((item, index) => insertItem(item, index));
  updateBalance();
};

btnNew.onclick = () => {
	console.log('click');
	if (!descItem.value || !amount.value || !type.value) {
		return alert('Por favor, preencha todos os campos');
	}

	const item = {
		desc: descItem.value,
		amount: Math.abs(amount.value).toFixed(2),
		type: type.value,
	};

	items.push(item);
	setItemsDB(items);
	loadItems();
	resetForm();
};

function resetForm() {
	descItem.value = '';
	amount.value = '';
	type.value = '';
}

function deleteItem(index) {
	items.splice(index, 1);
	setItemsDB(items);
	loadItems();
}

function insertItem(item, index) {
	let tr = document.createElement('tr');
	tr.innerHTML += `
      <tr>
        <td>${item.desc}</td>
        <td>${item.amount}</td>
        <td class="columnType">${
					item.type === 'Entrada'
						? '<i class="bx bxs-chevron-up-circle"></i>'
						: '<i class="bx bxs-chevron-down-circle"></i>'
				}</td>
        <td class="columnAction">
          <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
      </tr>
    `;
	tbody.appendChild(tr);
}

function updateBalance() {
  let totalIncomes = 0;
  let totalExpenses = 0;

  items.forEach((item) => {
    if (item.type === 'Entrada') {
      totalIncomes += Number(item.amount);
    } else {
      totalExpenses += Number(item.amount);
    }
  });

  incomes.textContent = `R$ ${totalIncomes.toFixed(2)}`;
  expenses.textContent = `R$ ${totalExpenses.toFixed(2)}`;
  total.textContent = `R$ ${(totalIncomes - totalExpenses).toFixed(2)}`;
}
