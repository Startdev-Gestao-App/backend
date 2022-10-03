-- CreateTable
CREATE TABLE "Attachments" (
    "id" SERIAL NOT NULL,
    "file" TEXT NOT NULL,
    "dayId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attachments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attachments" ADD CONSTRAINT "Attachments_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE SET NULL ON UPDATE CASCADE;
