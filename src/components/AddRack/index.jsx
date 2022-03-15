import { Box, Fade } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useHistory, Redirect } from "react-router-dom";
import React from "react";
import AbsoluteButton from "../../common/AbsoluteButton";
import { useGlobalState } from "../../providers/root";
import { initialValues } from "../../constants";
import { useParams } from "react-router-dom";
import DeviceWrapper from "../../common/DeviceWrapper";
import { BiArrowBack } from "react-icons/bi";
import LottieLoading from "../../common/LottieLoading";
import { Page1 } from "./components/Page1";
import { Page2 } from "./components/Page2";
import { Page3 } from "./components/Page3/index";
import firebaseApi from "../../api/firebase";

const AddRack = (props) => {
  let { id } = useParams();

  // need to fetch lock here, do not use local state
  const [lock, setLock] = React.useState();
  const { firebase, meta, coordinates } = useGlobalState();
  const history = useHistory();

  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    if (id) {
      firebaseApi.db.openSingleItmeDbConnection({
        dbKey: meta.dbKey,
        id,
        setLock,
      });
    }
  }, []);

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
  if (id && !lock) {
    return null;
  }
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
              lock ?? {
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
                    <Page1 formProps={formProps} setPage={setPage} />
                  )}
                  {page === 2 && (
                    <Page2 formProps={formProps} setPage={setPage} />
                  )}
                  {page === 3 && (
                    <Page3
                      formProps={formProps}
                      setPage={setPage}
                      onClose={props.onClose}
                      lock={lock}
                    />
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
