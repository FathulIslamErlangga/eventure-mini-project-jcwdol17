import Image from "next/image";
import '@/css/authPage/logo.css';

export function Logo() {
  return (
    <div className="logo-content">
      <div className="eventure-logo">
        <Image
          src="/assets/images/icons/mainIcon.svg"
          alt="eventure-logo"
          width={60}
          height={60}
        />
      </div>
    </div>
  );
}
