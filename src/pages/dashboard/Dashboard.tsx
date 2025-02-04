import { Button, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { SideBar } from "@/components/sideBar/SideBar";
import { IoPersonSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { setupAPIClient } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { parseCookies } from "nookies";
import { ModalInfo } from "@/components/model/ModalInfo";
import { count } from "console";

export interface ScheduleItem {
  id: string;
  customer: string;
  haircut: {
    id: string;
    name: string;
    price: string;
    user_id: string;
  };
}

export default function Dashboard() {
  const [schedules, setSchedules] = useState([]);
  const { open, onOpen, onClose } = useDisclosure();
  const [service, setService] = useState<ScheduleItem>();
  const api = setupAPIClient();

  async function getSchedule() {
    const { "@barber.token": token } = parseCookies();
    api.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      const response = await api.get("/schedule", {
        params: {
          status: "true",
        },
      });
      setSchedules(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleOpen(item: ScheduleItem) {
    setService(item);
    onOpen();
  }

  useEffect(() => {
    getSchedule();
  }, []);
  return (
    <>
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
          {schedules?.map((schedule) => (
            <Flex
              cursor={"pointer"}
              w="100%"
              p={4}
              bg="var(--barber-400)"
              direction={["column", "row"]}
              alignItems={["flex-start", "center"]}
              rounded={4}
              mb={2}
              justifyContent="space-between"
              key={schedule?.id}
              onClick={() => handleOpen(schedule)}
            >
              <Flex align={"center"} justify={"flex-start"} mb={[2, 0]}>
                <IoPersonSharp size={28} color=" #fba931" />
                <Text color="white" ml={4} fontWeight="bold">
                  {schedule?.customer}
                </Text>
              </Flex>
              <Text color="white" fontWeight="bold" mb={[2, 0]}>
                {schedule?.haircut?.name}
              </Text>
              <Text color="white" fontWeight="bold">
                R$ {schedule?.haircut?.price}
              </Text>
            </Flex>
          ))}
        </Flex>
        <ModalInfo
          data={service}
          open={open}
          onOpen={onOpen}
          onClose={onClose}
        />
      </SideBar>
    </>
  );
}
