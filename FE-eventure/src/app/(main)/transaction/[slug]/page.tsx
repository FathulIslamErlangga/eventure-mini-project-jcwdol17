import { TransactionContent } from "@/components/transactionPage/transactionContent";
import { TransactionTitle } from "@/components/transactionPage/transactionTitle";
import "@/css/transactionPage/transactionPage.css";

export default function TransactionPage() {
  return (
    <div className="transaction-page">
      <TransactionTitle />
      <TransactionContent/>
    </div>
  );
}
