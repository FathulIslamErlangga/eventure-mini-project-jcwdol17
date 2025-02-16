import Image from "next/image";
import '@/css/transactionPage/transactionTitle.css';

export function TransactionTitle(){
    return(
        <div className="transaction-title">
            <div className="transaction-title-text">
                <span>Transaction</span>
            </div>
            <div className="transaction-title-pic">
                <Image
                    src="/assets/images/contents/eo/Star 11.svg"
                    alt="star"
                    width={100}
                    height={100}
                />
            </div>
        </div>
    )
}