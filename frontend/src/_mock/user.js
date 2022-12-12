import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  idPengguna: faker.datatype.uuid(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  isVerified: faker.datatype.boolean(),
  status: sample(['Unverified', 'Verified']),
  role: sample([
    '01/11/2022',
    '11/10/2022',
    '02/11/2022',
    '05/11/2022',
    '16/11/2022',
    '08/11/2022',
    '02/10/2022',
    '25/10/2022',
    '09/10/2022',
    '29/11/2022',
  ]),
}));

export default users;
