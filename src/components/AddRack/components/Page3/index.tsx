import { FormControl, FormLabel, Box, useToast } from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";
import AbsoluteButton from "../../../../common/AbsoluteButton";
import Upload from "../../../Upload";
import { validatePage3 } from "../../../../validation";
import { isMobile } from "react-device-detect";
import Photo from "../../../../common/Photo";
import firebaseApi from "../../../../api/firebase";
import { useHistory, useParams } from "react-router-dom";
import { useGlobalState } from "../../../../providers/root";
import { BiArrowBack } from 'react-icons/bi';

export const Page3 = (props: {
  formProps: any;
  lock: any;
  setPage(v: number): void;
  onClose(v: boolean): void;
}) => {
  let { id }: { id: string } = useParams();
  const history = useHistory();
  const { firebase, meta, dispatch } = useGlobalState();
  const { dbKey } = meta;
  const toast = useToast();
  const [isUploading, setIsUploading] = React.useState(false);

  const showSuccessToast = () => {
    toast({
      title: "Bike rack added",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  };
  const showSuccessEditToast = () => {
    toast({
      title: "Bike rack updated",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  };

  return (
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
            name={props.lock.name}
            imageUrlAbsolute={props.lock.imageUrlAbsolute}
          />
        </Box>
      )}
      <AbsoluteButton bottom={20} right={100} onClick={() => props.setPage(2)}>
        <BiArrowBack />
      </AbsoluteButton>
      <AbsoluteButton
        bottom={20}
        colorScheme="yellow"
        disabled={
          validatePage3({ values: props.formProps.values }) || isUploading
        }
        loading={isUploading || meta.fetching}
        onClick={() => {
          if (id) {
            firebaseApi.update({
              postData: props.formProps.values,
              dispatch,
              itemId: id,
              toast: showSuccessEditToast,
              onClose: props.onClose,
              history,
              dbKey,
            });
          } else {
            firebaseApi.add({
              postData: props.formProps.values,
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
  );
};
