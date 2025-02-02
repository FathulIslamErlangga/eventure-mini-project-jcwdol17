"use client";
import "@/css/homePage/jumbotronStyle.css";
import Image from "next/image";
import { JumbotronContent } from "./jumbotron.content";
import { useState, useEffect } from "react";

export function Jumbotron() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="jumbotron">
      <div className="jumbotron-container">
        <div className="jumbotron-content">
          <div
            className={`jumbotron-content-1 ${
              currentSlide === 0 ? "slide-active" : "slide-hidden"
            }`}
          >
            <div className="content1-title">
              <span>Discover, Choose, Attend!</span>
            </div>
            <div className="content1-desc">
              <span>
                Explore thousands of exciting events and buy tickets easily only
                at Eventure.
              </span>
            </div>
            <div className="content1-btn">
              <div className="jumbotron-btn">
                <span>Discover More</span>
              </div>
            </div>
            <div className="content1-imgs">
              <div className="content1-img">
                <Image
                  src="/assets/images/contents/homePage/cd.png"
                  alt="cd-pic"
                  width={300}
                  height={200}
                />
              </div>
              <div className="content2-img">
                <Image
                  src="/assets/images/contents/homePage/microphone.png"
                  alt="mic-pic"
                  width={200}
                  height={400}
                />
              </div>
              <div className="content3-img">
                <Image
                  src="/assets/images/contents/homePage/headphone.png"
                  alt="headphone-pic"
                  width={200}
                  height={200}
                />
              </div>
              <div className="content4-img">
                <Image
                  src="/assets/images/contents/homePage/radio.png"
                  alt="radio-pic"
                  width={300}
                  height={200}
                />
              </div>
            </div>
          </div>
          <div
            className={`jumbotron-content-2 ${
              currentSlide === 1 ? "slide-active" : "slide-hidden"
            }`}
          >
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
          <div
            className={`jumbotron-content-2 ${
              currentSlide === 2 ? "slide-active" : "slide-hidden"
            }`}
          >
            <div className="jumbotron-content2-img">
              <Image
                src="/assets/images/contents/events/Sample 2.jpg"
                alt="sample-2"
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
          <div
            className={`jumbotron-content-2 ${
              currentSlide === 3 ? "slide-active" : "slide-hidden"
            }`}
          >
            <div className="jumbotron-content2-img">
              <Image
                src="/assets/images/contents/events/Sample 3.jpg"
                alt="sample-3"
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
          <div
            className={`jumbotron-content-2 ${
              currentSlide === 4 ? "slide-active" : "slide-hidden"
            }`}
          >
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

          <div className="jumbotron-dots">
            {[...Array(totalSlides)].map((_, index) => (
              <div
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
