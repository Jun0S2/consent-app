// import { Input, Checkbox, Divider } from "@heroui/react";
/**
 * Modal Body Component fo HIPAA Consent
 */
const HIPAA = () => {
  return (
    <>
      <div>
        <p className="text-xl font-bold">HIPAA Consent</p>
        <p>
          I give K-gloe Beauty &amp; Balance my consent to use or disclose my
          protected health information to carry out my treatment, to obtain
          payment from insurance companies, and for health care options like
          quality reviews. I give K-gloe Beauty &amp; Balance my consent to use
          or disclose my protected health information in order to obtain payment
          for services and/or product.
        </p>

        <br />
        <p>
          I have been informed that I may review K-gloe Beauty &amp; Balance’s
          Notice Of Privacy Practices (for a more complete description on uses
          and disclosures) before signing this consent.
        </p>

        <br />
        <p>
          I understand that K-gloe Beauty &amp; Balance has the right to change
          their privacy practices and that I may obtain any revised notices at
          the clinic. I understand that I have the right to request a
          restriction of how my protected health information is used. However, I
          also understand that K-gloe Beauty &amp; Balance is not required to
          agree to the request.
        </p>

        <br />
        <p>
          If K-gloe Beauty &amp; Balance agrees to my requested restriction,
          they must follow the restriction(s). I also understand that I may
          revoke this consent at any time, by making a request in writing,
          except for information already used or disclosed.
        </p>
      </div>
    </>
  );
};

export default HIPAA;
