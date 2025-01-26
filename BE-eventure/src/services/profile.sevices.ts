import slugify from "slugify/slugify";
import prisma from "../utils/prismaClient";
import { ValidationRequest } from "../utils/interfaceCustom";
import { Request } from "express";
import { appError } from "../utils/responses";

export class profileServices {
  async profileUpdate(req: Request) {
    const { slug } = req.params;
    const Request = req as ValidationRequest;
    const file = Request.file;
    const { name, phone, address, city } = req.body;

    return prisma.$transaction(async (tsx) => {
      const user = await tsx.user.findUnique({
        where: { slug },
        include: {
          profile: {
            include: {
              imageProfile: true,
              address: true,
            },
          },
        },
      });
      if (!user) {
        throw new appError("User not found", 404);
      }

      const profile = user?.profile;

      let imageUrl = null;
      if (file) {
        imageUrl = `${Request.protocol}://${Request.get(
          "host"
        )}/public/uploads/${file.filename}`;
        if (profile?.imageProfile.length) {
          await tsx.gallery.deleteMany({
            where: { profileId: profile?.id },
          });
        }
        await tsx.gallery.create({
          data: {
            profileId: profile?.id,
            imageUrl,
            imageType: "profile",
          },
        });
      }

      const updateProfile = await tsx.profile.update({
        where: { userId: user?.id },
        data: {
          name: name || profile?.name,
          phone: phone || profile?.phone,
        },
      });

      if (updateProfile) {
        const slugNew = slugify(updateProfile.name, {
          lower: true,
          strict: true,
        });
        await tsx.user.update({
          where: { slug },
          data: {
            slug: slugNew,
          },
        });
      }
      if (address || city) {
        const existingAddress = await tsx.address.findUnique({
          where: { profileId: updateProfile.id },
        });

        if (existingAddress) {
          await tsx.address.update({
            where: { id: existingAddress.id },
            data: {
              address: address || profile?.address?.address,
              city: city || profile?.address?.city,
            },
          });
        } else {
          await tsx.address.create({
            data: {
              profileId: profile?.id,
              address,
              city,
            },
          });
        }
      }

      return updateProfile;
    });
  }

  async getProfile(req: Request) {
    const { slug } = req.params;

    const user = await prisma.user.findUnique({
      where: { slug },
      include: {
        profile: {
          include: {
            imageProfile: true,
            address: true,
          },
        },
      },
    });
    if (!user) {
      throw new appError("User not found", 404);
    }

    return {
      name: user.profile?.name,
      phone: user.profile?.phone,
      imageProfile: user.profile?.imageProfile.map((image) => ({
        id: image.id,
        imageUrl: image.imageUrl,
        imageType: image.imageType,
      })),
      address: {
        id: user.profile?.address?.id,
        address: user.profile?.address?.address,
        city: user.profile?.address?.city,
      },
    };
  }
}
