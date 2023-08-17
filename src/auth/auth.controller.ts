import { Body, Controller, UploadedFile, UseInterceptors, Post, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreatelogInDto } from './dto/logIn.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(
    FileInterceptor('file',{
      storage: diskStorage({
        destination: './upload/users',
        filename: (_request, file, callback)=>
        callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  signup(@Body() CreateUserDto: CreateUserDto, @UploadedFile()file){
    CreateUserDto.photo = file.filename
    return this.authService.signUp(CreateUserDto);
  }

  @Post('signin')
  signin(@Body() data : CreatelogInDto){
    return this.authService.signIn(data);
  }
  
  @UseGuards(AccessTokenGuard)
  @Get("logout")
  logout(@Req() req: Request){
    this.authService.logOut(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request){
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
  }
