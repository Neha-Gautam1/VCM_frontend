import { useState } from "react";
import { FaLightbulb, FaPaperPlane } from "react-icons/fa";
import UserLayout from "../../components/user/layout/UserLayout";
import { FormInput, FormSelect, FormTextarea, PrimaryBtn, SuccessToast } from "../../components/user/ui/UserUI";

const Suggestions = () => {
  const [form, setForm] = useState({ subject: "", category: "Portal experience", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const field = (key) => ({
    value: form[key],
    onChange: (event) => setForm((current) => ({ ...current, [key]: event.target.value })),
    error: errors[key],
  });

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.subject.trim()) nextErrors.subject = "Please add a subject";
    if (!form.message.trim()) nextErrors.message = "Please share your suggestion";
    if (Object.keys(nextErrors).length) return setErrors(nextErrors);
    setErrors({});
    setForm({ subject: "", category: "Portal experience", message: "" });
    setSent(true);
  };

  return (
    <UserLayout pageTitle="Suggestions">
      <div className="mb-8">
        <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-500">Your voice matters</span>
        <h2 className="mt-3 font-display text-3xl font-bold text-slate-800">Suggestion Box</h2>
        <p className="mt-1 text-lg text-slate-500">Share an idea that can help improve the VCM community experience.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[.8fr_1.2fr]">
        <section className="min-h-[430px] rounded-[24px] bg-gradient-to-br from-indigo-950 to-slate-900 p-9 text-white">
          <div className="mb-9 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-300/20 text-3xl text-amber-300"><FaLightbulb /></div>
          <h3 className="max-w-sm font-display text-3xl font-bold leading-tight">Ideas shape better experiences.</h3>
          <p className="mt-5 max-w-md text-lg leading-8 text-indigo-100">Tell us what is working well, what could be improved, or what you would like to see next. Every thoughtful suggestion is reviewed by our team.</p>
          <div className="mt-10 border-t border-white/10 pt-7 text-sm leading-6 text-indigo-100">Please avoid sharing passwords, payment details, or other sensitive information.</div>
        </section>

        <form onSubmit={submit} noValidate className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <div className="space-y-5">
            <FormInput label="Subject" id="suggestion-subject" placeholder="A concise title for your idea" required {...field("subject")} />
            <FormSelect label="Category" id="suggestion-category" {...field("category")}>
              <option>Portal experience</option><option>Events</option><option>Volunteer program</option><option>Knowledge resources</option><option>Other</option>
            </FormSelect>
            <FormTextarea label="Your suggestion" id="suggestion-message" placeholder="Describe your idea and how it could help..." required rows={7} {...field("message")} />
            <PrimaryBtn type="submit" className="mt-2"><FaPaperPlane /> Send suggestion</PrimaryBtn>
          </div>
        </form>
      </div>
      {sent && <SuccessToast message="Thank you — your suggestion has been sent." onClose={() => setSent(false)} />}
    </UserLayout>
  );
};

export default Suggestions;
