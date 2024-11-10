// Navbar.jsx
import React from "react";
import {
  Flex,
  Box,
  Button,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa"; // Profile icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCreateNewSet = () => {
    navigate('/create-flashcard-set'); // Navigate to the FlashcardSetFormPage
  };

  return (
    <Flex
      as="nav"
      p={4}
      bg="teal.500"
      color="white"
      align="center"
      justify="space-between"
      wrap="wrap"
    >
      <Flex align="center">
        {/* Hamburger menu for mobile */}
        {!isDesktop && (
          <IconButton
            icon={<HamburgerIcon />}
            onClick={onOpen}
            aria-label="Open menu"
            variant="outline"
            colorScheme="whiteAlpha"
            mr={2}
          />
        )}

        {/* Project Name */}
        <Text fontSize="xl" fontWeight="bold" ml={2}>
          FlashDeck
        </Text>
      </Flex>

      {/* Navbar items for desktop */}
      {isDesktop && (
        <Flex align="center">
          <Button
            leftIcon={<AddIcon />}
            colorScheme="white"
            variant="outline"
            mr={4}
            onClick={handleCreateNewSet} // Handle button click
          >
            Create New Set
          </Button>
          <IconButton
            icon={<FaUser />}
            aria-label="Profile"
            colorScheme="white"
            variant="outline"
          />
        </Flex>
      )}

      {/* Drawer for mobile menu */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="teal"
              variant="solid"
              mb={4}
              width="100%"
              onClick={handleCreateNewSet} // Handle button click
            >
              Create New Set
            </Button>
            <Flex align="center">
              <IconButton
                icon={<FaUser />}
                aria-label="Profile"
                colorScheme="teal"
                variant="outline"
                size="lg"
              />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Navbar;
