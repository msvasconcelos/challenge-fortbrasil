import { getRepository } from 'typeorm';
import Institution from '../models/Institution';

interface Request {
  id: string;
  name: string;
  location: string;
}

export default class UpdateInstitutionService {
  public async execute({
    id,
    name,
    location,
  }: Request): Promise<Institution> {
    const institutionRepository = getRepository(Institution);

    const institution = await institutionRepository.findOne(id);

    if (!institution) {
      throw new Error('Institution not found');
    }

    institution.name = name;
    institution.location = location;

    await institutionRepository.save(institution);

    return institution;
  }
}
