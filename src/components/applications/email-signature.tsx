"use client";

import { useRef, useState } from "react";
import { Asset } from "@/components/ui/asset";
import { HoverSwap } from "@/components/ui/hover-swap";

const defaults = {
  name: "Your name",
  role: "Your role",
  email: "you@candid.engineering",
  phone: "+1 000 000 0000",
};

type Key = keyof typeof defaults;

const toolbar = [
  { name: "cb8f7.svg", size: 19 },
  { name: "d5a7a.svg", size: 19, extra: "1adb0.svg" },
  { name: "b41a2.svg", size: 19 },
  { name: "07180.svg", size: 18 },
  { name: "865db.svg", size: 18 },
];

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const action =
  "group flex cursor-pointer items-center gap-1.5 border-b border-ui-underline pb-0.5 text-[14.5px] tracking-[-0.015em]";

export function EmailSignature() {
  const [values, setValues] = useState(defaults);
  const [status, setStatus] = useState<string>();
  const nameInput = useRef<HTMLInputElement>(null);

  const field = (key: Key, label: string, className: string) => (
    <input
      ref={key === "name" ? nameInput : undefined}
      aria-label={label}
      value={values[key]}
      onChange={(e) => setValues({ ...values, [key]: e.target.value })}
      onFocus={(e) => e.target.select()}
      className={`w-full min-w-0 rounded-sm bg-transparent tracking-[-0.01em] ${className}`}
    />
  );

  const copy = async () => {
    const v = {
      name: escapeHtml(values.name),
      role: escapeHtml(values.role),
      email: escapeHtml(values.email),
      phone: escapeHtml(values.phone),
    };
    // Mail clients ignore stylesheets, so the pasted signature carries its own plain styles.
    const html = `<div style="font-family:Arial,sans-serif;font-size:13px;line-height:20px"><strong style="font-size:14px">${v.name}</strong><br>${v.role}<br><br><strong>Email</strong>&nbsp;&nbsp;${v.email}<br><strong>Phone</strong>&nbsp;&nbsp;${v.phone}</div>`;
    const text = `${values.name}\n${values.role}\n\nEmail  ${values.email}\nPhone  ${values.phone}`;
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([text], { type: "text/plain" }),
        }),
      ]);
      setStatus("Copied");
    } catch {
      setStatus("Copy failed");
    }
    setTimeout(() => setStatus(undefined), 1500);
  };

  return (
    <div>
      <div className="rounded-lg bg-ui-panel p-4 sm:py-20 lg:pr-4 lg:pl-60">
        <div className="max-w-180 overflow-hidden rounded-2xl bg-ui-white shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_2px_6px_rgb(0_0_0/0.04),0_10px_24px_-12px_rgb(0_0_0/0.12)]">
          <div
            aria-hidden
            className="flex h-14 items-center gap-4 overflow-hidden border-b border-ui-text/8 bg-ui-mailbar px-5 sm:gap-7"
          >
            <div className="flex gap-2">
              {[0, 1, 2].map((dot) => (
                <span key={dot} className="size-3 rounded-full bg-ui-text/18" />
              ))}
            </div>
            {toolbar.map((icon) => (
              <span key={icon.name} className="flex items-center gap-0.5">
                <Asset name={icon.name} width={icon.size} height={icon.size} />
                {icon.extra && <Asset name={icon.extra} width={12} height={12} />}
              </span>
            ))}
            <span className="text-[17px] tracking-[-0.01em] text-ui-text-2">Aa</span>
          </div>
          <div aria-hidden className="pl-8">
            {["To:", "Cc:", "Bcc:", "Subject:"].map((line) => (
              <p
                key={line}
                className="flex h-11 items-center border-b border-ui-text/8 text-sm tracking-[-0.01em] text-ui-muted"
              >
                {line}
              </p>
            ))}
          </div>
          <div className="px-8 pt-12 pb-10">
            <div className="max-w-80">
              {field("name", "Your name", "h-5 text-sm font-semibold")}
              {field("role", "Your role", "h-5 text-[13px] text-ui-muted")}
              <div className="grid grid-cols-[50px_1fr] items-center pt-3 leading-[22px]">
                <span className="text-xs font-semibold">Email</span>
                {field("email", "Email", "h-5.5 text-[13px]")}
                <span className="text-xs font-semibold">Phone</span>
                {field("phone", "Phone", "h-5.5 text-[13px]")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-6 pt-3">
        <button type="button" onClick={() => nameInput.current?.focus()} className={action}>
          Details
          <HoverSwap name="1a6a1.svg" size={13} box={14.5} direction="down" />
        </button>
        <button type="button" onClick={copy} className={action}>
          <span aria-live="polite">{status ?? "Copy signature"}</span>
          <HoverSwap name="a960e.svg" size={13} box={14.5} direction="down" />
        </button>
      </div>
    </div>
  );
}
