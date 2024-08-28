import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entitiy';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserData } from 'src/interfaces/i_User';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // User 엔티티에 대한 Repository 주입
  ) {}

  async userCheck(
    userData: IUserData | undefined,
  ): Promise<IUserData | boolean> {
    try {
      console.log('유저 체크, 유저 데이터', userData);
      if (!userData) {
        console.log('유저 데이터 없음');
        return false;
      } else {
        console.log('유저 데이터 있음, 체크시작');
        const userDataFromDb = await this.userRepository.findOneBy({
          id: userData.id,
        });

        if (
          userData.id === userDataFromDb.id &&
          userData.name === userDataFromDb.name &&
          userData.email === userDataFromDb.email &&
          userData.intro === userDataFromDb.intro
        ) {
          console.log('유저 확인');
          return userDataFromDb;
        } else {
          console.log('유저 정보가 다름');
          return false;
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async userCreate({ name, email, intro }) {
    try {
      if (name && email && intro) {
        const user = new User();
        user.name = name;
        user.email = email;
        user.intro = intro;

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

  async userUpdate({ id, name, email, intro }: IUserData) {
    try {
      await this.userRepository.update({ id: id }, { name, email, intro });

      return await this.userRepository.findOneBy({
        id: id,
      });
    } catch (err) {
      throw err;
    }
  }
}
