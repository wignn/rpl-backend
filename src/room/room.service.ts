import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validate.service';
import {
  RoomCreateRequest,
  RoomCreateResponse,
  RoomDetailResponse,
  RoomUpdateRequest,
} from 'src/models/room.model';
import { Logger } from 'winston';
import { RoomValidation } from './room.validation';
import { DeleteResponse } from 'src/models/common.model';

@Injectable()
export class RoomService {
  constructor(
    private ValidationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async create(request: RoomCreateRequest): Promise<RoomCreateResponse> {
    this.logger.info(`Creating new room`);
    const roomRequest: RoomCreateRequest = this.ValidationService.validate(
      RoomValidation.CREATE,
      request,
    );

    const isRoomExist = await this.prismaService.room.count({
      where: {
        id_roomtype: roomRequest.id_roomtype,
      },
    });

    if (isRoomExist === 0) {
      throw new HttpException('Room not exist', 404);
    }

    const room = await this.prismaService.room.create({
      data: {
        id_roomtype: roomRequest.id_roomtype,
        status: roomRequest.status,
      },
    });

    return {
      id_room: room.id_room,
      id_roomtype: room.id_roomtype,
      status: room.status,
      created_at: room.created_at,
      updated_at: room.updated_at,
    };
  }

  async findAll(): Promise<RoomDetailResponse[]> {
    this.logger.info(`Finding all rooms`);
    const rooms = await this.prismaService.room.findMany({
      where: {
        deleted: false,
      },
      include: {
        roomtype: true,
      },
    });
    return rooms.map((room) => ({
      id_room: room.id_room,
      id_roomtype: room.id_roomtype,
      status: room.status,
      created_at: room.created_at,
      updated_at: room.updated_at,
      roomtype: {
        id_roomtype: room.roomtype.id_roomtype,
        price: room.roomtype.price,
        created_at: room.roomtype.created_at,
        updated_at: room.roomtype.updated_at,
      },
    }));
  }

  async findOne(id: string): Promise<RoomDetailResponse> {
    this.logger.info(`Finding room with id ${id}`);
    const room = await this.prismaService.room.findUnique({
      where: {
        id_room: id,
      },
      include: {
        roomtype: true,
      },
    });

    if (!room) {
      throw new HttpException('Room not found', 404);
    }

    return {
      id_room: room.id_room,
      id_roomtype: room.id_roomtype,
      status: room.status,
      created_at: room.created_at,
      updated_at: room.updated_at,
      roomtype: {
        id_roomtype: room.id_roomtype,
        price: room.roomtype.price,
        created_at: room.roomtype.created_at,
        updated_at: room.roomtype.updated_at,
      },
    };
  }

  async update(
    id: string,
    request: RoomUpdateRequest,
  ): Promise<RoomCreateResponse> {
    this.logger.info(`Updating room with id ${id}`);
    const roomRequest: RoomUpdateRequest = this.ValidationService.validate(
      RoomValidation.UPDATE,
      request,
    );

    const isRoomExist = await this.prismaService.room.count({
      where: {
        id_roomtype: roomRequest.id_roomtype,
      },
    });

    if (isRoomExist === 0) {
      throw new HttpException('Room not exist', 404);
    }

    const isRoom = await this.prismaService.room.count({
      where: {
        id_room: id,
      },
    });

    if (isRoom === 0) {
      throw new HttpException('Room not found', 404);
    }

    const room = await this.prismaService.room.update({
      where: {
        id_room: id,
      },
      data: roomRequest,
    });

    return {
      id_room: room.id_room,
      id_roomtype: room.id_roomtype,
      status: room.status,
      created_at: room.created_at,
      updated_at: room.updated_at,
    };
  }

  async delete(id: string): Promise<DeleteResponse> {
    this.logger.info(`Deleting room with id ${id}`);

    await this.prismaService.room.update({
      where: {
        id_room: id,
      },
      data: {
        deleted: true,
      },
    });

    return {
      message: 'deleted successfully',
    };
  }
}
