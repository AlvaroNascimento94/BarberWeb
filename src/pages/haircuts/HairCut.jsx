import { Link } from "react-router-dom";
import { SideBar } from "../../components/sideBar/SideBar";
import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { IoPricetag } from "react-icons/io5";
import { Switch } from "../../components/ui/switch";

export default function HairCuts() {
  const breakpoints = {
    base: "0em", // 0px
    sm: "30em", // ~480px
    md: "48em", // ~768px
    lg: "62em", // ~992px
    xl: "80em", // ~1280px
    "2xl": "96em", // ~1536px
  };

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
              <Switch colorPalette="green" size="lg" />
            </Stack>
          </Flex>
          <Link to="/haircuts/1" style={{ width: "100%" }}>
            <Flex
              cursor={"pointer"}
              w="100%"
              p={4}
              bg="var(--barber-400)"
              direction="row"
              rounded={4}
              mb={2}
              justifyContent={"space-between"}
            >
              <Flex direction="row" alignItems="center" justifyContent="center" rounded={10}>
                <IoPricetag size={28} color=" #fba931" />
                <Text mr={4} ml={4} noOfLines={2  } color="white" fontWeight="bold">
                  corte completo
                </Text>
              </Flex>
              <Text color={'white'} fontWeight={'bold'  }>Preço: R$ 50,00</Text>
            </Flex>
          </Link>
        </Flex>
      </SideBar>
    </>
  );
}
