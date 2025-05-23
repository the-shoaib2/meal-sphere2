-- Add resetToken and resetTokenExpiry columns to User table
ALTER TABLE "User" 
ADD COLUMN "resetToken" TEXT,
ADD COLUMN "resetTokenExpiry" TIMESTAMP(3);

-- Create an index on resetToken for faster lookups
CREATE UNIQUE INDEX "User_resetToken_key" ON "User"("resetToken");
