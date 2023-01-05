interface Order {
  store: string;
  created: string;
  cashback: number;
  price: number;
}

async function processOrders(userOrders) {
  const orders = userOrders;
  const orderList = [];
  orders.forEach((item) => {
    const order: Order = {
      store: item.pay.store_name,
      created: item.pay.transaction_date,
      cashback: item.cashback,
      price: item.price,
    };
    orderList.push(order);
  });
  return orderList;
}

async function createCSV(orderList) {
  const csvArray = orderList.map((obj) =>
    Object.keys(obj).reduce((arr, current) => {
      arr.push(obj[current]);
      return arr;
    }, [])
  );
  csvArray.unshift(['Butik', 'Datum', 'Cashback', 'Pris']);

  const CSV = csvArray.join('\n');
  return CSV;
}

const downloadCSV = async function (data) {
  const blob = new Blob([data], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', 'refunder-orders.csv'); // Performing a download with click
  a.click();
};

export async function getOrders(): object {
  const orders1 = await fetch(
    'https://www.refunder.se/vue/user/orders?user_status=incoming&page=1&limit=100'
  ).then((res) => {
    if (!res.ok || res.redirected) {
      alert('Error please sign in');
      throw Error('Error please sign in');
    }
    return res.json();
  });
  const orders2 = await fetch(
    'https://www.refunder.se/vue/user/orders?user_status=approved&page=1&limit=100'
  ).then((res) => res.json());
  const orderList = await processOrders([...orders1.data, ...orders2.data]);
  const CSV = await createCSV(orderList);
  await downloadCSV(CSV);
  return CSV;
}
