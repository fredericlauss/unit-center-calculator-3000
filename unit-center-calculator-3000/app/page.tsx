"use client";

import { useState } from "react";

export default function Home() {
  const [totalRanks, setTotalRanks] = useState(0); // C2
  const [totalColumns, setTotalColumns] = useState(0); // C3
  const [minisOnLastRank, setMinisOnLastRank] = useState(0); // C4

  // Rank-related calculations
  const totalRankWeight = (totalRanks - 1) * totalColumns + minisOnLastRank; // C8
  const fullRankWeight = totalColumns; // C9
  const partialRankWeight = minisOnLastRank; // C10
  const incompleteRanks = minisOnLastRank < totalColumns ? 1 : 0; // C12
  const fullRanks = totalRanks - incompleteRanks; // C11
  const totalRankSum = (totalRanks * (totalRanks + 1)) / 2; // C14
  const fullRankSum = (fullRanks * (fullRanks + 1)) / 2; // C13
  const partialRankSum = totalRankSum - fullRankSum; // C15

  // Column-related calculations
  const totalColumnWeight =
    totalColumns * totalRanks + (minisOnLastRank - totalColumns); // F8
  const fullColumnWeight = totalRanks; // F9
  const partialColumnWeight = totalRanks - 1; // F10
  const incompleteColumns = totalColumns - minisOnLastRank; // F11
  const completeColumns = totalColumns - incompleteColumns; // F12
  const completeColumnSum = (completeColumns * (completeColumns + 1)) / 2; // F13
  const totalColumnSum = (totalColumns * (totalColumns + 1)) / 2; // F14
  const partialColumnSum = totalColumnSum - completeColumnSum; // F15

  // Barycenter calculations
  const barycenterPositionRank =
    (fullColumnWeight * completeColumnSum +
      partialColumnWeight * partialColumnSum) /
    totalColumnWeight; // Position along the rank
  const barycenterPositionColumn =
    (fullRankWeight * fullRankSum +
      partialRankWeight * partialRankSum) /
    totalRankWeight; // Position along the column

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Barycenter Calculator</h1>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Total number of ranks (C2):
          </label>
          <input
            type="number"
            value={totalRanks}
            onChange={(e) => setTotalRanks(parseInt(e.target.value) || 0)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Total number of columns (C3):
          </label>
          <input
            type="number"
            value={totalColumns}
            onChange={(e) => setTotalColumns(parseInt(e.target.value) || 0)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Number of minis on the last rank (C4):
          </label>
          <input
            type="number"
            value={minisOnLastRank}
            onChange={(e) => setMinisOnLastRank(parseInt(e.target.value) || 0)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-bold mb-2">Results</h2>
        <p>Total rank weight: {totalRankWeight}</p>
        <p>Full rank weight: {fullRankWeight}</p>
        <p>Partial rank weight: {partialRankWeight}</p>
        <p>Barycenter position along ranks: {barycenterPositionRank.toFixed(2)}</p>
        <p>
          Barycenter position along columns:{" "}
          {barycenterPositionColumn.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
