import moment from "moment";
import {Download, Loader, Mail} from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";

const ExpenseList = ({ transactions, onDelete, onDownload, onEmail,loadingState }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">All Expenses</h5>
                <div className="flex items-center justify-end gap-2">
                    <button className='bg-slate-100 rounded-sm px-5 w-auto py-1 flex flex-row gap-2 items-center-safe cursor-pointer hover:bg-purple-100 hover:text-purple-800 transition-colors duration-200 ' onClick={onEmail} >
                    <Mail size={15} className='text-base' />
                    {
                        loadingState ? <p>Emailing...</p> : <p>Email</p>
                    }
                </button>
                <button onClick={onDownload} className='bg-slate-100 rounded-sm px-5 w-auto py-1 flex flex-row gap-2 items-center-safe cursor-pointer hover:bg-purple-100 hover:text-purple-800 transition-colors duration-200'>
                    
                    {
                        loadingState ? (<><Loader className='w-4 h-4 animate-spin'/> Downloading</>) : (<><Download size={15} className='text-base'/> Download</>)
                    }
                </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions?.map((expense) => (
                    <TransactionInfoCard
                        key={expense.id}
                        title={expense.name}
                        icon={expense.icon}
                        date={moment(expense.date).format("Do MMM YYYY")}
                        amount={expense.amount}
                        type="expense"
                        onDelete={() => onDelete(expense.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ExpenseList;
