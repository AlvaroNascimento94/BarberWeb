import { SideBar } from "@/components/sideBar/SideBar";
import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { setupAPIClient } from "@/services/api";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";

export default function NewHairCut() {
  const [count, setCount] = useState<number>();
  const [check, setCheck] = useState<boolean>();
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<string>();
  const navigate= useNavigate();

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
  async function handleSave() {
    const { "@barber.token": token } = parseCookies();
        api.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      if(!name || !price) {
        alert("Preencha todos os campos!");
        return;
      }
      await api.post("/haircut", {
        name,
        price: parseFloat(price),
      });
      navigate("/haircuts");
      alert("Corte cadastrado com sucesso!");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    HairCutCount();
    HairCutCheck();
  });
  return (
    <>
      <SideBar>
        <Flex direction="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        w="100%"
        mt={5}>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            w="100%"
            mt={5}
          >
            <Link to="/haircuts">
              <Button
                bg="var(--button-default)"
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
              color="var(--color-text)"
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
            p={4}
            direction="column"
            alignItems="center"
            justifyContent="center"
            m={"auto"}
            mt={10}
            maxWidth="700px"
            pb={8}
            pt={8}
            id="shadow"
          >
            <Heading color="white" fontSize={["xl", "2xl"]} mb={5}>
              Cadastrar Modelo
            </Heading>
            <Input
              placeholder="Nome do Corte:"
              color="white"
              fontSize={"lg"}
              mb={5}
              w="85%"
              rounded={4}
              type="text"
              bg="var(--barber-900)"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Preço do Corte:"
              fontSize={"lg"}
              type="text"
              color="white"
              w="85%"
              bg="var(--barber-900)"
              rounded={4}
              onChange={(e) => setPrice(e.target.value)}
            />
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
              onClick={handleSave}
            >
              Cadastrar
            </Button>
            {count >= countMax && !check ? (
              <Text color={"white"} mb={3} fontSize="xs">
                Você atingiou seu limite de cortes,
                <Link
                  to="/plans"
                  style={{ color: "green", fontWeight: "bold" }}
                >
                  {" "}
                  seja premium{" "}
                </Link>
                e tenha acesso ilimitado.
              </Text>
            ) : null}
          </Flex>
        </Flex>
      </SideBar>
    </>
  );
}
