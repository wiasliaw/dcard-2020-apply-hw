/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Docs } from '../constants';
import { MongoClient, MongoClientOptions } from 'mongodb';

export class MongoDB {
  private client: MongoClient;

  constructor(uri: string, opt?: MongoClientOptions) {
    this.client = new MongoClient(uri, opt);
    this.client.connect();
  }

  public async findList(userId: string) {
    const rawData = await this.client.db('rateList').collection('record').findOne({userId});
    return rawData;
  }

  public async insertList(docs: Docs) {
    await this.client.db('rateList').collection('record').insertOne(docs);
  }

  public async updateList(
    userId: string,
    data: { remaining: number; reset: string }
  ) {
    await this.client.db('rateList').collection('record')
      .findOneAndUpdate(
        {
          userId,
        },
        {
          $set: { remaining: data.remaining, reset: data.reset }
        }
      );
  }
}
