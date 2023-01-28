import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  ImputArea,
  CustonButton,
  CustonButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styles';

import Api from '../../Api';

import SignInput from '../../components/SignInput';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
  const navigation = useNavigation();

  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{name: 'SignUp'}],
    });
  };

  const handleSignClick = async () => {
    if (emailField !== '' && passwordField !== '') {
      let res = await Api.signIn(emailField, passwordField);
      if (JSON.token) {
        alert('Deu Certo');
      } else {
        alert('E-mail e/ou senha incorretos!');
      }
    } else {
      alert('Preencha os campos!');
    }
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <ImputArea>
        <SignInput
          IconSvg={EmailIcon}
          placeholder="Digite seu email"
          value={emailField}
          onChangeText={t => setEmailField(t)}
        />

        <SignInput
          IconSvg={LockIcon}
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={t => setPasswordField(t)}
          password={true}
        />

        <CustonButton onPress={handleSignClick}>
          <CustonButtonText>LOGIN</CustonButtonText>
        </CustonButton>
      </ImputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>Ainda não possui conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};
