import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Configuration, OpenAIApi } from 'openai';
import { Transcript } from './schemas/transcript.schema';
import { Model } from 'mongoose';
import { Summary } from './schemas/summary.schema';
import axios from 'axios';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Transcript.name) private transcriptModel: Model<Transcript>,
    @InjectModel(Summary.name) private summarytModel: Model<Summary>,
  ) {}
  async whisperCall(file): Promise<string> {
    try {
      // create a new configuration object with the key for the openai wrapper
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);

      // read the buffer property of the passed file
      const buffer = file.buffer;
      console.log(file);
      console.log(buffer);

      // assign a name to the buffer - necessary for the openai wrapper to work
      buffer.name = 'test.wav';

      // call the openai api with the buffer
      const transcript = await openai.createTranscription(buffer, 'whisper-1');
      const transcriptText = transcript.data.text;

      // make a new entry in the transcript db with the returned data and the current date and time
      const newTranscript = new this.transcriptModel({
        answer: transcriptText,
        time: new Date(), // current time
      });
      await newTranscript.save();

      // return the transcript text
      return transcriptText;
    } catch (error) {
      // In case of an error, log it to the console and throw an HttpException
      console.error(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async chatgptCall(prompt: string): Promise<{ summary: string }> {
    if (!prompt || typeof prompt !== 'string') {
      throw new Error('Invalid user input');
    }

    try {
      const result = await this.summarytModel.findOne({ question: prompt });
      console.log(result);
      return { summary: result.summary };
    } catch (err) {
      console.log(
        `[WARN]: ${new Date().toString()}: No data found in db. Querying OpenAI`,
      );
    }
    const configuration = {
      headers: {
        Authorization: 'Bearer ' + process.env.OPENAI_API_KEY,
        'Content-Type': 'application/json',
      },
    };
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    };

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        data,
        configuration,
      );
      const completion_text = response.data.choices[0].message.content;

      // Save the new interaction to the database
      const newSummary = new this.summarytModel({
        question: prompt,
        summary: completion_text,
        time: new Date(),
      });
      await newSummary.save();

      return { summary: completion_text };
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
