import { NextPage } from "next";
import Link from "next/link";
import { trpc } from "../../utils/trpc";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const TrpcTest: NextPage = (props) => {
  const { data, error } = trpc.useQuery(["getAllRooms", { name: "" }]);
  if (!data && !error) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error?.message}</div>;
  }
  return (
    <>
      <Header />
      <main className="min-w-full min-h-screen bg-gray-800">
        <ul>
          {data &&
            data.map((room) => (
              <Link href={`/rooms/${room.id}`}>
                <a>
                  <li key={room.id}>
                    {room.name} - ${room.pricePerNight} - {room.category}
                  </li>
                </a>
              </Link>
            ))}
        </ul>
      </main>
      <Footer />
    </>
  );
};

export default TrpcTest;
