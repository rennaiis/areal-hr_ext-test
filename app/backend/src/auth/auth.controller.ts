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
  req.logout(() => {
    req.session.destroy(() => {})
  })
  return { message: 'ok' }
  }

  @Get('me')
  getMe(@Request() req) {
    console.log('me user =', req.user)
    console.log('cookies =', req.headers.cookie)
    console.log('session =', req.session)
    return req.user
  }
}