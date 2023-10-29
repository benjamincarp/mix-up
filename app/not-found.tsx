import Link from "next/link";
import ContentCard from "../components/ContentCard";

export default function NotFound() {
  return (
    <main>
      <ContentCard titleText="404">
        <div className="text-center">
          Sorry, I don&apos;t know that one.
          <br />
          Clink the glass below to go back home.
        </div>
      </ContentCard>
    </main>
  );
}
