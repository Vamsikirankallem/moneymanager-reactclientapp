// export const BASE_URL = "https://money-manager-backend-api-gn8n.onrender.com/api/v1.0";
export const BASE_URL = "http://localhost:8081/api/v1.0";

export const CLOUDINARY_CLOUD_NAME="dhqevnu7c";

export const API_ENDPOINTS = {
    LOGIN : "/login",
    REGISTER : "/register",
    UPLOAD_IMAGE : `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    GET_USER_INFO : "/profile",
    GET_ALL_CATEGORIES : "/categories",
    ADD_CATEGORY : "/addCategory",
    UPDATE_CATEGORY:(categoryId)=>`category/${categoryId}`,
    GET_INCOMES : "/incomes",
    DELETE_INCOME:(incomeId)=>`incomes/delete/${incomeId}`,
    CATEGORY_BY_TYPE : (type)=>`categories/${type}`,
    ADD_INCOME : "incomes/addIncome",
    INCOME_EXCEL_DOWNLOAD:"excel/download/income",
    INCOME_EMAIL_SERVICE : "email/income-excel",
    GET_EXPENSES:"/expenses",
    ADD_EXPENSE : "expenses/addExpense",
    DELETE_EXPENSE : (expenseId)=>`expenses/delete/${expenseId}`,
    EXPENSE_EXCEL_DOWNLOAD : "excel/download/expense",
    APPLY_FILTERS:"/filter",
    DASHBOARD_DATA:"/dashboard"
}