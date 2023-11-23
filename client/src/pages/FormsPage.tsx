import React from 'react';
import { Login, SignUp } from '../components';

interface FormPageProps {
  form: 'login' | 'sign-up';
}
const FormsPage: React.FC<FormPageProps> = ({ form }) => {
  const content = form === 'sign-up' ? <SignUp /> : <Login />;
  return <>{content}</>;
};

export default FormsPage;
