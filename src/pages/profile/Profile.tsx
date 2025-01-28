import { Flex, Text, Heading, Box, Input, Button } from "@chakra-ui/react";
import { SideBar } from "@/components/sideBar/SideBar";
import { Link } from "react-router-dom";
import { AuthContext } from "@/Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { api } from "@/services/apiClient";

interface UserProps {
  id: string;
  name: string;
  email: string;
  endereco: string | null;
  subscriptions?: {
    id: string;
    status: string;
  } | null;
}

export default function Profile() {
  const { LogoutUser } = useContext(AuthContext);

  const [name, setName] = useState<string>("");
  const [endereco, setEndereco] = useState<string>("");
  const [premium, setPremium] = useState<boolean | null>(null);

  async function handleLogout() {
    await LogoutUser();
    window.location.reload();
  }

  async function handleSave() {
    const cookies = parseCookies();

    const storedUser = JSON.parse(cookies["@user"]);
    const updatedUser: UserProps = {
      ...storedUser,
      name,
      endereco,
    };
    setCookie(null, "@user", JSON.stringify(updatedUser), {
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    await api.put("/users", {
      name,
      endereco,
    });
    alert("Dados atualizados com sucesso!");
  }

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies["@user"]) {
      const storedUser = JSON.parse(cookies["@user"]);
      setName(storedUser.name || "");
      setEndereco(storedUser.endereco || "");
      setPremium(storedUser.subscriptions?.status === "active" ? true : false);
    }
  }, []);

  return (
    <>
      <SideBar>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          mt={5}
        >
          <Flex
            width="100%"
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Heading
              fontSize="3xl"
              mt={4}
              mb={4}
              mr={4}
              color="var(--orange-900)"
            >
              Minha Conta
            </Heading>
          </Flex>
          <Flex
            pt={8}
            pb={8}
            background="var(--barber-400 )"
            maxW="700px"
            w="100%"
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Flex direction="column" w="85%" alignItems="start">
              <Text color="white" mb={2} fontSize="xl" fontWeight="bold">
                Nome da barbearia:
              </Text>
              <Input
                w="100%"
                background="gray.900"
                placeholder="Nome da sua Barbearia"
                size="lg"
                type="text"
                mb={3}
                value={name}
                onChange={(e) => setName(e.target.value)}
                color="white"
              />
              <Text color="white" mb={2} fontSize="xl" fontWeight="bold">
                Endereço
              </Text>
              <Input
                w="100%"
                background="gray.900"
                placeholder="Endereço da Barbearia"
                size="lg"
                type="text"
                color="white"
                mb={3}
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
              <Text color="white" mb={2} fontSize="xl" fontWeight="bold">
                Plano Atual
              </Text>
              <Flex
                direction="row"
                w="100%"
                mb={3}
                p={1}
                borderWidth={1}
                rounded={6}
                background="var(--barber-900)"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text
                  p={2}
                  color={!premium ? "#4dffb4" : "#FBA931"}
                  fontSize="lg"
                >
                  Plano {premium ? "Premium" : "Free"}
                </Text>
                <Link to="/plans">
                  <Box
                    cursor="pointer"
                    p={1}
                    pl={2}
                    pr={2}
                    background="#00cd52"
                    color="white"
                    rounded={4}
                  >
                    Mudar Plano
                  </Box>
                </Link>
              </Flex>
              <Button
                background="var(--button-cta)"
                w="100%"
                color="black"
                mt={4}
                size="lg"
                _hover={{ background: "#fecf8a", border: "none" }}
                onClick={handleSave}
              >
                Salvar
              </Button>
              <Button
                borderColor="red.500"
                borderWidth={2}
                w="100%"
                color="red.500"
                size="lg"
                bg="var(--barber-400)"
                mt={4}
                mb={6}
                _hover={{ bg: "transparent", borderColor: "red.500" }}
                onClick={handleLogout}
              >
                Sair da conta
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </SideBar>
    </>
  );
}
