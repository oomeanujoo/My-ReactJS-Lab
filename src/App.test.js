import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from './Components/Auth/authContext';

test('redirects a signed-out visitor from Products to the login screen', async () => {
  localStorage.removeItem('asset-mgmt.current-user');
  render(
    <MemoryRouter initialEntries={['/products']}>
      <AuthProvider><App /></AuthProvider>
    </MemoryRouter>
  );
  expect(await screen.findByRole('heading', { name: 'Asset Management Portal' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
});
