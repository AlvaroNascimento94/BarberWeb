import { SideBar } from "@/components/sideBar/SideBar";
import { setupAPIClient } from "@/services/api";
import { Flex, Text, Heading, Button, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { Switch } from "../../components/ui/switch";

export default function EditHairCut() {
  const { id } = useParams();
  const [count, setCount] = useState<number>();
  const [check, setCheck] = useState<boolean>();

  const countMax = 3;

  const api = setupAPIClient();
  async function HairCutCount() {
    const count = await api.get("/haircut/count");
    setCount(count.data);
  }
  async function HairCutCheck() {
    const response = await api.get("/haircut/check");
    if (response.data.subscriptions.status === "active") {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }
  return (
    <>
      <SideBar>
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            w="100%"
            mt={10}
          >
            <Link to="/haircuts">
              <Button
                bg="gray.700"
                w={"90%"}
                alignItems={"center"}
                display={"flex"}
                justifyContent={"center"}
              >
                <IoChevronBackOutline />
                Voltar
              </Button>
            </Link>
            <Heading
              color="var(--orange-900)"
              fontSize={["xl", "3xl"]}
              ml={3}
              fontWeight={"bold"}
            >
              Modelos de Corte
            </Heading>
          </Flex>
          <Flex
            bg="var(--barber-400)"
            w="100%"
            direction="column"
            alignItems="center"
            justifyContent="center"
            mt={10}
            maxWidth="700px"
            pb={8}
            pt={8}
          >
            <Heading color="white" fontSize={["xl", "2xl"]} mb={5}>
              Editar Modelo
            </Heading>
            <Flex
              bg="var(--barber-400)"
              w="85%"
              direction="column"
              alignItems="center"
              justifyContent="center"
              maxWidth="700px"
            >
              <Input
                placeholder="Nome do Modelo:"
                color="white"
                fontSize={"lg"}
                mb={5}
                w="85%"
                rounded={4}
                type="text"
                bg="var(--barber-900)"
              />
              <Input
                placeholder="Preço do Modelo:"
                fontSize={"lg"}
                type="text"
                color="white"
                w="85%"
                bg="var(--barber-900)"
                rounded={4}
                mb={2}
              />
              <Stack  direction="row" pt={2} w="85%">
                <Text color="white">Desativar Corte</Text>
                <Switch colorPalette="orange" size="lg" />
              </Stack>
              <Button
                color="gray.900"
                mt={5}
                mb={5}
                w={"85%"}
                bg="var(--button-cta)"
                fontWeight={"bold"}
                rounded={4}
                _hover={{ background: "#fecf8a", border: "none" }}
                disabled={count >= countMax && !check ? true : false}
              >
                Salvar
              </Button>
              {/* {count >= countMax && !check ? (
              <Text color={"white"} mb={3} fontSize="xs">
                Você atingiou seu limite de cortes,
                <Link
                  to="/haircut/plans"
                  style={{ color: "green", fontWeight: "bold" }}
                >
                  {" "}
                  seja premium{" "}
                </Link>
                e tenha acesso ilimitado.
              </Text>
            ) : null} */}
              -
              <Text color={"white"} mb={3} fontSize="xs">
                <Link
                  to="/haircut/plans"
                  style={{ color: "green", fontWeight: "bold" }}
                >
                  {" "}
                  Seja premium{" "}
                </Link>
                e tenha todos oacessos liberados.
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </SideBar>
    </>
  );
}
