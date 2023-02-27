import { Box } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import Wrapper from "../../common/Wrapper";

const markdown = `
Privacy Policy ==============

Last revised on Febuary 27th, 2023

### The Gist

Canvas 23 Studios will collect certain non-personally identify information about you as you use our sites. We may use this data to better understand our users. We can also publish this data, but the data will be about a large group of users, not individuals.

We will also ask you to provide personal information, but you'll always be able to opt out. If you give us personal information, we won't do anything evil with it.

We can also use cookies, but you can choose not to store these.

That's the basic idea, but you must read through the entire Privacy Policy below and agree with all the details before you use any of our sites.

### Reuse

This document is based upon the [Automattic Privacy Policy](http://automattic.com/privacy/) and is licensed under [Creative Commons Attribution Share-Alike License 2.5](http://creativecommons.org/licenses/by-sa/2.5/). Basically, this means you can use it verbatim or edited, but you must release new versions under the same license and you have to credit Automattic somewhere (like this!). Automattic is not connected with and does not sponsor or endorse Canvas 23 Studios or its use of the work.

Canvas 23 Studios, Inc. ("Canvas 23 Studios") makes available services include our web sites (lockandkey.firebaseapp.com and lockandkey.firebaseapp.com), our blog, our API, and any other software, sites, and services offered by Canvas 23 Studios in connection to any of those (taken together, the "Service"). It is Canvas 23 Studios's policy to respect your privacy regarding any information we may collect while operating our websites.

### Questions

If you have question about this Privacy Policy, please contact us at [CONTACT EMAIL]

### Visitors

Like most website operators, Canvas 23 Studios collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. Canvas 23 Studios's purpose in collecting non-personally identifying information is to better understand how Canvas 23 Studios's visitors use its website. From time to time, Canvas 23 Studios may release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the usage of its website.

Canvas 23 Studios also collects potentially personally-identifying information like Internet Protocol (IP) addresses. Canvas 23 Studios does not use such information to identify its visitors, however, and does not disclose such information, other than under the same circumstances that it uses and discloses personally-identifying information, as described below. We may also collect and use IP addresses to block users who violated our Terms of Service.

### Gathering of Personally-Identifying Information

Certain visitors to Canvas 23 Studios's websites choose to interact with Canvas 23 Studios in ways that require Canvas 23 Studios to gather personally-identifying information. The amount and type of information that Canvas 23 Studios gathers depends on the nature of the interaction. Canvas 23 Studios collects such information only insofar as is necessary or appropriate to fulfill the purpose of the visitor's interaction with Canvas 23 Studios. Canvas 23 Studios does not disclose personally-identifying information other than as described below. And visitors can always refuse to supply personally-identifying information, with the caveat that it may prevent them from engaging in certain Service-related activities.

Additionally, some interactions, such as posting a comment, may ask for optional personal information. For instance, when posting a comment, may provide a website that will be displayed along with a user's name when the comment is displayed. Supplying such personal information is completely optional and is only displayed for the benefit and the convenience of the user.

### Aggregated Statistics

Canvas 23 Studios may collect statistics about the behavior of visitors to the Service. For instance, Canvas 23 Studios may monitor the most popular parts of the lockandkey.firebaseapp.com. Canvas 23 Studios may display this information publicly or provide it to others. However, Canvas 23 Studios does not disclose personally-identifying information other than as described below.

### Protection of Certain Personally-Identifying Information

Canvas 23 Studios discloses potentially personally-identifying and personally-identifying information only to those of its employees, contractors and affiliated organizations that (i) need to know that information in order to process it on Canvas 23 Studios's behalf or to provide services available at Canvas 23 Studios's websites, and (ii) that have agreed not to disclose it to others. Some of those employees, contractors and affiliated organizations may be located outside of your home country; by using the Service, you consent to the transfer of such information to them. Canvas 23 Studios will not rent or sell potentially personally-identifying and personally-identifying information to anyone. Other than to its employees, contractors and affiliated organizations, as described above, Canvas 23 Studios discloses potentially personally-identifying and personally-identifying information only when required to do so by law, or when Canvas 23 Studios believes in good faith that disclosure is reasonably necessary to protect the property or rights of Canvas 23 Studios, third parties or the public at large. If you are a registered user of the Service and have supplied your email address, Canvas 23 Studios may occasionally send you an email to tell you about new features, solicit your feedback, or just keep you up to date with what's going on with Canvas 23 Studios and our products. We primarily use our website and blog to communicate this type of information, so we expect to keep this type of email to a minimum. If you send us a request (for example via a support email or via one of our feedback mechanisms), we reserve the right to publish it in order to help us clarify or respond to your request or to help us support other users. Canvas 23 Studios takes all measures reasonably necessary to protect against the unauthorized access, use, alteration or destruction of potentially personally-identifying and personally-identifying information.

### Cookies
A cookie is a string of information that a website stores on a visitor's computer, and that the visitor's browser provides to the Service each time the visitor returns. Canvas 23 Studios uses cookies to help Canvas 23 Studios identify and track visitors, their usage of Canvas 23 Studios Service, and their Service access preferences. Canvas 23 Studios visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using Canvas 23 Studios's websites, with the drawback that certain features of Canvas 23 Studios's websites may not function properly without the aid of cookies.

### Data Storage
Canvas 23 Studios uses third party vendors and hosting partners to provide the necessary hardware, software, networking, storage, and related technology required to run the Service. You understand that although you retain full rights to your data, it may be stored on third party storage and transmitted through third party networks.

### Privacy Policy Changes
Although most changes are likely to be minor, Canvas 23 Studios may change its Privacy Policy from time to time, and in Canvas 23 Studios's sole discretion. Canvas 23 Studios encourages visitors to frequently check this page for any changes to its Privacy Policy. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change.`;

export const PrivacyPolicy = () => (
  <Wrapper>
    <Box
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </Box>
  </Wrapper>
);
