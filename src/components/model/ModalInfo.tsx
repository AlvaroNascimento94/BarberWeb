import {
  DialogRoot,
  Button,
  DialogContent,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
  Flex,
  Text,
  DialogBackdrop,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

import { FiUser, FiScissors } from "react-icons/fi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { ScheduleItem } from "@/pages/dashboard/Dashboard";
import { CloseButton } from "../ui/close-button";
import { setupAPIClient } from "@/services/api";

interface ModaLInfoPropsi {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: ScheduleItem;
}

export function ModalInfo({
  data,
  onOpen,
  onClose,
  open,
}: ModaLInfoPropsi) {
  const [isOpen, setOpen] = useState(false);
  const api = setupAPIClient();

  async function handleFinish() {
    await api.delete(`/schedule`, {
      params: {
        schedule_id: data?.id
      },
    })
    onClose();
    window.location.reload();
  }
  return (
    <DialogRoot
      placement={"center"}
      motionPreset="slide-in-bottom"
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      size={"sm"}
    >
      <DialogBackdrop />
      <DialogContent
        bg={"var(--barber-400)"}
        p={4}
        borderRadius={4}
        color={"white"}
        direction={"row"}
      >
        <Flex
          pt={0}
          pl={5}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          pb={5}
        >
          <DialogTitle fontSize={"2xl"}>Proximo</DialogTitle>
          <CloseButton bg={"none"} color={"white"} w={"5%"} onClick={onClose} />
        </Flex>
        <DialogBody>
          <Flex
            align={"center"}
            justify={"center"}
            direction={"column"}
            w={"80%"}
            pb={0}
          >
            <Stack
              direction={"row"}
              align={"center"}
              justify={"flex-start"}
              w={"100%"}
              pb={3}
            >
              <FiUser size={32} color={"#fba931"} />
              <Text color={"white"} fontWeight={"bold"} ml={2}>
                {data?.customer}
              </Text>
            </Stack>
            <Stack
              direction={"row"}
              align={"center"}
              justify={"flex-start"}
              w={"100%"}
              pb={3}
            >
              <FiScissors size={32} color={"#fba931"} />
              <Text color={"white"} fontWeight={"bold"} ml={2}>
                {data?.haircut?.name}
              </Text>
            </Stack>
            <Stack
              direction={"row"}
              align={"center"}
              justify={"flex-start"}
              w={"100%"}
            >
              <FaMoneyBillAlt size={32} color={"#fba931"} />
              <Text color={"white"} fontWeight={"bold"} ml={2}>
                R$ {data?.haircut?.price}
              </Text>
            </Stack>
          </Flex>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={handleFinish} bg={"#fba931"}>
              Finalizar Serviço
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
