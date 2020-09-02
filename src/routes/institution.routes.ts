import { Router } from 'express';
import CreateInstitutionService from '../services/CreateInstitutionService';
import ListInstitutionService from '../services/ListInstitutionService';
import ListAllInstitutionService from '../services/ListAllInstitutionService';
import ListFilterInstitutionService from '../services/ListFilterInstitutionService';
import ensureAuthenticated from '../middlewares/ensureAuthenticate';
import UpdateInstitutionService from '../services/UpdateInstitutionService';
import DeleteInstitutionService from '../services/DeleteInstitutionService';
import GetOneInstitutionService from '../services/GetOneInstitutionService';

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

institutionRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const getOneInstitution = new GetOneInstitutionService();

  const getOne = await getOneInstitution.execute({
    id,
  });

  return response.json(getOne);
});

institutionRouter.get('/all', async (request, response) => {
  const listAllInstitutionService = new ListAllInstitutionService();

  const listAllInstitution = await listAllInstitutionService.execute();

  return response.json(listAllInstitution);
});

institutionRouter.post('/', async (request, response) => {
  const {
    name, location, user_id,
  } = request.body;

  const createInstitution = new CreateInstitutionService();

  const institution = await createInstitution.execute({
    name,
    location,
    user_id,
  });

  return response.json(institution);
});

// institutionRouter.get('/filter/:location', async (request, response) => {
//  const { location } = request.params;

//  const filterInstitution = new ListFilterInstitutionService();

//  const institution = await filterInstitution.execute({
//    location,
//  });
//  console.log(location);
//  return response.json(institution);
// });

institutionRouter.post('/filter', async (request, response) => {
  const { location } = request.body;

  const filterInstitution = new ListFilterInstitutionService();

  const institution = await filterInstitution.execute({
    location,
  });
  console.log(location);
  return response.json(institution);
});

institutionRouter.put('/:id', async (request, response) => {
  // const user_id = request.user.id;
  const { id } = request.params;
  const {
    name, location,
  } = request.body;

  const institutionUpdate = new UpdateInstitutionService();

  const institution = institutionUpdate.execute({
    id,
    location,
    name,
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
