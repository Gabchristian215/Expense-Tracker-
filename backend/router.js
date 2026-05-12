import express from "express";
const router = express.Router();
import Salary, {Expense, Category} from "./salaryschema.js";
import {signup, login} from "./auth/authController.js";


router.post("/addSalary", async (req, res) =>{
    try{
    const amount = req.body.amount;
    const salary = await Salary.create({amount});
    res.status(201).json(salary);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.post("/addExpenses", async (req, res) =>{
    try{
     const expense = req.body.expense
     const expenses = await Expense.create({expense});
     res.status(201).json(expenses);
    } catch(error){
        res.status(500).json({message: error.message});
    }
})

router.delete("/deleteExpense/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const deleteExpense = await Expense.findByIdAndDelete(id);
        res.status(200).json(deleteExpense);
        
        if(!deleteExpense){
            return res.status(404).json({message: "Expense not found"});
        }

    } catch(error){
        res.status(500).json({message: error.message});
    }
})

 router.delete("/deleteSalary/:id", async (req, res) => {
    try{
        const id = req.params.id;
     const salaryDocs = await Salary.findByIdAndDelete(id);
     res.status(200).json(salaryDocs);

     if(!salaryDocs){
        return res.status(404).json({message: "Salary not found"});
     }
    } catch(error){
        res.status(500).json({message: error.message});
    }
 })

router.get("/netSalary", async (req, res) =>{
    try{
const salaryDocs = await Salary.find({})
const expenseDocs = await Expense.find({})
const totalSalary = salaryDocs.reduce((sum, doc) => sum + doc.amount, 0)
const totalExpenses = expenseDocs.reduce((sum, doc) => sum + doc.expense, 0)
const netSalary = totalSalary - totalExpenses;
res.status(201).json({netSalary})
    } catch(error){
        res.status(500).json({message: error.message});
    }
})

router.post("/categories", async (req, res) =>{
    try{
    const {categoryName, description, icon, color, type}  = req.body;
    const newCategory = await Category.create({
        name: categoryName,
        description: description,
        icon: icon,
        color: color,
        type: type
    });
    res.status(201).json({categoryName, description, icon, color, type});
    } catch(error){
        res.status(500).json({message: error.message});
    }
})

router.get("/categories", async (req, res) =>{
    try{
        const categories = await Category.find({})
        res.status(200).json(categories);
    } catch(error){
        res.status(500).json({message: error.message});
    }
})

router.delete("/deleteCategory/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const deleteCategory = await Category.findByIdAndDelete(id);
        res.status(200).json(deleteCategory);

        if(!deleteCategory){
            return res.status(404).json({message: "Category not found"});
        }

    } catch(error){
        res.status(500).json({message: error.message});
    }
})


router.post("/signup", signup); 

router.post("/login", login);
export default router;