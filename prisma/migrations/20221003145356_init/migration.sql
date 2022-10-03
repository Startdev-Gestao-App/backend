-- CreateTable
CREATE TABLE "Texts" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "dayId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Texts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Texts" ADD CONSTRAINT "Texts_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE SET NULL ON UPDATE CASCADE;
