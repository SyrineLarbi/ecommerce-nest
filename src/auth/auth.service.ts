import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { CreatelogInDto } from './dto/logIn.dto';



@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ){}
    async signUp(createUserDto:CreateUserDto):Promise<any>{
        //register, createuser
        //check if user exists
        const userExists= await this.usersService.getUser(createUserDto.username,);
        if (userExists){
            throw new BadRequestException('User already exists');
        }
        const newUser = await this.usersService.createUser(createUserDto);
        const tokens = await this.getTokens(newUser._id, newUser.username)
        await this.updateRefreshToken(newUser._id, tokens.refreshToken);
        return {tokens, newUser}
    }
    async signIn(data:CreatelogInDto) { // logIn
        //check if user exists
        const user = await this.usersService.getUser(data.username);
        if(!user) throw new BadRequestException("user does not exist ");
        const passwordMatches = await argon2.verify(user.password, data.password);
        if (!passwordMatches)
        throw new BadRequestException('Password is incorrect');
        const tokens = await this.getTokens(user._id, user.username);
        await this.updateRefreshToken(user._id, tokens.refreshToken);
        return { tokens, user}
    }

    async logOut(userId: string){
        this.usersService.updateUser(userId,{refreshToken: null});
    }
    async refreshTokens(userId: string, refreshToken: string){
        // to update tokens
        const user = await this.usersService.findById(userId);
        if (!user || !user.refreshToken)
        throw new ForbiddenException ('Access Denied');
        const refreshTokenMatches = await argon2.verify(
            user.refreshToken,
            refreshToken,
        );
        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
        const tokens  = await this.getTokens(user.id, user.username);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    hashData(data:string){
        return argon2.hash(data);
    }
    async updateRefreshToken(userId: string, refreshToken: string){
        //fct pr hasher le refreshtoken
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.updateUser(userId,{
            refreshToken : hashedRefreshToken,
        });
    }

    async getTokens(userId: string, username: string){
        const [accessToken, refreshToken] = await Promise.all([
            //access
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: '5m',
                },
            ),
            //refresh
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                    expiresIn: '7d',
                },
            ),
        ]);
        return{
            accessToken,
            refreshToken};
        }
    }