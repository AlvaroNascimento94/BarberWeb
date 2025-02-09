import {
  Button,
  Center,
  Flex,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";

import { useContext, useState } from "react";
import { InputPassword } from "./LoginStyled";
import { parseCookies } from "nookies";

import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye  } from "react-icons/fa6";

export default function Login() {
  const { SignIn } = useContext(AuthContext);

  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  async function handleLogin() {
    if (email === "" || password === "") {
      return;
    }
    await SignIn({ email, password });
    const cookies = parseCookies();
    const isLogged = cookies["@barber.token"];

    if (isLogged) {
      navigate("/dashboard");
    }
  }

  return (
    <Flex
      height="100vh"
      width="100 rem"
      alignItems="center"
      justifyContent="center"
      bg={"var(--barber-400)"}
    >
      <Flex width={640} direction="column" p={14} borderRadius={8}>
        <Center p={4}>
          <Flex
            cursor="pointer"
            userSelect="none"
            alignItems="center"
            flexDirection="row"
            mb={10}
          >
            <Text
              fontSize="3xl"
              color="white"
              fontFamily="monospace"
              fontWeight="bold"
            >
              Barber
            </Text>
            <Text
              fontSize="3xl"
              color="var(--button-cta)"
              fontFamily="monospace"
              fontWeight="bold"
            >
              PRO
            </Text>
          </Flex>
        </Center>
        <Input
          background="var(--barber-900)"
          variant="outline"
          size="lg"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          mb={3}
          color="var(--color-text)"
          width="100%"
        />
        <InputPassword>
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            color="var(--color-text)"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button h="1.75rem" size="sm" bg="var(--color-text)" onClick={handleClick}>
            {show ? <FaEyeSlash/>:<FaEye/> }
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
          <Link color="var(--color-text)" href="/register">
            <Text>
              Não tem uma conta? <strong> Registre-se</strong>
            </Text>
          </Link>
        </Center>
      </Flex>
    </Flex>
  );
}
