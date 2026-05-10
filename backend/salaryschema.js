import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
 amount: {
    type: Number,
    required: true
 },
 
},
{versionKey: false}
);

const expenseSchema = new mongoose.Schema({
   expense : {
      type: Number,
      required: true
   },
},
{versionKey: false}
);

const categorySchema = new mongoose.Schema({
name: {
   type: String,
   required: true
},
description: {
        type: String,
    },
    icon: {
        type: String,
    },
    color: {
        type: String,
    },
    type: {
      type: String,
    }
}, {versionKey: false}, {timestamps: true}
);


const Salary = mongoose.model("salary", salarySchema);
const Expense = mongoose.model("expense", expenseSchema);
const Category = mongoose.model("category", categorySchema);

export default Salary;
export {Expense, Category};