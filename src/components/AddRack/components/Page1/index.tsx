import {
  Input,
  Stack,
  Textarea,
  FormControl,
  FormLabel,
  Box,
  Button,
  InputGroup,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  InputLeftElement,
  CloseButton,
  TagLeftIcon,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { Field, useFormikContext } from "formik";
import React from "react";
import { MdGpsFixed } from "react-icons/md";
import { isMobile } from "react-device-detect";
import { getCoordinates } from "../../../../utils/gps";
import AbsoluteButton from "../../../../common/AbsoluteButton";
import { validatePage1 } from "../../../../validation";

export const Page1 = (props: { formProps: any; setPage(v: number): void }) => {
  const [gpsError, setGpsError] = React.useState(false);
  const [isGettingCoordinates, setIsGettingCoordinates] = React.useState(false);

  const handleGetGPSCoordinates = (setFieldValue, setGpsError) => {
    setIsGettingCoordinates(true);
    getCoordinates(setFieldValue, setIsGettingCoordinates, setGpsError);
  };
  const form: any = useFormikContext();

  return (
    <Box minW={isMobile ? "100%" : "400px"}>
      <Field name="name">
        {({ field, form }) => (
          <FormControl
            colorScheme="red"
            isRequired
            isInvalid={form.errors.name && form.touched.name}
          >
            <FormLabel htmlFor="name">Cross Streets</FormLabel>
            <Input
              {...field}
              variant="filled"
              id="name"
              placeholder="Pearl & Lopez"
              autoCorrect={false}
              _autofill={false}
            />
          </FormControl>
        )}
      </Field>
      <Field name="notes">
        {({ field, form }) => (
          <FormControl isInvalid={form.errors.notes && form.touched.notes}>
            <FormLabel htmlFor="notes">Description (optional)</FormLabel>
            <Textarea
              {...field}
              variant="filled"
              id="notes"
              placeholder="Jot down thoughts on this bike rack"
            />
          </FormControl>
        )}
      </Field>
      <Stack direction="row" style={{ display: "none" }}>
        <Field name="location.lat">
          {({ field }) => (
            <FormControl isRequired>
              <FormLabel htmlFor="location.lat">Latitude</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<MdGpsFixed />}
                />
                <Input
                  {...field}
                  variant="filled"
                  id="location.lat"
                  placeholder="Coordinate"
                  type="number"
                />
              </InputGroup>
            </FormControl>
          )}
        </Field>
        <Field name="location.long">
          {({ field }) => (
            <FormControl isRequired>
              <FormLabel htmlFor="location.long">Longitude</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<MdGpsFixed />}
                />
                <Input
                  {...field}
                  variant="filled"
                  id="location.long"
                  placeholder="Coordinate"
                  type="number"
                />
              </InputGroup>
            </FormControl>
          )}
        </Field>
      </Stack>
      <Box margin="15px" />
      <Box marginBottom="15px" display="flex" flexDir="column">
        <Button
          isLoading={isGettingCoordinates}
          minW="100%"
          onClick={() => {
            handleGetGPSCoordinates(props.formProps.setFieldValue, setGpsError);
          }}
        >
          Use Current Location
        </Button>
        <Box margin="2" />
        <Box display="flex" flexDir="row" justifyContent="center">
          <Tag
            size="lg"
            variant="subtle"
            colorScheme="gray"
            marginRight="2"
          >
            <TagLeftIcon boxSize="12px" as={MdGpsFixed} />
            <TagLabel>{form.values?.location?.lat}</TagLabel>
          </Tag>
          <Tag size="lg" key="long" variant="subtle" colorScheme="gray">
            <TagLeftIcon boxSize="12px" as={MdGpsFixed} />
            <TagLabel>{form.values?.location?.long}</TagLabel>
          </Tag>
        </Box>
      </Box>
      {gpsError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>GPS Failed!</AlertTitle>
          <AlertDescription>Location unavailable.</AlertDescription>
          <CloseButton
            onClick={() => setGpsError(false)}
            position="absolute"
            right="8px"
            top="8px"
          />
        </Alert>
      )}
      <AbsoluteButton
        bottom={20}
        disabled={
          validatePage1({ values: props.formProps.values }) ||
          isGettingCoordinates
        }
        onClick={() => props.setPage(2)}
      >
        Next
      </AbsoluteButton>
    </Box>
  );
};
