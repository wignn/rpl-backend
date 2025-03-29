-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('SINGLE', 'MARRIED');

-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'TENANT');

-- CreateEnum
CREATE TYPE "ROOMSTATUS" AS ENUM ('AVAILABLE', 'NOTAVAILABLE');

-- CreateEnum
CREATE TYPE "REPORTSTATUS" AS ENUM ('PENDING', 'SUCCESS');

-- CreateEnum
CREATE TYPE "TYPE" AS ENUM ('SUDAH', 'BELUM');

-- CreateEnum
CREATE TYPE "INOUT" AS ENUM ('INCOME', 'OUTCOME');

-- CreateTable
CREATE TABLE "user" (
    "id_user" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "ROLE" NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Tenant" (
    "id_tenant" TEXT NOT NULL,
    "id_user" TEXT,
    "full_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "no_ktp" TEXT NOT NULL,
    "status" "STATUS" NOT NULL,
    "no_telp" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id_tenant")
);

-- CreateTable
CREATE TABLE "Rent_Data" (
    "id_rent" TEXT NOT NULL,
    "id_tenant" TEXT,
    "id_room" TEXT NOT NULL,
    "rent_date" TIMESTAMP(3) NOT NULL,
    "rent_out" TIMESTAMP(3),
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rent_Data_pkey" PRIMARY KEY ("id_rent")
);

-- CreateTable
CREATE TABLE "Room" (
    "id_room" TEXT NOT NULL,
    "id_roomtype" TEXT NOT NULL,
    "status" "ROOMSTATUS" NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id_room")
);

-- CreateTable
CREATE TABLE "RoomType" (
    "id_roomtype" TEXT NOT NULL,
    "room_type" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomType_pkey" PRIMARY KEY ("id_roomtype")
);

-- CreateTable
CREATE TABLE "Report" (
    "id_report" TEXT NOT NULL,
    "id_tenant" TEXT NOT NULL,
    "id_facility" TEXT NOT NULL,
    "report_desc" TEXT NOT NULL,
    "report_date" TIMESTAMP(3) NOT NULL,
    "report_status" "REPORTSTATUS" NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id_report")
);

-- CreateTable
CREATE TABLE "Facility" (
    "id_facility" TEXT NOT NULL,
    "facility_name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Facility_pkey" PRIMARY KEY ("id_facility")
);

-- CreateTable
CREATE TABLE "Managepayment" (
    "id_mg" TEXT NOT NULL,
    "id_tenant" TEXT NOT NULL,
    "type" "TYPE" NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Managepayment_pkey" PRIMARY KEY ("id_mg")
);

-- CreateTable
CREATE TABLE "finance" (
    "id_finance" TEXT NOT NULL,
    "id_rent" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_room" TEXT NOT NULL,
    "type" "INOUT" NOT NULL,
    "category" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "finance_pkey" PRIMARY KEY ("id_finance")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_id_user_key" ON "Tenant"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "Rent_Data_id_tenant_key" ON "Rent_Data"("id_tenant");

-- CreateIndex
CREATE UNIQUE INDEX "Room_id_roomtype_key" ON "Room"("id_roomtype");

-- AddForeignKey
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent_Data" ADD CONSTRAINT "Rent_Data_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "Tenant"("id_tenant") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent_Data" ADD CONSTRAINT "Rent_Data_id_room_fkey" FOREIGN KEY ("id_room") REFERENCES "Room"("id_room") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_id_roomtype_fkey" FOREIGN KEY ("id_roomtype") REFERENCES "RoomType"("id_roomtype") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "Tenant"("id_tenant") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_id_facility_fkey" FOREIGN KEY ("id_facility") REFERENCES "Facility"("id_facility") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Managepayment" ADD CONSTRAINT "Managepayment_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "Tenant"("id_tenant") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finance" ADD CONSTRAINT "finance_id_rent_fkey" FOREIGN KEY ("id_rent") REFERENCES "Rent_Data"("id_rent") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finance" ADD CONSTRAINT "finance_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finance" ADD CONSTRAINT "finance_id_room_fkey" FOREIGN KEY ("id_room") REFERENCES "Room"("id_room") ON DELETE RESTRICT ON UPDATE CASCADE;
