import Link from "next/link";

export default function Home() {
  return (
    <main style={{ maxWidth: 900, margin: "auto", padding: 30, fontFamily: "Arial" }}>
      
      <h1>Things To Do Jervis Bay</h1>

      <p style={{ fontSize: 18, marginTop: 10 }}>
        Local guides to beaches, walks, hidden gems and free activities around Jervis Bay.
      </p>

      <hr style={{ margin: "30px 0" }} />

      <h2>Explore</h2>

      <ul style={{ lineHeight: 2, fontSize: 18 }}>
        <li>
          <Link href="/free-things-to-do">Free Things To Do in Jervis Bay</Link>
        </li>

        <li>
          <Link href="/hidden-gems">Hidden Gems</Link>
        </li>

        <li>
          <Link href="/rainy-day-activities">Rainy Day Activities</Link>
        </li>

        <li>
          <Link href="/best-walks">Best Walks</Link>
        </li>

        <li>
          <Link href="/dog-friendly">Dog Friendly Guide</Link>
        </li>

        <li>
          <Link href="/best-beaches">Best Beaches</Link>
        </li>

        <li>
          <Link href="/weekend-itinerary">Weekend Itinerary</Link>
        </li>
      </ul>

    </main>
  );
}