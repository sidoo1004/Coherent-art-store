"use client";

import Image from "next/image";
import { useState } from "react";
import { ArtPiece } from "@/types";

interface RoomMockupProps {
  pieces: ArtPiece[];
}

export default function RoomMockup({ pieces }: RoomMockupProps) {
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [showDimensions, setShowDimensions] = useState(false);

  // Group pieces by room
  const rooms = pieces.reduce((acc, piece) => {
    if (!acc[piece.room]) {
      acc[piece.room] = [];
    }
    acc[piece.room].push(piece);
    return acc;
  }, {} as Record<string, ArtPiece[]>);

  const roomNames = Object.keys(rooms);
  const currentPieces = rooms[roomNames[selectedRoom]] || [];

  return (
    <div className="space-y-4">
      {/* Room Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        {roomNames.map((room, index) => (
          <button
            key={room}
            onClick={() => setSelectedRoom(index)}
            className={`
              px-4 py-2 rounded-t-lg font-medium transition-colors
              ${selectedRoom === index
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {room}
          </button>
        ))}
      </div>

      {/* Main Image Display */}
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        {currentPieces.length > 0 && (
          <Image
            src={currentPieces[0].fullImage}
            alt={currentPieces[0].name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        )}

        {/* Dimensions Toggle */}
        <button
          onClick={() => setShowDimensions(!showDimensions)}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors"
        >
          {showDimensions ? "Hide" : "Show"} Dimensions
        </button>

        {/* Dimensions Overlay */}
        {showDimensions && currentPieces.length > 0 && (
          <div className="absolute bottom-4 left-4 bg-black/75 text-white p-4 rounded-lg backdrop-blur-sm">
            <p className="text-sm font-semibold mb-2">{currentPieces[0].name}</p>
            <p className="text-sm">
              {currentPieces[0].dimensions.width}" × {currentPieces[0].dimensions.height}"
            </p>
            <p className="text-xs mt-1 opacity-80">
              {currentPieces[0].recommendedPlacement}
            </p>
          </div>
        )}
      </div>

      {/* Piece Details */}
      <div className="grid gap-4 mt-4">
        {currentPieces.map((piece) => (
          <div key={piece.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
              <Image
                src={piece.thumbnail}
                alt={piece.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-primary mb-1">{piece.name}</h4>
              <p className="text-sm text-gray-600 mb-2">
                {piece.dimensions.width}" × {piece.dimensions.height}"
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Recommended:</span> {piece.recommendedPlacement}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
