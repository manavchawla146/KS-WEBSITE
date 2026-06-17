import { PeelReveal } from "./peel-reveal";
import { SeminarContent } from "./seminars";
import { EventsContent } from "./events";
import { PlacementReveal } from "./placement";
import { CurtainFooter } from "./curtain-footer";

export const InceptionFold = () => {
  return (
    <>
      <PeelReveal
        foldTitle="Seminars &\nWorkshops"
        foldSubtitle="Industry leaders share insights that shape careers"
        containerHeight="h-[300vh]"
      >
        <SeminarContent />
      </PeelReveal>
      <PeelReveal
        foldTitle="Campus\nEvents"
        foldSubtitle="Where friendships form and memories last forever"
        containerHeight="h-[300vh]"
      >
        <EventsContent />
      </PeelReveal>
      <PlacementReveal />
      <CurtainFooter />
    </>
  );
};
