// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { UsersService } from '../../users/users.service';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly userService: UsersService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: 'hoanguan',
//     });
//   }
//   async validate(payload: any) {
//     const email = payload.email;
//     const user = await this.userService.findByEmail(email);
//     if (!user) {
//       return null;
//     }
//     return user;
//   }
// }

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'hoanguan',
    });
  }

  async validate(payload: any) {
    const email = payload.email;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }

    // Return user object with consistent properties for activity tracking
    return {
      ...user,
      userId: user.id, // Add userId property for consistency
    };
  }
}
