// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
// import EventMap from "@/components/EventMap";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import { useRouter } from "next/router";

export default function EventPage({ evt }) {
  // const router = useRouter();

  const deleteEvent = (e) => {};

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/event/edit/${evt.id}`}>
            <a><FaPencilAlt /> Edit Event</a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}><FaTimes/> Delete Event</a>
        </div>

        <span>
          {new Date(evt.attributes.date).toLocaleDateString("en-US")} at {evt.attributes.time}
        </span>
        <h1>{evt.attributes.name}</h1>
        {/* <ToastContainer /> */}
        {evt.attributes.image && (
          <div className={styles.image}>
            <Image
              // src={evt.image.formats.medium.url}
              src={evt.attributes.image.data.attributes.formats.medium.url}
              width={960}
              height={600}
              alt="Image of the event"
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.attributes.performers}</p>
        <h3>Description:</h3>
        <p>{evt.attributes.description}</p>
        <h3>Venue: {evt.attributes.venue}</h3>
        <p>{evt.attributes.address}</p>

        {/* <EventMap evt={evt} /> */}

        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const resJson = await res.json();
  const events = resJson.data;

  const paths = events.map((evt) => ({
    params: { slug: evt.attributes.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/?slug=${slug}&populate=*`);
  const resJson = await res.json();
  const event = resJson.data;

  return {
    props: {
      evt: event[0],
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();

//   return {
//     props: {
//       evt: events[0],
//     },
//   };
// }
