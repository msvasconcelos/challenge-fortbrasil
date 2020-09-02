/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';

import Institution from '../models/Institution';

export default class ListInstitutionService {
  public async execute(): Promise<Institution[]> {
    const institutionRepository = getRepository(Institution);

    const list = await institutionRepository.find();

    return list;
  }
}
