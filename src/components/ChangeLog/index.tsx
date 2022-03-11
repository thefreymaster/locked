import { changeLog } from "../../json/changeLog";
import { Box, Divider, Icon, Link, Text, Badge, Code } from "@chakra-ui/react";
import DeviceWrapper from "../../common/DeviceWrapper";
import Wrapper from "../../common/Wrapper";
import Font from "../../common/Font";
import { RiExternalLinkLine } from "react-icons/ri";
import { BackButton } from "../../common/BackButton";

const ChangeLog = () => {
  return (
    <Wrapper justifyContent="flex-start">
      <DeviceWrapper>
        <Box>
          <Box display="flex" flexDir="row" alignItems="center">
            <BackButton />
            <Box>
              <Font variant="primary" fontWeight="bold" fontSize="32px">
                Change Log
              </Font>
            </Box>
            <Box flexGrow={1} />
            <Box>
              <Badge colorScheme="purple">BETA</Badge>
            </Box>
          </Box>
          {changeLog.map((item) => (
            <>
              <Divider mt={2} mb={2} />
              <Box>
                <Text fontWeight="bold" fontSize="md">
                  <Code>{item.version}</Code>
                </Text>
                <Text fontSize="xs">{item.changes}</Text>
              </Box>
            </>
          ))}
        </Box>
        <Divider />
        <Box padding="30px 0px">
          <Font fontWeight={900}>Technology Attributions</Font>
        </Box>
        <Box padding="10px 30px 10px 30px">
          <Link href="https://react-icons.github.io/react-icons" isExternal>
            ReactIcons <Icon as={RiExternalLinkLine} />
          </Link>
        </Box>
        <Box padding="10px 30px 10px 30px">
          <Link href="https://chakra-ui.com" isExternal>
            Chakra UI <Icon as={RiExternalLinkLine} />
          </Link>
        </Box>
        <Box padding="10px 30px 10px 30px">
          <Link href="https://www.mapbox.com" isExternal>
            Mapbox <Icon as={RiExternalLinkLine} />
          </Link>
        </Box>
      </DeviceWrapper>
    </Wrapper>
  );
};

export default ChangeLog;
