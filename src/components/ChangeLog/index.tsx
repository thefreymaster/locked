import React from 'react';
import { changeLog } from '../../json/changeLog';
import { Box, Divider, Text } from '@chakra-ui/react';
import DeviceWrapper from '../../common/DeviceWrapper';
import Wrapper from '../../common/Wrapper';
import Font from '../../common/Font';

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
            </DeviceWrapper>
        </Wrapper>

    )
}

export default ChangeLog;