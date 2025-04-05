import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validate.service';
import { DeleteResponse } from 'src/models/common.model';
import { RoomTypeCreateRequest, RoomTypeResponse, RoomTypeUpdateRequest } from 'src/models/room.model';
import { RoomtypeValidation } from 'src/room/room.validation';
import { Logger } from 'winston';

@Injectable()
export class RoomtypeService {
    constructor(
        private readonly validationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prisma: PrismaService,
    ) {}

  async createRoomType(
    request: RoomTypeCreateRequest,
  ): Promise<RoomTypeResponse> {
    this.logger.info(`Creating new room type`);
    const roomRequest: RoomTypeCreateRequest = this.validationService.validate(
      RoomtypeValidation.CREATE,
      request,
    );

    const roomType = await this.prisma.roomType.create({
      data: roomRequest,
    });

    return {
      id_roomtype: roomType.id_roomtype,
      room_type: roomType.room_type,
      price: roomType.price,
      created_at: roomType.created_at,
      updated_at: roomType.updated_at,
    };
  }

  async findAllRoomType(): Promise<RoomTypeResponse[]> {
    this.logger.info(`Finding all room types`);
    const roomTypes = await this.prisma.roomType.findMany({
      where: { deleted: false , },
     });
    console.log(roomTypes);
    return roomTypes.map((roomType) => ({
      id_roomtype: roomType.id_roomtype,
      room_type: roomType.room_type,
      price: roomType.price,
      created_at: roomType.created_at,
      updated_at: roomType.updated_at,
    }));
  }

  async findOneRoomType(id: string): Promise<RoomTypeResponse> {
    this.logger.info(`Finding room type with id ${id}`);
    const roomType = await this.prisma.roomType.findUnique({
      where: { id_roomtype: id, deleted: false },
    });
    if (!roomType) {
      throw new HttpException('Room Type not found', 404);
    }
    return {
      id_roomtype: roomType.id_roomtype,
      room_type: roomType.room_type,
      price: roomType.price,
      created_at: roomType.created_at,
      updated_at: roomType.updated_at,
    };
  }

  async updateRoomType(
    id: string,
    request: RoomTypeUpdateRequest,
  ): Promise<RoomTypeResponse> {
    this.logger.info(`Updating room type with id ${id}`);
    const roomRequest: RoomTypeUpdateRequest = this.validationService.validate(
      RoomtypeValidation.UPDATE,
      request,
    );

    const existingRoomType = await this.prisma.roomType.count({
      where: { id_roomtype: id, deleted: false },
    });
    if (existingRoomType === 0) {
      throw new HttpException('Room Type not found', 404);
    }

    const roomType = await this.prisma.roomType.update({
      where: { id_roomtype: id },
      data: roomRequest,
    });

    return {
      id_roomtype: roomType.id_roomtype,
      room_type: roomType.room_type,
      price: roomType.price,
      created_at: roomType.created_at,
      updated_at: roomType.updated_at,
    };
  }


  async deleteRoomType(id: string): Promise<DeleteResponse> {
    this.logger.info(`Deleting room type with id ${id}`);

    const roomType = await this.prisma.roomType.findUnique({
      where: { id_roomtype: id, deleted: false },
    });
    if (!roomType) {
      throw new HttpException('Room Type not found', 404);
    }

    await this.prisma.roomType.update({
      where: { id_roomtype: id },
      data: { deleted: true },
    });

    return { message: 'Deleted successfully' };
  }
}
