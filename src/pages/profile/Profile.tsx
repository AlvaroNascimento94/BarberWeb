import { Flex, Text, Heading, Box, Input, Button } from "@chakra-ui/react";
import { SideBar } from "@/components/sideBar/SideBar";
import { Link } from "react-router-dom";
import { AuthContext } from "@/Context/AuthContext";
import { useContext, useEffect, useState } from "react";
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
  console.log(name, endereco);
  

  async function handleLogout() {
    await LogoutUser();
    window.location.reload();
  }

  async function handleSave() {
    await api.put("/users", {
      name,
      address:endereco,
    });
    alert("Dados atualizados com sucesso!");
  }

  async function info(){
    const response = await api.get("/me");
    setName(response.data.name);
    setEndereco(response.data.address);
    setPremium(response.data.subscriptions?.status === "active" ? true : false);
  }

  useEffect(() => {
    info();
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
              color="var(--color-text)"
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
            m="auto"
            mt={10}
            id="shadow"
          >
            <Flex direction="column" w="85%" alignItems="start"
            >
              <Text color="white" mb={2} fontSize="xl" fontWeight="bold">
                Nome da barbearia:
              </Text>
              <Input
                w="100%"
                background="var(--barber-900)"
                placeholder="Nome da sua Barbearia"
                size="lg"
                type="text"
                mb={3}
                value={name}
                onChange={(e) => setName(e.target.value)}
                color="var(--color-text)"
              />
              <Text color="white" mb={2} fontSize="xl" fontWeight="bold">
                Endereço
              </Text>
              <Input
                w="100%"
                background="var(--barber-900)"
                placeholder="Endereço da Barbearia"
                size="lg"
                type="text"
                color="var(--color-text)"
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
                  fontWeight="medium"
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
                borderColor="none"
                borderWidth={2}
                w="100%"
                color="red.500"
                size="lg"
                bg="var(--barber-900)"
                mt={4}
                mb={6}
                _hover={{ bg: "var(--barber-100)", borderColor: "red.500" }}
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
