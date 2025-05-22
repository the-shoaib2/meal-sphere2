/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX "GuestMeal_roomId_date_idx" ON "GuestMeal"("roomId", "date");

-- CreateIndex
CREATE INDEX "GuestMeal_userId_date_idx" ON "GuestMeal"("userId", "date");

-- CreateIndex
CREATE INDEX "Meal_roomId_date_idx" ON "Meal"("roomId", "date");

-- CreateIndex
CREATE INDEX "Meal_userId_date_idx" ON "Meal"("userId", "date");

-- CreateIndex
CREATE INDEX "Meal_type_date_idx" ON "Meal"("type", "date");

-- CreateIndex
CREATE INDEX "Notification_userId_read_idx" ON "Notification"("userId", "read");

-- CreateIndex
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");

-- CreateIndex
CREATE INDEX "Payment_roomId_status_date_idx" ON "Payment"("roomId", "status", "date");

-- CreateIndex
CREATE INDEX "Payment_userId_status_date_idx" ON "Payment"("userId", "status", "date");

-- CreateIndex
CREATE INDEX "Payment_method_status_idx" ON "Payment"("method", "status");

-- CreateIndex
CREATE INDEX "Room_isActive_idx" ON "Room"("isActive");

-- CreateIndex
CREATE INDEX "Room_createdAt_idx" ON "Room"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Room_name_key" ON "Room"("name");

-- CreateIndex
CREATE INDEX "RoomMember_roomId_role_idx" ON "RoomMember"("roomId", "role");

-- CreateIndex
CREATE INDEX "RoomMember_joinedAt_idx" ON "RoomMember"("joinedAt");

-- CreateIndex
CREATE INDEX "ShoppingItem_roomId_date_idx" ON "ShoppingItem"("roomId", "date");

-- CreateIndex
CREATE INDEX "ShoppingItem_amount_idx" ON "ShoppingItem"("amount");

-- CreateIndex
CREATE INDEX "ShoppingItem_userId_date_idx" ON "ShoppingItem"("userId", "date");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_isActive_idx" ON "User"("role", "isActive");

-- CreateIndex
CREATE INDEX "User_createdAt_updatedAt_idx" ON "User"("createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "User_emailVerified_isActive_idx" ON "User"("emailVerified", "isActive");

-- CreateIndex
CREATE INDEX "Vote_roomId_type_candidateId_idx" ON "Vote"("roomId", "type", "candidateId");

-- CreateIndex
CREATE INDEX "Vote_createdAt_idx" ON "Vote"("createdAt");
