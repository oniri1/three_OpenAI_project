import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entitiy';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // User 엔티티에 대한 Repository 주입
  ) {}

  async userCheck(userId: number | undefined): Promise<boolean> {
    console.log('유저 아디', userId);
    if (!userId) {
      return false;
    } else {
      return true;
    }
  }

  async userCreate() {
    try {
      const user = new User();
      user.name = 'hamster';
      user.email = 'hamsterking@naver.com';
      user.intro = '저는 햄스터 킹 입니다.';

      await this.userRepository.save(user);
      const users = await this.userRepository.find();
      return users;
    } catch (err) {
      throw err;
    }
  }
}
