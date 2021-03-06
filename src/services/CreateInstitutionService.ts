/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';

import Institution from '../models/Institution';

interface Request {
  name: string;
  location: string;
}

export default class CreateInstitutionService {
  public async execute({
    name,
    location,
  }: Request): Promise<Institution> {
    const institutionRepository = getRepository(Institution);

    const institution = institutionRepository.create({
      name,
      location,
    });

    await institutionRepository.save(institution);

    return institution;
  }
}
