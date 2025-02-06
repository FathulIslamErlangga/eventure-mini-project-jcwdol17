import Image from "next/image";
import '@/css/eoPage/eoDetailsPage/eoDetContent.css';

export function EoDetContent() {
  return (
    <div className="eo-det-content">
      <div className="eo-det-content-1">
        <div className="eo-det-content-1-1">
          <div className="eo-det-content-desc">
            <div className="eo-det-content-desc-pic">
              <Image
                src="/assets/images/icons/description.svg"
                alt="description"
                width={50}
                height={50}
              />
            </div>
            <div className="eo-det-content-desc-title">
              <span>Description</span>
            </div>
          </div>
          <div className="eo-det-content-desc-text">
            <span>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum,
              nisi. Accusamus alias expedita vel cum. Hic nemo culpa quasi,
              natus neque repellendus similique id, illum, at dolorem vitae
              accusantium amet.
            </span>
          </div>
        </div>
        <div className="eo-det-content-1-2">
          <div className="eo-det-content-loc">
            <div className="eo-det-content-loc-pic">
              <Image
                src="/assets/images/icons/location.svg"
                alt="location"
                width={50}
                height={50}
              />
            </div>
            <div className="eo-det-content-loc-title">
              <h2>Location</h2>
            </div>
          </div>
          <div className="eo-det-content-loc-text">
            <div className="eo-det-content-loc-name">
              <h1>Gedung BSD</h1>
            </div>
            <div className="eo-det-content-loc-add">
              <span>Jalan Sangkuriang No. 123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
