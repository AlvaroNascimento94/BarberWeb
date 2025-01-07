import { Flex, Text } from "@chakra-ui/react";
import { SideBar } from "@/components/sideBar/SideBar";

export default function Dashboard() {
  return (
    <SideBar>
        <Flex width="100%" height="100%" align="center" justify="center">
          <Text fontSize="4xl" color="gray.800" fontWeight="bold">
            bem vindo a tela inicio
          </Text>
        </Flex>
    </SideBar>
  );
}
