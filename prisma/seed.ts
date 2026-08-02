import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const user = await db.user.upsert({
    where: { id: "dev-user" },
    update: {},
    create: {
      id: "dev-user",
      name: "Ezz",
      email: "dev@piscerya.local",
    },
  });

  const workspace = await db.workspace.upsert({
    where: { id: "dev-workspace" },
    update: {},
    create: {
      id: "dev-workspace",
      name: "Piscerya Productive",
      ownerId: user.id,
    },
  });

  console.log("Seed selesai:", { userId: user.id, workspaceId: workspace.id });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
