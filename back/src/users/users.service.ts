import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    console.log('create')
    const createdCat = new this.userModel(createUserDto);
    return createdCat.save();

  }

  findAll() {
    return this.userModel.find().limit(1);
  }

  async findOne(data: object) {
    // console.log(data)
    let user = await this.userModel.findOne(data)
    // console.log('user', user)
    return user;
  }

  async update(_id: string, updateUserDto: UpdateUserDto) {
    // console.log(updateUserDto)
    let upd = await this.userModel.findOneAndUpdate({_id}, updateUserDto,{
      new: true,
      useFindAndModify: false,
    });
    return upd;
  }

  async remove(id: string) {
    let res = await this.userModel.findById(id);
    res = await this.userModel.findByIdAndDelete(id);
    return `This action removes a #${id} recipe`;
  }
}
