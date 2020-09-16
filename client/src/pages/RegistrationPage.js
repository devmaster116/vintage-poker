import React, { useRef, useContext } from 'react';
import Container from '../components/layout/Container';
import { Redirect, Link } from 'react-router-dom';
import HeadingWithLogo from '../components/typography/HeadingWithLogo';
import Button from '../components/buttons/Button';
import { Input } from '../components/forms/Input';
import { Form } from '../components/forms/Form';
import { FormGroup } from '../components/forms/FormGroup';
import { ButtonGroup } from '../components/forms/ButtonGroup';
import { Label } from '../components/forms/Label';
import RelativeWrapper from '../components/layout/RelativeWrapper';
import ShowPasswordButton from '../components/buttons/ShowPasswordButton';
import useScrollToTopOnPageLoad from '../hooks/useScrollToTopOnPageLoad';
import authContext from '../context/auth/authContext';
import contentContext from '../context/content/contentContext';

const RegistrationPage = () => {
  const { localizedStrings } = useContext(contentContext);
  const { register, isLoggedIn } = useContext(authContext);

  useScrollToTopOnPageLoad();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nicknameRef = useRef(null);

  if (isLoggedIn) return <Redirect to="/" />;
  return (
    <RelativeWrapper>
      {/* <TiledBackgroundImage /> */}
      <Container
        fullHeight
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding="6rem 2rem 2rem 2rem"
        contentCenteredMobile
      >
        <Form
          onSubmit={(e) => {
            e.preventDefault();

            const name = nicknameRef.current.value;
            const email = emailRef.current.value;
            const password = passwordRef.current.value;

            if (
              name &&
              email &&
              password &&
              name.length > 0 &&
              email.length >= 0 &&
              password.length >= 6
            ) {
              register(name, email, password);
            }
          }}
        >
          <HeadingWithLogo textCentered hideIconOnMobile={false}>
            {localizedStrings &&
              (localizedStrings['registration_page-header_txt'] ||
                'registration_page-header_txt')}
          </HeadingWithLogo>
          <FormGroup>
            <Label htmlFor="email">
              {localizedStrings &&
                (localizedStrings['registration_page-email_lbl_txt'] ||
                  'registration_page-email_lbl_txt')}
            </Label>
            <Input type="email" name="email" ref={emailRef} required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="nickname">
              {localizedStrings &&
                (localizedStrings['registration_page-nickname_lbl_txt'] ||
                  'registration_page-nickname_lbl_txt')}
            </Label>
            <Input
              type="text"
              name="nickname"
              autoComplete="off"
              ref={nicknameRef}
              minLength="5"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">
              {localizedStrings &&
                (localizedStrings['registration_page-password_lbl_txt'] ||
                  'registration_page-password_lbl_txt')}
            </Label>
            <ShowPasswordButton passwordRef={passwordRef} />
            <Input
              type="password"
              name="password"
              minLength="6"
              autoComplete="new-password"
              ref={passwordRef}
              required
            />
          </FormGroup>
          {/* <FormGroup>
            <Label htmlFor="dob">Date of birth (18+)</Label>
            <Input type="date" name="dob" />
          </FormGroup> */}
          <ButtonGroup>
            <Button primary type="submit" fullWidth>
              {localizedStrings &&
                (localizedStrings['registration_page-cta_btn_txt'] ||
                  'registration_page-cta_btn_txt')}
            </Button>
            <Link to="/login">
              {localizedStrings &&
                (localizedStrings['registration_page-already_account_txt'] ||
                  'registration_page-already_account_txt')}
            </Link>
          </ButtonGroup>
        </Form>
      </Container>
    </RelativeWrapper>
  );
};

export default RegistrationPage;
