import { DishEntity } from '@/entities/dish.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  And,
  FindManyOptions,
  FindOptionsOrderValue,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { DishCreateDto, DishUpdateDto } from '../dto/dish.dto';
import { CBadRequestException } from '@/common/exception/bad-request.exception';
import { ErrorCode } from '@/constants/error';
import { SuccessResponse } from '@/common/util/type';
import { DishFindDto } from '../dto/DishFind.dto';
@Injectable()
export class DishService {
  constructor(
    @InjectRepository(DishEntity)
    private readonly repo: Repository<DishEntity>,
  ) {}

  #fields = {
    name: 'name',
    desc: 'description',
    price: 'price',
  };

  /**
   * @param {DishCreateDto} dish
   * @returns {DishEntity} dish
   */
  async create(dish: DishCreateDto): Promise<DishEntity> {
    const { name, description, image, price } = dish;
    try {
      const dish = await this.repo.findOne({
        where: [
          {
            name,
          },
          { description },
        ],
      });

      if (dish) {
        throw new CBadRequestException(ErrorCode.DISH_ALREADY_EXISTS);
      }

      const newDish: DishEntity = { name, description, image, price };
      return await this.repo.save(newDish);
    } catch (error) {
      throw new CBadRequestException(ErrorCode.CANNOT_CREATE_DISH);
    }
  }

  /**
   *
   * @param {DishUpdateDto} dish
   * @returns {DishEntity} dish
   */
  async update(dish: DishUpdateDto): Promise<DishEntity> {
    const { id, name, description, image, price } = dish;
    try {
      const dish = await this.repo.findOne({ where: { id: id || 0 } });
      if (!dish) {
        return new CBadRequestException(ErrorCode.DISH_NOT_FOUND);
      }

      const newDish: DishEntity = {
        id,
        name: name || dish.name,
        description: description || dish.description,
        image: image || dish.image,
        price: price || dish.price,
      };
      return await this.repo.save(newDish);
    } catch (error) {
      throw new CBadRequestException(ErrorCode.CANNOT_CREATE_DISH);
    }
  }

  /**
   *
   * @param {number} id
   * @returns {SuccessResponse}
   */
  async delete(id: number): Promise<SuccessResponse> {
    try {
      const deleted = await this.repo.softDelete(id);
      if (!deleted) {
        throw new CBadRequestException(ErrorCode.CANNOT_DELETE);
      }
      return {
        success: true,
      };
    } catch (error) {
      throw new CBadRequestException(ErrorCode.CANNOT_DELETE);
    }
  }

  /**
   *
   * @param {number} id
   * @returns {SuccessResponse}
   */
  async restore(id: number): Promise<SuccessResponse> {
    try {
      const restored = await this.repo.restore(id);
      if (!restored) {
        throw new CBadRequestException(ErrorCode.CANNOT_RESTORE);
      }
      return {
        success: true,
      };
    } catch (error) {
      throw new CBadRequestException(ErrorCode.CANNOT_RESTORE);
    }
  }

  /**
   *
   * @param {number} id
   * @returns {DishEntity}
   */
  async getById(id: number): Promise<DishEntity> {
    try {
      return await this.repo.findOne({ where: { id: id || 0 } });
    } catch (error) {
      throw new CBadRequestException(ErrorCode.CANNOT_CREATE_DISH);
    }
  }

  /**
   *
   * @param {DishFindDto} payload
   * @returns {DishEntity[]}
   */
  async getDish(payload: DishFindDto): Promise<DishEntity[]> {
    try {
      const { searchField, searchKey, condition, limit } = payload;
      const page = payload?.page ? payload?.page : 1;
      const order = payload?.order ? payload?.order : 'DESC';
      const pageLimit = limit ? limit : 10;

      const findOptions: FindManyOptions<DishEntity> = {
        skip: (page - 1) * pageLimit,
        take: pageLimit,
        order: {
          price: order as FindOptionsOrderValue,
        },
      };
      if (searchField && searchKey) {
        if (searchField === 'price') {
          if (condition === 'mt') {
            findOptions.where = {
              price: MoreThan(Number(searchKey) || 0),
            };
          }
          if (condition === 'lt') {
            findOptions.where = {
              price: LessThan(Number(searchKey) || 0),
            };
          }
          if (condition === 'in') {
            const searchKeys = searchKey.split(',');
            findOptions.where = {
              price: And(
                MoreThanOrEqual(Number(searchKeys[0])),
                LessThanOrEqual(Number(searchKeys[1])),
              ),
            };
          }
        } else {
          findOptions.where = {
            [this.#fields[searchField]]: Like('%' + searchKey + '%'),
          };
        }
      }

      return await this.repo.find(findOptions);
    } catch (error) {
      throw new CBadRequestException(ErrorCode.NOT_FOUND);
    }
  }
}
