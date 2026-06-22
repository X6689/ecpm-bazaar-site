"use client";

import { useCallback, useEffect, useState } from "react";

export type Lang = "en" | "zh";

const languageStorageKey = "ecpm-bazaar-language";

function normalizeLanguage(value: string | null): Lang | null {
  if (value === "en" || value === "zh") {
    return value;
  }

  return null;
}

export function useLanguagePreference(defaultLang: Lang = "en") {
  const [lang, setLangState] = useState<Lang>(defaultLang);

  useEffect(() => {
    const savedLanguage = normalizeLanguage(window.localStorage.getItem(languageStorageKey));
    if (savedLanguage) {
      setLangState(savedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const setLang = useCallback((nextLang: Lang) => {
    setLangState(nextLang);
    window.localStorage.setItem(languageStorageKey, nextLang);
  }, []);

  return [lang, setLang] as const;
}
