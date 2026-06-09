'use server';

import { cookies } from 'next/headers';
import { type Locale, defaultLocale, locales } from './request';

export async function getLocale(): Promise<Locale> {
    const cookieStore = await cookies();
    const locale = cookieStore.get('locale')?.value as Locale;
    return locales.includes(locale) ? locale : defaultLocale;
}

export async function setLocale(locale: Locale): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set('locale', locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax',
    });
}
