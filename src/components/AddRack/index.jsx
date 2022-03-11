import {
  Input,
  Stack,
  Textarea,
  FormControl,
  FormLabel,
  Box,
  ButtonGroup,
  Button,
  InputGroup,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  InputLeftElement,
  CloseButton,
  Tag,
  Divider,
  Fade,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useHistory, Redirect } from "react-router-dom";
import React from "react";
import AbsoluteButton from "../../common/AbsoluteButton";
import { useGlobalState } from "../../providers/root";
import Upload from "../Upload";
import { validatePage1, validatePage2, validatePage3 } from "../../validation";
import { initialValues } from "../../constants";
import { getCoordinates } from "../../utils/gps";
import { useParams } from "react-router-dom";
import DeviceWrapper from "../../common/DeviceWrapper";
import { MdGpsFixed } from "react-icons/md";
import { calculateOverallRating } from "../../utils/calcOverallRating";
import { isMobile } from "react-device-detect";
import { BiArrowBack } from "react-icons/bi";
import Photo from "../../common/Photo";
import firebaseApi from "../../api/firebase";
import LottieLoading from "../../common/LottieLoading";

const AddRack = (props) => {
  let { id } = useParams();
  const { firebase, meta, dispatch, locks, coordinates } = useGlobalState();
  const { dbKey } = meta;
  const [isUploading, setIsUploading] = React.useState(false);
  const history = useHistory();

  const toast = useToast();

  const showSuccessToast = () => {
    toast({
      title: "Bike rack added",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };
  const showSuccessEditToast = () => {
    toast({
      title: "Bike rack updated",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const [page, setPage] = React.useState(1);
  const [gpsError, setGpsError] = React.useState(false);
  const [isGettingCoordinates, setIsGettingCoordinates] = React.useState(false);

  if (firebase.isValidatingAuthentication || meta.fetching) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <LottieLoading />
      </Box>
    );
  }

  if (!firebase.isAuthenticated) {
    return <Redirect to="/welcome" />;
  }

  const handleGetGPSCoordinates = (setFieldValue, setGpsError) => {
    setIsGettingCoordinates(true);
    getCoordinates(setFieldValue, setIsGettingCoordinates, setGpsError);
  };

  return (
    <Fade in>
      <Box
        margin="0px 0px 60px 0px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ zIndex: 20 }}
      >
        <DeviceWrapper>
          <Formik
            initialValues={
              locks[id] || {
                ...initialValues,
                location: {
                  lat: coordinates.center.latitude,
                  long: coordinates.center.longitude,
                },
              }
            }
            onSubmit={(values, actions) => {
              console.log(values);
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(formProps) => {
              return (
                <Form>
                  {page === 1 && (
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
                          <FormControl
                            isInvalid={form.errors.notes && form.touched.notes}
                          >
                            <FormLabel htmlFor="notes">Description</FormLabel>
                            <Textarea
                              {...field}
                              variant="filled"
                              id="notes"
                              placeholder="What made it memoriable"
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Stack direction="row">
                        <Field name="location.lat">
                          {({ field }) => (
                            <FormControl isRequired>
                              <FormLabel htmlFor="location.lat">
                                Latitude
                              </FormLabel>
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
                              <FormLabel htmlFor="location.long">
                                Longitude
                              </FormLabel>
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
                      <Box marginBottom="15px">
                        <Button
                          isLoading={isGettingCoordinates}
                          minW="100%"
                          onClick={() => {
                            handleGetGPSCoordinates(
                              formProps.setFieldValue,
                              setGpsError
                            );
                          }}
                        >
                          Use Current Location
                        </Button>
                      </Box>
                      {gpsError && (
                        <Alert status="error">
                          <AlertIcon />
                          <AlertTitle mr={2}>GPS Failed!</AlertTitle>
                          <AlertDescription>
                            Location unavailable.
                          </AlertDescription>
                          <CloseButton
                            onClick={() => setGpsError(false)}
                            position="absolute"
                            right="8px"
                            top="8px"
                          />
                        </Alert>
                      )}
                    </Box>
                  )}
                  {page === 2 && (
                    <Box minW={isMobile ? "100%" : "400px"}>
                      <Field name="ratings.quality">
                        {({ field, form }) => (
                          <FormControl isRequired id="ratings.quality">
                            <FormLabel>Build Quality</FormLabel>
                            <ButtonGroup
                              isAttached
                              style={{ minWidth: "100%" }}
                            >
                              <Button
                                colorScheme={
                                  field.value === -1 ? "blackAlpha" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("ratings.quality", -1)
                                }
                              >
                                n/a
                              </Button>
                              <Button
                                colorScheme={field.value === 1 ? "red" : "gray"}
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("ratings.quality", 1)
                                }
                              >
                                1
                              </Button>
                              <Button
                                colorScheme={
                                  field.value === 2 ? "orange" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("ratings.quality", 2)
                                }
                              >
                                2
                              </Button>
                              <Button
                                colorScheme={
                                  field.value === 3 ? "yellow" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("ratings.quality", 3)
                                }
                              >
                                3
                              </Button>
                              <Button
                                colorScheme={
                                  field.value === 4 ? "teal" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("ratings.quality", 4)
                                }
                              >
                                4
                              </Button>
                              <Button
                                colorScheme={
                                  field.value === 5 ? "green" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("ratings.quality", 5)
                                }
                              >
                                5
                              </Button>
                            </ButtonGroup>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="ratings.safety">
                        {({ field, form }) => (
                          <FormControl isRequired id="ratings.safety">
                            <FormLabel>Area Safety</FormLabel>
                            <ButtonGroup
                              isAttached
                              style={{ minWidth: "100%" }}
                            >
                              <Button
                                colorScheme={
                                  field.value === -1 ? "blackAlpha" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("ratings.safety", -1)
                                }
                              >
                                n/a
                              </Button>
                              <Button
                                colorScheme={field.value === 1 ? "red" : "gray"}
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("ratings.safety", 1)
                                }
                              >
                                1
                              </Button>
                              <Button
                                colorScheme={
                                  field.value === 2 ? "orange" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("ratings.safety", 2)
                                }
                              >
                                2
                              </Button>
                              <Button
                                colorScheme={
                                  field.value === 3 ? "yellow" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("ratings.safety", 3)
                                }
                              >
                                3
                              </Button>
                              <Button
                                colorScheme={
                                  field.value === 4 ? "teal" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("ratings.safety", 4)
                                }
                              >
                                4
                              </Button>
                              <Button
                                colorScheme={
                                  field.value === 5 ? "green" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("ratings.safety", 5)
                                }
                              >
                                5
                              </Button>
                            </ButtonGroup>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="ratings.illumination">
                        {({ field, form }) => (
                          <FormControl isRequired id="ratings.illumination">
                            <FormLabel>Area Lighting</FormLabel>
                            <ButtonGroup
                              isAttached
                              style={{ minWidth: "100%" }}
                            >
                              <Button
                                colorScheme={
                                  field.value === -1 ? "blackAlpha" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("ratings.illumination", -1)
                                }
                              >
                                n/a
                              </Button>
                              <Button
                                colorScheme={field.value === 1 ? "red" : "gray"}
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("ratings.illumination", 1)
                                }
                              >
                                1
                              </Button>
                              <Button
                                colorScheme={
                                  field.value === 2 ? "orange" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("ratings.illumination", 2)
                                }
                              >
                                2
                              </Button>
                              <Button
                                colorScheme={
                                  field.value === 3 ? "yellow" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("ratings.illumination", 3)
                                }
                              >
                                3
                              </Button>
                              <Button
                                colorScheme={
                                  field.value === 4 ? "teal" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("ratings.illumination", 4)
                                }
                              >
                                4
                              </Button>
                              <Button
                                colorScheme={
                                  field.value === 5 ? "green" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("ratings.illumination", 5)
                                }
                              >
                                5
                              </Button>
                            </ButtonGroup>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="traffic">
                        {({ field, form }) => (
                          <FormControl isRequired id="traffic">
                            <FormLabel>Foot Traffic</FormLabel>
                            <ButtonGroup
                              isAttached
                              style={{ minWidth: "100%" }}
                            >
                              <Button
                                colorScheme={
                                  field.value === "low" ? "red" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("traffic", "low")
                                }
                              >
                                Low
                              </Button>
                              <Button
                                colorScheme={
                                  field.value === "medium" ? "yellow" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("traffic", "medium")
                                }
                              >
                                Medium
                              </Button>
                              <Button
                                colorScheme={
                                  field.value === "high" ? "green" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("traffic", "high")
                                }
                              >
                                High
                              </Button>
                            </ButtonGroup>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="size">
                        {({ field, form }) => (
                          <FormControl isRequired id="size">
                            <FormLabel>Parking Spots</FormLabel>
                            <ButtonGroup
                              isAttached
                              style={{ minWidth: "100%" }}
                            >
                              <Button
                                colorScheme={
                                  field.value === "sm" ? "red" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("size", "sm")
                                }
                              >
                                1 - 2
                              </Button>
                              <Button
                                colorScheme={
                                  field.value === "md" ? "yellow" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("size", "md")
                                }
                              >
                                3 - 4
                              </Button>
                              <Button
                                colorScheme={
                                  field.value === "lg" ? "green" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("size", "lg")
                                }
                              >
                                5+
                              </Button>
                            </ButtonGroup>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="recommended">
                        {({ field, form }) => (
                          <FormControl isRequired id="recommended">
                            <FormLabel>Recommendation</FormLabel>
                            <ButtonGroup
                              isAttached
                              style={{ minWidth: "100%" }}
                            >
                              <Button
                                colorScheme={
                                  field.value === false ? "red" : "gray"
                                }
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("recommended", false)
                                }
                              >
                                Not Recommended
                              </Button>
                              <Button
                                colorScheme={field.value ? "green" : "gray"}
                                isFullWidth
                                mr="-px"
                                onClick={(e) =>
                                  form.setFieldValue("recommended", true)
                                }
                              >
                                Recommended
                              </Button>
                            </ButtonGroup>
                          </FormControl>
                        )}
                      </Field>
                      <Divider margin="15px 0px 15px 0px" />
                      {Object.entries(formProps.values.ratings).length ===
                        3 && (
                        <Fade
                          in={
                            Object.entries(formProps.values.ratings).length ===
                            3
                          }
                        >
                          <Tag
                            size="lg"
                            key="lg"
                            variant="solid"
                            colorScheme="gray"
                          >
                            Overall Rating:{" "}
                            {calculateOverallRating({
                              ratings: formProps.values.ratings,
                            })}
                          </Tag>
                        </Fade>
                      )}
                    </Box>
                  )}
                  {page === 3 && (
                    <Box minW={isMobile ? "100%" : "400px"}>
                      <Field name="images">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Upload Image</FormLabel>
                            <Upload
                              form={form}
                              setIsUploading={setIsUploading}
                              isUploading={isUploading}
                            />
                          </FormControl>
                        )}
                      </Field>
                      {id && (
                        <Box pt="20px">
                          <Photo
                            name={locks[id].name}
                            imageUrlAbsolute={locks[id].imageUrlAbsolute}
                          />
                        </Box>
                      )}
                      <AbsoluteButton
                        bottom={20}
                        color="white"
                        colorScheme="yellow"
                        disabled={
                          validatePage3({ values: formProps.values }) ||
                          isUploading
                        }
                        loading={isUploading || meta.fetching}
                        onClick={() => {
                          if (id) {
                            firebaseApi.update({
                              postData: formProps.values,
                              uid: firebase.user.uid,
                              dispatch,
                              itemId: id,
                              toast: showSuccessEditToast,
                              onClose: props.onClose,
                              history,
                              dbKey,
                            });
                          } else {
                            firebaseApi.add({
                              postData: formProps.values,
                              uid: firebase.user.uid,
                              dispatch,
                              toast: showSuccessToast,
                              dbKey,
                              onClose: props.onClose,
                              history,
                            });
                          }
                        }}
                      >
                        Save
                      </AbsoluteButton>
                    </Box>
                  )}
                  <AbsoluteButton
                    bottom={20}
                    left={20}
                    right="none"
                    onClick={() => {
                      formProps.resetForm();
                      history.push(id ? `/map/${id}` : "/map");
                      props.onClose();
                    }}
                  >
                    Cancel
                  </AbsoluteButton>
                  {page === 2 && (
                    <AbsoluteButton
                      bottom={20}
                      right={100}
                      onClick={() => setPage(1)}
                    >
                      <BiArrowBack />
                    </AbsoluteButton>
                  )}
                  {page === 3 && (
                    <AbsoluteButton
                      bottom={20}
                      right={100}
                      onClick={() => setPage(2)}
                    >
                      <BiArrowBack />
                    </AbsoluteButton>
                  )}
                  {page === 4 && (
                    <AbsoluteButton
                      bottom={20}
                      left={20}
                      right="none"
                      onClick={() => setPage(3)}
                    >
                      <BiArrowBack />
                    </AbsoluteButton>
                  )}

                  {page === 1 && (
                    <AbsoluteButton
                      bottom={20}
                      disabled={
                        validatePage1({ values: formProps.values }) ||
                        isGettingCoordinates
                      }
                      onClick={() => setPage(2)}
                    >
                      Next
                    </AbsoluteButton>
                  )}
                  {page === 2 && (
                    <AbsoluteButton
                      bottom={20}
                      disabled={validatePage2({ values: formProps.values })}
                      onClick={() => setPage(3)}
                    >
                      Next
                    </AbsoluteButton>
                  )}
                </Form>
              );
            }}
          </Formik>
        </DeviceWrapper>
      </Box>
    </Fade>
  );
};

export default AddRack;
