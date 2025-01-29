import { SideBar } from "@/components/sideBar/SideBar";
import {
  Button,
  Flex,
  Heading,
  Input,
  NativeSelectField,
  NativeSelectRoot,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function RegisterClient() {
  const [value, setValue] = useState("");
  const [customer, setCustomer] = useState("");
  

  const items = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ];
async function handleSave() {
    alert("Agendamento salvo com sucesso!");
}

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
          align={["center"]}
          mb={2}
        >
          <Link to={"/dashboard"}>
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
            fontSize={["28px ", "3xl"]}
            mt={4}
            mb={4}
            mr={4}
            color="var(--orange-900)"
          >
            Novo Agendamento
          </Heading>
        </Flex>
        <Flex
          bg="var(--barber-400)"
          w="100%"
          p={4}
          direction="column"
          alignItems="center"
          justifyContent="center"
          mt={10}
          maxWidth="700px"
          pb={8}
          pt={8}
        >
          <Input
            placeholder="Nome do Cliente:"
            value={customer}
            bg="var(--barber-900)"
            fontSize={"lg"}
            mb={5}
            w="85%"
            rounded={4}
            type="text"
            color="white"
            onChange={(e) => setCustomer(e.target.value)}
          />
          <NativeSelectRoot size="md" width="85%" >
            <NativeSelectField
              placeholder="Select option"
              fontSize={"lg"}
              value={value}
              bg={"var(--barber-900)"}
              color={"white"}
              onChange={(e) => setValue(e.currentTarget.value)}
              borderRadius={4}
            >
              {items.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
          <Button
            color="var(--barber-900)"
            mt={5}
            mb={5}
            w={"85%"}
            bg="var(--button-cta)"
            fontWeight={"bold"}
            rounded={4}
            _hover={{ background: "#fecf8a", border: "none" }}
            onClick={handleSave}
          >
            Registrar
          </Button>
        </Flex>
      </Flex>
    </SideBar>
  );
}
