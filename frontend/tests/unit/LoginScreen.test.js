import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../../screens/LoginScreen';

// on simule la navigation
const mockNavigate = jest.fn();

jest.mock('axios', () => ({
  post: jest.fn(() =>
    Promise.resolve({ data: { success: true } })
  ),
}));

describe('LoginScreen', () => {
  it('triggers login action', async () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={{ navigate: mockNavigate }} />
    );

    // remplir les champs
    fireEvent.changeText(getByPlaceholderText("Nom d'utilisateur"), 'admin');
    fireEvent.changeText(getByPlaceholderText('Mot de passe'), 'admin123');

    // cliquer sur le bouton
    fireEvent.press(getByText('Se connecter'));

    // attendre la navigation
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Students');
    });
  });
});
