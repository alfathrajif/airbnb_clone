import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.listingPhotos.deleteMany(),
    prisma.listing.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const users = await Promise.all(
    Array.from({ length: 10 }).map(() => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      return prisma.user.create({
        data: {
          name: `${firstName} ${lastName}`,
          email: faker.internet.email({ firstName, lastName }).toLowerCase(),
          password: faker.internet.password(),
          profile_picture: faker.image.avatar(),
          role: faker.helpers.arrayElement(["ADMIN", "HOST", "GUEST"]),
        },
      });
    })
  );

  const hosts = await prisma.user.findMany({
    where: {
      role: "HOST",
    },
    select: {
      id: true,
    },
  });

  if (hosts.length === 0) {
    console.error("No hosts available");
    return;
  }

  const listings = await Promise.all(
    Array.from({ length: 6 * 4 }).map(() =>
      prisma.listing.create({
        data: {
          host: {
            connect: {
              id: faker.helpers.arrayElement(hosts).id,
            },
          },
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          location: `${faker.location.city()}, ${faker.location.country()}`,
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
          price_per_night: faker.number.float({ min: 50, max: 500, multipleOf: 0.01 }),
          max_guests: faker.number.int({ min: 1, max: 10 }),
          listing_photos: {
            createMany: {
              data: Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () => ({
                photo_url: faker.image.urlPicsumPhotos(),
              })),
            },
          },
          bedrooms: faker.number.int({ min: 1, max: 5 }),
          bathrooms: faker.number.int({ min: 1, max: 4 }),
          cancellation_policy: faker.helpers.arrayElement(["Flexible", "Moderate", "Strict"]),
          check_in_time: faker.date.soon(),
          check_out_time: faker.date.soon(),
        },
      })
    )
  );

  console.log(users);
  console.log(listings);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
