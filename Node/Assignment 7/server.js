const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8080;

const address = JSON.parse(fs.readFileSync(path.join(__dirname, 'order-json-address-json', 'address.json'), 'utf-8'));
const orders = JSON.parse(fs.readFileSync(path.join(__dirname, 'order-json-address-json', 'order.json'), 'utf-8'));

const formatCurrency = (amount) => `$${parseInt(amount, 10).toLocaleString()}`;

const getWeekOfMonth = (dateStr) => {
    const [day, month, year] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return `Week${Math.ceil((date.getDate() + new Date(year, month - 1, 1).getDay()) / 7)}`;
};

const groupOrdersByWeek = () => {
    const weeks = orders.reduce((acc, order) => {
        const week = getWeekOfMonth(order.OrderDate);
        const type = order.TypeOfOrder;
        acc[week] = acc[week] || {};
        acc[week][type] = (acc[week][type] || 0) + parseInt(order.OrderAmount, 10);
        return acc;
    }, {});

    return Object.fromEntries(Object.entries(weeks).map(([week, types]) => [week, 
        Object.fromEntries(Object.entries(types).map(([type, amount]) => [`${type}:`, formatCurrency(amount)]))]));
};

const getPercentageChange = () => {
    const weekwise = groupOrdersByWeek();
    const weekKeys = Object.keys(weekwise);
    const changes = {};
    
    for (let i = 1; i < weekKeys.length; i++) {
        const weekPrev = weekwise[weekKeys[i - 1]];
        const weekCurr = weekwise[weekKeys[i]];
        
        const prevTotal = Object.values(weekPrev).reduce((acc, val) => acc + parseInt(val.replace(/\D/g, ''), 10), 0);
        const currTotal = Object.values(weekCurr).reduce((acc, val) => acc + parseInt(val.replace(/\D/g, ''), 10), 0);
        
        const change = prevTotal ? (((currTotal - prevTotal) / prevTotal) * 100).toFixed(2) : 'NaN';
        changes[`${weekKeys[i - 1]} to ${weekKeys[i]}`] = `${change}%`;
    }
    
    return changes;
};

const getBusinessImprovement = () => {
    const weekwise = groupOrdersByWeek();
    const improvement = { improvement: false };
    
    Object.keys(weekwise).forEach((week, index) => {
        const total = Object.values(weekwise[week]).reduce((acc, val) => acc + parseInt(val.replace(/\D/g, ''), 10), 0);
        improvement[`week${index + 1}`] = total;
    });
    
    improvement.improvement = improvement.week5 > improvement.week1;
    return improvement;
};

const getLowestBusinessDate = () => {
    const totalsByDate = orders.reduce((acc, { OrderDate, OrderAmount }) => {
        acc[OrderDate] = (acc[OrderDate] || 0) + parseInt(OrderAmount, 10);
        return acc;
    }, {});
    
    const [lowestDate] = Object.entries(totalsByDate).sort(([, a], [, b]) => a - b)[0];
    return { date: lowestDate };
};

const getCustomerOrderTotals = () => {
    const customerTotals = orders.reduce((acc, { 'Customer ID': id, OrderAmount }) => {
        acc[id] = (acc[id] || 0) + parseInt(OrderAmount, 10);
        return acc;
    }, {});

    return address.map(({ CustomerID, FirstName, LastName, Address }) => ({
        name: `${FirstName} ${LastName}`,
        address: Address,
        totalOrderValue: formatCurrency(customerTotals[CustomerID] || 0)
    }));
};

// Routes

app.get('/sales/weekwise', (req, res) => res.json(groupOrdersByWeek()));

app.get('/sales/percentage-change', (req, res) => res.json(getPercentageChange()));

app.get('/sales/business-improvement', (req, res) => res.json(getBusinessImprovement()));

app.get('/sales/lowest-business-date', (req, res) => res.json(getLowestBusinessDate()));

app.get('/customers', (req, res) => res.json(getCustomerOrderTotals()));

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
