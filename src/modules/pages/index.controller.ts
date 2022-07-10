import {
  Controller,
  Get,
  Req,
  Res,
  Request
} from '@nestjs/common'
import { render } from 'ssr-core-react'
import { CookieEnum } from '~/web/enum/cookie'
import { AuthService } from '@/modules/auth/auth.service'

const renderPage = async (req, res) => {
  const ctx = {
    request: req,
    response: res,
  }
  const stream = await render(ctx, {
    stream: true
  })
  stream.pipe(res, { end: false })
  stream.on('end', () => {
    res.end()
  })
}

@Controller('/')
export default class AppPageController {
  constructor (
    private readonly authService: AuthService
  ) {}

  @Get(['/', 'user', 'user/detail:userId', 'cost', 'quote', 'transaction'])
  async handleIndex (@Req() req, @Res() res): Promise<any> {
    const token = req.cookies?.[CookieEnum.TOKEN_NAME]
    if (!token) {
      res.redirect('/login')
    } else {
      this.authService.verifyToken(token).catch(() => {
        res.redirect('/login')
      })
      await renderPage(req, res)
    }
  }

  @Get('login')
  async handleUser (@Request() req, @Res() res): Promise<any> {
    const token = req.cookies?.[CookieEnum.TOKEN_NAME]
    if (!token) {
      await renderPage(req, res)
    } else {
      const user = await this.authService.verifyToken(token).catch(() => {
        renderPage(req, res)
      })
      if (user?.id) {
        res.redirect('/')
      }
    }
  }
}
