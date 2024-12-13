"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { ChangeEvent, useState } from "react";

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
          <Label>Total number of ranks (C2):</Label>
          <Input
            type="number"
            value={totalRanks}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTotalRanks(parseInt(e.target.value) || 0)
            }
          />
        </div>
        <div>
          <Label>Total number of columns (C3):</Label>
          <Input
            type="number"
            value={totalColumns}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTotalColumns(parseInt(e.target.value) || 0)
            }
          />
        </div>
        <div>
          <Label>Number of minis on the last rank (C4):</Label>
          <Input
            type="number"
            value={minisOnLastRank}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMinisOnLastRank(parseInt(e.target.value)  || 0)
            }
          />
        </div>
      </div>

        {/* Table for Rows */}
        <Table className="mt-6">
        <TableCaption>Row Data</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Total rank weight</TableCell>
            <TableCell>{totalRankWeight}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Full rank weight</TableCell>
            <TableCell>{fullRankWeight}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Partial rank weight</TableCell>
            <TableCell>{partialRankWeight}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Full ranks</TableCell>
            <TableCell>{fullRanks}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Incomplete ranks</TableCell>
            <TableCell>{incompleteRanks}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Table for Columns */}
      <Table className="mt-6">
        <TableCaption>Column Data</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Total column weight</TableCell>
            <TableCell>{totalColumnWeight}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Full column weight</TableCell>
            <TableCell>{fullColumnWeight}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Partial column weight</TableCell>
            <TableCell>{partialColumnWeight}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Incomplete columns</TableCell>
            <TableCell>{incompleteColumns}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Complete columns</TableCell>
            <TableCell>{completeColumns}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Barycenter Coordinates */}
      <Table className="mt-6">
        <TableCaption>Barycenter Coordinates</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Rank coordinate</TableCell>
            <TableCell>{barycenterPositionRank.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Column coordinate</TableCell>
            <TableCell>{barycenterPositionColumn.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}