import { Router } from 'express';
import CreateInstitutionService from '../services/CreateInstitutionService';
import ListInstitutionService from '../services/ListInstitutionService';
import ensureAuthenticated from '../middlewares/ensureAuthenticate';
import UpdateInstitutionService from '../services/UpdateInstitutionService';
import DeleteInstitutionService from '../services/DeleteInstitutionService';

const institutionRouter = Router();

institutionRouter.use(ensureAuthenticated);

institutionRouter.get('/', async (request, response) => {
  const user_id = request.user.id;

  const liskInstitutionService = new ListInstitutionService();

  const listInstitution = await liskInstitutionService.execute({
    user_id,
  });

  return response.json(listInstitution);
});

institutionRouter.post('/', async (request, response) => {
  const {
    name, description, status, user_id,
  } = request.body;

  const createUser = new CreateInstitutionService();

  const institution = await createUser.execute({
    name,
    description,
    status,
    user_id,
  });

  return response.json(institution);
});

institutionRouter.put('/', async (request, response) => {
  // const user_id = request.user.id;
  const {
    id, name, description, status,
  } = request.body;

  const institutionUpdate = new UpdateInstitutionService();

  const institution = institutionUpdate.execute({
    id,
    description,
    name,
    status,
  });

  return response.json(institution);
});

institutionRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const institutionDelete = new DeleteInstitutionService();

  await institutionDelete.execute({
    id,
  });

  return response.json();
});

export default institutionRouter;
