import { PrismaClient } from "../../../prisma/generated/client";

const prisma = new PrismaClient();

interface BatchData {
  model: string;
  licenseLevel: number;
  quantity: number;
  date: string;
  comment: string;
}

export async function POST(req: any) {
  try {
    const { model, licenseLevel, quantity, date, comment } =
      (await req.json()) as BatchData;

    const machineNumbers = Array.from({ length: quantity }, (_, index) => {
      const serialNumber = Math.floor(Math.random() * 1000000).toString();
      return {
        model: model,
        date: date,
        serialNumber: serialNumber,
      };
    });
    machineNumbers.map(async (e) => {
      await prisma.batch.create({
        data: {
          model: model,
          licenseLevel: ~~licenseLevel,
          date: new Date(date).toISOString(),
          comment,
          serial_number: e.serialNumber,
        },
      });
    });

    const myBlob = new Blob();
    const myOptions = {
      status: 200,
      statusText: "Batch Created Successfully!",
    };
    return new Response(myBlob, myOptions);
  } catch (error: any) {
    console.error(error);
    const myBlob = new Blob();
    const myOptions = {
      status: 500,
      statusText: error,
    };
    return new Response(myBlob, myOptions);
  } finally {
    await prisma.$disconnect();
  }
}
