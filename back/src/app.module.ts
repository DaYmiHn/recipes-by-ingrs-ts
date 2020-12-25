import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesModule } from './recipes/recipes.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [ 
    AuthModule, 
    UsersModule, 
    MongooseModule.forRoot('mongodb://localhost:27017/domchanski'), 
    RecipesModule, 
    IngredientModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: { path: join(process.cwd(), './src/graphql.ts') }
    }),
    NewsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
