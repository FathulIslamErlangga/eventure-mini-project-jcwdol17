import Image from "next/image";
import "@/css/noData.css";

interface IError {
  messages: string;
}

export function NoData(props: IError) {
  return (
    <div className="no-data">
      <Image
        src="/assets/images/icons/xmark.svg"
        alt="x-mark"
        width={150}
        height={150}
      />
      <div className="no-data-text">
        <span>{props.messages}</span>
      </div>
    </div>
  );
}
