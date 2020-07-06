import { Controller, Get, Post, Body, Inject, UnauthorizedException, Query, } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiUnauthorizedResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signUp.dto';

@ApiTags("Autentificación")
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('CryptoService') private readonly cryptoService,
    @Inject('ConfigService') private readonly configService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) { }

  @Post('signup')
  @ApiOperation({ summary: 'Registrarse' })
  @ApiOkResponse({ description: 'OK' })
  @ApiUnauthorizedResponse({ description: 'El usuario ya se encuentra registrado.' })
  async signUp(@Body() body: SignUpDto) {
    const response = await this.authService.signUp(body);  
    
    if (response.error) return { response };
    return response;
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiOkResponse({ description: 'OK' })
  @ApiUnauthorizedResponse({ description: 'El usuario no existe o esta inactivo' })
  async login(@Body() body: LoginDto) {
    body.password = this.cryptoService.encrypt(body.password);

    let response: any = await this.authService.login(body);

    if (response.error) throw new UnauthorizedException(response);

    return { success: 'OK', payload: this.jwtService.sign({ ...response }) };
  }

  @Post('validate-token')
  async validateToken(@Query('token') token: string) {
    return await this.authService.validateUser(token);
  }  
}
