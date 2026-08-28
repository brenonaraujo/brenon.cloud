function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const COPY = {
  pt: {
    preheaderConfirm: 'Confirme para receber os posts novos do Brenon.Cloud.',
    headingConfirm: 'Um clique e você entra na lista',
    bodyConfirm: 'Você pediu para receber e-mail quando sair post novo no blog. Confirme abaixo. Se não foi você, ignore esta mensagem.',
    ctaConfirm: 'Confirmar inscrição',
    preheaderPost: 'Saiu um post novo no Brenon.Cloud.',
    headingPost: 'Post novo',
    ctaPost: 'Ler no site',
    unsub: 'Descadastrar',
    footer: 'Brenon.Cloud · um e-mail por post, nada de digest.'
  },
  en: {
    preheaderConfirm: 'Confirm to get new Brenon.Cloud posts by email.',
    headingConfirm: 'One click and you are on the list',
    bodyConfirm: 'You asked to get an email when a new blog post goes live. Confirm below. If that was not you, ignore this message.',
    ctaConfirm: 'Confirm subscription',
    preheaderPost: 'A new Brenon.Cloud post is up.',
    headingPost: 'New post',
    ctaPost: 'Read on the site',
    unsub: 'Unsubscribe',
    footer: 'Brenon.Cloud · one email per post, no digest.'
  }
}

function shell({ preheader, heading, bodyHtml, ctaLabel, ctaUrl, footerHtml }) {
  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(heading)}</title>
</head>
<body style="margin:0;padding:0;background:#0f172a;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
          <tr>
            <td style="padding:0 8px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
              <p style="margin:0;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;">Brenon.Cloud</p>
              <p style="margin:6px 0 0;font-size:14px;color:#94a3b8;">Personal Cloud Services</p>
            </td>
          </tr>
          <tr>
            <td style="background:#111827;border:1px solid #1e293b;border-radius:16px;padding:32px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#e2e8f0;">
              <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#f8fafc;">${escapeHtml(heading)}</h1>
              ${bodyHtml}
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 8px;">
                <tr>
                  <td style="border-radius:10px;background:#2563eb;">
                    <a href="${escapeHtml(ctaUrl)}" style="display:inline-block;padding:12px 22px;min-height:44px;line-height:20px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">${escapeHtml(ctaLabel)}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 8px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:12px;line-height:1.5;color:#64748b;">
              ${footerHtml}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function renderConfirmEmail({ locale, confirmUrl }) {
  const copy = COPY[locale === 'pt' ? 'pt' : 'en']
  return shell({
    preheader: copy.preheaderConfirm,
    heading: copy.headingConfirm,
    bodyHtml: `<p style="margin:0;font-size:16px;line-height:1.6;color:#cbd5e1;">${escapeHtml(copy.bodyConfirm)}</p>`,
    ctaLabel: copy.ctaConfirm,
    ctaUrl: confirmUrl,
    footerHtml: `<p style="margin:0;">${escapeHtml(copy.footer)}</p>`
  })
}

export function renderPostEmail({ locale, title, description, postUrl, unsubUrl }) {
  const copy = COPY[locale === 'pt' ? 'pt' : 'en']
  const desc = description
    ? `<p style="margin:12px 0 0;font-size:15px;line-height:1.6;color:#94a3b8;">${escapeHtml(description)}</p>`
    : ''
  const footer = `<p style="margin:0;">${escapeHtml(copy.footer)}</p><p style="margin:8px 0 0;"><a href="${escapeHtml(unsubUrl)}" style="color:#64748b;">${escapeHtml(copy.unsub)}</a></p>`
  return shell({
    preheader: copy.preheaderPost,
    heading: copy.headingPost,
    bodyHtml: `<p style="margin:0;font-size:18px;line-height:1.4;color:#f8fafc;font-weight:600;">${escapeHtml(title)}</p>${desc}`,
    ctaLabel: copy.ctaPost,
    ctaUrl: postUrl,
    footerHtml: footer
  })
}
