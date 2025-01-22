import { UserEntity } from '../entities/user.entity';
import { User } from '../domain/user';
import { UserDto } from '../dto/create-user.dto';

export class UserMapper {
  toDomainfromEntity(userEntity: UserEntity): User {
    const user: User = new User();
    user.randomId = userEntity.id;
    user.preRev = userEntity.preRev;
    user.adCnt = userEntity.adCnt;
    user.cdCnt = userEntity.cdCnt;
    user.regDt = userEntity.regDt;
    return user;
  }
  toEntityfromDomain(user: User): UserEntity {
    const userEntity: UserEntity = new UserEntity();
    userEntity.id = user.randomId;
    userEntity.preRev = user.preRev;
    userEntity.adCnt = user.adCnt;
    userEntity.cdCnt = user.cdCnt;
    userEntity.regDt = user.regDt;
    return userEntity;
  }
  toDtofromDomain(user: User): UserDto {
    const userDto: UserDto = new UserDto();
    userDto.id = user.randomId;
    userDto.preRev = user.preRev;
    userDto.adCnt = user.adCnt;
    userDto.cdCnt = user.cdCnt;
    userDto.regDt = user.regDt;
    return userDto;
  }
  toDtofromEntity(userEntity: UserEntity): UserDto {
    const userDto: UserDto = new UserDto();
    userDto.id = userEntity.id;
    userDto.preRev = userEntity.preRev;
    userDto.adCnt = userEntity.adCnt;
    userDto.cdCnt = userEntity.cdCnt;
    userDto.regDt = userEntity.regDt;
    return userDto;
  }
  toDomainfromDto(userDto: UserDto): User {
    const user: User = new User();
    user.randomId = userDto.id;
    user.preRev = userDto.preRev;
    user.adCnt = userDto.adCnt;
    user.cdCnt = userDto.cdCnt;
    user.regDt = userDto.regDt;
    return user;
  }
}
