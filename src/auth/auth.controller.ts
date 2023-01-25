import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';

import { userDto } from 'src/notes/dtos/user-response.dto';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptor/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos';

@Serialize(userDto)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/whoami')
  whoAmI(@Request() req: any) {
    return req.currentUser;
  }

  @Post('/signup')
  async signup(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.createUser(body.email, body.password);
    session.userId = user.id;
    console.log(session.userId);
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    console.log(session.userId);
    return user;
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  logout(@Session() session: any) {
    session.userId = null;
    console.log(session.userId);
  }
}
