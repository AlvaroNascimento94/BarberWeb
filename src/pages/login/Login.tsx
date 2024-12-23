import {
  Button,
  Center,
  Flex,
  Image,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import logo from "../../../public/image/logotipo.png";
import { useState } from "react";
import { InputPassword } from "./LoginStyled";

export default function Login() {
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => setShow(!show);

  function handleLogin() {
    console.log(email, password);
    
    
  }

  return (
    <Flex
      height="100vh"
      width="100 rem"
      alignItems="center"
      justifyContent="center"
    >
      <Flex width={640} direction="column" p={14} borderRadius={8}>
        <Center p={4}>
          <Image src={logo} alt="logo" height={100} objectFit="fill" />
        </Center>
        <Input
          background="var(--barber-400)"
          variant="filled"
          size="lg"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          mb={3}
          color="white"
          width="100%"
        />
        <InputPassword>
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            color="white"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputPassword>
        <Button
          bg="var(--button-cta)"
          size="lg"
          mb={6}
          color="gray.600"
          _hover={{
            transition: "background 0.4s",
            bg: "var(--button-gray)",
            color: "var(--button-cta)",
          }}
          onClick={handleLogin}
        >
          Acessar
        </Button>
        <Center mt={6}>
          <Link color="var(--barber-100)" href="/register">
            <Text>
              Não tem uma conta? <strong> Registre-se</strong>
            </Text>
          </Link>
        </Center>
      </Flex>
    </Flex>
  );
}
