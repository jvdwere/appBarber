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

import SignInput from '../../components/SignInput';

import Api from '../../Api';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import PersonIcon from '../../assets/person.svg';
import {Alert} from 'react-native/types';

export default () => {
  const navigation = useNavigation();

  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{name: 'SignIn'}],
    });
  };

  const handleSignClick = async () => {
    if (nameField !== '' && emailField !== '' && passwordField !== '') {
      let res = await Api.signUp(nameField, emailField, passwordField);
      if (res.token) {
      } else {
        alert('Erro: ' + res.error);
      }
    } else {
      alert('Preencha os campos');
    }
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <ImputArea>
        <SignInput
          IconSvg={PersonIcon}
          placeholder="Digite seu nome aqui"
          value={nameField}
          onChangeText={t => setNameField(t)}
        />
        <SignInput
          IconSvg={EmailIcon}
          placeholder="Digite seu e-mail aqui"
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
          <CustonButtonText>Cadastrar</CustonButtonText>
        </CustonButton>
      </ImputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>Já possui conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Faça o LogIn</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};
