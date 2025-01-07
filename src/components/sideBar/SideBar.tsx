import React, { ReactNode } from "react";
import {
  Box,
  BoxProps,
  DrawerRoot,
  DrawerBackdrop,
  DrawerContent,
  Flex,
  FlexProps,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiScissors, FiClipboard, FiSettings, FiMenu } from "react-icons/fi";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";
import { CloseButton } from "@/components/ui/close-button";
import { useColorModeValue } from "../ui/color-mode";

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Agenda", icon: FiScissors, path: "/dashboard" },
  { name: "Cortes", icon: FiClipboard, path: "/haircuts" },
  { name: "Minha Conta", icon: FiSettings, path: "/profile" },
];

export function SideBar({ children }: { children: ReactNode }) {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg="var(--barber-900)">
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />

      <DrawerRoot open={open} placement="start" size="full">
        <DrawerBackdrop/>
        <DrawerContent>
          <SidebarContent onClose={() => onClose()} />
        </DrawerContent>
      </DrawerRoot>

      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />

      <Box ml={{base:0, md: 60}} padding={4}>{children}</Box>
    </Box>
  );
}  

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg="var(--barber-400)"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link to="/">
          <Flex
            cursor="pointer"
            userSelect="none"
            alignItems="center"
            flexDirection="row"
          >
            <Text
              fontSize="2xl"
              color="white"
              fontFamily="monospace"
              fontWeight="bold"
            >
              Barber
            </Text>
            <Text
              fontSize="2xl"
              color="var(--button-cta)"
              fontFamily="monospace"
              fontWeight="bold"
            >
              PRO
            </Text>
          </Flex>
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem icon={link.icon} path={link.path} key={link.name}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  path: string;
}

const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
  return (
    <Link to={path} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="2"
        borderRadius="lg"
        color="white"
        role="group"
        cursor="pointer"
        _hover={{ bg: "var(--barber-900)", color: "white" }}
        {...rest}
      >
        {icon && (
          <Box mr={4} fontSize="16">
            {React.createElement(icon)}
          </Box>
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileNavProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileNavProps) => {
  return (
    <Flex
      ml={{ base: 0, md: "60" }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("var(--barber-400)", "gray.900")}
      borderBottomWidth="1"
      borderBottomColor={useColorModeValue("gray.200", "gray.900")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        as={FiMenu}
        color="white"
      />
      <Flex flexDirection="row">
        <Text
          ml={8}
          fontSize="2xl"
          color="white"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Barber
        </Text>
        <Text
          fontSize="2xl"
          color="var(--button-cta)"
          fontFamily="monospace"
          fontWeight="bold"
        >
          PRO
        </Text>
      </Flex>
    </Flex>
  );
};
