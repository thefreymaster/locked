import React from 'react';
import { changeLog } from '../../json/changeLog';
import { Box, Divider, Icon, Link, Text } from '@chakra-ui/react';
import DeviceWrapper from '../../common/DeviceWrapper';
import Wrapper from '../../common/Wrapper';
import Font from '../../common/Font';
import { RiExternalLinkLine } from 'react-icons/ri';

const ChangeLog = () => {
    return (
        <Wrapper justifyContent="flex-start">
            <DeviceWrapper>
                <Box>
                    <Font variant="primary" fontWeight="bold" fontSize="32px">Change Log</Font>
                    {changeLog.map(item => (
                        <>
                            <Divider mt={2} mb={2} />
                            <Box>
                                <Text fontWeight="bold" fontSize="md">{item.version}</Text>
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
                    <Link href="https://react-icons.github.io/react-icons" isExternal>ReactIcons <Icon as={RiExternalLinkLine} /></Link>
                </Box>
                <Box padding="10px 30px 10px 30px">
                    <Link href="https://chakra-ui.com" isExternal>Chakra UI <Icon as={RiExternalLinkLine} /></Link>
                </Box>
                <Box padding="10px 30px 10px 30px">
                    <Link href="https://www.mapbox.com" isExternal>Mapbox <Icon as={RiExternalLinkLine} /></Link>
                </Box>
            </DeviceWrapper>
        </Wrapper>

    )
}

export default ChangeLog;