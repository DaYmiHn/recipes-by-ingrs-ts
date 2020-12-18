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

  async findOne(email: string) {
    let user = await this.userModel.find({email}).exec()
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let upd = await this.userModel.findOneAndUpdate({id}, updateUserDto,{
      new: true
    });
    return updateUserDto;
  }

  async remove(id: string) {
    let res = await this.userModel.findById(id);
    res = await this.userModel.findByIdAndDelete(id);
    return `This action removes a #${id} recipe`;
  }
}
