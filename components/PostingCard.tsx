import { Room, RoomImage } from "@prisma/client";
import React from "react";
import Link from "next/link";
import Rating from "./Rating";

type Props = {
  room: Room & { images: RoomImage[] };
};

const PostingCard: React.FC<Props> = ({ room }) => {
  return (
    <Link href={`/rooms/${room.id}`}>
      <a className="w-80">
        <div className="flex card border-2 border-gray-600 bg-base-100 h-full shadow-xl motion-safe:hover:scale-105 duration-500">
          <figure className="object-fill flex flex-1">
            {room.images && (
              <img
                src={room.images[0]?.url}
                alt="Hotel-House Posting Image"
                className="m-auto"
              />
            )}
          </figure>
          <div className="flex card-body">
            <h2 className="mt-auto card-title">
              {room.name}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p className="max-h-[3rem] text-xs">
              {room.description.substring(0, 100)}...
            </p>
            <Rating
              roomName={room.name}
              rating={room.ratings}
              numberOfReviews={room.numOfReviews}
              readOnly={true}
            />
            <div className="card-actions justify-end">
              {/* TODO: add other badges here */}
              {room.internet && (
                <div className="badge badge-outline">Internet</div>
              )}
              {room.breakfast && (
                <div className="badge badge-outline">Breakfast</div>
              )}
              {room.petsAllowed && (
                <div className="badge badge-outline">Pets Allowed</div>
              )}
              {room.airconditioned && (
                <div className="badge badge-outline">Air Conditioned</div>
              )}
              {room.roomCleaning && (
                <div className="badge badge-outline">Room Cleaning</div>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default PostingCard;
