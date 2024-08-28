import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IFeedBacks } from 'src/interfaces/i_Ai';

@Schema()
export class FeedBack extends Document {
  @Prop({ required: true })
  totalFeedBack: string;

  @Prop({ required: true })
  feedBacks: IFeedBacks[];

  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  feedBackId: number;
}

export const FeedBackSchema = SchemaFactory.createForClass(FeedBack);
