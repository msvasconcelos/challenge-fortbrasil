import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import User from '../models/User';

interface Request {
  email: string;
  senha: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateService {
  // eslint-disable-next-line class-methods-use-this
  public async execute({ email, senha }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Email/password incorreto');
    }

    // verificar se a senha que o user digitar está igual a do crypt

    const senhaVerificada = await compare(senha, user.senha);

    if (!senhaVerificada) {
      throw new Error('Email/password incorreto');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
