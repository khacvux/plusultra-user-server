import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getUserByid({ userId, id }: { userId: number; id: number }) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          _count: {
            select: {
              followers: true,
              followings: true,
            },
          },
        },
      });
      delete user.hash;
      delete user.modifiedAt;
      delete user.telephone;
      delete user.roleId

      const following = await this._checkFollowing(userId, id);

      if (user.private && !following)
        return {
          private: true,
          following: following,
        };

      return {
        ...user,
        following: following,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getUserFollow(userId: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        avatar: false,
        createdAt: false,
        email: false,
        firstName: false,
        lastName: false,
        id: false,
        followers: {
          select: {
            follower: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
        followings: {
          select: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  async _checkFollowing(userId: number, followerId: number): Promise<Boolean> {
    return (await this.prisma.follow.findFirst({
      where: {
        userId: userId,
        followerId: followerId,
      },
    }))
      ? true
      : false;
  }
}
