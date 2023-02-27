import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Legal = () => (
  <div
    style={{
      position: "absolute",
      bottom: 10,
      width: "100vw",
      textAlign: "center",
    }}
  >
    <Text color="gray.500" fontSize="xs">
      Canvas 23 Studios. Copyright 2023.
    </Text>
    <Text color="gray.100" fontSize="xs">
      <Link to="/account/policy">Privacy Policy</Link>
    </Text>
  </div>
);
