import { SideBar } from "@/components/sideBar/SideBar";
import { setupAPIClient } from "@/services/api";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";

import { getStripeJs } from "@/utils/stripe-js";

import { useEffect, useState } from "react";
import { LuCircleCheck } from "react-icons/lu";

export default function Plans() {
  const api = setupAPIClient();
  const [premium, setPremium] = useState<boolean>();
  const handleSubscription = async () => {
    if (premium) {
      return;
    }
    try {
      const response = await api.post("/subscribe");
      const { sessionId } = response.data;
      const stripe = await getStripeJs();
      if (!stripe) {
        throw new Error("Stripe initialization failed");
      }
      await stripe.redirectToCheckout({ sessionId: sessionId });
    } catch (error) {
      console.error(error);
    }
  };

  async function handlePremium() {
    try {
      const response = await api.get("/me");
      setPremium(
        response.data?.subscriptions?.status === "active" ? true : false
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCreatePortal() {
    try {
      if (!premium) {
        return;
      }
      const response = await api.post("/create-portal");
      const { sessionId } = response.data;
      window.location.href = sessionId;

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    handlePremium();
  }, []);

  return (
    <SideBar>
      <Flex
        direction="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        w="100%"
        mt={5}
      >
        <Heading
          fontSize={["28px ", "3xl"]}
          mt={5}
          mr={4}
          color="var(--orange-900)"
        >
          Plans
        </Heading>
      </Flex>
      <Flex
        pb={8}
        w={"100%"}
        maxW={"780px"}
        m={"auto"}
        direction="column"
        alignItems="flex-start"
        justify={"flex-start"}
      >
        <Flex
          w="100%"
          m="auto"
          direction={["column", "column", "row"]}
          align={["center", "center", "stretch"]}
          justifyContent={"flex-start"}
          pt={4}
          gap={[0, 0, 4]}
        >
          {/* esquerda */}
          <Flex
            bg="var(--barber-400)"
            rounded={10}
            w="85%"
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            mt={10}
            pb={8}
            pt={8}
            flex={1}
          >
            <Heading
              fontSize={["md", "xl"]}
              mb={8}
              mr={4}
              color="var(--orange-900)"
            >
              Planos Gratis
            </Heading>
            <Flex
              direction="column"
              alignItems="flex-start"
              gap={4}
              w={["85%", null, "85%"]}
              pl={[12, 24, 3]}
            >
              <Flex align={"center"} gap={2} justify={"flex-start"}>
                <LuCircleCheck color="#00cd52" />
                <Text color={"white"}>Registrar Cortes</Text>
              </Flex>
              <Flex align={"center"} gap={2}>
                <LuCircleCheck color="#00cd52" />
                <Text color={"white"}>Criar apenas 3 modelos</Text>
              </Flex>
              <Flex align={"center"} gap={2}>
                <LuCircleCheck color="#00cd52" />
                <Text color={"white"}>Editar dados do perfil</Text>
              </Flex>
            </Flex>
          </Flex>
          {/* Direita */}
          <Flex
            bg="var(--barber-400)"
            w="85%"
            flex={1}
            rounded={10}
            direction="column"
            alignItems="center"
            justifyContent="center"
            mt={10}
            maxWidth="700px"
            pb={8}
            pt={8}
          >
            <Heading fontSize={["md", "xl"]} mb={8} mr={4} color="#00cd52">
              Premium
            </Heading>
            <Flex
              direction="column"
              alignItems="flex-start"
              gap={4}
              w={["85%", null, "85%"]}
              pl={[12, 3]}
            >
              <Flex align={"center"} gap={2} justify={"flex-start"}>
                <LuCircleCheck color="#00cd52" />
                <Text color={"white"}>Registrar Cortes</Text>
              </Flex>
              <Flex align={"center"} gap={2}>
                <LuCircleCheck color="#00cd52" />
                <Text color={"white"}>Criar modelos</Text>
              </Flex>
              <Flex align={"center"} gap={2}>
                <LuCircleCheck color="#00cd52" />
                <Text color={"white"}>Editar modelos de corte</Text>
              </Flex>
              <Flex align={"center"} gap={2}>
                <LuCircleCheck color="#00cd52" />
                <Text color={"white"}>Editar dados do perfil</Text>
              </Flex>
              <Flex align={"center"} gap={2}>
                <LuCircleCheck color="#00cd52" />
                <Text color={"white"}>Receber atualizações</Text>
              </Flex>
              <Flex align={"center"} gap={2}>
                <LuCircleCheck color="#00cd52" />
                <Text
                  color={"var(--orange-900)"}
                  fontSize={"xl"}
                  fontWeight={"bold"}
                >
                  R$ 29,90
                </Text>
              </Flex>
              {!premium ? (
                <Button
                  w={"100%"}
                  m={2}
                  bg={"var(--orange-900)"}
                  color={"var(--barber-400)"}
                  _hover={{ bg: "#fecf8a" }}
                  onClick={handleSubscription}
                >
                  Virar Premium
                </Button>
              ) : (
                <Flex direction="column" w={"100%"}>
                  <Button
                    w={"100%"}
                    mb={2}
                    bg={"var(--barber-900)"}
                    color={"white"}
                    disabled
                  >
                    Você já é Premium
                  </Button>
                  <Button
                    w={"100%"}
                    mt={2}
                    bg={"var(--orange-900)"}
                    color={"var(--barber-400)"}
                    _hover={{ bg: "#fecf8a" }}
                    onClick={handleCreatePortal}
                  >
                    Alterar Assinatura
                  </Button>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </SideBar>
  );
}
