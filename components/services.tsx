interface Service {
  name: string;
  getConsentText: (...args: any[]) => string; // Allow variable arguments
  headerTitle: string;
  subTitle: string;
}

export const services: Service[] = [
  {
    name: "confidential",
    headerTitle: "Confidential Patient Information",
    subTitle: "Client Informed Consent Form",
    getConsentText: (
      clientName,
      address = "",
      city = "",
      state = "",
      zipcode = "",
      phone = "",
      dob = "",
      email = "",
      coldSores_Yes = "",
      coldSores_No = "",
      neuroMuscularDisease_Yes = "",
      neuroMuscularDisease_No = "",
      specialEvent_Yes = "",
      specialEvent_No = "",
      travelPlans_Yes = "",
      travelPlans_No = "",
      allergies = "",
      previousTreatments = "",
      medicalConditions = "",
      facialScarring = "",
    ) => {
      return `
**Patient Information**
Full Name: ${clientName}
Date of Birth: ${dob}
Phone Number: ${phone}
Email Address: ${email}

Address
${address}, 
${city}, ${state},
Zip Code : ${zipcode}, United States

___________________________________________________________________________________________
Do you have any of the following CONTRAINDICATIONS?
If so, we cannot proceed with the treatment today.

1. Do you have cold sores?
[ ${coldSores_Yes} ] Yes  [ ${coldSores_No} ] No
2. Do you have a neuro-muscular disease?
[ ${neuroMuscularDisease_Yes} ] Yes  [ ${neuroMuscularDisease_No} ] No
3. Do you have a special event in the next 2 weeks?
[ ${specialEvent_Yes} ] Yes  [ ${specialEvent_No} ] No
4. Do you have a plan to travel out of town?
[ ${travelPlans_Yes} ] Yes  [ ${travelPlans_No} ] No
5. Do you have any allergies to medications?
Client Answer: ${allergies}
6. Have you had collagen, Botox, or other dermal filler injections?
Client Answer: ${previousTreatments}
7. List any medical conditions (autoimmune disorders, heart/lung problems, skin conditions).
Client Answer: ${medicalConditions}
9. Do you have any facial scars or keloidal scarring?
Client Answer: ${facialScarring}

`;
    },
  },
  {
    name: "treatment",
    headerTitle: "Client Treatment Consent and Release",
    subTitle: "Client Informed Consent Form",
    getConsentText: () =>
      `
I acknowledge that beauty treatments, the practice of skin care, and the practice of massage, including, but not limited to, brown spot removal, BOTOX, Collagen, Dermal Fillers, Mesotherapy, Dermaplaning, and various other beauty procedures is not an exact science and no specific guaranties can or have been made concerning the outcome. I understand that some clients experience more change and improvement than others. In virtually all cases, multiple treatments are required in order to realize a difference.

I also understand and agree to assume the following risks and hazards which may occur in connection with any particular treatment including but not limited to: unsatisfactory results, soreness, poor healing, discomfort, redness, blistering, nerve damage, scarring, infection, and change in skin pigmentation, allergic reaction, muscle damage, and increased hair growth. I understand that even though precautions may be taken in my treatment, not all risks can be known in advance.

Given the above, I understand that response to treatment varies on an individual basis and that specific results are not guaranteed. Therefore, in consideration for any treatment received, I agree to unconditionally defend, hold harmless and release from any and all liability the company and the individual that provided my treatment, the insured, and any additional insured’s, as well as any officers, directors, or employees of the above companies for any condition or result, known or unknown, that may arise as a consequence of any treatment that I receive.
I have fully disclosed on my client intake form any medications, previous complications, or current conditions that may affect my treatment. I understand and agree that any legal action of any kind related to any treatment I receive will be limited to binding arbitration using a single arbitrator agreed to by both parties.
`,
  },
  {
    name: "surgery",
    headerTitle: "CONSENT FOR SURGERY/ PROCEDURE or TREATMENT",
    subTitle: "Client Informed Consent Form",
    getConsentText: () =>
      `1. I hereby authorize Dr.Hailey Park, DNP as may be selected to perform the following procedure or treatment:
*FACIAL FILLER INJECTION (list the anatomic areas where filler will be injected)
*I have received the following information sheet: INFORMED CONSENT – FACIAL FILLER INJECTION
2. I recognize that during the course of the procedure and medical treatment or anesthesia, unforeseen conditions may necessitate different procedures than those above. I therefore authorize the above physician and assistants or designees to perform such other procedures that are in the exercise of his or her professional judgment necessary and desirable. The authority granted under this paragraph shall include all conditions that require treatment and are not known to my physician at the time the procedure is begun.
3. I consent to the administration of such anesthetics considered necessary or advisable. I understand that all forms of anesthesia involve risk and the possibility of complications, injury, and sometimes death.
4. I understand what my surgeon can and cannot do, and understand there are no warranties or guarantees, implied or specific about my outcome. I have had the opportunity to explain my goals and understand which desired outcomes are realistic and which are not. All of my questions have been answered, and I understand the inherent (specific) risks to the procedures I seek, as well as those additional risks and complications, benefits, and alternatives. Understanding all of this, I elect to proceed.
5. I consent to be photographed or televised before, during, and after the operation(s) or procedure(s) to be performed, including appropriate portions of my body, for medical, scientific or educational purposes, provided my identity is not revealed by the pictures.
6. For purposes of advancing medical education, I consent to the admittance of observers to the treatment room.
7. I realize that not having the procedure is an option.
**8. IT HAS BEEN EXPLAINED TO ME IN A WAY THAT I UNDERSTAND:**
a. THE ABOVE TREATMENT OR PROCEDURE TO BE UNDERTAKEN
b. THERE MAY BE ALTERNATIVE PROCEDURES OR METHODS OF TREATMENT
c. THERE ARE RISKS TO THE PROCEDURE OR TREATMENT PROPOSED

[x] I CONSENT TO THE TREATMENT OR PROCEDURE AND THE ABOVE LISTED ITEMS (1-8). I AM SATISFIED WITH THE EXPLANATION.
`,
  },
  {
    name: "hipaa",
    headerTitle: "HIPAA Consent",
    subTitle: "Client Informed Consent Form",
    getConsentText: (clientName: string) =>
      `Client Name: ${clientName}
I give K-gloe Beauty & Balance my consent to use or disclose my protected health information to carry out my treatment, to obtain payment from insurance companies, and for health care options like quality reviews. I give K-gloe Beauty & Balance my consent to use or disclose my protected health information in order to obtain payment for services and/or product.

I have been informed that I may review K-gloe Beauty & Balance’s Notice Of Privacy Practices (for a more complete description on uses and disclosures) before signing this consent.

I understand that K-gloe Beauty & Balance has the right to change their privacy practices and that I may obtain any revised notices at the clinic. I understand that I have the right to request a restriction of how my protected health information is used. However, I also understand that K-gloe Beauty & Balance is not required to agree to the request.

If K-gloe Beauty & Balance agrees to my requested restriction, they must follow the restriction(s). I also understand that I may revoke this consent at any time, by making a request in writing, except for information already used or disclosed.`,
  },
  {
    name: "Chemical Peels",
    headerTitle: "CHEMICAL PEEL BIOREPEELCL3 - BLUE/GOLD",
    subTitle: "Client Informed Consent Form",
    getConsentText: (initials: string) =>
      `
To the CLIENT: You have a right to be informed about your condition and its treatment, so that you may decide whether or not to undergo the procedure after knowing the risks and hazards involved.
This disclosure is not meant to scare or alarm you; it is simply an effort to make you better informed so you may give, or withhold, your consent for treatment.
  
1. I voluntarily request that **PARK, ____HYEYEON (Professional Performer)_____ perform the BioRepeelCl3 TCA chemical peel procedure. I acknowledge having been informed that this cosmetic procedure is intended to remove surface layers of the skin to improve the vitality of the skin.
2. Peels, despite their high levels of efficacy and safety, are not free of side effects. Erythema (redness) and edema (swelling) of the treated area can occur but usually subsides within a few hours but can last up to seven days or longer. Irritation, itching, and/or mild burning sensation or pain similar to sunburn may occur within 48 hours of treatment.
3. It is important to use sunscreen of SPF 50 or greater when exposed to the sun.
4. I understand complications can include white heads, cold sores, infection, scarring, numbness and permanent discoloration.
5. No guarantee, warranty, or assurance has been made to me as to the results that may be obtained. I am aware that follow-up treatments may be necessary for desired results. Most patients require a few treatments over time with gradual results occurring over this time. Clinical results will vary per patient. I agree to adhere to all safety precautions and regulations during the treatment. No refunds will be given for treatments received.
6. I have been explained the Pre- and Post-Treatment Instructions. I agree to follow these instructions carefully.
7. I CERTIFY that I am not on any retinal, Retin-A or actives that have been explained to me could cause minor complications during the peel process, burning sensation, peeling.

(initial here) X ________${initials}________ X
  
I understand and agree that all services rendered to me are charged to me directly and that I am personally responsible for payment.
  
The nature and purpose of the treatment have been explained to me. I have read and understand this agreement. All my questions have been answered to my satisfaction and I consent to the terms of this agreement. Alternative methods of treatment and their risks and benefits have been explained to me and I understand that I have the right to refuse treatment.
  
Note: All prices are subject to change without prior notice
  `,
  },
  {
    name: "Neurotoxins",
    headerTitle: "Xeomin(Botulinum A Toxin)/BOTOX(Botulinum A Toxin)",
    subTitle: "Client Informed Consent Form",
    getConsentText: (clientname: string) =>
      `I, _____${clientname}_______ , understand that I will be injected with Botulinum A Toxin (Xeomin) in the areas agreed upon with Dr. Hyeyeon Park, DNP to partially paralyze these muscles temporarily. These may include muscles associated with the glabella, forehead, crow’s feet, sad lines, upper lip, or lower face. Botulinum A Toxin (Xeomin) injection has been FDA approved for use in the cosmetic treatment for glabellar frown lines only – the wrinkles between the eyebrows and lateral canthal lines (crow’s feet) in adults.

Injection of Xeomin into the small muscles between the brows causes those specific muscles to halt their function (be paralyzed), thereby improving the appearance of the wrinkles. I understand the goal is to decrease the wrinkles in the treated area. This paralysis is temporary, and re-injection is necessary within three to four months. It has been explained to me that other temporary and more permanent treatments are available.

The possible side effects of Xeomin include but are not limited to:
*1. Risks: I understand there is a risk of swelling, rash, headache, local numbness, pain at the injection site, bruising, respiratory problems, and allergic reaction.
*2.Infection: Infections can occur which in most cases are easily treatable but in rare cases a permanent scarring in the area can occur.
3. Most people have lightly swollen pinkish bumps where the injections went in, for a couple of hours or even several days.
4. Although many people with chronic headaches or migraines often get relief from Xeomin, a small percent of patients get headaches following treatment with
Xeomin, for the first day. In a very small percentage of patients these headaches can persist for several days or weeks.
5. Local numbness, rash, pain at the injection site, flu like symptoms with mild fever, back pain.
6. Respiratory problems such as bronchitis or sinusitis, nausea, dizziness, and tightness or irritation of the skin.
7. Bruising is possible anytime you inject a needle into the skin. This bruising can last for several hours, days, weeks, months and in rare cases the effect of bruising could be permanent.
8. While local weakness of the injected muscles is representative of the expected pharmacological action of Xeomin, weakness of adjacent muscles may occur as a result of the spread of the toxin.
9. Treatments: I understand more than one injection may be needed to achieve a satisfactory result.
10. Another risk when injecting Xeomin around the eyes included corneal exposure because people may not be able to blink the eyelids as often as they should to protect the eye. This inability to protect the eye has been associated with damage to the eye as impaired vision, or double vision, which is usually
temporary. This reduced blinking has been associated with corneal ulcerations. There are medications that can help lift the eyelid, however, if the drooping is too great the eye drops are not that effective. These side effects can last for several
weeks or longer. This occurs in 2-5 percent of patients.
11. I will follow all aftercare instructions as it is crucial I do so for healing

As Xeomin is not an exact science, there might be an uneven appearance of the face with some muscles more affected by the Xeomin than others. In most cases this uneven appearance can be corrected by injecting Xeomin in the same or nearby muscles. However in some cases this uneven appearance can persist for several weeks or months. This list is not meant to be inclusive of all possible risks associated with Xeomin as there are both known and unknown side effects associated with any medication or procedure. Xeomin should not be administered to a pregnant or nursing woman. 
Additionally, the number of units injected is an estimate of the amount of Xeomin required to paralyze the muscles. I understand there is no guarantee of results of any treatment.  I understand the regular charge applies to all subsequent treatments. 
I understand and agree that all services rendered to me are charged directly to me and that I am personally responsible for payment. I further agree in the event of non- payment, to bear the cost of collection, and/or Court cost and reasonable legal fees,should this be required.

By signing below, I acknowledge that I have read the foregoing informed consent and agree to the treatment with its associated risks. I hereby give consent to perform this and all subsequent Xeomin treatments with the above understood. I hereby release the doctor, the person injecting the Xeomin and the facility from liability associated with this procedure
      `,
  },
  {
    name: "Weight Management",
    headerTitle: "Weight Management (semaglutide) ",
    subTitle: "Prescription Drug Management Consent",
    getConsentText: () => `
This document is intended to serve as a confirmation of informed consent for compounded semaglutide, which is a prescription weight management medication.
**A. Patient Informed Consent**
1. I voluntarily request that Hyeyeon Park, DNP, CRNP (provider) treats my medical condition. 
2. I have informed my provider of any known allergies, my medical conditions, medications, social/family history. 
3. I have the right to be informed of any alternative options, side effects, and the risks and benefits. 
4. I understand the mechanism of action of the medication.
5. I understand how it is to be administered. 
6. I understand the prescription will come from a compounding pharmacy, which is not FDA approved. I have been told that the manufacturing facility itself is FDA monitored along with third party testing on the medication itself.
7. Prices may vary and change. My charge will include my time with Hyeyeon Park (in person and via communication outside of the office), supplies, and medication.
8. Hyeyeon Park may change the pharmacy based on several factors (availability, shipping time, cost). Hyeyeon Park will tell you as this happens.
9. It has been explained to me that this medication could be harmful if taken inappropriately or without advice from the provider. 
10. I understand this medication may cause adverse side effects (see below).   I understand this list is not complete and it describes the most common side effects, and that death is also a possibility of taking this medication. I understand symptoms may be worse after there has been a change in my medication dose or when first starting the medication.

Common side effects include, but are not limited to:
- Gastrointestinal: Nausea/vomiting, abdominal pain, Diarrhea/constipation, dyspepsia, abdominal distension, eructation, flatulence, gastroenteritis, GERD, gastritis, lipase increase, amylase increase
- Neurological: Headache, dizziness
- Cardiac: Heart rate increase, Hypotension
- Endocrine: Fatigue, hypoglycemia (diabetic patients), alopecia
- Ophthalmic: Retinal disorder (diabetic patients) 
- Skin: redness or pain at injection site

Serious Reactions include, but are not limited to:
- Thyroid C-cell tumor (animal studies)
- Medullary thyroid cancer 
- Hypersensitivity reaction
- Anaphylaxis
- Angioedema
- Acute kidney injury
- Chronic renal failure exacerbation
- Pancreatitis
- Cholelithiasis
- Cholecystitis
- Syncope 

**B. I understand that I have the following responsibilities:**
1. I agree to obtain prescriptions for compounded semaglutide only from Hyeyeon Park, DNP, CRNP.
   a. If I am looking to transition to a non-compounding pharmacy or seek insurance coverage, I will tell Hyeyeon Park in advance. 
2. Medical history: I will tell Hyeyeon Park my complete medical history, including: allergies, medications, medical/surgical/social/family history. 
   a. Hyeyeon Park, DNP, CRNP may ask to review, with your permission, your medical history (medications, recent lab results, pertinent imaging results).
   b. I understand that if I become pregnant or start trying for pregnancy, I must stop this medication. 
   c. I will be honest to the best of my ability the history she needs to know.
   d. I will tell my provider any updated health information (medication, allergies, personal medical issues/surgeries/social history, or family history changes).
   e. My provider can discuss my treatment plan with any co-treating pharmacist and/or healthcare provider 
   f. I will always tell other providers about all medications I am taking.
   g. Hyeyeon Park may ask for me to seek additional labs while on treatment to ensure it’s safety. 
3. Directions for use: I will take my medications only as prescribed according to the directions, led by Hyeyeon Park, DNP, CRNP.  
   a. If I feel my medications are not effective, or are causing undesirable side effects, I will contact my provider for instructions. 
   b. I will not adjust my medications without prior instruction to do so.  
   c. I understand that the medication must be refrigerated.
   d. I understand this medication must be injected in the subcutaneous tissue once weekly. I will not inject any less than 7 days unless directed by Hyeyeon Park (example: travel). 
   e. I will not share needles and dispose of needles safely.
   f. If I’m having troubles with the administration of the medication, I will seek help from Hyeyeon Park.
   g. The medication expires after 12 weeks. I will refer to the Beyond Usage Date (BUD). 
4. Safety:
   a. I understand it is important to keep my medication away from children (<18 years old)
   b. I am the only one who will use my medication. I will not give or sell my medication to anyone else.  
5. If Hyeyeon Park deems it appropriate to start weaning my medication or transition to maintenance dosing, I will comply. 
**C. Discontinuation of medication: I understand that Hyeyeon Park may stop prescribing my medications if:**
   a. I am having unfavorable side effects or it’s not working to treat my medical condition
   b. I have been untruthful in my medical or family history
   c. I do not follow through with the recommended plan of care set by Hyeyeon Park.
   d. I do not follow any parts of “Part B: responsibilities” in this agreement. 
 
I have read this form in its entirety. It has been explained to me. I have had the opportunity to ask questions and have all my questions answered. I fully understand the above information and have no further questions. By signing this form, I voluntarily give my consent for treatment and agree to the risks.
        `,
  },
  {
    name: "Fillers",
    headerTitle: "FACIAL FILLER INJECTION",
    subTitle: "Client Informed Consent Form",
    getConsentText: (initials: string) => `
**INSTRUCTIONS **
This is an informed-consent document which has been prepared to help your plastic surgeon inform you concerning a number of available facial tissue filler injection therapies, their risks, and alternative treatments. This consent covers injection using

**[x] RHA®:** The RHA® Collection of resilient hyaluronic acid (HA) fillers includes RHA Redensity™, RHA® 2, RHA® 3 and RHA® 4. RHA Redensity™ is for injection into the facial tissue for the correction of moderate to severe dynamic perioral rhytids; and RHA® 2 and RHA® 4 are for the correction of moderate to severe dynamic facial wrinkles and folds, such as nasolabial folds, in adults 22 or older. RHA® 3 is for the correction of moderate to severe dynamic facial wrinkles and folds, such as nasolabial folds, and also used to augment lip fullness in adults 22 or older.
**GENERAL INFORMATION**
The injection will utilize a stabilized product used to smooth moderate to severe facial wrinkles and folds around the nose and mouth or shape facial contours. Semi-permanent filler injections are customized for every patient, depending on his or her particular needs. These can be performed in areas involving the face and eyelid region, forehead, and lips. Fillers cannot stop the process of aging. They can however, temporarily diminish the look of wrinkles and soft tissue depressions. Filler injections may be performed as a singular procedure, in combination with other treatments such as BOTOX® , or as an adjunct to a surgical procedure. Filler injections require regional nerve blocks or local anesthetic injections to diminish discomfort. Soft tissue fillers produce temporary swelling, redness, and needle marks, which resolve after a few days time. Continuing treatments are necessary in order to maintain the effect of fillers over time. Once injected, fillers will be slowly absorbed by the body. The length of effect for injections is variable.
**ALTERNATIVE TREATMENTS**
Alternative forms of management include not treating the skin wrinkles or soft tissue depressions by any means. Improvement of skin wrinkles and soft tissue depressions may be accomplished by other treatments: laser treatments, chemical skin-peels, dermabrasion, or other skin procedures, alternative types of tissue fillers, or surgery such as a blepharoplasty, face or brow lift when indicated. Risks and potential complications are also associated with alternative forms of medical or surgical treatment. 
**RISKS OF FILLER INJECTIONS**
Every procedure involves a certain amount of risk and it is important that you understand these risks and the possible complications associated with them. In addition, every procedure has limitations. An individual’s choice to undergo this procedure is based on the comparison of the risk to potential benefit. Although the majority of patients do not experience the following, you should discuss each of them with your physician to make sure you understand the risks, potential complications, limitations, and consequences of facial filler injections. Additional information concerning Hylaform may be obtained from the package-insert sheets supplied by INAMED; Juvederm may be obtained from the package-insert sheets supplied by Allergan Aesthetics; Restylane Filler may be obtained from the package-insert sheets supplied by Medicis Aesthetics; Radiesse filler may be obtained from the package-insert sheets supplies by BioForm Medical Inc. Problems associated with the use of tissue fillers can relate to normal occurrences following tissue filler injections, or potential complications following tissue filler injections.
**Normal Occurrences During Tissue Filler Injections**
**Bleeding and Bruising:** It is possible, though unusual, to have a bleeding episode from a filler injection or local anesthesia used during the procedure. Bruising in soft tissues may occur. Should you develop post-injection bleeding, it may require emergency treatment or surgery. Aspirin, anti-inflammatory medications, platelet inhibitors, anticoagulants, Vitamin E, ginkgo biloba and other “herbs / homeopathic remedies” may contribute to a greater risk of a bleeding problem. Do not take any of these for seven days before or after filler injections. 
**Swelling:** Swelling (edema) is a normal occurrence following the injections. It decreases after a few days. If swelling is slow to resolve, medical treatment may be necessary. 
**Pain:** Discomfort associated with injections is normal and usually of short duration. 
**Specific Risks of Filler Injections**
**Needle Marks:** Visible needle marks from the injections occur normally and resolve in a few days. 
**Acne-Like Skin Eruptions:** Acneiform skin eruptions can occur following the injection of tissue fillers. This generally resolves within a few days. 
**Skin Sensitivity: **Skin rash, itching, tenderness and swelling may occur following injections. After treatment, you should minimize exposure of the treated area to excessive sun or UV lamp exposure and extreme cold weather until any initial swelling or redness has gone away. If you are considering laser treatment, chemical skin peeling or any other procedure based on a skin response after filler treatment, or you have recently had such treatments and the skin has not healed completely, there is a possible risk of an inflammatory reaction at the implant site. 
**Infection: **Although infection following injection of tissue fillers is unusual, bacterial, fungal, and viral infections can occur. Herpes simplex virus infections around the mouth can occur following a tissue filler treatment. This applies to both individuals with a past history of Herpes simplex virus infections and individuals with no known history of Herpes simplex virus infections in the mouth area. Specific medications must be prescribed and taken both prior to and following the treatment procedure in order to suppress an infection from this virus. Should any type of skin infection occur, additional treatment including antibiotics may be necessary.
**Erythema (Skin Redness): **Erythema in the skin occurs after injections. It can be present for a few days after the procedure. 
**Under / Over Correction: **The injection of soft tissue fillers to correct wrinkles and soft tissue contour deficiencies may not achieve the desired outcome. The amount of correction may be inadequate or excessive. It may not be possible to control the process of injection of tissue fillers due to factors attributable to each patient’s situation. If under correction occurs, you may be advised to consider additional injections of tissue filler materials. 
**Asymmetry: ** The human face is normally asymmetrical in its appearance and anatomy. It may not be possible to achieve or maintain exact symmetry with tissue filer injections. There can be a variation from one side to the other in terms of the response to injection. Addressing this may require additional injections. 
**Damage to Deeper Structures: **Deeper structures such as nerves and blood vessels may be damaged during the course of injection. Injury to deeper structures may be temporary or permanent. 
**Skin Lumpiness: **Lumpiness can occur following the injection of fillers. This tends to smooth out over time. In some situations, it may be possible to feel the injected tissue filler material for long periods of time. 
**Visible Tissue Filler Material: **It may be possible to see any type of tissue filler material that was injected in areas where the skin is thin. 
**Granulomas:**  Painful masses in the skin and deeper tissues after a filler injection are extremely rare. Should these occur, additional treatments including surgery may be necessary. Fillers should not be used in areas with active inflammation or infections (e.g., cysts, pimples, rashes or hives). 
**Migration of Filler:**  The filler substance may migrate from its original injection site and produce visible fullness in adjacent tissue or other unintended effects. 
**Skin Necrosis:**  It is very unusual to experience death of skin and deeper soft tissues after injections. Skin necrosis can produce unacceptable scarring. Should this complication occur, additional treatments, or surgery may be necessary. 
**Allergic Reactions and Hypersensitivity:**  As with all biologic products, allergic and systemic anaphylactic reactions may occur. Fillers should not be used in patients with a history of multiple severe allergies, severe allergies manifested by a history of anaphylaxis, or allergies to gram-positive bacterial proteins. Allergic reactions may require additional treatment. 
**Drug and Local Anesthetic Reactions:**  There is the possibility that a systemic reaction could occur from either the local anesthetic or epinephrine used for sensory nerve block anesthesia when tissue filler injections are performed. This would include the possibility of light-headedness, rapid heartbeat (tachycardia), and fainting. Medical treatment of these conditions may be necessary. 
**Antibodies to Fillers:**  Presence of antibodies to hyaluronic acid tissue fillers may reduce the effectiveness of this material or produce a reaction in subsequent injections. The health significance of antibodies to hyaluronic acid tissue fillers and other fillers is unknown. 
**Accidental Intra-Arterial Injection:**  It is extremely rare that during the course of injection, fillers could be accidentally injected into arterial structures and produce a blockage of blood flow. This may produce skin necrosis in facial structures or damage blood flow to the eye, resulting in loss of vision. The risk and consequences of accidental intravascular injection of fillers is unknown and not predictable. 
**Scarring:**  Fillers should not be used in patients with know susceptibility to keloid formation or hypertrophic scarring. The safety of patients has not been studied. 
**Unsatisfactory Result:**  Filler injections alone may not produce an outcome that meets your expectations for improvement in wrinkles or soft tissue depressions. There is the possibility of a poor or inadequate response from filler injection(s). Additional injections may be necessary. Surgical procedures or other treatments may be recommended in additional to additional treatments.
**Unknown Risks:**  The long term effect of facial fillers beyond one year is unknown. The possibility of additional risk factors or complications attributable to the use of facial filler as a soft tissue filler may be discovered. 
**Combination of Procedures:**  In some situations, Botox® injections or other types of tissue filler materials may be used in addition to facial filler in order to specifically treat areas of the face or to enhance the outcome from tissue filler therapy. The effect of other forms of external skin treatments (laser and other light therapies, microdermabrasion, dermabrasion, or chemical peels) on skin that has been treated with facial filler is unknown. 
**Pregnancy and Nursing Mothers:**  Animal reproduction studies have not been performed to determine if Hyaluronic Acid Filler or other facial fillers could produce fetal harm. It is not known if Hyaluronic Acid Filler or its breakdown products can be excreted in human milk. It is not recommended that pregnant women or nursing mothers receive Hyaluronic Acid Filler or other facial filler treatments. 
**Drug Interactions:**  It is not known if facial filler reacts with other drugs within the body. 
**Long-Term Effects:**  Hyaluronic Acid Filler or other facial filler injections should not be considered as a permanent treatment for the correction of wrinkles and soft tissue depressions. Over time, the facial filler material is slowly absorbed by the body and wrinkles or soft tissue depressions will reappear. Continuing facial filler treatment (injections) is necessary in order to maintain the effect of the Filler. Subsequent alterations in face and eyelid appearance may occur as the result of aging, weight loss or gain, sun exposure, or other circumstances not related to Facial Filler injections. Future surgery or other treatments may be necessary. Facial Filler injection does not arrest the aging process or produce permanent tightening of the skin or improvement in wrinkles.
**ADDITIONAL ADVISORIES **
**Female Patient Information:**  It is important to inform your plastic surgeon if you use birth control pills, estrogen replacement, or if you suspect you may be pregnant. Many medications including antibiotics may neutralize the preventive effect of birth control pills, allowing for conception and pregnancy. 
**Mental Health Disorders and Elective Surgery:**  It is important that all patients seeking to undergo elective surgery have realistic expectations that focus on improvement rather than perfection. Complications or less than satisfactory results are sometimes unavoidable, may require additional surgery and often are stressful. Please openly discuss with your surgeon, prior to surgery, any history that you may have of significant emotional depression or mental health disorders. Although many individuals may benefit psychologically from the results of elective surgery, effects on mental health cannot be accurately predicted. 
**Sun Exposure – Direct or Tanning Salon:**  The effects of the sun are damaging to the skin. Exposing the treated areas to sun may result in increased scarring, color changes, and poor healing. Patients who tan, either outdoors or in a salon, should inform their surgeon and either delay treatment, or avoid tanning until the surgeon says it is safe to resume. The damaging effect of sun exposure occurs even with the use sun block or clothing coverage. 
**Medications and Herbal Dietary Supplements:**  There are potential adverse reactions that occur as the result of taking over-the-counter, herbal, and/or prescription medications. Aspirin and medications that contain aspirin interfere with clotting and can cause more bleeding. These include non-steroidal anti-inflammatories such as Motrin, Advil, and Alleve. It is very important not to stop drugs that interfere with platelets, such as Plavix, which is used after a stent. It is important if you have had a stent and are taking Plavix that you inform the plastic surgeon. Stopping Plavix may result in a heart attack, stroke and even death. Be sure to check with your physician about any drug interactions that may exist with medications which you are already taking. If you have an adverse reaction, stop the drugs immediately and call your plastic surgeon for further instructions. If the reaction is severe, go immediately to the nearest emergency room. When taking the prescribed pain medications after surgery, realize that they can affect your thought process and coordination. Do not drive, do not operate complex equipment, do not make any important decisions and do not drink any alcohol while taking these medications. Be sure to take your prescribed medication only as directed.
**Travel Plans:**  Any surgery holds the risk of complications that may delay healing and delay your return to normal life. Please let the surgeon know of any travel plans, important commitments already scheduled or planned, or time demands that are important to you, so that appropriate timing of surgery can occur. There are no guarantees that you will be able to resume all activities in the desired time frame. 
**Off-Label FDA Issues:**  There are many devices, medications and injectable fillers and botulinum toxins that are approved for specific use by the FDA, but this proposed use is “Off-Label”, that is not specifically approved by the FDA. It is important that you understand this proposed use is not experimental and your physician believe it to be safe and effective. Examples of commonly accepted “Off-Label” use of drugs or devices include the use of aspirin for prevention of heart disease, retinoids for skin care, and injection of botulinum toxin for wrinkles around the eyes.
** [x] I acknowledge that I have been informed about the Off-Label FDA status of ___RHA____ Filler,
and I understand it is not experimental and accept its use**
**ADDITIONAL TREATMENT NECESSARY**
There are many variable conditions in addition to risk and potential complications that may influence the long-term result of facial filler injections. Even though risks and complications occur infrequently, the risks cited are the ones that are particularly associated with Facial Filler injections. Other complications and risks can occur but are even more uncommon. Should complications occur, additional surgery or other treatments may be necessary. The practice of medicine and surgery is not an exact science. Although good results are expected, there is no guarantee or warranty expressed or implied, on the results that may be obtained. 
**HEALTH INSURANCE**
Most health insurance companies exclude coverage for cosmetic surgical procedures and treatments or any complications that might occur from the same. Health insurance companies may not pay for facial filler injections used to treat medical conditions. Please carefully review your health insurance subscriber information pamphlet. 
**FINANCIAL RESPONSIBILITIES** 
The cost of filler injection may involve several charges. This includes the professional fee for the injections, followup visits to monitor the effectiveness of the treatment, and the cost of the filler material itself. It is unlikely that filler injections to treat cosmetic problems would be covered by your health insurance. The fees charged for this procedure do not include any potential future costs for additional procedures that you elect to have or require in order to revise, optimize, or complete your outcome. Additional costs may occur should complications develop from the injections and will also be your responsibility. In signing the consent for this surgery/procedure, you acknowledge that you have been informed about its risk and consequences and accept responsibility for the clinical decisions that were made along with the financial costs of all future treatments. 
** [x] I understand and unconditionally and irrevocably accept this.**
**DISCLAIMER **
Informed-consent documents are used to communicate information about the proposed surgical treatment of a disease or condition along with disclosure of risks and alternative forms of treatment(s). The informed-consent process attempts to define principles of risk disclosure that should generally meet the needs of most patients in most circumstances. However, informed-consent documents should not be considered all-inclusive in defining other methods of care and risks encountered. Your plastic surgeon may provide you with additional or different information which is based on all of the facts pertaining to your particular case and the current state of medical knowledge. Informed-consent documents are not intended to define or serve as the standard of medical care. Standards of medical care are determined on the basis of all of the facts involved in an individual case and are subject to change as scientific knowledge and technology advance and as practice patterns evolve. 
**It is important that you read the above information carefully and have all of your questions answered before signing the consent on the next page**
**CONSENT FOR SURGERY/ PROCEDURE or TREATMENT**
1. I, ${initials}, hereby authorize Dr.Hailey Park, DNP as may be selected to perform the following procedure or treatment:**  
**FACIAL FILLER INJECTION (list the anatomic areas where filler will be injected) 
I have received the following information sheet: INFORMED CONSENT – FACIAL FILLER INJECTION**
2. I recognize that during the course of the procedure and medical treatment or anesthesia, unforeseen conditions may necessitate different procedures than those above. I therefore authorize the above physician and assistants or designees to perform such other procedures that are in the exercise of his or her professional judgment necessary and desirable. The authority granted under this paragraph shall include all conditions that require treatment and are not known to my physician at the time the procedure is begun. 
3. I consent to the administration of such anesthetics considered necessary or advisable. I understand that all forms of anesthesia involve risk and the possibility of complications, injury, and sometimes death. 
4. I understand what my surgeon can and cannot do, and understand there are no warranties or guarantees, implied or specific about my outcome. I have had the opportunity to explain my goals and understand which desired outcomes are realistic and which are not. All of my questions have been answered, and I understand the inherent (specific) risks to the procedures I seek, as well as those additional risks and complications, benefits, and alternatives. Understanding all of this, I elect to proceed. 
5. I consent to be photographed or televised before, during, and after the operation(s) or procedure(s) to be performed, including appropriate portions of my body, for medical, scientific or educational purposes, provided my identity is not revealed by the pictures. 
6. For purposes of advancing medical education, I consent to the admittance of observers to the treatment room. 
7. I realize that not having the procedure is an option. 
**8. IT HAS BEEN EXPLAINED TO ME IN A WAY THAT I UNDERSTAND:**
   a. THE ABOVE TREATMENT OR PROCEDURE TO BE UNDERTAKEN
   b. THERE MAY BE ALTERNATIVE PROCEDURES OR METHODS OF TREATMENT
   c. THERE ARE RISKS TO THE PROCEDURE OR TREATMENT PROPOSED
**I CONSENT TO THE TREATMENT OR PROCEDURE AND THE ABOVE LISTED ITEMS (1-8). I AM SATISFIED WITH THE EXPLANATION.**
   `,
  },
  {
    name: "Micro Needling",
    headerTitle: "Microneedling Patient Consent Form",
    subTitle: "Client Informed Consent Form",
    getConsentText: (initials: string) =>
      `
**What is the purpose of this form?**
The purpose of this form is to help inform you and to help you decide if you want to have this procedure done to you. You should take part in the procedure only if you want to.
Before you decide if you want to take part in this procedure, it is important that you read the information below. This form may use words you do not understand. Please ask the doctor or the clinic staff to explain any words or procedures that you do not clearly understand.

**Description of the Procedure**
Micro EVO pen, the first-to-market and U.S Food and Drug Administration-cleared microneedling device clinically-proven solution to safely and effectively improve the appearance of facial acne scars for people age 22 and above. The EvoPen also improves the appearance of wrinkles on the neck.
Microneedling procedures are performed in a minimally-invasive (little to no introduction of the instrument into the body) and precise manner with the use of the sterile needle head. The procedure is normally completed within 30–60 minutes, depending on the required procedure and anatomical site.

**Side Effects**
After the procedure, the skin will be red and flushed in appearance, like a moderate sunburn. You may also experience skin tightness and mild sensitivity to touch on certain areas. This will diminish significantly within a few hours following the procedure. Within the next 24 hours, the skin will often appear to have returned to normal. After three days, there is rarely evidence that the procedure has taken place.

**Contraindications**
The SkinPen® Precision System should not be used on patients who:
• Have active skin cancer in the treatment area(s)
• Have infected wounds or sores in the treatment area(s)
• Have an allergy to stainless steel or anesthetics
• Have a hemorrhagic (bleeding) disorder or hemostatic (bleeding) dysfunction
• Are pregnant or nursing
• Are currently taking drugs with the ingredient isotretinoin (such as Accutane)

NOTE: This product is not intended for transdermal (under the skin) delivery of topical products such as cosmetics, drugs, or biologics
**Precautions and Warnings**
Safety and Effectiveness for settings greater than 1.5 mm has not been evaluated on the face. Universal precautions are necessary during microneedling. Microneedling should not be used within the orbital rim of the eye, such as the eyelids. The EvoPen System has not been evaluated in the following patient populations (i.e. patients with the following conditions or taking the following medications): Actinic (solar) keratosis; collagen vascular diseases or cardiac abnormalities; diabetes; eczema, psoriasis and other chronic conditions in the treatment area or on other areas of the body; immunosuppressive therapy; history of contact dermatitis; raised moles in the treatment area; rosacea; active bacterial, fungal, or viral infections (i.e. herpes, warts); keloid scars (a scar that grows outside of the boundaries of an original scar); patients on anticoagulants; scars and stretch marks less than one year old; scleroderma; and wound-healing deficiencies

**Patient Consent**
I understand that results of microneedling procedures will vary among individuals. I understand that although I may see a change after my first procedure, I may require a series of sessions to obtain my desired outcome. The procedure and side effects described in this consent have been explained to me including alternative methods, as have the advantages and disadvantages of microneedling.
I have been advised that though good results are expected, the possibility and nature of complications cannot be accurately anticipated, therefore, there can be no guarantee as expressed or implied either as to the success or other results of the microneedling procedure. I am aware that the microneedling procedure is not permanent and natural degradation may occur over time
I have read (or it has been read to me) and I understand this consent and I understand the information contained in it.
I have had the opportunity to ask any questions about the microneedling procedure including risks or alternatives, and I acknowledge that all my questions about the procedure have been answered in a satisfactory manner. 

This consent form is valid until all or part is revoked by me in writing.
Initials: ${initials}
  `,
  },
];
