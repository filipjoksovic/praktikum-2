import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transcript, TranscriptSchema } from './schemas/transcript.schema';
import { Summary, SummarySchema } from './schemas/summary.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://rootuser:rootpass@mongodb:27017/OpenAi`, {
      authSource: 'admin',
    }),
    MongooseModule.forFeature([
      {
        name: Transcript.name,
        schema: TranscriptSchema,
        collection: 'transcripts',
      },
      {
        name: Summary.name,
        schema: SummarySchema,
        collection: 'summaries',
      },
    ]),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
