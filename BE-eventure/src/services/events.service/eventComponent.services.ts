import { getFilePath } from "../../utils/filePath";
import { ICreateEvents, ValidationRequest } from "../../utils/interfaceCustom";

export class ComponentEvent {
  async createComponent(
    tsx: any,
    req: ValidationRequest,
    create: ICreateEvents,
    slug: string,
    userId: string,
    newAddress: any
  ) {
    const files = req.files;
    return await tsx.event.create({
      data: {
        name: create.name,
        description: create.description,
        slug,
        availableSeats: Number(create.availableSeats),
        price: Number(create.price),
        startDate: new Date(create.startDate),
        endDate: new Date(create.endDate),
        gallery: {
          create: [
            {
              imageUrl: getFilePath(files.cover?.[0].path, req),
              imageType: "cover",
            },
            {
              imageUrl: getFilePath(files.thumbnail?.[0].path, req),
              imageType: "thumbnail",
            },
          ],
        },
        address: { connect: { id: newAddress.id } },
        category: { connect: { id: create.categoryId } },
        organizer: { connect: { id: userId } },
      },
      include: {
        address: {
          select: {
            id: true,
            address: true,
            city: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        gallery: {
          select: {
            id: true,
            imageType: true,
            imageUrl: true,
          },
        },
      },
    });
  }
}
