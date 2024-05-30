let orderData = {
    "200398": {
      "orderId": "200398",
      "name": "iPhone X 64GB Grey",
      "price": "$999.00",
      "quantity": 1,
      "total": "$999.00"
    },
    "200397": {
      "orderId": "200397",
      "name": "Samsung S8 Black",
      "price": "$756.00",
      "quantity": 1,
      "total": "$756.00"
    },
    "200396": {
      "orderId": "200396",
      "name": "Game Console Controller",
      "price": "$22.00",
      "quantity": 2,
      "total": "$44.00"
    },
    "200392": {
      "orderId": "200392",
      "name": "USB 3.0 Cable",
      "price": "$10.00",
      "quantity": 3,
      "total": "$30.00"
    },
    "200391": {
      "orderId": "200391",
      "name": "Smartwatch 4.0 LTE wifi",
      "price": "$199.00",
      "quantity": 6,
      "total": "$1494.00"
    },
    "200390": {
      "orderId": "200390",
      "name": "Camera C430W 4k",
      "price": "$699.00",
      "quantity": 1,
      "total": "$699.00"
    },
    "200399": {
      "orderId": "200399",
      "name": "Wireless Headphones",
      "price": "$199.00",
      "quantity": 5,
      "total": "$995.00"
    },
    "200400": {
      "orderId": "200400",
      "name": "Bluetooth Speaker",
      "price": "$49.00",
      "quantity": 4,
      "total": "$196.00"
    },
    "200401": {
      "orderId": "200401",
      "name": "External Hard Drive 1TB",
      "price": "$89.00",
      "quantity": 3,
      "total": "$267.00"
    },
    "200402": {
      "orderId": "200402",
      "name": "Laptop Stand",
      "price": "$30.00",
      "quantity": 2,
      "total": "$60.00"
    },
    "200403": {
      "orderId": "200403",
      "name": "Wireless Mouse",
      "price": "$25.00",
      "quantity": 4,
      "total": "$100.00"
    },
    "200404": {
      "orderId": "200404",
      "name": "Gaming Keyboard",
      "price": "$89.00",
      "quantity": 1,
      "total": "$89.00"
    },
    "200405": {
      "orderId": "200405",
      "name": "Noise Cancelling Headphones",
      "price": "$299.00",
      "quantity": 1,
      "total": "$299.00"
    }
  };
  
window.onload = loadData;

function loadData() {
    let storedData = localStorage.getItem('orderData');
    
    if (!storedData) {
        localStorage.setItem('orderData', JSON.stringify(orderData));
        storedData = JSON.stringify(orderData);
    }
    storedData = JSON.parse(storedData);  

    let tableContainer = document.querySelector('.table_ctn');
    let temp = 1;
    const dataKeys = Object.values(storedData);
    
    dataKeys.forEach(order => {

      let rowContainer = document.createElement('div');
      rowContainer.className = 'row_container';
  
      let orderIdDiv = document.createElement('div');
      let nameDiv = document.createElement('div');
      let priceDiv = document.createElement('div');
      let quantityDiv = document.createElement('div');
      let totalDiv = document.createElement('div');
  
      orderIdDiv.className = nameDiv.className = priceDiv.className = quantityDiv.className = totalDiv.className = 'rows';
  
      orderIdDiv.innerHTML = `<span>${order.orderId}</span>`;
      rowContainer.appendChild(orderIdDiv);
  
      nameDiv.innerHTML = `<span>${order.name}</span>`;
      rowContainer.appendChild(nameDiv);
  
      priceDiv.innerHTML = `<span>${order.price}</span>`;
      rowContainer.appendChild(priceDiv);
  
      quantityDiv.innerHTML = `<span>${order.quantity}</span>`;
      rowContainer.appendChild(quantityDiv);
  
      totalDiv.innerHTML = `<span>${order.total}</span>`;
      rowContainer.appendChild(totalDiv);
  
      if (temp % 2 == 0) {
        orderIdDiv.className = nameDiv.className = priceDiv.className = quantityDiv.className = totalDiv.className = 'alternate_rows rows';
      }
      temp++;
  
      tableContainer.appendChild(rowContainer);
    });
  };
  