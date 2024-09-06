const express = require('express');
const sequelize = require('./database');
const Payment = require('./Payments');

const app = express();

app.use(express.json());

app.get('/payments', async (req, res) => {
  const payments = await Payment.findAll();
  if (payments) {
    res.json(payments);
  } else {
    res.status(500).json({ error: 'An error occurred while fetching payments.' });
  }
});

app.get('/payments/:id', async (req, res) => {
  const payment = await Payment.findByPk(req.params.id);
  if (payment) {
    res.json(payment);
  } else {
    res.status(404).json({ error: 'Payment not found.' });
  }
});

app.post('/payments', async (req, res) => {
  const payment = await Payment.create(req.body);
  if (payment) {
    res.status(201).json(payment);
  } else {
    res.status(500).json({ error: 'An error occurred while creating the payment.' });
  }
});

app.put('/payments/:id', async (req, res) => {
  const payment = await Payment.findByPk(req.params.id);
  if (payment) {
    const updatedPayment = await payment.update(req.body);
    if (updatedPayment) {
      res.json(updatedPayment);
    } else {
      res.status(500).json({ error: 'An error occurred while updating the payment.' });
    }
  } else {
    res.status(404).json({ error: 'Payment not found.' });
  }
});

app.delete('/payments/:id', async (req, res) => {
  const payment = await Payment.findByPk(req.params.id);
  if (payment) {
    const deletedPayment = await payment.destroy();
    if (deletedPayment) {
      res.json({ message: 'Payment deleted.' });
    } else {
      res.status(500).json({ error: 'An error occurred while deleting the payment.' });
    }
  } else {
    res.status(404).json({ error: 'Payment not found.' });
  }
});

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

module.exports = app;
