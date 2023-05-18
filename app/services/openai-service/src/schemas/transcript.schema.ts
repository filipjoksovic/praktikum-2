import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type DeviceDocument = HydratedDocument<Transcript>;

//new schema for storing whisper responses
@Schema()
export class Transcript {
  //saving the returned transcript
  @Prop()
  answer: string;

  //saving the date and time of when the transcript was returned
  @Prop()
  time: Date;
}

export const TranscriptSchema = SchemaFactory.createForClass(Transcript);
