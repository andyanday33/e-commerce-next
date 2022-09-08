import next, { NextPage } from "next";
import Link from "next/link";
import { trpc } from "../../utils/trpc";
import Layout from "../../components/layout/Layout";
import PostingCard from "../../components/PostingCard";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import Modal from "../../components/Modal";

type PaginationProps = {
  roomCount: number;
  roomsPerPage: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  className: string;
};

const Pagination: React.FC<PaginationProps> = ({
  roomCount,
  roomsPerPage,
  page,
  setPage,
  className,
}) => {
  const handlePrevPage = useCallback(() => {
    setPage((prev) => prev - 1);
  }, []);
  const handleNextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);
  const nextPageExists = roomCount - roomsPerPage * page > 0;
  return (
    <div className={`btn-group ${className}`}>
      <button
        className="btn btn-outline btn-secondary"
        onClick={handlePrevPage}
        disabled={page <= 1}
      >
        «
      </button>
      <button className="btn btn-secondary">{page}</button>
      <button
        className="btn btn-outline btn-secondary"
        onClick={handleNextPage}
        disabled={!nextPageExists}
      >
        »
      </button>
    </div>
  );
};

const Rooms: NextPage = (props) => {
  const [page, setPage] = useState(1);
  const { data, error } = trpc.useQuery(["room.getAllRooms", { page }]);
  return (
    <Layout>
      <h2 className="text-center text-gray-300 xs:text-start my-14 mx-[5%] text-4xl">
        All Stays
      </h2>
      <div className="flex mb-8 flex-col mx-[10%] sm:mx-[5%] sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Search stays..."
          className="input input-bordered input-secondary rounded-lg max-w-xs"
        />
        <button className="btn btn-secondary">Search</button>
        <Modal />
      </div>

      <section className="mb-16 mx-[10%] grid grid-cols-1 gap-6 xs:mx-[5%] xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {/* TODO: add a spinner here */}
        {!data && !error && <p>Loading</p>}
        {!data && error && <p>Error: {error.message}</p>}
        {data &&
          data[1].map((room) => <PostingCard key={room.id} room={room} />)}
      </section>
      <div className="flex mb-8">
        {data && (
          <Pagination
            roomCount={data[0]}
            roomsPerPage={5}
            page={page}
            setPage={setPage}
            className="mx-auto"
          />
        )}
      </div>
    </Layout>
  );
};

export default Rooms;
