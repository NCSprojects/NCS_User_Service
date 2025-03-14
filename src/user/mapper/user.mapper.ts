import { UserEntity } from '../entities/user.entity';
import { User } from '../domain/user';
import { UserDto } from '../dto/create-user.dto';
import { UserInterface } from '../dto/create-user-grpc.dto';

// static 으로 해도 좋을듯 하다.
export class UserMapper {
  toDomainfromEntity(userEntity: UserEntity): User {
    const user: User = new User();
    user.create(
      userEntity.id,
      userEntity.preRev,
      userEntity.adCnt,
      userEntity.cdCnt,
      userEntity.regDt,
      userEntity.manuYn,
    );
    return user;
  }
  // 다수의 오브젝트
  toDomainFromEntities(userEntities: UserEntity[]): User[] {
    return userEntities.map(
      (userEntity: UserEntity): User => this.toDomainfromEntity(userEntity),
    );
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

  toDtofromEntities(userEntities: UserEntity[]): UserDto[] {
    return userEntities.map(
      (userEntity: UserEntity): UserDto => this.toDtofromEntity(userEntity),
    );
  }
  toDomainfromDto(userDto: UserDto): User {
    const user: User = new User();
    user.create(
      userDto.id,
      userDto.preRev,
      userDto.adCnt,
      userDto.cdCnt,
      userDto.regDt,
      userDto.manuYn,
    );
    return user;
  }

  toUserDtoFromGrpcDto(createUserGrpcDto: UserInterface): UserDto {
    const createUserDto = new UserDto();
    createUserDto.id = createUserGrpcDto.randomId;
    createUserDto.adCnt = createUserGrpcDto.adCnt;
    createUserDto.cdCnt = createUserGrpcDto.cdCnt;
    createUserDto.preRev = createUserGrpcDto.preRev;
    createUserDto.regDt = new Date(createUserGrpcDto.regDt);
    return createUserDto;
  }

  toUserInterfaceFromUserDto(userDto: UserDto): UserInterface {
    const userGrpcDto = new UserInterface();
    userGrpcDto.randomId = userDto.id;
    userGrpcDto.adCnt = userDto.adCnt;
    userGrpcDto.cdCnt = userDto.cdCnt;
    userGrpcDto.preRev = userDto.preRev;
    userGrpcDto.regDt = new Date(userDto.regDt).toISOString();
    return userGrpcDto;
  }
}
