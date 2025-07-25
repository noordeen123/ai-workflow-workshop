import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Entities
import { User } from './entities/user.entity';
import { Board } from './entities/board.entity';
import { Task } from './entities/task.entity';

// Controllers
import { AuthController } from './controllers/auth.controller';
import { BoardController } from './controllers/board.controller';
import { TaskController } from './controllers/task.controller';

// Services
import { AuthService } from './services/auth.service';
import { BoardService } from './services/board.service';
import { TaskService } from './services/task.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'password',
      database: process.env.DATABASE_NAME || 'postgres',
      entities: [User, Board, Task],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    TypeOrmModule.forFeature([User, Board, Task]),
  ],
  controllers: [AuthController, BoardController, TaskController],
  providers: [AuthService, BoardService, TaskService],
})
export class AppModule {}