import Image from "next/image";
import Link from "next/link";
import "@/css/aboutPage/aboutPage.css";
import { TeamCard } from "./teamCard";

export function About() {
  return (
    <div className="about-page">
      <div className="about-page-title">
        <span>About Us</span>
      </div>
      <div className="about-page-content">
        <div className="about-page-content-1">
          <div className="about-page-content-1-title">
            <span>Description</span>
          </div>
          <div className="about-page-content-1-desc">
            <span>
              In this fast-paced digital age, finding the right event can be a
              challenge. That's why Eventure is the best solution for event
              lovers, event organizers, and anyone who wants to experience the
              best in entertainment, education, and community. Eventure is an
              innovative platform specifically designed to make it easy for
              users to search, buy tickets and manage events in a practical way.
              With a modern interface and powerful features, Eventure connects
              you with exciting events, from music concerts, business seminars,
              cultural festivals, art exhibitions, educational workshops, to
              sports and e-sports competitions!
            </span>
          </div>
        </div>
        <div className="about-page-content-2">
          <div className="about-page-content-2-title">
            <span>Our Team</span>
          </div>
          <div className="about-page-content-2-list">
            <TeamCard
              props={{
                pic: "Mas Angga.jpg",
                github: "FathulIslamErlangga",
              }}
            />
              <TeamCard
                props={{
                  pic: "herry2.JPG",
                  github: "Gutemonmon052",
                }}
              />
          </div>
        </div>
      </div>
    </div>
  );
}
