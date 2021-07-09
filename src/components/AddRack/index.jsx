import {
    Input, Stack, Textarea, Select, FormControl, FormLabel, Box, ButtonGroup, Button, InputGroup, Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription, InputLeftElement, CloseButton, Tag, Spinner, Divider, Fade, useToast
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useHistory, Redirect } from 'react-router-dom';
import React from 'react';
// import { cuisines } from '../../json/cuisines';
import { states } from '../../json/states';
import AbsoluteButton from '../../common/AbsoluteButton';
import { useGlobalState } from '../../providers/root';
import Upload from '../Upload';
import { validatePage1, validatePage2, validatePage3 } from '../../validation';
import { initialValues } from '../../constants';
import { getCoordinates } from '../../utils/gps';
import { useParams } from 'react-router-dom';
import DeviceWrapper from '../../common/DeviceWrapper';
import Wrapper from '../../common/Wrapper';
import { MdGpsFixed } from 'react-icons/md'
import { calculateOverallRating } from '../../utils/calcOverallRating';
import { isMobile } from 'react-device-detect';
import { BiArrowBack } from 'react-icons/bi';
import Photo from '../../common/Photo';
import firebaseApi from '../../api/firebase';

const AddRack = (props) => {
    let { id } = useParams();
    const { firebase, meta, dispatch, locks } = useGlobalState();
    const history = useHistory();

    const toast = useToast();

    const showSuccessToast = () => {
        toast({
            title: "Bike rack added",
            status: "info",
            duration: 3000,
            isClosable: true,
            position: 'top'
        })
    }
    const showSuccessEditToast = () => {
        toast({
            title: "Bike rack updated",
            status: "info",
            duration: 3000,
            isClosable: true,
            position: 'top'
        })
    }

    const [page, setPage] = React.useState(1);
    const [gpsError, setGpsError] = React.useState(false);
    const [isGettingCoordinates, setIsGettingCoordinates] = React.useState(false);

    if (firebase.isValidatingAuthentication || meta.fetching) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner colorScheme="red" size="md" />
            </Box>
        )
    }

    if (!firebase.isAuthenticated) {
        return <Redirect to="/welcome" />
    }

    const handleGetGPSCoordinates = (setFieldValue, setGpsError) => {
        setIsGettingCoordinates(true);
        getCoordinates(setFieldValue, setIsGettingCoordinates, setGpsError);
    }

    return (
        <Fade in>
            <Wrapper justifyContent="flex-start">
                <DeviceWrapper>
                    <Formik
                        initialValues={locks[id] || initialValues}
                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2))
                                actions.setSubmitting(false)
                            }, 1000)
                        }}
                    >
                        {(props) => {
                            return (
                                <Form>
                                    {page === 1 && (
                                        <Box minW={isMobile ? "100%" : "400px"}>
                                            <Field name="name">
                                                {({ field, form }) => (
                                                    <FormControl colorScheme="red" isRequired isInvalid={form.errors.name && form.touched.name}>
                                                        <FormLabel htmlFor="name">Cross Streets</FormLabel>
                                                        <Input {...field} variant="filled" id="name" placeholder="Where did you go?" autoFocus={!id} autoCorrect={false} _autofill={false} />
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="notes">
                                                {({ field, form }) => (
                                                    <FormControl isInvalid={form.errors.notes && form.touched.notes}>
                                                        <FormLabel htmlFor="notes">Description</FormLabel>
                                                        <Textarea {...field} variant="filled" id="notes" placeholder="What made it memoriable" />
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Stack direction="row">
                                                <Field name="location.city">
                                                    {({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.city && form.touched.city}>
                                                            <FormLabel htmlFor="location.city">City</FormLabel>
                                                            <Input {...field} variant="filled" id="location.city" placeholder="City" />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field name="location.state">
                                                    {({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.state && form.touched.state}>
                                                            <FormLabel htmlFor="location.state">State</FormLabel>
                                                            <Select {...field} name="location.state" variant="filled" placeholder="Select State">
                                                                {states.map(state => <option value={state}>{state}</option>)}
                                                            </Select>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                            </Stack>
                                            <Stack direction="row">
                                                <Field name="location.lat">
                                                    {({ field }) => (
                                                        <FormControl isRequired>
                                                            <FormLabel htmlFor="location.lat">Latitude</FormLabel>
                                                            <InputGroup>
                                                                <InputLeftElement pointerEvents="none" children={<MdGpsFixed />} />
                                                                <Input {...field} variant="filled" id="location.lat" placeholder="Coordinate" type="number" />
                                                            </InputGroup>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field name="location.long">
                                                    {({ field }) => (
                                                        <FormControl isRequired>
                                                            <FormLabel htmlFor="location.long">Longitude</FormLabel>
                                                            <InputGroup>
                                                                <InputLeftElement pointerEvents="none" children={<MdGpsFixed />} />
                                                                <Input {...field} variant="filled" id="location.long" placeholder="Coordinate" type="number" />
                                                            </InputGroup>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                            </Stack>
                                            <Box margin="15px" />
                                            <Box marginBottom="15px">
                                                <Button isLoading={isGettingCoordinates} minW="100%" onClick={() => {
                                                    handleGetGPSCoordinates(props.setFieldValue, setGpsError)
                                                }}>Get Coordinates</Button>
                                            </Box>
                                            {gpsError && (
                                                <Alert status="error">
                                                    <AlertIcon />
                                                    <AlertTitle mr={2}>GPS Failed!</AlertTitle>
                                                    <AlertDescription>Location unavailable.</AlertDescription>
                                                    <CloseButton onClick={() => setGpsError(false)} position="absolute" right="8px" top="8px" />
                                                </Alert>
                                            )}

                                        </Box>
                                    )}
                                    {page === 2 && (
                                        <Box minW={isMobile ? "100%" : "400px"}>
                                            <Field name="ratings.quality">
                                                {({ field, form }) => (
                                                    <FormControl isRequired id="ratings.quality">
                                                        <FormLabel>Quality</FormLabel>
                                                        <ButtonGroup isAttached style={{ minWidth: "100%" }}>
                                                            <Button colorScheme={field.value === -1 ? "blackAlpha" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("ratings.quality", -1)}>n/a</Button>
                                                            <Button colorScheme={field.value === 1 ? "red" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("ratings.quality", 1)}>1</Button>
                                                            <Button colorScheme={field.value === 2 ? "orange" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("ratings.quality", 2)}>2</Button>
                                                            <Button colorScheme={field.value === 3 ? "yellow" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("ratings.quality", 3)}>3</Button>
                                                            <Button colorScheme={field.value === 4 ? "teal" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("ratings.quality", 4)}>4</Button>
                                                            <Button colorScheme={field.value === 5 ? "green" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("ratings.quality", 5)}>5</Button>
                                                        </ButtonGroup>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="ratings.safety">
                                                {({ field, form }) => (
                                                    <FormControl isRequired id="ratings.safety">
                                                        <FormLabel>Safety</FormLabel>
                                                        <ButtonGroup isAttached style={{ minWidth: "100%" }}>
                                                            <Button colorScheme={field.value === -1 ? "blackAlpha" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("ratings.safety", -1)}>n/a</Button>
                                                            <Button colorScheme={field.value === 1 ? "red" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("ratings.safety", 1)}>1</Button>
                                                            <Button colorScheme={field.value === 2 ? "orange" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("ratings.safety", 2)}>2</Button>
                                                            <Button colorScheme={field.value === 3 ? "yellow" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("ratings.safety", 3)}>3</Button>
                                                            <Button colorScheme={field.value === 4 ? "teal" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("ratings.safety", 4)}>4</Button>
                                                            <Button colorScheme={field.value === 5 ? "green" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("ratings.safety", 5)}>5</Button>
                                                        </ButtonGroup>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="ratings.illumination">
                                                {({ field, form }) => (
                                                    <FormControl isRequired id="ratings.illumination">
                                                        <FormLabel>Illumination</FormLabel>
                                                        <ButtonGroup isAttached style={{ minWidth: "100%" }}>
                                                            <Button colorScheme={field.value === -1 ? "blackAlpha" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("ratings.illumination", -1)}>n/a</Button>
                                                            <Button colorScheme={field.value === 1 ? "red" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("ratings.illumination", 1)}>1</Button>
                                                            <Button colorScheme={field.value === 2 ? "orange" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("ratings.illumination", 2)}>2</Button>
                                                            <Button colorScheme={field.value === 3 ? "yellow" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("ratings.illumination", 3)}>3</Button>
                                                            <Button colorScheme={field.value === 4 ? "teal" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("ratings.illumination", 4)}>4</Button>
                                                            <Button colorScheme={field.value === 5 ? "green" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("ratings.illumination", 5)}>5</Button>
                                                        </ButtonGroup>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="size">
                                                {({ field, form }) => (
                                                    <FormControl isRequired id="size">
                                                        <FormLabel>Size</FormLabel>
                                                        <ButtonGroup isAttached style={{ minWidth: "100%" }}>
                                                            <Button colorScheme={field.value === "sm" ? "red" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("size", "sm")}>SM</Button>
                                                            <Button colorScheme={field.value === "md" ? "yellow" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("size", "md")}>MD</Button>
                                                            <Button colorScheme={field.value === "lg" ? "green" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("size", "lg")}>LG</Button>
                                                        </ButtonGroup>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="recommended">
                                                {({ field, form }) => (
                                                    <FormControl isRequired id="recommended">
                                                        <FormLabel>Recommendation</FormLabel>
                                                        <ButtonGroup isAttached style={{ minWidth: "100%" }}>
                                                            <Button colorScheme={field.value === false ? "red" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("recommended", false)}>Not Recommended</Button>
                                                            <Button colorScheme={field.value ? "green" : "gray"} isFullWidth mr="-px" onClick={(e) => form.setFieldValue("recommended", true)}>Recommended</Button>
                                                        </ButtonGroup>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Divider margin="15px 0px 15px 0px" />
                                            {Object.entries(props.values.ratings).length === 3 && (
                                                <Fade in={Object.entries(props.values.ratings).length === 3}>
                                                    <Tag size="lg" key="lg" variant="solid" colorScheme="gray">
                                                        Overall Rating: {calculateOverallRating({ ratings: props.values.ratings })}
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
                                                        <Upload form={form} />
                                                    </FormControl>
                                                )}
                                            </Field>
                                            {id && (
                                                <Box pt="20px">
                                                    <Photo name={locks[id].name} imageUrlAbsolute={locks[id].imageUrlAbsolute} />
                                                </Box>
                                            )}
                                            <AbsoluteButton disabled={validatePage3({ values: props.values })} isLoading={meta.fetching} onClick={() => {
                                                if (id) {
                                                    firebaseApi.update({ postData: props.values, uid: firebase.user.uid, dispatch, history, itemId: id, toast: showSuccessEditToast })
                                                }
                                                else {
                                                    firebaseApi.add({ postData: props.values, uid: firebase.user.uid, dispatch, history, toast: showSuccessToast })
                                                }
                                                console.log(props.values);
                                            }}>
                                                Save
                                            </AbsoluteButton>
                                        </Box>

                                    )}
                                    <AbsoluteButton right={100} onClick={() => {
                                        props.resetForm();
                                        if (id) {
                                            history.goBack();
                                        }
                                        else {
                                            history.push("/");
                                        }
                                    }}>Cancel</AbsoluteButton>
                                    {page === 1 && <AbsoluteButton left={20} right="none" onClick={() => history.goBack()}><BiArrowBack /></AbsoluteButton>}
                                    {page === 2 && <AbsoluteButton left={20} right="none" onClick={() => setPage(1)}><BiArrowBack /></AbsoluteButton>}
                                    {page === 3 && <AbsoluteButton left={20} right="none" onClick={() => setPage(2)}><BiArrowBack /></AbsoluteButton>}
                                    {page === 4 && <AbsoluteButton left={20} right="none" onClick={() => setPage(3)}><BiArrowBack /></AbsoluteButton>}

                                    {page === 1 && <AbsoluteButton disabled={validatePage1({ values: props.values }) || isGettingCoordinates} onClick={() => setPage(2)}>Next</AbsoluteButton>}
                                    {page === 2 && <AbsoluteButton disabled={validatePage2({ values: props.values })} onClick={() => setPage(3)}>Next</AbsoluteButton>}
                                </Form>
                            )
                        }}
                    </Formik>
                </DeviceWrapper>
            </Wrapper>
        </Fade>
    )
}

export default AddRack;