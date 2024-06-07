const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    source_id: { type: String, required: true, unique: true},
    charge_id: { type: String, required: true, unique: true },
    payment_status: { type: String, enum: ['pending', 'successful', 'failed', 'expired'], required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    created_at: { type: Date, default: () => new Date() }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;