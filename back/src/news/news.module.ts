import { HttpModule, Module } from '@nestjs/common';
import { NewsResolver } from './news.resolver';
import { NewsService } from './news.service';

@Module({
  imports: [HttpModule],
  providers: [NewsResolver, NewsService]
})
export class NewsModule {}
