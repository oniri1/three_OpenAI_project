import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class FeedBack extends Document {
  @Prop({ required: true })
  ai: string;

  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  feedBack: string;

  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  feedBackId: number;
}

export const FeedBackSchema = SchemaFactory.createForClass(FeedBack);
