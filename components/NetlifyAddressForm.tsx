// Hidden static form so Netlify Forms detects and captures investor address
// submissions on a drag-and-drop / static deploy. The interactive gate posts
// to this form by name (see logSubmission in JurisdictionGate). Submissions
// appear under Netlify dashboard → Forms → "investor-address".
//
// On non-Netlify hosts this form is inert; logging also goes to the console,
// localStorage, and an optional NEXT_PUBLIC_LOG_ENDPOINT webhook.
export const ADDRESS_FORM_NAME = "investor-address";

export function NetlifyAddressForm() {
  return (
    <form name={ADDRESS_FORM_NAME} data-netlify="true" netlify-honeypot="bot-field" hidden>
      <input type="hidden" name="form-name" value={ADDRESS_FORM_NAME} />
      <input name="bot-field" />
      <input name="offering" />
      <input name="result" />
      <input name="fullName" />
      <input name="addressLine1" />
      <input name="addressLine2" />
      <input name="city" />
      <input name="region" />
      <input name="postalCode" />
      <input name="country" />
      <input name="countryName" />
      <input name="timestamp" />
      <input name="userAgent" />
    </form>
  );
}
