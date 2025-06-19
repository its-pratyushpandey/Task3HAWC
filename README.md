# React Native Login Screen UI (Expo)

A professional, responsive, and accessible Login Screen UI built with React Native (Expo).

## Features
- Modern, clean, and modular code
- Email and password input fields with validation
- Show/hide password toggle
- Distinct, accessible login button
- "Forgot Password?" and "Sign Up" links
- Responsive design for all device sizes
- Uses `react-native-vector-icons` for icons
- Mock backend integration with `assets/mockUser.json`

## Folder Structure
```
components/
  InputField.tsx
  CustomButton.tsx
app/
  login.tsx
assets/
  mockUser.json
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the Expo development server:
   ```sh
   npx expo start
   ```
3. Open the app on your device using the Expo Go app or an emulator.

### Usage
- Navigate to `/login` to view the login screen.
- Enter email and password, then tap **Login** to see an alert with your credentials.

## Customization
- Update `assets/mockUser.json` for backend integration.
- Modify components in `components/` for custom UI.

## Accessibility & Best Practices
- All interactive elements are accessible.
- Responsive and clean design.

---

**Author:** _Your Name Here_
