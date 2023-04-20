import { Injectable } from '@nestjs/common';
import { CreateAddressDto, DeleteAddressDto, UpdateAddressDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { PermissionDeniedException, ServerErrorException } from './exceptions';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAddressDto) {
    try {
      const address = await this.prisma.userAddress.create({
        data: {
          userId: dto.userId,
          address: dto.address,
          city: dto.city,
          postalCode: dto.postalCode,
          country: dto.country,
          telephone: dto.telephone,
        },
      });
      return {
        message: 'created',
        data: {
          addressId: address.id,
        },
      };
    } catch (error) {
      throw new ServerErrorException();
    }
  }

  async update({ id, userId, ...payload }: UpdateAddressDto) {
    try {
      await this.prisma.userAddress.updateMany({
        where: {
          id,
          userId,
        },
        data: {
          ...payload,
        },
      });
      return {
        message: 'updated',
      };
    } catch (error) {
      throw new PermissionDeniedException();
    }
  }

  async remove(payload: DeleteAddressDto) {
    try {
      await this.prisma.userAddress.deleteMany({
        where: {
          id: payload.id,
          userId: payload.userId,
        },
      });
      return {
        message: 'deleted',
      };
    } catch (error) {
      throw new PermissionDeniedException();
    }
  }
}
