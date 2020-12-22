import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('validateUser')
    const user = await this.usersService.findOne({email});
    console.log('user1',user)
    
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      status: 'admin', 
      image: 'https://i.imgur.com/e4cwt1E.jpg', 
      id: user._id 
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user:any) {
    const {email} = user;
    const findedUser = await this.usersService.findOne({email});

    if(!findedUser){
      const newUser = await this.usersService.create(user);
      // const payload = { 
      //   email: newUser.email, 
      //   status: 'admin', 
      //   imaage: 'https://i.imgur.com/e4cwt1E.jpg', 
      //   sub: newUser.id 
      // };

      return this.login(newUser);
    } else {

    }
  }

}
