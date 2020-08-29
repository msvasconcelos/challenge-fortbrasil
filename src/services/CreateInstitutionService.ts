import { getRepository } from 'typeorm';

import Institution from '../models/Institution';

interface Request {
  name: string;
  location: string;
  user_id: string;
}

export default class CreateInstitutionService {
  public async execute({
    name,
    location,
    user_id,
  }: Request): Promise<Institution> {
    const institutionRepository = getRepository(Institution);

    const institution = institutionRepository.create({
      name,
      location,
      user_id,
    });

    await institutionRepository.save(institution);

    return institution;
  }
}
