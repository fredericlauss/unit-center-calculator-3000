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
  const [totalRanks, setTotalRanks] = useState(0); 
  const [totalColumns, setTotalColumns] = useState(0); 
  const [minisOnLastRank, setMinisOnLastRank] = useState(0); 

  const SQUARE_SIZE = 10;

  // Dimensions des rectangles
  const fullRectangleWidth = totalColumns;
  const fullRectangleHeight = totalRanks - 1;
  const partialRectangleWidth = minisOnLastRank;
  const partialRectangleHeight = minisOnLastRank > 0 ? 1 : 0;
  
  // Barycentre du rectangle complet
  const barycenterFullRectangleRank = fullRectangleHeight / 2;
  const barycenterFullRectangleColumn = fullRectangleWidth / 2;
  
  // Barycentre du rectangle partiel (dernier rang)
  const barycenterPartialRectangleRank = totalRanks - 0.5;
  const barycenterPartialRectangleColumn = partialRectangleWidth / 2;
  
  // Poids des rectangles
  const weightFullRectangle = fullRectangleHeight * fullRectangleWidth;
  const weightPartialRectangle = partialRectangleHeight * partialRectangleWidth;
  
  // Barycentre global
  const barycenterPositionRank =
    (barycenterFullRectangleRank * weightFullRectangle +
      barycenterPartialRectangleRank * weightPartialRectangle) /
    (weightFullRectangle + weightPartialRectangle);
  
  const barycenterPositionColumn =
    (barycenterFullRectangleColumn * weightFullRectangle +
      barycenterPartialRectangleColumn * weightPartialRectangle) /
    (weightFullRectangle + weightPartialRectangle);
  
  // Conversion en pixels
  const barycenterX = barycenterPositionColumn * SQUARE_SIZE;
  const barycenterY = barycenterPositionRank * SQUARE_SIZE;
  
  console.log("Barycenter (Rank):", barycenterPositionRank);
  console.log("Barycenter (Column):", barycenterPositionColumn);
   

    const createSchema = () => {
      const schema = [];
  
      for (let i = 0; i < totalRanks; i++) {
        const isLastRank = i === totalRanks - 1;
        const columnsInRank = isLastRank ? minisOnLastRank : totalColumns;
  
        schema.push(
          <div key={i} className="flex flex-row justify-start">
            {Array.from({ length: columnsInRank }).map((_, j) => (
              <div
                key={`${i}-${j}`}
                style={{
                  width: `${SQUARE_SIZE}px`,
                  height: `${SQUARE_SIZE}px`,
                }}
                className="bg-gray-300 shadow-inner border-[1px] border-gray-500"
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
              <Label>Total number of ranks:</Label>
              <Input
                type="number"
                value={totalRanks}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTotalRanks(parseInt(e.target.value) || 0)
                }
              />
            </div>
            <div>
              <Label>Total number of columns:</Label>
              <Input
                type="number"
                value={totalColumns}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTotalColumns(parseInt(e.target.value) || 0)
                }
              />
            </div>
            <div>
              <Label>Number of minis on the last rank:</Label>
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
        <Card className="basis-1/4 grow mt-0 relative">
          <CardHeader>
            <CardTitle>Schema</CardTitle>
          </CardHeader>
          <CardContent >
            <div className="relative w-fit">
              <div className="flex flex-col items-start w-fit">{createSchema()}</div>
              <div
                  className="absolute bg-red-500 w-4 h-4 rounded-full"
                  style={{
                    top: `${barycenterY - 8}px`,
                    right: `${barycenterX - 8}px`,
                  }}
              ></div>
            </div>

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
                  {/* <TableCell>Total rank weight</TableCell>
                  <TableCell>{totalRankWeight}</TableCell> */}
                </TableRow>
                <TableRow>
                  {/* <TableCell>Full rank weight</TableCell>
                  <TableCell>{fullRankWeight}</TableCell> */}
                </TableRow>
                <TableRow>
                  {/* <TableCell>Partial rank weight</TableCell>
                  <TableCell>{partialRankWeight}</TableCell> */}
                </TableRow>
                <TableRow>
                  {/* <TableCell>Full ranks</TableCell>
                  <TableCell>{fullRanks}</TableCell> */}
                </TableRow>
                <TableRow>
                  {/* <TableCell>Incomplete ranks</TableCell>
                  <TableCell>{incompleteRanks}</TableCell> */}
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
                  {/* <TableCell>Total column weight</TableCell>
                  <TableCell>{totalColumnWeight}</TableCell> */}
                </TableRow>
                <TableRow>
                  {/* <TableCell>Full column weight</TableCell>
                  <TableCell>{fullColumnWeight}</TableCell> */}
                </TableRow>
                <TableRow>
                  {/* <TableCell>Partial column weight</TableCell>
                  <TableCell>{partialColumnWeight}</TableCell> */}
                </TableRow>
                <TableRow>
                  {/* <TableCell>Incomplete columns</TableCell>
                  <TableCell>{incompleteColumns}</TableCell> */}
                </TableRow>
                <TableRow>
                  {/* <TableCell>Complete columns</TableCell>
                  <TableCell>{completeColumns}</TableCell> */}
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