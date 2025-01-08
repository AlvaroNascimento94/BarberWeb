import { Flex, Text, Heading, Box, Input, Button } from "@chakra-ui/react";
import { SideBar } from "@/components/sideBar/SideBar";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <>
      <SideBar>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
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
                mb={3}
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
                <Text p={2} color="#4dffb4" fontSize="lg">
                  Plano Gratis
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
                _hover={{ background: "#fecf8a", border: "none"}}
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
                mb={6 }
                _hover={{ bg: "transparent", borderColor: "red.500" }}
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
