import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entitiy';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserData, IUserLogin } from 'src/interfaces/i_User';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeedBack } from '../ai/mongoDB/feedback.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(FeedBack.name) private FeedBackModel: Model<FeedBack>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // User 엔티티에 대한 Repository 주입
  ) {}

  async userFeedBacksGet(userId: number) {
    try {
      return await this.FeedBackModel.findOne({ userId })
        .sort({ feedBackId: -1 })
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async userCheck(
    userData: IUserData | undefined,
  ): Promise<IUserData | boolean> {
    try {
      if (!userData) {
        return false;
      } else {
        const userDataFromDb = await this.userRepository.findOneBy({
          id: userData.id,
        });

        if (
          userData.id === userDataFromDb.id &&
          userData.name === userDataFromDb.name &&
          userData.email === userDataFromDb.email &&
          userData.intro === userDataFromDb.intro &&
          userData.pw == userDataFromDb.pw
        ) {
          return userDataFromDb;
        } else {
          throw 'dont touch userData';
        }
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async userLogin(
    userData: IUserLogin | undefined,
  ): Promise<IUserData | boolean> {
    try {
      if (!userData) {
        return false;
      } else {
        const userDataFromDb = await this.userRepository.findOneBy({
          email: userData.email,
        });

        if (
          userData.email === userDataFromDb.email &&
          userData.pw == userDataFromDb.pw
        ) {
          return userDataFromDb;
        } else {
          throw 'password NotMatched';
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async userCreate({ name, email, intro, pw }) {
    try {
      if (name && email && intro && pw) {
        const user = new User();
        user.name = name;
        user.email = email;
        user.intro = intro;
        user.pw = pw;

        const saved = await this.userRepository.save(user);
        const userData: IUserData = await this.userRepository.findOneBy({
          id: saved.id,
        });
        return userData;
      } else {
        throw 'userCreate data not matched';
      }
    } catch (err) {
      throw err;
    }
  }

  async userUpdate({ id, name, email, intro, pw }: IUserData) {
    try {
      await this.userRepository.update({ id: id }, { name, email, intro, pw });

      return await this.userRepository.findOneBy({
        id: id,
      });
    } catch (err) {
      throw err;
    }
  }
}
