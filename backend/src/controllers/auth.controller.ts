import { Controller, Post, Body, HttpStatus, Res, Session } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { CreateUserDto, LoginDto } from '../dto/user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
    @Session() session: any,
  ) {
    try {
      const user = await this.authService.register(createUserDto);
      
      // Store user ID in session
      session.userId = user.id;
      
      return res.status(HttpStatus.CREATED).json({
        message: 'User registered successfully',
        user,
      });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() loginDto: LoginDto,
    @Res() res: Response,
    @Session() session: any,
  ) {
    try {
      const user = await this.authService.login(loginDto);
      
      // Store user ID in session
      session.userId = user.id;
      
      return res.status(HttpStatus.OK).json({
        message: 'Login successful',
        user,
      });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'User successfully logged out' })
  async logout(@Res() res: Response, @Session() session: any) {
    session.destroy((err: any) => {
      if (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Could not log out',
        });
      }
      return res.status(HttpStatus.OK).json({
        message: 'Logged out successfully',
      });
    });
  }

  @Post('me')
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200, description: 'Current user information' })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  async getCurrentUser(@Res() res: Response, @Session() session: any) {
    if (!session.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Not authenticated',
      });
    }

    try {
      const user = await this.authService.findById(session.userId);
      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'User not found',
        });
      }

      return res.status(HttpStatus.OK).json({ user });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  }
}