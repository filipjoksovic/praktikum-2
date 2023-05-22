import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transcript, TranscriptSchema } from './schemas/transcript.schema';
import { Summary, SummarySchema } from './schemas/summary.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      {
        authSource: 'admin',
      },
    ),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
