/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';

import Institution from '../models/Institution';

export default class ListAllInstitutionService {
  public async execute(): Promise<Institution[]> {
    const institutionRepository = getRepository(Institution);

    const listAll = await institutionRepository.find();

    return listAll;
  }
}
