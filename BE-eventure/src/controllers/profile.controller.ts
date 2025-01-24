import { Response, Request } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { PrismaClient } from ".prisma/client";
import { ValidationRequest } from "../utils/interfaceCustom";
import slugify from "slugify/slugify";

const prisma = new PrismaClient();
export class Profile {
  profileUser = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const Request = req as ValidationRequest;
    const file = Request.file;
    const { name, phone, address, city } = req.body;

    const results = prisma.$transaction(async (tsx) => {
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
        res.status(402).json({
          message: "User not found",
        });
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

    res.status(200).json({
      message: "profile updated successfuly",
      data: results,
    });
  });
}
