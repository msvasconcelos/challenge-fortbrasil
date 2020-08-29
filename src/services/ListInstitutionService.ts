/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';

import Institution from '../models/Institution';

interface Request {
  user_id: string;
}

export default class ListInstitutionService {
  public async execute({ user_id }: Request): Promise<Institution[]> {
    const institutionRepository = getRepository(Institution);

    const list = await institutionRepository.find({
      where: { user_id },
    });

    return list;
  }
}
