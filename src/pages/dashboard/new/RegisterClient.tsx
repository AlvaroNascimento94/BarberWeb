import { SideBar } from "@/components/sideBar/SideBar";
import { setupAPIClient } from "@/services/api";
import {
  Button,
  Flex,
  Heading,
  Input,
  NativeSelectField,
  NativeSelectRoot,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterClient() {
  const [modelHairCut, setModelHairCut] = useState([]);
  const [value, setValue] = useState(modelHairCut[0]);
  const [customer, setCustomer] = useState("");
  const api = setupAPIClient();
  const navigate = useNavigate();

  async function handleSave() {
    if (!customer) {
      alert("Preencha o nome do cliente");
      return;
    }
    try {
      await api.post("/schedule", {
        customer,
        haircut_id: value,
      });
      console.log(customer, value);
      

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  async function getModelHairCut() {
    const response = await api.get("/haircuts", {
      params: {
        status: true,
      },
    });
    if (response.data) {
      setModelHairCut(response.data);
    }
  }

  function handleSelectValue(value) {
    const selectedValue = modelHairCut.find((item) => item.id === value);
    setValue(selectedValue.id);
    console.log(selectedValue);
  }

  useEffect(() => {
    getModelHairCut();
  }, []);
  useEffect(() => {
    setValue(modelHairCut[0]?.id);
  }, [modelHairCut]);

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
          <Link to={"/dashboard"} >
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
            fontSize={["28px ", "3xl"]}
            mt={4}
            mb={4}
            mr={4}
            color="var(--color-text)"
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
          m={"auto"}
          mt={10}
          maxWidth="700px"
          pb={8}
          pt={8}
          id="shadow"
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
            color="var(--color-text2)"
            onChange={(e) => setCustomer(e.target.value)}
          />
          <NativeSelectRoot size="md" width="85%">
            <NativeSelectField
              fontSize={"lg"}
              value={value}
              bg={"var(--barber-900)"}
              color="var(--color-text2)"
              onChange={(e) => handleSelectValue(e.target.value)}
              borderRadius={4}
            >
              {modelHairCut?.map((haircut) => (
                <option key={haircut?.id} value={haircut?.id}>
                  {haircut?.name}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
          <Button
            color="var(--color-text2)"
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
