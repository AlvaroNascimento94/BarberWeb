import { SideBar } from "@/components/sideBar/SideBar";
import { setupAPIClient } from "@/services/api";
import { Flex, Text, Heading, Button, Input, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Switch } from "../../components/ui/switch";

interface HairCutItem {
  id: string;
  name: string;
  price: string;
  status: boolean;
  user_Id: string;
}

export default function EditHairCut() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [check, setCheck] = useState<boolean>();
  const [haircut, setHairCut] = useState<HairCutItem>();

  const [name, setName] = useState<string | undefined>();
  const [price, setPrice] = useState<string | undefined>();
  const [status, setStatus] = useState<boolean | undefined>();

  const [disabledHairCut, setDisabled] = useState(
    status ? "disabled" : "enabled"
  );

  const api = setupAPIClient();

  async function hairCutCheck() {
    const response = await api.get("/haircut/check");
    if (response.data?.subscriptions.status === "active") {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }
  async function getHairCut() {
    try {
      const response = await api.get(`/haircut/detail`, {
        params: {
          haircut_id: id,
        },
      });
      setHairCut(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  function handleStatus(e) {
    if (e.target.value === "disabled") {
      setDisabled("enabled");
      setStatus(false);
    } else {
      setDisabled("disabled");
      setStatus(true);
    }
  }
  async function handleSave() {
    
    if (name==="" || price==="") {
      alert("Preencha todos os campos");
      return;
    }
    try {
      await api.put(`/haircut`, {
        haircut_id: id,
        name:name,
        price: Number(price),
        status: status,
      });
      navigate("/haircuts");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getHairCut();
    hairCutCheck();
  }, []);

  useEffect(() => {
    if (haircut) {
      setName(haircut?.name);
      setPrice(haircut?.price);
      setStatus(haircut?.status);
      setDisabled(haircut?.status ? "disabled" : "enabled");
    }
  }, [haircut]);

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
                value={name}
                onChange={(e) => setName(e.target.value)}
                color="white"
                fontSize={"lg"}
                mb={5}
                w="85%"
                rounded={4}
                type="text"
                bg="var(--barber-900)"
                disabled={!check ? true : false}
              />
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fontSize={"lg"}
                type="text"
                color="white"
                w="85%"
                bg="var(--barber-900)"
                rounded={4}
                mb={2}
                disabled={!check ? true : false}
              />
              <Stack direction="row" pt={2} w="85%">
                <Text color="white">Desativar Corte</Text>
                <Switch
                  colorPalette="orange"
                  size="lg"
                  disabled={!check ? true : false}
                  checked={disabledHairCut === "disabled" ? false : true}
                  value={disabledHairCut}
                  onChange={(e) => {
                    handleStatus(e);
                  }}
                />
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
                disabled={!check ? true : false}
                onClick={handleSave}
              >
                Salvar
              </Button>
              {!check ? (
                <Text
                  color={"white"}
                  mb={3}
                  fontSize="xs"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Link
                    to="/haircut/plans"
                    style={{
                      color: "green",
                      fontWeight: "bold",
                      marginRight: 3,
                    }}
                  >
                    Seja premium
                  </Link>
                  e tenha todos os acessos liberados.
                </Text>
              ) : null}
            </Flex>
          </Flex>
        </Flex>
      </SideBar>
    </>
  );
}
