import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
  //route for retrieving the transcript of a sound file EXCPECTS WAV
  @Post('audio-transcript')
  @UseInterceptors(FileInterceptor('audio'))
  async getTranscript(@UploadedFile() file): Promise<string> {
    return this.appService.whisperCall(file);
  }
  @Post('text-summary')
  async getTextSummary(
    @Body('prompt') prompt: string,
  ): Promise<{ summary: string }> {
    console.log(prompt);
    return this.appService.chatgptCall(prompt);
  }
}
