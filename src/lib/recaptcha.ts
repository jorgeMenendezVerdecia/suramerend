export async function loadRecaptcha(siteKey: string) {
    if (!siteKey) return null;
    // If grecaptcha already loaded
    // @ts-ignore
    if (typeof window !== 'undefined' && (window as any).grecaptcha && (window as any).grecaptcha.execute) {
        // @ts-ignore
        return (window as any).grecaptcha;
    }

    return new Promise((resolve, reject) => {
        if (typeof document === 'undefined') return resolve(null);
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            // @ts-ignore
            if ((window as any).grecaptcha) resolve((window as any).grecaptcha);
            else reject(new Error('reCAPTCHA failed to load'));
        };
        script.onerror = () => reject(new Error('Failed to load reCAPTCHA script'));
        document.head.appendChild(script);
    });
}

export async function executeRecaptcha(siteKey: string, action = 'submit') {
    if (!siteKey) return null;
    try {
        // @ts-ignore
        const grecaptcha = await loadRecaptcha(siteKey);
        if (!grecaptcha) return null;
        // @ts-ignore
        const token = await grecaptcha.execute(siteKey, { action });
        return token as string;
    } catch (err) {
        console.warn('reCAPTCHA error', err);
        return null;
    }
}
