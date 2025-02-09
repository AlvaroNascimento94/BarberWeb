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
import { useContext, useState } from "react";
import { InputPassword } from "./CadastroStyled";
import { AuthContext } from "@/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function Cadastro() {
  const { SignUp } = useContext(AuthContext);

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => setShow(!show);

  async function handleCadastrar() {
    if (email !== "" && password !== "" && name !== "") {
      await SignUp({ name, email, password });
      navigate("/dashboard");
    }
    return;
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
          placeholder="Nome da Barbearia"
          type="text"
          required
          mb={3}
          color="var(--color-text)"
          width="100%"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          background="var(--barber-900)"
          variant="outline"
          size="lg"
          placeholder="Email"
          type="email"
          required
          mb={3}
          color="var(--color-text)"
          width="100%"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputPassword>
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            color="var(--color-text)"
            required
            variant="outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            h="1.75rem"
            size="sm"
            bg="var(--color-text)"
            onClick={handleClick}
          >
            {show ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </InputPassword>
        <Button
          bg="var(--button-cta)"
          size="lg"
          mb={6}
          color="var(--color-text)"
          _hover={{
            transition: "background 0.4s",
            bg: "var(--button-gray)",
            color: "var(--button-cta)",
          }}
          onClick={handleCadastrar}
        >
          Cadastrar
        </Button>
        <Center mt={6}>
          <Link color="var(--color-text)" href="/">
            <Text>
              Ja possui uma conta? <strong> Faça Login</strong>
            </Text>
          </Link>
        </Center>
      </Flex>
    </Flex>
  );
}
