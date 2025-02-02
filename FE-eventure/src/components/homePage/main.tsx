import { Categories } from "./categories";
import { Jumbotron } from "./jumbotron";
import { MoreEvent } from "./moreEvent";
import { UpComingEvents } from "./upComingEvents";

export function HomePage() {
  return (
    <>
      <Jumbotron />
      <Categories/>
      <UpComingEvents/>
      <MoreEvent/>
    </>
  );
}
