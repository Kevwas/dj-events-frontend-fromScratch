import Link from "next/link";
import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}

      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

// export async function getServerSideProps() {
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?&sort=date:ASC&pagination[page]=1&pagination[pageSize]=3&populate=*`);
  const resJson = await res.json();
  const events = resJson.data;

  // return {
  //   props: { events },
  // };
  return {
    props: { events },
    revalidate: 1,
  };
}
