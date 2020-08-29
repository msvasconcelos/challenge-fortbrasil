/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';
import Institution from '../models/Institution';

interface Request {
  id: string;
}

export default class DeleteInstitutionService {
  public async execute({ id }: Request): Promise<void> {
    const institutionRepository = getRepository(Institution);

    const institution = await institutionRepository.findOne(id);

    if (!institution) {
      throw new Error('identificação invalido');
    }

    await institutionRepository.remove(institution);
  }
}
