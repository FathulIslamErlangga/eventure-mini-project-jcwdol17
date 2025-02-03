import Image from "next/image";
export function JumbotronContent() {
  return (
    <>
      <div className="jumbotron-content-2">
        <div className="jumbotron-content2-img">
          <Image
            src="/assets/images/contents/events/Sample 1.jpg"
            alt="sample-1"
            width={1920}
            height={1080}
          />
        </div>
        <div className="jumbotron-content2-cov">
          <div className="cov-upper">
            <div className="cov-date">23 Jan 2025</div>
            <div className="cov-ticket-left">
              <span className="text-[33px]">15</span>
              <br />
              Tickets
              <br />
              Left
            </div>
          </div>
          <div className="cov-lower">
            <div className="lower-part-1">
              <div className="cov-price">Rp 1.000.000</div>
              <div className="cov-title">Blackpink Comeback</div>
            </div>
            <div className="lower-part-2">
              <div className="event-btn">Buy Now</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
