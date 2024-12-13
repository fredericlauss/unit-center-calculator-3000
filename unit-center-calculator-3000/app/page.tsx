"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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

  const createSchema = () => {
    const schema = [];

    // Boucle pour chaque rang
    for (let i = 0; i < totalRanks; i++) {
      // Dernier rang
      const isLastRank = i === totalRanks - 1;
      const columnsInRank = isLastRank ? minisOnLastRank : totalColumns;

      // Ajouter les colonnes dans un rang
      schema.push(
        <div key={i} className="flex flex-row justify-start gap-0">
          {Array.from({ length: columnsInRank }).map((_, j) => (
            <div
              key={`${i}-${j}`}
              className="w-6 h-6 bg-gray-500 shadow-inner border-[1px] border-gray-300"
            />
          ))}
        </div>
      );
    }

    return schema;
  };

  return (
    <div className="py-[75px]">
      <div className="mx-auto max-w-[1350px] box-border">
        <div className="flex-1 p-8 pt-6 flex flex-row flex-wrap gap-[25px]">
        <h1 className="text-xl font-bold mb-4 basis-[100%]">Unit center calculator 3000</h1>

        <Card className="basis-1/4 grow mt-0">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Barycenter Coordinates */}
        <Card className="basis-1/4 grow mt-0">
          <CardHeader>
            <CardTitle>Barycenter Coordinates</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
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
          </CardContent>
        </Card>

        {/* Unit schema */}
        <Card className="basis-1/4 grow mt-0">
          <CardHeader>
            <CardTitle>Schema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-start gap-0">{createSchema()}</div>
          </CardContent>
        </Card>

        {/* Table for Rows */}
        <Card className="basis-1/3 grow mt-0">
          <CardHeader>
            <CardTitle>Row Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
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
          </CardContent>
        </Card>

        {/* Table for Columns */}
        <Card className="basis-1/3 grow mt-0">
          <CardHeader>
            <CardTitle>Column Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
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
          </CardContent>
        </Card>

        </div>
      </div>
    </div>
  );
}