import "@/css/adminPage/transactionPage/transactionPage.css";
import { TransactionData } from "@/components/admin/transactions/listdata";
export default function AdminTransaction() {
  return (
    <div className="admin-transactions">
      <div className="admin-transactions-title">
        <span>Transactions</span>
      </div>
      <div className="admin-transactions-content">
        <TransactionData />
      </div>
    </div>
  );
}
