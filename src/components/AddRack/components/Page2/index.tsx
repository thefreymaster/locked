import {
  FormControl,
  FormLabel,
  Box,
  ButtonGroup,
  Button,
  Tag,
  Divider,
  Fade,
} from "@chakra-ui/react";
import { Field } from "formik";
import { calculateOverallRating } from "../../../../utils/calcOverallRating";
import { isMobile } from "react-device-detect";
import AbsoluteButton from "../../../../common/AbsoluteButton";
import { BiArrowBack } from "react-icons/bi";
import { validatePage2 } from "../../../../validation";

export const Page2 = (props: { formProps: any; setPage(v: number): void }) => {
  return (
    <Box minW={isMobile ? "100%" : "400px"}>
      <Field name="ratings.quality">
        {({ field, form }) => (
          <FormControl isRequired id="ratings.quality">
            <FormLabel>Build Quality</FormLabel>
            <ButtonGroup isAttached style={{ minWidth: "100%" }}>
              <Button
                colorScheme={field.value === -1 ? "blackAlpha" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("ratings.quality", -1)}
              >
                n/a
              </Button>
              <Button
                colorScheme={field.value === 1 ? "red" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("ratings.quality", 1)}
              >
                1
              </Button>
              <Button
                colorScheme={field.value === 2 ? "orange" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("ratings.quality", 2)}
              >
                2
              </Button>
              <Button
                colorScheme={field.value === 3 ? "yellow" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("ratings.quality", 3)}
              >
                3
              </Button>
              <Button
                colorScheme={field.value === 4 ? "teal" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("ratings.quality", 4)}
              >
                4
              </Button>
              <Button
                colorScheme={field.value === 5 ? "green" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("ratings.quality", 5)}
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
            <ButtonGroup isAttached style={{ minWidth: "100%" }}>
              <Button
                colorScheme={field.value === -1 ? "blackAlpha" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("ratings.safety", -1)}
              >
                n/a
              </Button>
              <Button
                colorScheme={field.value === 1 ? "red" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("ratings.safety", 1)}
              >
                1
              </Button>
              <Button
                colorScheme={field.value === 2 ? "orange" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("ratings.safety", 2)}
              >
                2
              </Button>
              <Button
                colorScheme={field.value === 3 ? "yellow" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("ratings.safety", 3)}
              >
                3
              </Button>
              <Button
                colorScheme={field.value === 4 ? "teal" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("ratings.safety", 4)}
              >
                4
              </Button>
              <Button
                colorScheme={field.value === 5 ? "green" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("ratings.safety", 5)}
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
            <ButtonGroup isAttached style={{ minWidth: "100%" }}>
              <Button
                colorScheme={field.value === -1 ? "blackAlpha" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("ratings.illumination", -1)}
              >
                n/a
              </Button>
              <Button
                colorScheme={field.value === 1 ? "red" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("ratings.illumination", 1)}
              >
                1
              </Button>
              <Button
                colorScheme={field.value === 2 ? "orange" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("ratings.illumination", 2)}
              >
                2
              </Button>
              <Button
                colorScheme={field.value === 3 ? "yellow" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("ratings.illumination", 3)}
              >
                3
              </Button>
              <Button
                colorScheme={field.value === 4 ? "teal" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("ratings.illumination", 4)}
              >
                4
              </Button>
              <Button
                colorScheme={field.value === 5 ? "green" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("ratings.illumination", 5)}
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
            <ButtonGroup isAttached style={{ minWidth: "100%" }}>
              <Button
                colorScheme={field.value === "low" ? "red" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("traffic", "low")}
              >
                Low
              </Button>
              <Button
                colorScheme={field.value === "medium" ? "yellow" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("traffic", "medium")}
              >
                Medium
              </Button>
              <Button
                colorScheme={field.value === "high" ? "green" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("traffic", "high")}
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
            <ButtonGroup isAttached style={{ minWidth: "100%" }}>
              <Button
                colorScheme={field.value === "sm" ? "red" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("size", "sm")}
              >
                1 - 2
              </Button>
              <Button
                colorScheme={field.value === "md" ? "yellow" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("size", "md")}
              >
                3 - 4
              </Button>
              <Button
                colorScheme={field.value === "lg" ? "green" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("size", "lg")}
              >
                5+
              </Button>
            </ButtonGroup>
          </FormControl>
        )}
      </Field>
      {/* <Field name="recommended">
        {({ field, form }) => (
          <FormControl isRequired id="recommended">
            <FormLabel>Recommendation</FormLabel>
            <ButtonGroup isAttached style={{ minWidth: "100%" }}>
              <Button
                colorScheme={field.value === false ? "red" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("recommended", false)}
              >
                Not Recommended
              </Button>
              <Button
                colorScheme={field.value ? "green" : "gray"}
                isFullWidth
                mr="-px"
                onClick={(e) => form.setFieldValue("recommended", true)}
              >
                Recommended
              </Button>
            </ButtonGroup>
          </FormControl>
        )}
      </Field> */}
      <Divider margin="15px 0px 15px 0px" />
      {Object.entries(props.formProps.values.ratings).length === 3 && (
        <Fade in={Object.entries(props.formProps.values.ratings).length === 3}>
          <Tag size="lg" key="lg" variant="solid" colorScheme="gray">
            Overall Rating:{" "}
            {calculateOverallRating({
              ratings: props.formProps.values.ratings,
            })}
          </Tag>
        </Fade>
      )}
      <AbsoluteButton bottom={20} right={100} onClick={() => props.setPage(1)}>
        <BiArrowBack />
      </AbsoluteButton>
      <AbsoluteButton
        bottom={20}
        disabled={validatePage2({ values: props.formProps.values })}
        onClick={() => props.setPage(3)}
      >
        Next
      </AbsoluteButton>
    </Box>
  );
};
