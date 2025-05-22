import prisma from "./prisma"

export async function createMealReminder(userId: string) {
  return prisma.notification.create({
    data: {
      userId,
      type: "MEAL_REMINDER",
      message: "Don't forget to mark your meals for today!",
      read: false,
    },
  })
}

export async function createPaymentDueNotification(userId: string, amount: number, dueDate: Date) {
  return prisma.notification.create({
    data: {
      userId,
      type: "PAYMENT_DUE",
      message: `You have a payment of ৳${amount} due on ${dueDate.toLocaleDateString()}.`,
      read: false,
    },
  })
}

export async function createVoteStartedNotification(userId: string, roomName: string, voteType: string) {
  return prisma.notification.create({
    data: {
      userId,
      type: "VOTE_STARTED",
      message: `A new ${voteType} vote has started in ${roomName}.`,
      read: false,
    },
  })
}

export async function createVoteEndedNotification(userId: string, roomName: string, voteType: string, winner: string) {
  return prisma.notification.create({
    data: {
      userId,
      type: "VOTE_ENDED",
      message: `The ${voteType} vote in ${roomName} has ended. ${winner} has won.`,
      read: false,
    },
  })
}

export async function createManagerChangedNotification(userId: string, roomName: string, managerName: string) {
  return prisma.notification.create({
    data: {
      userId,
      type: "MANAGER_CHANGED",
      message: `${managerName} is now the manager of ${roomName}.`,
      read: false,
    },
  })
}

export async function createShoppingAddedNotification(userId: string, roomName: string, amount: number) {
  return prisma.notification.create({
    data: {
      userId,
      type: "SHOPPING_ADDED",
      message: `New shopping items worth ৳${amount} have been added to ${roomName}.`,
      read: false,
    },
  })
}

export async function createCustomNotification(userId: string, message: string) {
  return prisma.notification.create({
    data: {
      userId,
      type: "CUSTOM",
      message,
      read: false,
    },
  })
}

export async function notifyAllRoomMembers(roomId: string, notificationType: string, message: string) {
  // Get all members of the room
  const roomMembers = await prisma.roomMember.findMany({
    where: {
      roomId,
    },
    select: {
      userId: true,
    },
  })

  // Create notifications for each member
  const notifications = await Promise.all(
    roomMembers.map((member) =>
      prisma.notification.create({
        data: {
          userId: member.userId,
          type: notificationType as any,
          message,
          read: false,
        },
      }),
    ),
  )

  return notifications
}
