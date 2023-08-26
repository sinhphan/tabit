import { RateEntity } from '@/entities/rate.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RateCreateDto } from '../dto/rate.dto';
import { CBadRequestException } from '@/common/exception/bad-request.exception';
import { ErrorCode } from '@/constants/error';
@Injectable()
export class RateService {
  constructor(
    @InjectRepository(RateEntity)
    private readonly repo: Repository<RateEntity>,
  ) {}

  /**
   *
   * @param {RateCreateDto} payload
   * @returns
   */
  async create(payload: RateCreateDto): Promise<RateEntity> {
    const { comment, rate, userId, dishId } = payload;
    try {
      const check = await this.repo.findOne({
        where: { userId: userId || 0, dishId: dishId || 0 },
      });
      if (check) {
        throw new CBadRequestException(ErrorCode.USER_RATED);
      }
      const newRate: RateEntity = { comment, rate, userId, dishId };
      return await this.repo.save(newRate);
    } catch (error) {
      throw new CBadRequestException(
        ErrorCode.CANNOT_CREATE_RATE + ' ' + error.response.msg,
      );
    }
  }
}
