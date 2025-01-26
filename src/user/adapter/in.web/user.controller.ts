import {
  Controller,
  Get,
  Post,
  Body,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Patch,
  Param,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Delete,
  Inject,
  Logger,
} from '@nestjs/common';
import { UserDto } from '../../dto/create-user.dto';
import { UserEntity } from '../../entities/user.entity';
import { UserRegisterUseCase } from '../../application/port/in/user.findUseCase';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    @Inject('RegisterUsecase')
    private readonly userRegisterUseCase: UserRegisterUseCase,
  ) {}

  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.userRegisterUseCase.saveUserInfo(createUserDto);
  }

  // @Get('users')
  // findAll() {
  //   return this.userRegisterUseCase.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userRegisterUseCase.findByRandomIdUserInfo(+id);
  }

  @Get('verify/:id')
  async verifyOne(@Param('id') id: number) {
    const user: UserEntity =
      await this.userRegisterUseCase.findByRandomIdUserInfo(+id);
    return { valid: !!user };
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
