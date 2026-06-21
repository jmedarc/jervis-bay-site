import Image from "next/image";
import Link from "next/link";

export default function FreeThingsToDo() {
  return (
    <main style={{ padding: 30, maxWidth: 900, margin: "auto" }}>
      
      {/* BACK LINK */}
      <div style={{ marginBottom: 20 }}>
        <Link href="/">
          ← Back to Home
        </Link>
      </div>

      <h1>Free Things To Do in Jervis Bay</h1>

      <section style={{ marginTop: 40 }}>
        <h2>White Sands Walk (Greenfield Beach)</h2>

        <Image
          src="/Greensfield_Beach.jpg"
          alt="Greenfield Beach Jervis Bay"
          width={900}
          height={500}
        />

        <p>
          One of the most scenic coastal walks in Australia, connecting
          crystal-clear beaches and white sand shoreline.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Hyams Beach</h2>

        <Image
          src="/Crystal_Clear_Hyams_Beach_White_Sand.jpg"
          alt="Hyams Beach Jervis Bay"
          width={900}
          height={500}
        />

        <p>
          Famous for its incredibly white sand and turquoise water.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Sunset at Collingwood Beach</h2>

        <Image
          src="/Collingwood_Beach_Beautiful_Sunset.jpg"
          alt="Collingwood Beach sunset Jervis Bay"
          width={900}
          height={500}
        />

        <p>
          One of the best free sunset locations in the region.
        </p>
      </section>

    </main>
  );
}