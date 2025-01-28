import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { SideBar } from "@/components/sideBar/SideBar";
import { IoPersonSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const data = [
    {
      name: "nome 1",
      corte: "corte 1",
      price: "price 1",
    },
    {
      name: "name 2",
      corte: "corte 2",
      price: "price 2",
    },
    {
      name: "name 3",
      corte: "corte 3",
      price: "price 3",
    },
  ];
  return (
    <SideBar>
      <Flex
        direction="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        w="100%"
        mt={5}
      >
        <Flex
          direction={["row"]}
          width="100%"
          justify={"flex-start"}
          align={[ "center"]}
          mb={2}
        >
          <Heading
            fontSize={["28px ", "3xl"]}
            mt={4}
            mb={4}
            mr={4}
            color="var(--orange-900)"
          >
            Agenda
          </Heading>
          <Link to="/new">
            <Button bg="gray.700">Registrar</Button>
          </Link>
        </Flex>
        {data.map((dat) => (
          <Flex
            cursor={"pointer"}
            w="100%"
            p={4}
            bg="var(--barber-400)"
            direction={["column","row"]}
            alignItems={["flex-start", "center"]}
            rounded={4}
            mb={2}
            justifyContent="space-between"
          >
            <Flex align={"center"} justify={"flex-start"} mb={[2, 0]}>
              <IoPersonSharp size={28}   color=" #fba931" />
              <Text color="white" ml={4}fontWeight="bold">
                {dat.name}
              </Text>
            </Flex>
            <Text color="white" fontWeight="bold" mb={[2, 0]}>
              {dat.corte}
            </Text>
            <Text color="white" fontWeight="bold" >
              {dat.price}
            </Text>
          </Flex>
        ))}
      </Flex>
    </SideBar>
  );
}
