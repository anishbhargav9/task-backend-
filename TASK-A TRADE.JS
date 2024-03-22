const mongoose = require('mongoose');
const tradeSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true
  },
  volume: {
    type: Number,
    required: true
  }
});
const Trade = mongoose.model('Trade', tradeSchema);
module.exports = Trade;
