/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';
import Institution from '../models/Institution';

interface Request {
  location: string;
}

export default class ListFilterInstitutionService {
  public async execute({ location }: Request): Promise<Institution[]> {
    const institutionRepository = getRepository(Institution);

    const list = await institutionRepository.find({
      where: { location },
    });

    return list;
  }
}
