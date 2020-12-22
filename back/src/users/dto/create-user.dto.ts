import { IsEmail, IsNotEmpty } from 'class-validator';


export class CreateUserDto {

  @IsNotEmpty()
  // @IsEmail()
  email: string;
  
  @IsNotEmpty()
  password: string;

  role?: string = 'client';
  
  avatal?: string = "https://i.imgur.com/Z9AhvLH.jpg";

  ingredients: string[] = []
}
