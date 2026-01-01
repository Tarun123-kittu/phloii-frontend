import React from "react";

import Header from "@/Component/Header/Header";
import Footer from "@/Component/Footer/Footer";

const Page = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="bg-black pt-5 pb-5 flex-grow-1">
        <section className="container mx-auto text-white d-flex flex-column gap-3">
          <h1 className="mb-5">🔒 Child Safety Standards – Phloii Connect</h1>

          <p>
            <strong>Phloii Connect</strong>, developed and operated by{" "}
            <strong>Personal Account</strong>, is committed to protecting
            children and preventing child sexual abuse and exploitation (CSAE)
            on our platform. We enforce strict safety standards and comply with
            all applicable child protection laws and regulations.
          </p>

          <h4>🚫 Zero Tolerance for Child Sexual Abuse & Exploitation (CSAE)</h4>

          <p>
            Phloii Connect maintains a <strong>zero-tolerance policy</strong>{" "}
            toward any form of child sexual abuse or exploitation. The following
            activities are strictly prohibited:
          </p>

          <ul>
            <li>Child sexual abuse material (CSAM)</li>
            <li>Any sexual or suggestive content involving minors</li>
            <li>Grooming, solicitation, or exploitation of minors</li>
            <li>Attempting to contact minors for sexual purposes</li>
            <li>Any behavior that violates child safety or protection laws</li>
          </ul>

          <p>
            Any content or account found violating these standards will be{" "}
            <strong>immediately removed</strong>. Where required, we{" "}
            <strong>preserve relevant data</strong> and{" "}
            <strong>cooperate fully with law enforcement authorities</strong>.
          </p>

          <h4>🛡️ Reporting & Moderation</h4>

          <p>
            Phloii Connect provides in-app tools that allow users to report:
          </p>

          <ul>
            <li>Inappropriate or abusive content</li>
            <li>Suspicious or predatory behavior</li>
            <li>Any violations related to child safety</li>
          </ul>

          <p>
            All reports are reviewed promptly by our moderation team. Enforcement
            actions may include content removal, account suspension, permanent
            bans, or escalation to authorities where legally required.
          </p>

          <h4>📩 Child Safety Contact</h4>

          <p>
            For concerns specifically related to child safety, CSAE, or CSAM,
            please contact:
          </p>

          <div>
            <p className="mb-0">
              <strong>Child Safety Contact Email:</strong>
            </p>
            <p className="mb-0">
              <a
                href="mailto:phloiimanagement@gmail.com"
                style={{ color: "#fbb90d" }}
              >
                phloiimanagement@gmail.com 
              </a>
            </p>
          </div>

          <h4>⚖️ Legal Compliance</h4>

          <p>
            Phloii Connect complies with all applicable child protection and
            online safety laws, including but not limited to:
          </p>

          <ul>
            <li>Laws governing the prevention and reporting of CSAM</li>
            <li>Mandatory cooperation with authorized legal authorities</li>
            <li>Enforcement of platform age restrictions and safety standards</li>
          </ul>

          <h4>🔞 Age Restriction</h4>

          <p>
            Phloii Connect is intended for users{" "}
            <strong>18 years of age and older</strong>. We do{" "}
            <strong>not knowingly permit minors</strong> to create accounts or
            access the platform. Accounts suspected of belonging to users under
            18 may be suspended or permanently removed.
          </p>

          <h4>📌 Policy Updates</h4>

          <p>
            We may update these Child Safety Standards periodically to reflect
            legal, technical, or operational changes. Continued use of Phloii
            Connect constitutes acceptance of the latest version of this policy.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Page;
