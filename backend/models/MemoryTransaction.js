// In-memory storage for demo purposes when MongoDB is not available
let transactions = [];
let nextId = 1;

class MemoryTransaction {
  constructor(data) {
    this._id = nextId++;
    this.title = data.title;
    this.amount = data.amount;
    this.date = data.date || new Date();
    this.category = data.category;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  save() {
    return new Promise((resolve) => {
      if (this._id && transactions.find(t => t._id === this._id)) {
        // Update existing transaction
        const index = transactions.findIndex(t => t._id === this._id);
        this.updatedAt = new Date();
        transactions[index] = this;
      } else {
        // Create new transaction
        transactions.push(this);
      }
      resolve(this);
    });
  }

  static find() {
    return {
      sort: (sortObj) => {
        return new Promise((resolve) => {
          const sorted = transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
          resolve(sorted);
        });
      }
    };
  }

  static findById(id) {
    return new Promise((resolve) => {
      const transaction = transactions.find(t => t._id == id);
      resolve(transaction || null);
    });
  }

  static findByIdAndDelete(id) {
    return new Promise((resolve) => {
      const index = transactions.findIndex(t => t._id == id);
      if (index !== -1) {
        const deleted = transactions.splice(index, 1)[0];
        resolve(deleted);
      } else {
        resolve(null);
      }
    });
  }
}

module.exports = MemoryTransaction;
