import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesModule } from './recipes/recipes.module';
import { IngredientModule } from './ingredient/ingredient.module';

@Module({
  imports: [AuthModule, UsersModule, MongooseModule.forRoot('mongodb://localhost:27017/domchanski'), RecipesModule, IngredientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
