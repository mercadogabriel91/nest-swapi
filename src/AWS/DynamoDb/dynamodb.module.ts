import {
  DynamoDBClient,
  QueryCommand,
  ScanCommand,
  ScanCommandOutput,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { Logger, NotFoundException } from '@nestjs/common';
import * as dotenv from 'dotenv';
// DTOs
import { CreateMovieDto } from '../../movie/dto/create-movie.dto';

dotenv.config();

class DynamoDbModule {
  private readonly logger = new Logger(DynamoDbModule.name);
  private dynamoDbTable: string;
  private tableIndex: string;
  private client: DynamoDBDocumentClient;
  private region: string;

  constructor() {
    this.region = process.env.AWS_REGION;
    this.dynamoDbTable = process.env.DYNAMO_DB_TABLE;
    this.tableIndex = process.env.DYNAMO_DB_TABLE_IDX;
    this.client = new DynamoDBClient({
      region: this.region,
    });
  }

  async addMovie(movie: CreateMovieDto): Promise<PutCommandOutput> {
    const params = {
      TableName: this.dynamoDbTable,
      Item: movie,
    };

    try {
      return await this.client.send(new PutCommand(params));
    } catch (err) {
      this.logger.error(``, err);
    }
  }

  async getAllMovies(): Promise<ScanCommandOutput> {
    const params = {
      TableName: this.dynamoDbTable,
    };

    try {
      return await this.client.send(new ScanCommand(params));
    } catch (err) {
      this.logger.error(`Error getting movies:`, err);
    }
  }

  async findOne(episode_id: number) {
    const params = {
      TableName: this.dynamoDbTable,
      IndexName: this.tableIndex,
      KeyConditionExpression: 'episode_id = :episode_id',
      ExpressionAttributeValues: {
        ':episode_id': { N: episode_id.toString() },
      },
    };

    try {
      const { Items, Count } = await this.client.send(new QueryCommand(params));

      if (Count) {
        return JSON.parse(JSON.stringify(unmarshall(Items[0])));
      } else {
        throw new NotFoundException('No Records found');
      }
    } catch (err) {
      this.logger.error(`Error getting movies:`, err);
    }
  }
}

const dynamoDbModule = new DynamoDbModule();

export default dynamoDbModule;
