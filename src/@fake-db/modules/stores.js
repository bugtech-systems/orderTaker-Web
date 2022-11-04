const today = new Date();
const currentYear = today.getFullYear();
const loginYear = 2022;

export const storesModule = {
  storesList: [
    {
      id: 1457690400,
      name: 'Alex Dolgove',
      email: 'alex-dolgove@example.com',
      phone: [{ phone: '(215)-659-7529', label: 'Home' }],
      address: 'CEO',
      password: '123123123',
      createdAt: new Date(currentYear, 1, 1),
      updatedAt: new Date(currentYear, 1, 1),
    },
    {
      id: 1457690401,
      name: 'Chelsea Johns',
      email: 'chelsea-johnss@example.com',
      phone: [{ phone: '(215)-659-7529', label: 'home' }],
      address: 'CFO',
      password: '123123123',
      createdAt: new Date(currentYear, 1, 1),
      updatedAt: new Date(currentYear, 1, 1),
    }
  ],
};
