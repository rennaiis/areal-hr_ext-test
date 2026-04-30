import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common'
import { LocalGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
  @UseGuards(LocalGuard)
  @Post('login')
  login(@Request() req) {
    return req.user
  }

  @Post('logout')
  logout(@Request() req) {
    req.logout(() => {})
    return { message: 'ok' }
  }

  @Get('me')
  getMe(@Request() req) {
    return req.user
  }
}