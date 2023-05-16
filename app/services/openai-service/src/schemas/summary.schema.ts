import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type DeviceDocument = HydratedDocument<Summary>;

//new schema for storing whisper responses
@Schema()
export class Summary {
  //saving the prompt given to chatgpt - this will result in some overlap with the transcript db - but we don't want to limit all queries to only voice
  @Prop()
  question: string;

  //saving the returned summary from chatgpt
  @Prop()
  summary: string;

  //saving the date and time of when the transcript was returned
  @Prop()
  time: Date;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);
