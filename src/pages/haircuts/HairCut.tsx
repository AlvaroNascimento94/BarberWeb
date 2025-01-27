import { Link } from "react-router-dom";
import { SideBar } from "../../components/sideBar/SideBar";
import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { IoPricetag } from "react-icons/io5";
import { Switch } from "../../components/ui/switch";
import { api } from "@/services/apiClient";
import { useEffect, useState, ChangeEvent } from "react";
import { parseCookies } from "nookies";
import { setupAPIClient } from "@/services/api";
interface HairCutItem {
  id: string;
  name: string;
  price: string;
  status: boolean;
  user_Id: string;
}

interface HairCutProps {
  haircuts: HairCutItem[];
}

export default function HairCuts({ haircuts }: HairCutProps) {
  const [haircutsList, setHaircutsList] = useState<HairCutItem[]>(
    haircuts || []
  );
  const [disabled, setDisabled] = useState("enabled");

  async function handleDisabled(e) {
    const apiClient = setupAPIClient();
    if(e.target.value === "disabled"){
      setDisabled("enabled")
      const response = await apiClient.get("/haircuts", {
        params: {
          status: "true",
        },
      })
      setHaircutsList(response.data)
    }else{
      setDisabled("disabled")
      const response = await apiClient.get("/haircuts", {
        params: {
          status: "false",
        },
      })
      setHaircutsList(response.data)
    }
  }

  async function hairCutList() {
    const { "@barber.token": token } = parseCookies();
    api.defaults.headers.Authorization = `Bearer ${token}`;
    const response = await api.get("/haircuts", {
      params: {
        status: "true",
      },
    });
    setHaircutsList(response.data);
  }
  useEffect(() => {
    hairCutList();
  }, []);

  return (
    <>
      <SideBar>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          w="100%"
        >
          <Flex
            direction={["column", "row"]}
            alignItems={["flex-start", "center"]}
            justifyContent="flex-start"
            w="100%"
            mb={0}
          >
            <Heading
              fontSize={["28px ", "2xl"]}
              mt={4}
              mb={4}
              mr={4}
              color="var(--orange-900)"
            >
              Modelos de cortes
            </Heading>

            <Link to="/haircuts/new">
              <Button bg="gray.700">Cadastrar Novo</Button>
            </Link>

            <Stack ml={["auto"]} align="center" direction="row" p={2}>
              <Text color="white" fontWeight="bold">
                ATIVOS
              </Text>
              <Switch
                colorPalette="green"
                size="lg"
                value={disabled}
                onChange={(e) => {
                  handleDisabled(e);
                }}
                checked={disabled === "disabled"? false : true}
              />
            </Stack>
          </Flex>
          {haircutsList?.map((haircut) => (
            <Link
              key={haircut.id}
              to={`/haircuts/${haircut.id}`}
              style={{ width: "100%" }}
            >
              <Flex
                cursor={"pointer"}
                w="100%"
                p={4}
                bg="var(--barber-400)"
                direction={["column", "row"]}
                alignItems={["flex-start", "center"]}
                rounded={4}
                mb={2}
                justifyContent={"space-between"}
              >
                <Flex
                  direction="row"
                  alignItems="center"
                  mb={[3, 0]}
                  justifyContent="center"
                  rounded={10}
                >
                  <IoPricetag size={28} color=" #fba931" />
                  <Text mr={4} ml={4} color="white" fontWeight="bold">
                    {haircut.name}
                  </Text>
                </Flex>
                <Text color={"white"} fontWeight={"bold"}>
                  Preço: R$ {haircut.price}
                </Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      </SideBar>
    </>
  );
}
