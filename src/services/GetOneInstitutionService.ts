/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';
import Institution from '../models/Institution';

interface Request {
  id: string;
}

export default class GetOneInstitutionService {
  public async execute({
    id,
  }: Request): Promise<Institution> {
    const institutionRepository = getRepository(Institution);

    const oneInstitution = await institutionRepository.findOne(id);

    if (!oneInstitution) {
      throw new Error('Institution not found');
    }
    // console.log(oneInstitution);
    return oneInstitution;
  }
}
